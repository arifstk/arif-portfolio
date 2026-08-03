import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import HireButtonModel from "@/models/HireButton";

async function getHireButtonData() {
  try {
    await connectDB();
    const doc = await HireButtonModel.findOne().lean();
    return (doc as any) ?? { logo: "", text: "Hire on Upwork", link: "#" };
  } catch {
    return { logo: "", text: "Hire on Upwork", link: "#" };
  }
}

export default async function HireButtonBlog() {
  const hireButton = await getHireButtonData();

  return (
    <div className="relative overflow-hidden text-center mb-10 bg-linear-to-br from-violet-300/60 via-purple-50/10 to-indigo-300/60 dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-900 shadow-[0_10px_50px_rgba(139,92,246,0.15)] dark:shadow-[0_10px_50px_rgba(139,92,246,0.1)] px-6 py-15 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-between border border-violet-200 dark:border-slate-800">

      <span className="absolute -bottom-1.5 sm:-bottom-6 -right-1.5 sm:-right-6 text-7xl sm:text-8xl md:text-9xl font-black text-violet-900/5 dark:text-violet-100/5 select-none pointer-events-none tracking-tighter uppercase z-0">
        Blogs
      </span>

      <div className='col-span-2'>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 dark:text-slate-200 tracking-wider mb-3">
          My Blogs on <span className='text-violet-800 dark:text-violet-600 font-extrabold'>Building modern web experiences</span>
        </h2>
        <p className="text-base text-gray-600 dark:text-slate-300 flex items-center tracking-normal leading-relaxed">
          Sharing insights on full-stack development, clean architecture, performance optimization, and modern web technologies.
        </p>
      </div>
      <div className='flex flex-col gap-3 sm:pl-4 items-center sm:items-end w-full'>
        <Link href="/contact">
          <button className='group bg-violet-800 hover:bg-violet-600 text-white shadow-md shadow-violet-700/20 dark:bg-violet-700 dark:hover:bg-violet-600 transition-all duration-200 font-semibold text-sm py-2.5 px-5 rounded-full cursor-pointer flex items-center justify-center gap-2'>
            Let's Talk <MoveRight className="w-6 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
          </button>
        </Link>
        <Link href={hireButton.link || "#"} target="_blank" rel="noopener noreferrer">
          <button className='group bg-transparent hover:bg-violet-100 dark:hover:bg-violet-950/40 text-violet-800 dark:text-white font-semibold text-sm py-2.5 px-5 rounded-full cursor-pointer flex items-center justify-center gap-1 ring-1 ring-violet-500/50 transition-all duration-200'>
            {hireButton.logo && (
              <Image src={hireButton.logo} alt="" width={16} height={16} className="object-contain rounded-sm" />
            )}
            {hireButton.text || "Hire on Upwork"} <MoveRight className="w-6 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}

