import React from 'react'
import { LuUser, LuTrash2, LuUpload } from "react-icons/lu";
import { useState, useRef } from 'react';

export const ProfilePhotoSelector = ({
    image,
    setimage
}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setimage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }
    
    const handleRemoveImage = () => {
        setimage(null);
        setPreviewUrl(null);
        // Clean up the object URL to prevent memory leaks
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }
    
    return (
        <div className='flex justify-center'>
            <input 
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />  
            {
                !image ? (
                    <div className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer hover:bg-orange-100 transition-colors'>
                        <LuUser className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-orange-500'/>
                        <button
                            type='button'
                            onClick={onChooseFile}
                            className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-r from-orange-500/85 to-orange-600 text-white rounded-full absolute bottom-0 right-0 sm:bottom-1 sm:right-1 cursor-pointer hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg'
                        >
                            <LuUpload className='text-xs sm:text-sm md:text-base'/>
                        </button>
                    </div>
                ) : (
                    <div className='relative'>
                        <img 
                            src={previewUrl} 
                            alt="Profile photo"
                            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-lg'  
                        />
                        <button
                            type='button'
                            className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-0 right-0 sm:bottom-1 sm:right-1 cursor-pointer hover:bg-red-600 transition-colors shadow-lg'
                            onClick={handleRemoveImage}
                        >
                            <LuTrash2 className='text-xs sm:text-sm md:text-base'/>
                        </button>
                    </div>
                )
            } 
        </div>
    )
}