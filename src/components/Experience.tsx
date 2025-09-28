// components/Experience.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

// Types pour les expériences et formations
interface ExperienceItem {
  id: number;
  type: 'experience' | 'education';
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
}

interface ExperiencesProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperiencesProps) {
  const { translations } = useLanguage();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');
  const [items, setItems] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const filtered = experiences.filter(item => item.type === activeTab);
    setItems(filtered);
  }, [activeTab, experiences]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return translations.experience.present;
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' });
  };

  return (
    <section id="experience" className="py-20 px-4 bg-gray-900">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.experience.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{translations.experience.subtitle}</p>
        </motion.div>

        {/* Onglets */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 rounded-lg p-1 flex">
            <button 
              className={`px-6 py-2 rounded-md transition-all ${activeTab === 'experience' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('experience')}
            >
              {translations.experience.experienceTitle}
            </button>
            <button 
              className={`px-6 py-2 rounded-md transition-all ${activeTab === 'education' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveTab('education')}
            >
              {translations.experience.educationTitle}
            </button>
          </div>
        </motion.div>

        {/* Liste des expériences/formations */}
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-7 h-full border-l-2 border-purple-500 border-dashed"></div>
            
            {/* Éléments de la timeline */}
            <div className="space-y-12">
              {items.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Point sur la timeline */}
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-purple-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  {/* Contenu */}
                  <div className="ml-6 flex-1">
                    <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{item.title}</h3>
                          <p className="text-purple-300">{item.company} • {item.location}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-sm text-gray-400 capitalize">
                          {formatDate(item.startDate)} - {formatDate(item.endDate)}
                        </div>
                      </div>
                      <p className="text-gray-400 mb-4">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-gray-700 text-sm rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}