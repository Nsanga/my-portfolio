"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLanguage } from '../context/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Statistics from '@/components/Statistics';
import CustomLoadingScreen from '@/components/CustomLoadingScreen';

export default function PortfolioHome() {
    const { language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div>
                <CustomLoadingScreen />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
            <Head>
                <title>{language === 'fr' ? 'Portfolio Développeur Web & Design' : 'Web & Mobile Developer Portfolio'}</title>
                <meta name="description" content={language === 'fr' ? 'Portfolio de développement web, mobile et design' : 'Web, mobile development and design portfolio'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <Hero />
            <Statistics />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </div>
    );
}