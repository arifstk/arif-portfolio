// components/Skills.tsx

import { skillCategories } from '@/Constant/Constant';
import React from 'react';
export default function Skills() {
  return (
    <section id="skills" className="w-[92%] xl:w-[80%] mx-auto pt-15 pb-13 md:pt-25 text-gray-800 dark:text-gray-200">

      {/* Section Header */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b] mb-2">
          My Technical Arsenal
        </p>
        <h2 className="text-3xl md:text-4xl font-bold relative inline-block pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-violet-700 after:rounded-full tracking-wider">
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 sm:gap-8">
              {category.skills.map((skill, skillIndex) => {
                // Instantiating the dynamic icon component assigned from constants
                const IconComponent = skill.icon;

                return (
                  <div
                    key={skillIndex}
                    className="group flex flex-col items-center justify-center p-2.5 sm:p-5 bg-linear-to-br from-violet-100 via-purple-50 to-indigo-50 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900  dark:border-gray-700 rounded-xl border border-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,123,255,0.06)] hover:border-[#007bff]/20"
                  >
                    {/* Icon Wrapper with Hover Animation */}
                    <div className="p-1.5 sm:p-3 bg-white dark:bg-gray-700 dark:border-gray-400 rounded-lg text-violet-700 transition-all duration-300 group-hover:text-[#2b7473] group-hover:scale-110 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group-hover:shadow-[0_4px_12px_rgba(0,123,255,0.1)] mb-3">
                      {IconComponent && <IconComponent className="w-6 h-6 stroke-[1.75]" />}
                    </div>

                    {/* Skill Name */}
                    <span className="text-xs sm:text-sm font-medium text-[#1e293b] dark:text-gray-300 transition-colors duration-300 group-hover:text-[#2b7473] text-center">
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

