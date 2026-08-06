// components/HeroDescription.tsx

"use client";
import { useTypewriter } from "@/hooks/user-type-writer";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const HomeDescription = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const description =
    " Full-stack web developer with a strong focus on modern JavaScript ecosystems. I specialize in building fast, SEO-friendly, and fully responsive web applications using Next.js, React, TypeScript, Tailwind CSS, MongoDB & Mongoose.";
  const { displayedText, isComplete } = useTypewriter(description, 30);

  useEffect(() => {
    setHasLoaded(true);
  }, []);
  return (
    <motion.p
      className="w-auto md:font-normal leading-7 mb-6 min-h-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {hasLoaded ? (
        displayedText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ color: "rgb(156 163 175)" }}
            animate={{
              color: isComplete ? "rgb(107 114 128)" : "rgb(17, 24, 39) dark:rgb(255 255 255 / 0.7)",
            }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
          >
            {char}
          </motion.span>
        ))
      ) : (
        <span className="text-gray-800 dark:text-white/60">{description}</span>
      )}
    </motion.p>
  );
};

export default HomeDescription;
