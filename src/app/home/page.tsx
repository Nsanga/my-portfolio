"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
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
    const [projects, setProjects] = useState([]);
    const [experiences, setExperiences] = useState([]);
    // const [skills, setSkills] = useState([]);
    // const [educations, setEducations] = useState([]);
    const [statistics, setStatistics] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all data in parallel
                const [
                    statisticsRes, 
                    projectsRes, 
                    experiencesRes, 
                    // skillsRes, 
                    // educationsRes
                ] = await Promise.all([
                    axios.get('/api/statistics'),
                    axios.get('/api/projects'),
                    axios.get('/api/experiences'),
                    // axios.get('/api/portfolio?model=education'),
                    // axios.get('/api/portfolio?model=statistic'),
                ]);

                setProjects(projectsRes.data);
                setExperiences(experiencesRes.data);
                setStatistics(statisticsRes.data);
            } catch (err) {
                setError('Failed to load portfolio data');
                console.error(err);
            } finally {
                // Simulate loading delay for UX
                const timer = setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                return () => clearTimeout(timer);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div>
                <CustomLoadingScreen />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-400">Error</h1>
                    <p className="text-lg mt-4">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white animate-gradient">
            <Head>
                <title>{language === 'fr' ? 'Portfolio Développeur Web & Design' : 'Web & Mobile Developer Portfolio'}</title>
                <meta name="description" content={language === 'fr' ? 'Portfolio de développement web, mobile et design' : 'Web, mobile development and design portfolio'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <style jsx global>{`
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
            `}</style>

            <Header />
            <Hero />
            <Statistics statistics={statistics} />
            <Projects projects={projects} />
            <Experience experiences={experiences} />
            <Contact />
            <Footer />
        </div>
    );
}