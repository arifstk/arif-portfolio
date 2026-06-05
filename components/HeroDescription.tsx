// components/HeroDescription.tsx

"use client";
import { useTypewriter } from "@/hooks/user-type-writer";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const HomeDescription = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const description =
    " As a Software & Web App Developer, I design and build innovative software solutions, solve complex problems, and ensure systems are scalable and user-friendly. From creating web apps to optimizing backend systems, I bridge the gap between technology and user needs.";
  const { displayedText, isComplete } = useTypewriter(description, 30);

  useEffect(() => {
    setHasLoaded(true);
  }, []);
  return (
    <motion.p
      className="w-auto font-normal leading-7 mb-6 min-h-30"
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
              color: isComplete ? "text-gray-500" : "text-gray-900 dark:text-white/70",
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