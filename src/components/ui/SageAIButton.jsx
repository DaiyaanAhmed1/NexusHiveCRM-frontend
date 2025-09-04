import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SageAIButton = ({ expanded, darkTheme, isRTLMode = false, role }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [glowAnimation, setGlowAnimation] = useState(false);
  const [nodeAnimation, setNodeAnimation] = useState(false);

  // Glow animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowAnimation(true);
      setTimeout(() => setGlowAnimation(false), 2000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Node connection animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setNodeAnimation(true);
      setTimeout(() => setNodeAnimation(false), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSageAIClick = () => {
    // Navigate to role-specific AI chat page
    const routes = {
      'director': '/rbac/director/ai-chat',
      'marketing-head': '/rbac/marketing-head/ai-chat',
      'admission-head': '/rbac/admission-head/ai-chat'
    };
    
    const targetRoute = routes[role];
    if (targetRoute) {
      navigate(targetRoute);
    }
  };

  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-300 w-full text-white group relative overflow-hidden ${
        expanded ? (isRTLMode ? 'justify-end' : 'justify-start') : 'justify-center'
      } ${
        darkTheme ? 'hover:bg-gray-700' : 'hover:bg-white/30'
      } ${glowAnimation ? 'shadow-lg shadow-blue-400/15 ring-1 ring-blue-400/10' : ''}`}
      style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
      title="Sage AI"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleSageAIClick}
    >
      {/* Enhanced tooltip for collapsed mode */}
      {!expanded && (
        <div className={`absolute ${isRTLMode ? 'right-full mr-2' : 'left-full ml-2'} top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 z-50 shadow-xl whitespace-nowrap`}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Sage AI
          </div>
          {/* Tooltip arrow */}
          <div className={`absolute ${isRTLMode ? 'left-full' : 'right-full'} top-1/2 -translate-y-1/2 border-4 border-transparent ${isRTLMode ? 'border-l-black' : 'border-r-black'}`}></div>
        </div>
      )}

      {/* Icon container with AI animations */}
      <span className={`text-2xl transition-transform duration-200 flex-shrink-0 ${
        isHovered ? 'scale-110' : ''
      } ${expanded && isRTLMode ? 'order-2' : ''}`}>
        <div className="relative">
          {/* Animated neural network background */}
          <div className={`absolute inset-0 transition-opacity duration-500 ${
            nodeAnimation ? 'opacity-30' : 'opacity-0'
          }`}>
            <svg width="20" height="20" viewBox="0 0 24 24" className="w-5 h-5">
              {/* Animated connection lines */}
              <path 
                d="M6 6l12 12M6 18l12-12" 
                stroke="currentColor" 
                strokeWidth="1" 
                className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-50' : 'opacity-0'}`}
              />
              <path 
                d="M12 2v20M2 12h20" 
                stroke="currentColor" 
                strokeWidth="0.5" 
                className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-30' : 'opacity-0'}`}
              />
            </svg>
          </div>
          
          {/* Main AI icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5 relative z-10">
            {/* Neural nodes with subtle pulse */}
            <circle 
              cx="6" cy="6" r="2" 
              fill="currentColor" 
              className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-100' : 'opacity-80'}`}
            />
            <circle 
              cx="18" cy="6" r="2" 
              fill="currentColor" 
              className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-100' : 'opacity-80'}`}
              style={{animationDelay: '0.2s'}}
            />
            <circle 
              cx="6" cy="18" r="2" 
              fill="currentColor" 
              className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-100' : 'opacity-80'}`}
              style={{animationDelay: '0.4s'}}
            />
            <circle 
              cx="18" cy="18" r="2" 
              fill="currentColor" 
              className={`transition-all duration-1000 ${nodeAnimation ? 'opacity-100' : 'opacity-80'}`}
              style={{animationDelay: '0.6s'}}
            />
            
            {/* Central processing unit */}
            <rect 
              x="10" y="10" width="4" height="4" 
              fill="currentColor" 
              className={`transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-90'}`}
            />
          </svg>
          
          {/* Sparkle effects for hover */}
          {isHovered && (
            <>
              <div className="absolute -top-1 -right-1 w-1 h-1 bg-white rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
            </>
          )}
        </div>
      </span>
      
      {/* Text container for expanded mode */}
      {expanded && (
        <span className={`whitespace-nowrap font-medium text-white ${
          isHovered ? (isRTLMode ? 'translate-x-1' : 'translate-x-1') : ''
        } transition-transform duration-200 flex-1 ${isRTLMode ? 'text-right order-1' : 'text-left'}`}>
          Sage AI
        </span>
      )}
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 -skew-x-12 transition-all duration-700 rounded-lg"></div>
      
      {/* Processing indicator for collapsed mode */}
      {!expanded && nodeAnimation && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-300 rounded-full animate-pulse shadow-lg"></div>
      )}
    </button>
  );
};

export default SageAIButton; 