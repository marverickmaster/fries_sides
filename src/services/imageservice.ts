// src/services/imageService.ts

export const uploadToCloudinary = async (file: File): Promise<string> => {
  // Your specific Cloudinary details
  const cloudName = "dniorpn0t"; 
  const uploadPreset = "fries_menu";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url; // This returns the permanent link to your image
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};