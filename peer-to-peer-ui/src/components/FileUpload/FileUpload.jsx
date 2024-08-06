import { useState } from "react";
import "./FileUpload.css";

function FileUpload({ onFileUploaded, setIsPhotoUploaded, handleUploading }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Local uploading state

  const uploadFile = async () => {
    const S3_BUCKET = "peer2peerphotos";
    const REGION = "us-east-2";

    window.AWS.config.update({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new window.AWS.S3();
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    handleUploading(true); // Update parent component
    setIsUploading(true); // Update local state

    try {
      const data = await s3.upload(params).promise();
      onFileUploaded(data.Location); // Pass the URL to the parent component
      setIsPhotoUploaded(true); // Set the photo uploaded state to true
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      handleUploading(false); // Update parent component
      setIsUploading(false); // Update local state
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="file-upload">
      <div className="file-input-container">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="custom-file-label">
          Choose File
        </label>
        <span className="file-name">
          {file ? file.name : "No file chosen"}
        </span>
        <button
          onClick={uploadFile}
          className="upload-button"
          disabled={isUploading || !file}
        >
          {isUploading ? <div className="loading-spinner"></div> : "Upload File"}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
