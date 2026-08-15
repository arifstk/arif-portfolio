// components/HeroDescription.tsx

"use client";

const HeroDescription = ({ isMobile = false }: { isMobile?: boolean }) => {
  const description = 
    "Full-stack web developer with a strong focus on modern JavaScript ecosystems. I specialize in building fast, SEO-friendly, and fully responsive web applications using Next.js, React, TypeScript, Tailwind CSS, MongoDB & Mongoose.";

  return (
    <p className="w-auto md:font-semibold md:text-lg md:tracking-wide leading-7 mb-6 min-h-30 text-white/80 md:text-gray-600 dark:text-white/80 md:dark:text-white/60">
      {description}
    </p>
  );
};

export default HeroDescription;
