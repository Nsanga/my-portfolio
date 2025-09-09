// components/MercureMekinda.tsx
import { motion } from 'framer-motion';

export default function MercureMekinda() {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <svg width="180" height="40" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Logo MercureMekinda avec dégradé */}
        <g>
          {/* Lettre M stylisée */}
          <path d="M10 30L15 10L20 25L25 10L30 30" stroke="url(#pinkPurpleGradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          
          {/* Symbole Mercure (caducée) */}
          <path d="M40 15C40 12.5 42 10 45 10C48 10 50 12.5 50 15C50 20 45 22 45 25C45 25.5 45.5 26 46 26C46.5 26 47 25.5 47 25C47 23.5 49 22.5 50 20" stroke="url(#pinkPurpleGradient)" strokeWidth="2" strokeLinecap="round" />
          <path d="M40 20C40 17.5 42 15 45 15C48 15 50 17.5 50 20" stroke="url(#pinkPurpleGradient)" strokeWidth="2" strokeLinecap="round" visibility="hidden" />
          <path d="M43 10L43 30" stroke="url(#pinkPurpleGradient)" strokeWidth="2" strokeLinecap="round" />
          <path d="M47 10L47 30" stroke="url(#pinkPurpleGradient)" strokeWidth="2" strokeLinecap="round" />
          
          {/* Texte Mekinda */}
          <g fill="url(#pinkPurpleGradient)">
            <path d="M60 15H65V20H60V15Z" />
            <path d="M70 15H75V20H70V15Z" />
            <path d="M80 15H85V20H80V15Z" />
            <path d="M90 15H95V20H90V15Z" />
            <path d="M100 15H105V20H100V15Z" />
            <path d="M110 15H115V20H110V15Z" />
            
            {/* Lettre M */}
            <path d="M60 25V30H65V25H60Z" />
            <path d="M65 25V30H70V25H65Z" />
            
            {/* Lettre E */}
            <path d="M75 25H80V30H75V25Z" />
            <path d="M75 25H80V26H75V25Z" />
            <path d="M75 28H79V29H75V28Z" />
            
            {/* Lettre K */}
            <path d="M85 25V30H90V25H85Z" />
            <path d="M90 25L95 30" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
            <path d="M90 28L94 25" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
            
            {/* Lettre I */}
            <path d="M100 25H105V30H100V25Z" />
            
            {/* Lettre N */}
            <path d="M110 25V30H115V25H110Z" />
            <path d="M110 25L115 30" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
            <path d="M115 25V30" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
            
            {/* Lettre D */}
            <path d="M120 25H125V30H120V25Z" />
            <path d="M125 26C126.5 26 128 27 128 28C128 29 126.5 30 125 30" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" fill="none" />
            
            {/* Lettre A */}
            <path d="M135 25V30H140V25H135Z" />
            <path d="M135 25L140 30" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
            <path d="M135 28H140" stroke="url(#pinkPurpleGradient)" strokeWidth="1.5" />
          </g>
        </g>
        
        {/* Définition du dégradé */}
        <defs>
          <linearGradient id="pinkPurpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}