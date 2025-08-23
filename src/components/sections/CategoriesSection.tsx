'use client';

import { motion } from 'framer-motion';
import { Palette, Code, Box, Smartphone, Image } from 'lucide-react';
import Link from 'next/link';

const CategoriesSection = () => {
  const categories = [
    {
      id: 'poster',
      name: 'Poster Tasarımları',
      description: 'Yaratıcı ve etkileyici poster tasarımları',
      icon: Palette,
      color: 'from-red-500 to-pink-500',
      count: 12
    },
    {
      id: 'pixel-art',
      name: 'Pixel Art',
      description: 'Retro tarzda pixel art çalışmaları',
      icon: Image,
      color: 'from-green-500 to-teal-500',
      count: 8
    },
    {
      id: '3d',
      name: '3D Çalışmalar',
      description: 'Modern 3D modelleme ve render projeleri',
      icon: Box,
      color: 'from-blue-500 to-indigo-500',
      count: 15
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Tasarımları',
      description: 'Kullanıcı deneyimi odaklı arayüz tasarımları',
      icon: Smartphone,
      color: 'from-purple-500 to-pink-500',
      count: 20
    },
    {
      id: 'coding',
      name: 'Kodlama Projeleri',
      description: 'Web ve mobil uygulama geliştirme projeleri',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      count: 25
    }
  ];

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
    <section className="py-20 bg-white">
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
            Çalışma Alanlarım
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Farklı tasarım ve geliştirme alanlarında yaratıcı projeler üretiyorum. 
            Her kategori kendi benzersiz yaklaşımımı yansıtıyor.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/projects?category=${category.id}`}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group-hover:border-gray-200">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon size={32} className="text-white" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Project Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {category.count} proje
                    </span>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="text-blue-600 font-semibold"
                    >
                      Görüntüle →
                    </motion.div>
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
              Tüm Projeleri Görüntüle
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
