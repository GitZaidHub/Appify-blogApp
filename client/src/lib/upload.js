import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";  // Import the storage object from firebase configuration

const upload = async (files) => {
  // Check if the input is an array of files (i.e., multiple images)
  const fileArray = Array.isArray(files) ? files : [files];  // Ensure files is always an array
  
  // Initialize an empty array to store download URLs
  const downloadURLs = [];

  // Loop through each file in the array
  for (const file of fileArray) {
    const date = new Date();
    const storageRef = ref(storage, `images/${date.getTime()}-${file.name}`);  // Use unique file name with timestamp

    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      // Wait for each file to upload
      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            reject("Something went wrong", error.code);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              downloadURLs.push(downloadURL);  // Add the download URL to the array
              console.log('File available at', downloadURL);
              resolve();
            });
          }
        );
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("Error uploading file");
    }
  }

  // Return all download URLs after all files have been uploaded
  return downloadURLs;
};

export default upload;
