/*
import AWS from 'aws-sdk';
import { useState } from 'react';


function FileUpload() {

    console.log("Access Key:", import.meta.env.VITE_ACCESS_KEY);
console.log("Secret Access Key:", import.meta.env.VITE_SECRET_ACCESS_KEY);


  // Create state to store file
  const [file, setFile] = useState(null);

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "peer2peerphotos";

    // S3 Region
    const REGION = "us-east-2";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: import.meta.env.VITE_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
      region: REGION,
    });

    const s3 = new AWS.S3();

    // Files Parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3
    try {
      const data = await s3.upload(params).promise();
      console.log(data);
      alert("File uploaded successfully.");
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  };

  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  return (
    <div className="FileUpload">
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default FileUpload;
*/

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




// arn:aws:iam::008971632145:user/scbrown224
