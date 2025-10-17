'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const CreativeProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const processSteps = [
    {
      id: 1,
      title: "Research & Discovery",
      description: "Understanding the problem, target audience, and project requirements through thorough research and analysis.",
      icon: "🔍",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Ideation & Concept",
      description: "Brainstorming creative solutions, sketching initial ideas, and developing the core concept.",
      icon: "💡",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Design & Development",
      description: "Bringing ideas to life through detailed design work, prototyping, and iterative development.",
      icon: "🎨",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: "Refinement & Polish",
      description: "Perfecting details, testing functionality, and ensuring the final product meets all requirements.",
      icon: "✨",
      color: "from-orange-500 to-red-500"
    }
  ];

  const workTypes = [
    {
      type: "Professional Work",
      description: "Client-focused projects with specific requirements, deadlines, and business objectives.",
      characteristics: ["Structured process", "Client feedback", "Business goals", "Timeline driven"],
      color: "bg-blue-50 border-blue-200"
    },
    {
      type: "Personal Projects",
      description: "Creative exploration, skill development, and personal expression through design.",
      characteristics: ["Creative freedom", "Self-directed", "Skill building", "Passion driven"],
      color: "bg-purple-50 border-purple-200"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            CREATIVE PROCESS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From professional projects to personal explorations, every creative journey follows a structured yet flexible process.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-800 mb-12 text-center"
          >
            My Design Process
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-transparent z-0" />
                )}
                
                <div className="relative z-10 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-2xl mb-4 mx-auto`}>
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 text-center">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Types Comparison */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-800 mb-12 text-center"
          >
            Professional vs Personal Work
          </motion.h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {workTypes.map((work, index) => (
              <motion.div
                key={work.type}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`rounded-2xl p-8 border-2 ${work.color} hover:shadow-lg transition-shadow duration-300`}
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  {work.type}
                </h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {work.description}
                </p>
                <div className="space-y-2">
                  {work.characteristics.map((characteristic, charIndex) => (
                    <div key={charIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3" />
                      <span className="text-sm text-gray-700">{characteristic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Transition Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-2xl lg:text-3xl font-light text-gray-700 italic leading-relaxed max-w-4xl mx-auto">
            "The best designs come from the intersection of professional discipline and personal passion."
          </blockquote>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeProcessSection;

