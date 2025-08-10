import React from "react";

import "../../index.css";


export const Modal = ({ isOpen, onClose, title, hideHeader, children }) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center h-full w-full  bg-black/40">
        <div
          className={`relative flex flex-col shadow-lg rounded-lg overflow-hidden`}
        >
          {!hideHeader && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-amber-50">
              <h3 className="md:text-lg font-medium text-gray-900 ">{title}</h3>
            </div>
          )}

          <button onClick={() => onClose()}  className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
              
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1L13 13M13 1L1 13"
              />
            </svg>
          </button>
          <div className="flex-1 overflow-auto custom-scrollbar">{children}</div>

        </div>
      </div>
    </>
  );
};
