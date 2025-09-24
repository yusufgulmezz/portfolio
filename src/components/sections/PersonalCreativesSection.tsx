'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type TabKey = 'photos' | 'drawings' | 'blog';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'photos', label: 'Photos' },
  { key: 'drawings', label: 'Drawings' },
  { key: 'blog', label: 'Blog Posts' }
];

const PersonalCreativesSection = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('photos');

  const contentByTab: Record<TabKey, { title: string; description: string }[]> = {
    photos: [
      { title: 'City Lights', description: 'Night shot, street photography.' },
      { title: 'Morning Hike', description: 'Forest scenery in morning fog.' },
      { title: 'Minimal Shadow', description: 'Composition with light and shadow.' }
    ],
    drawings: [
      { title: 'Portrait Study', description: 'Quick sketch with pencil.' },
      { title: 'Space Perspective', description: 'Two-point perspective practice.' },
      { title: 'Figure Studies', description: 'Selections from short poses.' }
    ],
    blog: [
      { title: 'Workflow Notes', description: 'Design → prototype → development pipeline.' },
      { title: 'Color & Typography', description: 'Daily picks and references.' },
      { title: 'Toolbox', description: 'Tools I use and quick remarks.' }
    ]
  };

  const items = contentByTab[activeTab];

  return (
    <section id="personal-creatives" className="pt-4 pb-20 bg-[#edede9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-left mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            PERSONAL WORKS
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Beyond professional projects, I share photos, drawings, and short notes.
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="group rounded-2xl bg-white/70 backdrop-blur-sm border border-gray-200/80 shadow-[0_6px_24px_rgba(0,0,0,0.06)] p-5 hover:shadow-[0_10px_32px_rgba(0,0,0,0.08)] transition-shadow"
            >
              <div className="aspect-[4/3] w-full rounded-xl bg-gray-100 mb-4 overflow-hidden" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalCreativesSection;


