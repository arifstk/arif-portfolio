// components/Skills.tsx

import { skillCategories } from '@/Constant/Constant';
import React from 'react';
export default function Skills() {
  return (
    <section id="skills" className="py-10 mt-6 md:mt-15 text-gray-800 dark:text-gray-200">

      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-2">
          My Technical Arsenal
        </p>
        <h2 className="text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#007bff] after:rounded-full">
          Skills & Abilities
        </h2>
      </div>

      {/* Main Categories Layout */}
      <div className="space-y-12">
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="space-y-6">

            {/* Category Title */}
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 flex items-center gap-3 after:content-[''] after:h-px after:bg-gray-400 after:flex-1">
              {category.title}
            </h3>

            {/* Skills Badges/Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {category.skills.map((skill, skillIndex) => {
                // Instantiating the dynamic icon component assigned from constants
                const IconComponent = skill.icon;

                return (
                  <div
                    key={skillIndex}
                    className="group flex flex-col items-center justify-center p-5 bg-[#f8fafc] dark:bg-gray-900 dark:border-gray-700 rounded-xl border border-black/10 transition-all duration-300 hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,123,255,0.06)] hover:border-[#007bff]/20"
                  >
                    {/* Icon Wrapper with Hover Animation */}
                    <div className="p-3 bg-white dark:bg-gray-700 dark:border-gray-400 rounded-lg text-[#64748b] dark:text-gray-300 transition-all duration-300 group-hover:text-[#007bff] group-hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:shadow-[0_4px_12px_rgba(0,123,255,0.1)] mb-3">
                      {IconComponent && <IconComponent className="w-6 h-6 stroke-[1.75]" />}
                    </div>

                    {/* Skill Name */}
                    <span className="text-sm font-medium text-[#1e293b] dark:text-gray-300 transition-colors duration-300 group-hover:text-[#007bff] text-center">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}

