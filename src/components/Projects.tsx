// components/Projects.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';
import Image from 'next/image';

// Types pour les projets
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  category: string;
  year: number;
  link: string;
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { translations } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const years = ['all', '2023', '2022', '2021'];

  useEffect(() => {
    let result = projects;
    
    if (filter !== 'all') {
      result = result.filter(project => project.category === filter);
    }
    
    if (selectedYear !== 'all') {
      result = result.filter(project => project.year === parseInt(selectedYear));
    }
     
    setFilteredProjects(result);
  }, [filter, selectedYear, projects]);

  return (
    <section id="projects" className="py-20 px-4 bg-gray-800">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{translations.projects.subtitle}</p>
        </motion.div>

        {/* Filtres */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilter('all')}
          >
            {translations.projects.filterAll}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${filter === 'web' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilter('web')}
          >
            {translations.projects.filterWeb}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${filter === 'mobile' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilter('mobile')}
          >
            {translations.projects.filterMobile}
          </button>
          <button 
            className={`px-4 py-2 rounded-lg transition-all ${filter === 'design' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            onClick={() => setFilter('design')}
          >
            {translations.projects.filterDesign}
          </button>
          
          {/* Filtre par année */}
          <select 
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year === 'all' ? 'Toutes les années' : year}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Liste des projets */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map(stack => (
                      <span key={stack} className="px-2 py-1 bg-gray-800 text-sm rounded-md">
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{project.year}</span>
                    <a 
                      href={project.link} 
                      className="text-purple-400 hover:text-purple-300 flex items-center"
                    >
                      {translations.projects.viewProject}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 text-lg">Aucun projet trouvé avec ces filtres.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}