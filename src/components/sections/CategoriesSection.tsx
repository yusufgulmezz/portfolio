'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const CategoriesSection = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const categories = [
    {
      id: 'poster',
      name: 'Poster Designs',
      description: 'Creative and impressive poster designs',
      number: '01',
      color: 'from-red-500 to-pink-500',
      count: 12,
      hoverEffect: 'poster'
    },
    {
      id: 'pixel-art',
      name: 'Pixel Art',
      description: 'Retro-style pixel art works',
      number: '02',
      color: 'from-green-500 to-teal-500',
      count: 8,
      hoverEffect: 'pixel'
    },
    {
      id: '3d',
      name: '3D Works',
      description: 'Modern 3D modeling and rendering projects',
      number: '03',
      color: 'from-blue-500 to-indigo-500',
      count: 15,
      hoverEffect: 'cube'
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Designs',
      description: 'User experience focused interface designs',
      number: '04',
      color: 'from-purple-500 to-pink-500',
      count: 20,
      hoverEffect: 'ui'
    },
    {
      id: 'coding',
      name: 'Coding Projects',
      description: 'Web and mobile application development projects',
      number: '05',
      color: 'from-orange-500 to-red-500',
      count: 25,
      hoverEffect: 'code'
    }
  ];

  // Unique hover effect components inspired by Framer Motion
  const PixelEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Pixel grid pattern */}
      {[...Array(8)].map((_, row) => 
        [...Array(12)].map((_, col) => (
          <motion.div
            key={`${row}-${col}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.7, 1, 0], 
              scale: [0, 1.2, 0.8, 1, 0],
            }}
            transition={{ 
              duration: 2.5, 
              delay: (row * 0.1) + (col * 0.05),
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="absolute w-3 h-3"
            style={{
              left: col * 25 + 10,
              top: row * 20 + 20,
              backgroundColor: ['#00ff88', '#ff0080', '#00d4ff', '#ffaa00', '#ff3366'][(row + col) % 5]
            }}
          />
        ))
      )}
    </div>
  );

  const PosterEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Typography waves */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50, rotate: -10 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [50, -20, 50],
            rotate: [-10, 5, -10],
            scale: [0.8, 1.1, 0.8]
          }}
          transition={{ 
            duration: 3, 
            delay: i * 0.3,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute text-6xl font-black opacity-20"
          style={{
            left: i * 80 + 20,
            top: 30,
            color: ['#ff4757', '#ff6b6b', '#ffa502', '#ff6348', '#ff7675', '#ff9ff3'][i]
          }}
        >
          {['A', 'B', 'C', 'D', 'E', 'F'][i]}
        </motion.div>
      ))}
    </div>
  );

  const CubeEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating 3D cubes with perspective */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateX: 0, rotateY: 0, z: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            rotateX: [0, 360, 720],
            rotateY: [0, 180, 360],
            z: [0, 100, 0],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{ 
            duration: 4, 
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute w-8 h-8"
          style={{
            left: i * 60 + 50,
            top: 40,
            backgroundColor: ['#3742fa', '#2f3542', '#5352ed', '#2ed573', '#1e90ff'][i],
            transformStyle: 'preserve-3d',
            boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.3), inset 5px 5px 10px rgba(255,255,255,0.3)'
          }}
        />
      ))}
    </div>
  );

  const UIEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* UI elements morphing */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, borderRadius: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            borderRadius: ['0%', '50%', '0%'],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2.8, 
            delay: i * 0.4,
            repeat: Infinity,
            repeatDelay: 1.5
          }}
          className="absolute"
          style={{
            left: i * 80 + 30,
            top: 50,
            width: 40,
            height: 40,
            backgroundColor: ['#a55eea', '#26de81', '#fd79a8', '#fdcb6e'][i],
            boxShadow: '0 0 20px rgba(0,0,0,0.3)'
          }}
        />
      ))}
      {/* Connecting lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ 
            duration: 1.5, 
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute h-1 bg-gradient-to-r from-purple-400 to-pink-400"
          style={{
            left: 50,
            top: 70 + i * 10,
            width: 200,
            transformOrigin: 'left'
          }}
        />
      ))}
    </div>
  );

  const CodeEffect = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Matrix-style code rain */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [-50, 150, 150],
          }}
          transition={{ 
            duration: 2, 
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 0.5
          }}
          className="absolute text-sm font-mono"
          style={{
            left: i * 35 + 20,
            top: 0,
            color: ['#00ff41', '#00d4ff', '#ff0080', '#ffaa00', '#ff3366', '#00ff88', '#ff6b6b', '#4ecdc4'][i]
          }}
        >
          {['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for'][i]}
        </motion.div>
      ))}
      {/* Syntax highlighting dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1, 0],
          }}
          transition={{ 
            duration: 0.8, 
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: Math.random() * 300 + 20,
            top: Math.random() * 100 + 30,
            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]
          }}
        />
      ))}
    </div>
  );

  const renderHoverEffect = (effect: string) => {
    switch (effect) {
      case 'pixel': return <PixelEffect />;
      case 'poster': return <PosterEffect />;
      case 'cube': return <CubeEffect />;
      case 'ui': return <UIEffect />;
      case 'code': return <CodeEffect />;
      default: return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My Work Areas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating creative projects in different design and development areas. 
            Each category reflects my unique approach.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link href={`/projects?category=${category.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-gray-200 relative overflow-hidden">
                  {/* Hover Effect */}
                  {hoveredCategory === category.id && renderHoverEffect(category.hoverEffect)}
                  
                  <div className="flex items-center gap-6 relative z-10">
                    {/* Number - standalone */}
                    <span className="text-4xl font-bold text-gray-300 group-hover:text-gray-400 transition-colors duration-300 flex-shrink-0">
                      {category.number}
                    </span>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      
                      {/* Project Count */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {category.count} projects
                        </span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="text-blue-600 font-semibold"
                        >
                          View →
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Projects
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
