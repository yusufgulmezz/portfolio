'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CategoriesSection = () => {

  const categories = [
    {
      id: 'poster',
      name: 'Poster Designs',
      description: 'Creative and impressive poster designs',
      number: '01',
      color: 'from-red-500 to-pink-500',
      count: 12
    },
    {
      id: 'pixel-art',
      name: 'Pixel Art',
      description: 'Retro-style pixel art works',
      number: '02',
      color: 'from-green-500 to-teal-500',
      count: 8
    },
    {
      id: '3d',
      name: '3D Works',
      description: 'Modern 3D modeling and rendering projects',
      number: '03',
      color: 'from-blue-500 to-indigo-500',
      count: 15
    },
    {
      id: 'ui-ux',
      name: 'UI/UX Designs',
      description: 'User experience focused interface designs',
      number: '04',
      color: 'from-purple-500 to-pink-500',
      count: 20
    },
    {
      id: 'coding',
      name: 'Coding Projects',
      description: 'Web and mobile application development projects',
      number: '05',
      color: 'from-orange-500 to-red-500',
      count: 25
    }
  ];



  return (
    <section id="categories" className="py-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-left mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            My Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more
          </p>
        </motion.div>

        {/* Categories Sections */}
        <div className="space-y-16">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Category Header */}
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Pixel Art, Poster Designs, UI/UX Design, 3D Design,.. and more
                </p>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

              {/* Category Content */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100 relative overflow-hidden">
                <div className="relative z-10">
                  {/* Sample Work Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                        className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-300"
                      >
                        {/* Image Placeholder */}
                        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-gray-500 text-sm">Work Preview</div>
                        </div>
                        
                        {/* Content */}
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {category.name} Project {itemIndex + 1}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        
                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap">
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                            {category.name}
                          </span>
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                            Design
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* View More Button */}
                  <div className="mt-8 text-center">
                    <Link href={`/projects?category=${category.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      >
                        View All {category.name} ({category.count} projects)
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to work together?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let&apos;s create something amazing together. Get in touch to discuss your project.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Get In Touch
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
