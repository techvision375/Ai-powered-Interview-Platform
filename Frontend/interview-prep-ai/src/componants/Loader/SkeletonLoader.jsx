// import React from "react";

// const SkeletonLoader = () => {
//   return (
//     <>
//       <div role="status" className="animate-pulse space-y-4 max-w-3xl">
//         <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>
//         <div className="space-y-2">
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
//         </div>
//         <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
//           <div className="h-2.5 bg-gray-300 rounded w-3/4"></div>
//           <div className="h-2.5 bg-gray-300 rounded w-2/3"></div>
//           <div className="h-2.5 bg-gray-300 rounded w-1/2"></div>
//         </div>
//       </div>

//       <div role="status" className="animate-pulse space-y-4 max-w-3xl mt-10">
//         <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2"></div>
//         <div className="space-y-2">
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
//           <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
//         </div>
//       </div>

//       <div className="space-y-2">
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
//       </div>

//       <div className="bg-gray-100 dark:bg-gray-700 rounded p-4 space-y-2">
//         <div className="h-2.5 bg-gray-300 rounded-md dark:bg-gray-700 w-3/4"></div>
//         <div className="h-2.5 bg-gray-300 rounded-md dark:bg-gray-700 w-2/3"></div>
//       </div>

//       <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-1/2 mt-8"></div>

//       <div className="space-y-2">
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-full"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-11/12"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-10/12"></div>
//         <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-9/12"></div>
//       </div>
//     </>
//   );
// };

// export default SkeletonLoader;
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-2/3 animate-shimmer bg-[length:200%_100%]"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-11/12 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: '0.1s'}}></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-4/5 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full animate-pulse shadow-lg"></div>
        <div className="absolute bottom-4 right-8 w-8 h-8 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full animate-pulse shadow-md" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 right-16 w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Card Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200">
            <div className="animate-pulse p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full animate-shimmer bg-[length:200%_100%] shadow-sm" style={{animationDelay: `${index * 0.1}s`}}></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.1}s`}}></div>
                  <div className="h-2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/2 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.2}s`}}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.3}s`}}></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-5/6 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.4}s`}}></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-2/3 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.5}s`}}></div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="h-6 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-16 animate-shimmer bg-[length:200%_100%] shadow-sm" style={{animationDelay: `${index * 0.1 + 0.6}s`}}></div>
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-20 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.7}s`}}></div>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Article Skeleton */}
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-200 p-8">
        <div className="animate-pulse space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl w-1/3 animate-shimmer bg-[length:200%_100%]"></div>
            <div className="h-8 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-24 animate-shimmer bg-[length:200%_100%] shadow-sm"></div>
          </div>
          
          <div className="space-y-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-full animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1}s`}}></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-11/12 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.05}s`}}></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-4/5 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.1}s`}}></div>
              </div>
            ))}
          </div>

          {/* Quote block skeleton */}
          <div className="relative pl-6 border-l-4 border-orange-400 bg-gradient-to-r from-orange-50 to-orange-25 rounded-r-lg p-4 shadow-sm">
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-4/5 animate-shimmer bg-[length:200%_100%]"></div>
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-3/4 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: '0.1s'}}></div>
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/2 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="animate-pulse space-y-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg animate-shimmer bg-[length:200%_100%] shadow-sm" style={{animationDelay: `${index * 0.1}s`}}></div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.1}s`}}></div>
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded w-1/2 animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.2}s`}}></div>
            </div>
          </div>
        ))}
      </div>

      {/* List Section Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-5 bg-gradient-to-r from-orange-200 to-orange-300 rounded w-1/4 animate-shimmer bg-[length:200%_100%] shadow-sm"></div>
          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full animate-pulse" style={{animationDelay: `${index * 0.1}s`}}></div>
                <div className="flex-1 h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.1}s`}}></div>
                <div className="w-16 h-3 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded animate-shimmer bg-[length:200%_100%]" style={{animationDelay: `${index * 0.1 + 0.2}s`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default SkeletonLoader;