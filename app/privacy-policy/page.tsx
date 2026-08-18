// app/privacy-policy/page.tsx

const page = () => {
  // const formattedDate = createdAt
  //   ? new Date(blog.createdAt).toLocaleDateString("en-US", {
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //   })
  //   : "";

  return (
    <section className='w-[92%] xl:w-[80%] mx-auto mt-1 pt-20 md:pt-25 mb-10'>
      <div className="inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-50 dark:bg-violet-950/40 text-violet-800 dark:text-violet-300 border border-violet-100 dark:border-violet-900/40 mb-4 transition-colors duration-300">
        Legal
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 gap-4 sm:gap-10" >
        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <h3 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Title
          </h3>
          <p className="text-md text-[#64748b] dark:text-gray-400 leading-relaxed">
            Paragraph text Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quam ipsam dignissimos doloribus vel dolores odio. Dolorem expedita distinctio delectus sit corporis, perspiciatis est rerum quod voluptas eaque, aperiam praesentium!
          </p>
        </div>

        <div className=" flex flex-col justify-between rounded-2xl p-3 sm:p-5 bg-white dark:bg-black/20 border border-violet-200 dark:border-gray-800/80 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ">
          {/* Title */}
          <h3 className="text-xl font-bold text-[#1e293b] dark:text-gray-100 group-hover:text-violet-700 dark:group-hover:text-violet-300 transition-colors leading-snug mb-3">
            Title
          </h3>
          <p className="text-md text-[#64748b] dark:text-gray-400 leading-relaxed">
            Paragraph text Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quam ipsam dignissimos doloribus vel dolores odio. Dolorem expedita distinctio delectus sit corporis, perspiciatis est rerum quod voluptas eaque, aperiam praesentium!
          </p>
        </div>
      </div>

    </section>
  )
}

export default page
