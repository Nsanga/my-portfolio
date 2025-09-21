import { useLanguage } from '@/app/context/LanguageContext';
import { motion } from 'framer-motion';
import { Code, Github, Linkedin, Mail, Palette } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
    const { translations } = useLanguage();

    const texts = [translations.hero.name, translations.hero.title]; // les deux textes à alterner
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        const currentText = texts[currentIndex];
        let typingSpeed = isDeleting ? 50 : 120;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentText.length) {
                setDisplayedText(prev => prev + currentText[charIndex]);
                setCharIndex(prev => prev + 1);
            } else if (isDeleting && charIndex > 0) {
                setDisplayedText(prev => prev.slice(0, -1));
                setCharIndex(prev => prev - 1);
            } else if (!isDeleting && charIndex === currentText.length) {
                // petite pause avant d'effacer
                setTimeout(() => setIsDeleting(true), 1000);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setCurrentIndex((prev) => (prev + 1) % texts.length);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentIndex, texts]);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                <motion.div
                    className="md:w-1/2 mb-10 md:mb-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        <span
                            dangerouslySetInnerHTML={{
                                __html: displayedText.replace(/\n/g, "<br />"),
                            }}
                        />
                        <span className="border-r-2 border-purple-400 animate-pulse ml-1"></span>
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-300 mb-6">
                        {translations.hero.subtitle}
                    </p>
                    <p className="text-lg mb-8 max-w-lg">
                        {translations.hero.description}
                    </p>
                    <div className="flex justify-start space-x-6 my-8">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Mail className="w-6 h-6" />
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#projects" className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                            {translations.hero.ctaProjects}
                        </a>
                        <a href="#contact" className="border border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1">
                            {translations.hero.ctaContact}
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="md:w-1/2 flex justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse opacity-70"></div>
                            <div className="absolute inset-4 border-4 border-white rounded-full animate-ping opacity-20"></div>
                            <img
                                src="/profile.jpg" // Remplacez par le chemin de votre image
                                alt="Profile"
                                className="relative z-10 w-full h-full object-cover rounded-full border-4 border-gray-800 shadow-xl"
                            />
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute top-0 md:-top-10 left-0 bg-purple-500/20 backdrop-blur-sm rounded-lg p-4 animate-bounce">
                            <Code className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="absolute -bottom-10 right-0 bg-pink-500/20 backdrop-blur-sm rounded-lg p-4 animate-pulse">
                            <Palette className="w-8 h-8 text-pink-400" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
