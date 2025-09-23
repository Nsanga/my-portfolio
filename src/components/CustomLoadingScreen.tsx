"use client";
import React, { useState, useEffect } from 'react';
import { Code, Palette, Smartphone } from 'lucide-react';
import Image from 'next/image';

const CustomLoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const loadingSteps = [
        { label: 'Initialisation...', icon: Code, color: 'text-purple-400' },
        { label: 'Chargement des projets...', icon: Smartphone, color: 'text-pink-400' },
        { label: 'Préparation du design...', icon: Palette, color: 'text-blue-400' },
        { label: 'Finalisation...', icon: Code, color: 'text-green-400' }
    ];

    useEffect(() => {
        // Only run on the client to avoid hydration mismatch
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setIsLoading(false);
                    clearInterval(interval);
                    return 100;
                }

                // Use a deterministic increment instead of Math.random()
                const newProgress = prev + 5; // Adjust increment for smoother progress
                const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
                setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));

                return Math.min(newProgress, 100);
            });
        }, 200);

        return () => clearInterval(interval);
    }, [loadingSteps.length]);

    if (!isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 animate-gradient">
                <div className="flex items-center justify-center h-screen text-white">
                    <h1 className="text-4xl font-bold">Portfolio chargé ! 🎉</h1>
                </div>
            </div>
        );
    }

    const currentIcon = loadingSteps[currentStep].icon;
    const IconComponent = currentIcon;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden animate-gradient">
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Animated Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-white/10 rounded-full animate-float"
                        style={{
                            left: `${i * 5}%`,
                            top: `${(i * 7) % 100}%`,
                            animationDelay: `${i * 0.25}s`,
                            animationDuration: `${3 + (i % 4)}s`
                        }}
                    ></div>
                ))}

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b5cf6' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                ></div>
            </div>

            {/* Main Loading Content */}
            <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md mx-auto px-6">
                {/* Logo/Brand */}
                <div className="text-center mb-4">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-1 mb-4">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                            <Image
                                src="/profile.jpg"
                                alt="Profile"
                                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-xl"
                            />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Mercure Mekinda</h1>
                    <p className="text-gray-400">Portfolio Developer</p>
                </div>

                {/* Animated Icon */}
                <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
                        <IconComponent
                            className={`w-12 h-12 ${loadingSteps[currentStep].color} animate-pulse`}
                        />
                    </div>

                    {/* Rotating Ring */}
                    <div className="absolute inset-0">
                        <svg className="w-24 h-24 animate-spin" style={{ animationDuration: '2s' }}>
                            <circle
                                cx="48"
                                cy="48"
                                r="44"
                                stroke="url(#gradient)"
                                strokeWidth="2"
                                fill="transparent"
                                strokeDasharray="100 200"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="100%" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Progress Information */}
                <div className="w-full text-center space-y-4">
                    <div className="text-lg font-medium text-white">
                        {loadingSteps[currentStep].label}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">
                            {Math.round(progress)}%
                        </span>
                        <span className="text-gray-500">
                            Étape {currentStep + 1}/{loadingSteps.length}
                        </span>
                    </div>
                </div>

                {/* Loading Steps Indicators */}
                <div className="flex space-x-3">
                    {loadingSteps.map((step, index) => {
                        const StepIcon = step.icon;
                        return (
                            <div
                                key={index}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentStep
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25'
                                        : 'bg-slate-800 border border-gray-700'
                                    }`}
                            >
                                <StepIcon
                                    className={`w-5 h-5 ${index <= currentStep ? 'text-white' : 'text-gray-500'
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Fun Loading Messages */}
                <div className="text-center space-y-2 opacity-60">
                    <p className="text-gray-400 text-sm">
                        ☕ En train de préparer quelque chose d&apos;incroyable...
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <span>🚀</span>
                        <span>Optimisation en cours</span>
                        <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 15s ease infinite;
                }

                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg); 
                        opacity: 0.7;
                    }
                    50% { 
                        transform: translateY(-20px) rotate(180deg); 
                        opacity: 1;
                    }
                }
        
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
        
                .animate-float {
                    animation: float linear infinite;
                }
        
                .animate-shimmer {
                    animation: shimmer 1.5s infinite;
                }
        
                /* Smooth transitions */
                * {
                    transition: all 0.3s ease;
                }
        
                /* Glow effect */
                .shadow-lg {
                    box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }
        
                .shadow-purple-500\/25 {
                    box-shadow: 0 10px 25px -3px rgba(139, 92, 246, 0.25), 0 4px 6px -2px rgba(139, 92, 246, 0.1);
                }
            `}</style>
        </div>
    );
};

export default CustomLoadingScreen;