/*
import AWS from 'aws-sdk';
import { useState } from 'react';

function FileUpload({ onFileUploaded }) {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const S3_BUCKET = "peer2peerphotos";
    const REGION = "us-east-2";

    AWS.config.update({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3();
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    try {
      const data = await s3.upload(params).promise();
      onFileUploaded(data.Location); // Pass the URL to the parent component
      alert("File uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <div className="FileUpload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default FileUpload;
*/

import AWS from "aws-sdk";
import { useState } from "react";
import "./FileUpload.css";

function FileUpload({ onFileUploaded, setIsPhotoUploaded, handleUploading }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Local uploading state

	const uploadFile = async () => {
		const S3_BUCKET = "peer2peerphotos";
		const REGION = "us-east-2";

		AWS.config.update({
			accessKeyId: import.meta.env.VITE_ACCESS_KEY,
			secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
			region: REGION,
		});

    const s3 = new AWS.S3();
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
      // alert("File uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      handleUploading(false); // Update parent component
      setIsUploading(false); // Update local state
    }
  };

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
	};

  return (
    <div className="file-upload">
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={uploadFile} className="upload-button" disabled={isUploading}>
          {isUploading ? <div className="loading-spinner"></div> : 'Upload File'}
        </button>
      </div>
    </div>
  );
}

export default FileUpload;




/*
  use state in the parent component that's boolean
  start it as false
  pass it down to file upload
  set the use state as true on line 79
  then back to parent 
  only when the useState is true, 
*/



// arn:aws:iam::008971632145:user/scbrown224
