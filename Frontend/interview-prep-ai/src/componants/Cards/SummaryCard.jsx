import React from "react";
import { TfiTrash } from "react-icons/tfi";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-green-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-gray-100 relative group w-full"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-3 sm:p-4 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-md flex items-center justify-center mr-3 sm:mr-4">
            <span className="text-base sm:text-lg font-semibold text-black">{getInitials(role)}</span>
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <h2 className="text-sm sm:text-[17px] font-medium truncate pr-2">{role}</h2>
                <p className="text-xs text-medium text-gray-900 line-clamp-2 sm:line-clamp-1">
                  {topicsFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-2 sm:px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-2 right-2 sm:top-0 sm:right-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <TfiTrash/>
        </button>
      </div>

      <div className="px-2 sm:px-3 pb-3">
        <div className="mt-3 sm:mt-4 space-y-3">
          {/* Tags - Stack on mobile, inline on larger screens */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="text-[9px] sm:text-[10px] font-medium text-black px-2 sm:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
              Experience: {experience} {experience == 1 ? "year" : "years"}
            </div>

            <div className="text-[9px] sm:text-[10px] font-medium text-black px-2 sm:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
              Questions: {questions}
            </div>
            
            <div className="text-[9px] sm:text-[10px] font-medium text-black px-2 sm:px-3 py-1 border-[0.5px] border-gray-900 rounded-full whitespace-nowrap">
              Last Updated: {lastUpdated}
            </div>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-[12px] text-gray-500 font-medium line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SummaryCard;


// import React from "react";
// const SummaryCard = ({
//   colors,
//   role,
//   topicsFocus,
//   experience,
//   questions,
//   description,
//   lastUpdated,
//   onSelect,
//   onDelete,
// }) => {
//   return (
//     <div
//       className="bg-white border border-green-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-gray-100 relative group "
//       onClick={onSelect}
//     >
//       <div
//         className="rounded-lg p-4 cursor-pointer relative"
//         style={{ background: colors.bgcolor }}
//       >
//         <div className="flex items-start">
//           <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4">
//             <span className="text-lg font-semibold text-black">GU</span>
//           </div>
//           <div className="flex-grow">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h2 className="text-[17px] font-medium ">{role}</h2>
//                 <p className="text-xs text-medium text-gray-900">
//                   {topicsFocus}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0"
//           onClick={(e) => {
//             e.stopPropagation();
//             onDelete();
//           }}
//         >
//           delete
//         </button>
//       </div>

//       <div className="px-3 pb-3">
//         <div className="flex items-center gap-3 mt-4">
//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
//             Experience: {experience} {experience == 1 ? "year" : "years"}
//           </div>

//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
//             Questions: {questions}
//           </div>
//           <div className="text-[10px] font-medium text-black px-3 py-1 border-[0.5px] border-gray-900 rounded-full ">
//             Last Updated: {lastUpdated}
//           </div>

//           {/* Description  */}
//           <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
//             {description}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SummaryCard;