import React, { useState, useEffect } from 'react';
import { Code, Palette, Smartphone, Zap, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface MousePosition {
  x: number;
  y: number;
}
const EnhancedProfileSection = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const floatingElements = [
    {
      icon: Code,
      color: 'purple',
      position: { top: '10%', left: '5%' },
      delay: 0,
      label: 'Frontend'
    },
    {
      icon: Smartphone,
      color: 'pink',
      position: { top: '60%', right: '5%' },
      delay: 0.5,
      label: 'Mobile'
    },
    {
      icon: Palette,
      color: 'blue',
      position: { bottom: '10%', left: '10%' },
      delay: 1,
      label: 'Design'
    },
    {
      icon: Zap,
      color: 'yellow',
      position: { top: '20%', right: '15%' },
      delay: 1.5,
      label: 'Performance'
    },
    {
      icon: Sparkles,
      color: 'indigo',
      position: { bottom: '30%', right: '20%' },
      delay: 2,
      label: 'Innovation'
    }
  ];

  const orbElements = [
    { size: 'w-4 h-4', position: 'top-1/4 left-1/4', delay: 0 },
    { size: 'w-3 h-3', position: 'top-1/3 right-1/4', delay: 0.8 },
    { size: 'w-5 h-5', position: 'bottom-1/4 left-1/3', delay: 1.6 },
    { size: 'w-2 h-2', position: 'bottom-1/3 right-1/3', delay: 2.4 },
    { size: 'w-6 h-6', position: 'top-1/2 left-1/6', delay: 3.2 },
    { size: 'w-3 h-3', position: 'bottom-1/6 right-1/6', delay: 4 }
  ];

  return (
    <div>
      <div>
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePosition({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
          }}
        >
          {/* Main Profile Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 transition-all duration-700 transform group-hover:scale-105">

            {/* Animated Background Rings */}
            <div className="absolute inset-0">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin-slow"></div>
              <div className="absolute inset-2 rounded-full border border-pink-500/20 animate-reverse-spin"></div>
              <div className="absolute inset-4 rounded-full border border-blue-500/10 animate-spin-slower"></div>
            </div>

            {/* Gradient Background with Morphing Effect */}
            <div className={`absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ${isHovered ? 'animate-morph' : 'animate-pulse'} opacity-80`}></div>

            {/* Glassmorphism Layer */}
            <div className="absolute inset-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"></div>

            {/* Profile Image with Advanced Effects */}
            <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-4 border-gray-800/50 shadow-2xl transform transition-all duration-500 group-hover:border-purple-400/50">
            <Image
                src="/profile.jpg" // Your Cloudinary image
                alt="Profile"
                width={384} // Matches lg:w-96 (96 * 4px = 384px)
                height={384} // Matches lg:h-96
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                priority // Optional: prioritize loading for hero image
              />

              {/* Interactive Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`
                }}
              ></div>
            </div>

            {/* Floating Skill Orbs */}
            {orbElements.map((orb, index) => (
              <div
                key={index}
                className={`absolute ${orb.size} ${orb.position} bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-float opacity-60 blur-sm`}
                style={{
                  animationDelay: `${orb.delay}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}

            {/* Interactive Light Trail */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 30%)`
              }}
            ></div>
          </div>

          {/* Enhanced Floating Skill Elements */}
          {floatingElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <div
                key={index}
                className={`absolute z-20 group-hover:scale-110 transition-all duration-500`}
                style={{
                  ...element.position,
                  transform: isHovered ? `translate(${Math.sin(Date.now() / 1000 + index) * 10}px, ${Math.cos(Date.now() / 1000 + index) * 10}px)` : 'none'
                }}
              >
                <div
                  className={`bg-gradient-to-br from-${element.color}-500/20 to-${element.color}-600/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 group animate-float-custom`}
                  style={{ animationDelay: `${element.delay}s` }}
                >
                  <IconComponent className={`w-8 h-8 text-${element.color}-400 transition-all duration-300 group-hover:scale-125`} />

                  {/* Tooltip */}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-900/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap`}>
                    {element.label}
                  </div>

                  {/* Pulsing Effect */}
                  <div className={`absolute inset-0 bg-${element.color}-500/20 rounded-2xl animate-ping opacity-75`}></div>
                </div>
              </div>
            );
          })}

          {/* Magical Particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle opacity-0"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}

          {/* Interactive Glow Effect */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${isHovered ? 'shadow-2xl shadow-purple-500/30' : 'shadow-lg shadow-purple-500/10'}`}
          ></div>
        </div>
      </div>

      {/* Custom CSS Styles */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 50%; }
          25% { border-radius: 40% 60% 70% 30%; }
          50% { border-radius: 60% 40% 30% 70%; }
          75% { border-radius: 30% 70% 60% 40%; }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-15px) rotate(180deg); 
            opacity: 1; 
          }
        }
        
        @keyframes float-custom {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          25% { 
            transform: translateY(-8px) scale(1.05); 
          }
          50% { 
            transform: translateY(-15px) scale(1.1); 
          }
          75% { 
            transform: translateY(-8px) scale(1.05); 
          }
        }
        
        @keyframes twinkle {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0.5); 
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2); 
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 10s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 20s linear infinite;
        }
        
        .animate-morph {
          animation: morph 6s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-float-custom {
          animation: float-custom 4s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
        
        /* Glassmorphism Enhancement */
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        /* Smooth Transitions */
        * {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Custom Shadow Effects */
        .shadow-2xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-purple-500\/30 {
          box-shadow: 0 25px 50px -12px rgba(139, 92, 246, 0.3);
        }
        
        .shadow-purple-500\/10 {
          box-shadow: 0 10px 25px -3px rgba(139, 92, 246, 0.1);
        }
        
        /* Hover Effects */
        .group:hover .group-hover\\:scale-125 {
          transform: scale(1.25);
        }
        
        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .animate-float-custom {
            animation-duration: 3s;
          }
        }
      `}</style>
    </div>
  );
};

export default EnhancedProfileSection;