// // components/statistics.tsx
// 'use client'
// import { statsData } from '@/Constant/Constant'
// import React from 'react'
// import CountUp from 'react-countup'

// const Statistics = () => {
//   return (
//     <div className="flex flex-wrap justify-center gap-4">
//       {statsData.map((item, index) => (
//         <div
//           key={index}
//           className=" flex flex-col items-center group rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-lg px-6 py-5 text-center shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500/30"
//         >
//           <div className="flex items-center gap-1">
//             <CountUp
//               end={item?.num}
//               duration={2}
//               delay={0.5}
//               className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
//             />

//             <span
//               className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
//             > + </span>
//           </div>

//           <p className="max-w-25 mt-1 text-sm md:text-base text-gray-600 dark:text-white/60">
//             {item.text}
//           </p>

//           <div className="mt-1 h-1 w-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500 mx-auto opacity-70 group-hover:w-20 transition-all duration-300" />
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Statistics
