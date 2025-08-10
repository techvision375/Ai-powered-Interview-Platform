import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

export const uploadImage = async (imageFile) => {
    const formData = new FormData();

    // append image file to form data
    formData.append("image", imageFile);


    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",

            },
        });
        console.log("Image uploaded successfully:", response.data);

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Propagate the error to be handled by the calling function
    }
}
