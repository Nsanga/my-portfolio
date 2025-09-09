// context/LanguageContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
    nav: {
        home: string;
        projects: string;
        experience: string;
        contact: string;
        cv: string;
    };
    hero: {
        title: string;
        subtitle: string;
        description: string;
        ctaProjects: string;
        ctaContact: string;
    };
    projects: {
        title: string;
        subtitle: string;
        filterAll: string;
        filterWeb: string;
        filterMobile: string;
        filterDesign: string;
        viewProject: string;
    };
    experience: {
        title: string;
        subtitle: string;
        experienceTitle: string;
        educationTitle: string;
        present: string;
    };
    contact: {
        title: string;
        subtitle: string;
        name: string;
        email: string;
        message: string;
        send: string;
        sending: string;
        success: string;
        error: string;
    };
    stats: {
        title: string;
        subtitle: string;
        visitors: string;
        projects: string;
        satisfaction: string;
        reactions: string;
    };
}

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    translations: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translationsMap: Record<Language, Translations> = {
    fr: {
        nav: {
            home: 'Accueil',
            projects: 'Projets',
            experience: 'Expérience',
            contact: 'Contact',
            cv: 'Télécharger CV'
        },
        hero: {
            title: 'Développeur Web & Mobile Passionné',
            subtitle: 'Créatif & Innovant',
            description: 'Je conçois et développe des expériences utilisateur exceptionnelles avec un focus sur le design et les performances.',
            ctaProjects: 'Voir mes projets',
            ctaContact: 'Me contacter'
        },
        projects: {
            title: 'Mes Projets',
            subtitle: 'Une sélection de mes réalisations récentes',
            filterAll: 'Tous',
            filterWeb: 'Web',
            filterMobile: 'Mobile',
            filterDesign: 'Design',
            viewProject: 'Voir le projet'
        },
        experience: {
            title: 'Expérience & Formation',
            subtitle: 'Mon parcours professionnel et académique',
            experienceTitle: 'Expérience Professionnelle',
            educationTitle: 'Formation',
            present: 'Présent'
        },
        contact: {
            title: 'Contactez-moi',
            subtitle: 'Discutons de votre projet',
            name: 'Nom',
            email: 'Email',
            message: 'Message',
            send: 'Envoyer',
            sending: 'Envoi en cours...',
            success: 'Message envoyé avec succès!',
            error: 'Une erreur est survenue. Veuillez réessayer.'
        },
        stats: {
            title: 'En Chiffres',
            subtitle: 'Quelques statistiques sur mon travail et mon impact',
            visitors: 'Visiteurs',
            projects: 'Projets',
            satisfaction: 'Satisfaction',
            reactions: 'Réactions'
        },
    },
    en: {
        nav: {
            home: 'Home',
            projects: 'Projects',
            experience: 'Experience',
            contact: 'Contact',
            cv: 'Download CV'
        },
        hero: {
            title: 'Passionate Web & Mobile Developer',
            subtitle: 'Creative & Innovative',
            description: 'I design and develop exceptional user experiences with a focus on design and performance.',
            ctaProjects: 'View my projects',
            ctaContact: 'Contact me'
        },
        projects: {
            title: 'My Projects',
            subtitle: 'A selection of my recent work',
            filterAll: 'All',
            filterWeb: 'Web',
            filterMobile: 'Mobile',
            filterDesign: 'Design',
            viewProject: 'View project'
        },
        experience: {
            title: 'Experience & Education',
            subtitle: 'My professional and academic journey',
            experienceTitle: 'Work Experience',
            educationTitle: 'Education',
            present: 'Present'
        },
        contact: {
            title: 'Contact Me',
            subtitle: "Let's discuss your project",
            name: 'Name',
            email: 'Email',
            message: 'Message',
            send: 'Send',
            sending: 'Sending...',
            success: 'Message sent successfully!',
            error: 'An error occurred. Please try again.'
        },
        stats: {
            title: 'In Numbers',
            subtitle: 'Some statistics about my work and impact',
            visitors: 'Visitors',
            projects: 'Projects',
            satisfaction: 'Satisfaction',
            reactions: 'Reactions'
        },
    }
};

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>('fr');

    useEffect(() => {
        // Récupérer la langue préférée depuis localStorage ou navigator
        if (typeof window !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') as Language;
            const browserLanguage = navigator.language.split('-')[0];

            if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
                setLanguage(savedLanguage);
            } else if (browserLanguage === 'fr' || browserLanguage === 'en') {
                setLanguage(browserLanguage);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
        }
    }, [language]);

    const value = {
        language,
        setLanguage,
        translations: translationsMap[language]
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}