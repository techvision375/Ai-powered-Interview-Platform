import React from "react";
import { LuX } from "react-icons/lu";

const Drawer = ({ isOpen, onClose, title, children }) => {
  return (
    <div
      className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] p-4 overflow-y-auto transition-transform bg-white w-full md:w-[40vw] shadow-2xl shadow-cyan-800/10 border-r border-l-gray-800  ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <div className="flex items-center justify-between mb-4">
        <h5
          id="drawer-right-label"
          className="flex items-center text-base font-semibold text-black"
        >
          {title}
        </h5>

        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 inline-flex items-center justify-center"
        >
          <LuX className="text-lg" />
        </button>
      </div>

      <div className="text-sm mx-3 mb-6">{children}</div>
    </div>
  );
};
export default Drawer;


// import React from "react";
// import { X } from "lucide-react";

// const Drawer = ({ isOpen, onClose, title, children }) => {
//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onClose}
//       />
      
//       {/* Drawer */}
//       <div
//         className={`fixed top-[64px] right-0 z-40 h-[calc(100vh-64px)] overflow-hidden transition-all duration-500 ease-out w-full md:w-[40vw] ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//         tabIndex="-1"
//         aria-labelledby="drawer-right-label"
//       >
//         {/* Glass morphism background */}
//         <div className="absolute inset-0 bg-white/95 backdrop-blur-xl border-l border-gray-200/50 shadow-2xl shadow-black/10" />
        
//         {/* Content container */}
//         <div className="relative h-full flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-100/80 bg-gradient-to-r from-white/50 to-gray-50/30">
//             <h5
//               id="drawer-right-label"
//               className="text-lg font-semibold text-gray-800 tracking-tight"
//             >
//               {title}
//             </h5>

//             <button
//               type="button"
//               onClick={onClose}
//               className="group relative p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 rounded-full hover:bg-gray-100/60 hover:shadow-sm hover:scale-105 active:scale-95"
//             >
//               <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
//               <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
//             </button>
//           </div>

//           {/* Content area with custom scrollbar */}
//           <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300/60 scrollbar-track-transparent hover:scrollbar-thumb-gray-400/60">
//             <div className="text-sm text-gray-700 leading-relaxed">
//               {children}
//             </div>
//           </div>
          
//           {/* Subtle gradient fade at bottom */}
//           <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
//         </div>
//       </div>
      
//       <style jsx>{`
//         .scrollbar-thin {
//           scrollbar-width: thin;
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 6px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background-color: rgba(156, 163, 175, 0.6);
//           border-radius: 3px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background-color: rgba(156, 163, 175, 0.8);
//         }
//       `}</style>
//     </>
//   );
// };

// export default Drawer;