'use client'

import React from 'react'
import { useState } from 'react';
import { Button } from './ui/button';
import axios from 'axios';
const DataUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData(); //this is object like {"file":file}
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `7edf15e70da583062ab8`,
            pinata_secret_api_key: `1af24e79b38c753241a260ef68f0b0462f2dde30f8857633e2d13458e1f169b0`,
            "Content-Type": "multipart/form-data",
          },
        });
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log("imaghash;::--",ImgHash)
        contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
        console.log(e)
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <>
     <form className="flex m-2 p-2" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
       <Button type="submit" className="" disabled={!file}>Upload</Button>
      </form>
    </>
  )
}

export default DataUpload