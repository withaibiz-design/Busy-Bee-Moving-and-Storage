
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { VoiceAgentConfig, TranscriptionItem } from '../types';

interface VoiceInterfaceProps {
  agent: VoiceAgentConfig;
  onClose: () => void;
}

const VoiceInterface: React.FC<VoiceInterfaceProps> = ({ agent, onClose }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionItem[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Audio Contexts & State Refs
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);
  const transcriptionBufferRef = useRef<{ user: string; model: string }>({ user: '', model: '' });

  const stopCall = useCallback(() => {
    setIsCalling(false);
    setIsConnecting(false);
    if (sessionRef.current) {
      sessionRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close();
      audioContextsRef.current.output.close();
      audioContextsRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  }, []);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const createBlob = (data: Float32Array): Blob => {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
      int16[i] = data[i] * 32768;
    }
    return {
      data: encode(new Uint8Array(int16.buffer)),
      mimeType: 'audio/pcm;rate=16000',
    };
  };

  const startCall = async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: agent.id === 'emergency' ? 'Fenrir' : 'Kore' } },
          },
          systemInstruction: agent.systemPrompt,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onopen: () => {
            setIsCalling(true);
            setIsConnecting(false);
            
            // Stream audio to model
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            // For visualizer
            const analyser = inputCtx.createAnalyser();
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            
            source.connect(analyser);

            const updateVolume = () => {
              if (inputCtx.state === 'closed') return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for(let i = 0; i < bufferLength; i++) sum += dataArray[i];
              setAudioLevel(sum / bufferLength);
              requestAnimationFrame(updateVolume);
            };
            updateVolume();

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Data
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioContextsRef.current?.output;
              if (outCtx) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
                const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
                const source = outCtx.createBufferSource();
                source.buffer = audioBuffer;
                const gainNode = outCtx.createGain();
                source.connect(gainNode);
                gainNode.connect(outCtx.destination);
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                });
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
              }
            }

            // Handle Interruptions
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => {
                try { s.stop(); } catch(e) {}
              });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Handle Transcriptions
            if (message.serverContent?.inputTranscription) {
              transcriptionBufferRef.current.user += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              transcriptionBufferRef.current.model += message.serverContent.outputTranscription.text;
            }

            if (message.serverContent?.turnComplete) {
              const userText = transcriptionBufferRef.current.user.trim();
              const modelText = transcriptionBufferRef.current.model.trim();
              
              const newItems: TranscriptionItem[] = [];
              if (userText) newItems.push({ role: 'user', text: userText, id: Date.now() + '-u' });
              if (modelText) newItems.push({ role: 'model', text: modelText, id: Date.now() + '-m' });
              
              if (newItems.length > 0) {
                setTranscriptions(prev => [...prev, ...newItems].slice(-10));
              }
              
              transcriptionBufferRef.current = { user: '', model: '' };
            }
          },
          onerror: (e) => {
            console.error('Gemini error:', e);
            setError("Connection error. Please try again.");
            stopCall();
          },
          onclose: () => {
            setIsCalling(false);
            setIsConnecting(false);
          }
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Call failed:', err);
      setError("Could not access microphone.");
      setIsConnecting(false);
    }
  };

  // Auto-start call on mount
  useEffect(() => {
    startCall();
    return () => {
      stopCall();
    };
  }, []);

  return (
    <div className="bg-[#0f172a] rounded-2xl p-8 text-white shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden border border-white/10">
      {/* Background Glows */}
      <div className={`absolute -top-32 -right-32 w-80 h-80 bg-blue-600/30 blur-[120px] transition-opacity duration-1000 ${isCalling ? 'opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-yellow-500/20 blur-[120px] transition-opacity duration-1000 ${isCalling ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="flex items-center justify-between mb-8 relative z-10">
        <div className="flex items-center gap-4">
          <div className={`w-4 h-4 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] ${isCalling ? 'bg-green-500 animate-pulse' : (isConnecting ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600')}`}></div>
          <div>
            <h3 className="font-bold text-xl tracking-tight">{agent.title}</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">Busy Bee Moving Support</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors group"
        >
          <svg className="w-6 h-6 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-8 pr-2 scrollbar-hide relative z-10">
        {isConnecting && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 animate-pulse">
            <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-gray-300 text-sm font-medium">Connecting to Busy Bee Dispatch...</p>
            <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest">Initial Greeting Incoming</p>
          </div>
        )}

        {transcriptions.map((item) => (
          <div key={item.id} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
              item.role === 'user' 
                ? 'bg-blue-600 text-white shadow-xl rounded-tr-none' 
                : 'bg-white/10 text-gray-200 border border-white/10 rounded-tl-none'
            }`}>
              {item.text}
            </div>
          </div>
        ))}
        {isCalling && transcriptions.length === 0 && (
          <div className="flex justify-start animate-fadeIn">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-5 py-3 text-sm italic text-gray-400">
              Agent is speaking...
            </div>
          </div>
        )}
      </div>

      <div className="relative z-10 border-t border-white/5 pt-6">
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-xs text-center font-bold">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-6">
          {/* Visualizer */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full">
            {[...Array(16)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 rounded-full transition-all duration-100 ${isCalling ? 'bg-yellow-400 shadow-[0_0_8px_rgba(244,180,26,0.4)]' : 'bg-white/10'}`}
                style={{ 
                  height: isCalling ? `${Math.max(8, Math.min(100, (audioLevel * 1.5) * (1 + Math.sin(Date.now() / 100 + i))))}%` : '6px',
                  opacity: isCalling ? 0.9 : 0.3
                }}
              />
            ))}
          </div>

          <button 
            onClick={isCalling || isConnecting ? stopCall : startCall}
            className={`w-full font-extrabold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] text-lg ${
              isCalling || isConnecting 
                ? 'bg-red-500 text-white hover:bg-red-600 shadow-xl shadow-red-500/30' 
                : 'bg-[#f4b41a] text-black hover:bg-yellow-500 shadow-xl shadow-yellow-500/20'
            }`}
          >
            {isCalling || isConnecting ? (
              <>
                <div className="w-5 h-5 flex items-center justify-center rounded-full bg-white/20">
                  <div className="w-2.5 h-2.5 bg-white rounded-sm"></div>
                </div>
                End Call
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Reconnect Agent
              </>
            )}
          </button>
          
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] flex items-center gap-2">
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            Gemini 2.5 Real-time Voice
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceInterface;
