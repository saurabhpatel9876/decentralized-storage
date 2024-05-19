'use client'
import React from 'react'
import { useState,useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
const Share = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
     contract.allow(address);
    setModalOpen(false);
    console.log("adddress ",address)
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
    
  return (
   <>
    <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
         <input
           type="text"
           style={{color:"black"}}
           className="address"
           placeholder="Enter Address"
         />
          
          </div>
          <form id="myForm">
            <select className='m-2 ' id="selectNumber">
              <option className="address"   style={{color:"black"}}>People With Access</option>
            </select>
          </form>
          <div className="footer">
           <Button  className="m-2" onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn">Cancel</Button>
           <Button onClick={() => sharing()}> Share</Button>
          </div>
        </div>
      </div>
   </>
  )
}

export default Share