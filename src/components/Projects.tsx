// components/Projects.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/app/context/LanguageContext';

// Types pour les projets
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  year: number;
  link: string;
}

// Données simulées (à remplacer par un appel à votre base de données)
const projectsData: Project[] = [
  {
    id: 1,
    title: "Application E-commerce",
    description: "Plateforme e-commerce complète avec panier, paiement et administration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    category: "web",
    year: 2023,
    link: "#"
  },
  {
    id: 2,
    title: "App Mobile Fitness",
    description: "Application de suivi d'activité physique avec statistiques personnalisées.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop",
    tags: ["React Native", "Firebase", "Redux"],
    category: "mobile",
    year: 2023,
    link: "#"
  },
  {
    id: 3,
    title: "Design System",
    description: "Système de design complet avec composants et guidelines.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    tags: ["Figma", "UI/UX", "Design"],
    category: "design",
    year: 2022,
    link: "#"
  },
  {
    id: 4,
    title: "Plateforme SaaS",
    description: "Solution SaaS de gestion de projet avec équipes en temps réel.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "WebSockets"],
    category: "web",
    year: 2022,
    link: "#"
  },
  {
    id: 5,
    title: "Identité Visuelle",
    description: "Refonte complète de l'identité visuelle pour une startup tech.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
    tags: ["Logo", "Branding", "Illustration"],
    category: "design",
    year: 2021,
    link: "#"
  }
];

export default function Projects() {
  const { translations } = useLanguage();
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projectsData);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const years = ['all', '2023', '2022', '2021'];

  useEffect(() => {
    let result = projectsData;
    
    if (filter !== 'all') {
      result = result.filter(project => project.category === filter);
    }
    
    if (selectedYear !== 'all') {
      result = result.filter(project => project.year === parseInt(selectedYear));
    }
    
    setFilteredProjects(result);
  }, [filter, selectedYear]);

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
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-800 text-sm rounded-md">
                        {tag}
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