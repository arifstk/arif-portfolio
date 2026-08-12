export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center space-y-7 bg-stone-50 dark:bg-stone-950">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute inset-0 animate-ping rounded-full bg-violet-800 dark:bg-violet-400 opacity-20" />

        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-800 dark:border-violet-400 border-t-transparent" />
      </div>

      <div className="flex items-center space-x-2 pt-5">
        <span className="text-xl font-medium text-violet-700 dark:text-violet-200">
          Loading
        </span>

        <div className="flex space-x-1.5 pt-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-violet-800 dark:bg-violet-400 [animation-delay:-0.3s]" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-violet-800 dark:bg-violet-400 [animation-delay:-0.15s]" />
          <div className="h-2 w-2 animate-pulse rounded-full bg-violet-800 dark:bg-violet-400" />
        </div>
      </div>
    </div>
  );
}

