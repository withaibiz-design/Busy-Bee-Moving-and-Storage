
import React from 'react';
import { VoiceAgentConfig } from '../types';

interface AgentCardProps {
  agent: VoiceAgentConfig;
  isActive: boolean;
  onSelect: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isActive, onSelect }) => {
  return (
    <div className={`
      transition-all duration-300 rounded-xl p-5 border 
      ${isActive 
        ? 'bg-white border-[#f4b41a] shadow-lg' 
        : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
      }
    `}>
      <div className="flex flex-col gap-3">
        <div>
          <span className="inline-block px-2 py-0.5 rounded bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase mb-2">
            {agent.pillText}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{agent.title}</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-3">
            {agent.description}
          </p>
        </div>

        <button
          onClick={onSelect}
          className={`
            w-full py-2 rounded-lg text-sm font-bold transition-all
            ${isActive 
              ? 'bg-[#f4b41a] text-black' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
            }
          `}
        >
          {isActive ? 'Active Call Session' : 'Speak with Agent'}
        </button>
      </div>
    </div>
  );
};

export default AgentCard;
