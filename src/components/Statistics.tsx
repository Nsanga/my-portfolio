// components/Statistics.tsx
"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface StatItem {
  id: number;
  value: number;
  suffix?: string;
  label: string;
}

interface StatsProps {
  statistics: StatItem[];
}

const Statistics = ({ statistics }: StatsProps) => {
  const { translations } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  return (
    <section className="py-20 px-4 bg-gray-900 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-pink-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {translations.stats?.title || 'En Chiffres'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {translations.stats?.subtitle || 'Quelques statistiques sur mon travail et mon impact'}
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={stat.id}
              className="text-center p-6 bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    shouldAnimate={inView && !hasAnimated}
                  />
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-4 group-hover:w-20 transition-all duration-300"></div>
                <p className="text-gray-400 text-lg">
                  {
                    stat.label === "Visiteurs" ?
                      translations.stats?.visitors :
                      stat.label === "Projets" ?
                        translations.stats?.projects :
                        stat.label === "Satisfaction" ?
                          translations.stats?.satisfaction :
                          translations.stats?.reactions
                  }</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Composant pour l'animation du compteur
const AnimatedCounter = ({ value, suffix = '', shouldAnimate }: { value: number, suffix?: string, shouldAnimate: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldAnimate) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 frames
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setCount(value);
    }
  }, [value, shouldAnimate]);

  return (
    <span>
      {count}{count > 5 ? suffix : ""}
    </span>
  );
};

export default Statistics;