// components/Photo.tsx
'use client'
import Image from 'next/image'
import { motion } from "motion/react"

const Photo = () => {

const circleColors = ["#5B21B6"];

  const circleVariants = {
    initial: {
      strokeDasharray: "24 10 0 0",
      rotate: 0,
      opacity: 0,
    },
    animate: (index: number) => ({
      strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
      rotate: [120, 360],
      opacity: 1,
      transition: {
        strokeDasharray: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        },
        opacity: {
          duration: 0.4,
          delay: 2 + index * 0.4,
          ease: "easeIn",
        },
      },
    }),
  } as any;

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="w-62 h-62 md:w-100 md:h-100 mix-blend-lighten overflow-hidden rounded-full">
            <Image
              src="/images/hero.webp" width={400} height={400}
              alt="Arif's Profile Photo"
              quality={60}
              sizes="(max-width: 768px) 248px, 400px"
              className="object-contain w-full h-full"
              priority={true}
            />
          </div>
        </motion.div>
        <svg
          className="w-70 h-70 md:w-110 md:h-110"
          viewBox="0 0 506 506"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {circleColors.map((color, index) => (
            <motion.circle
              key={index}
              cx="253"
              cy="253"
              r={240 - index * 15}
              stroke={color}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={circleVariants}
              initial="initial"
              animate="animate"
              custom={index}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default Photo
