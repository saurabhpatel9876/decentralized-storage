'use client'
import Drive from '@/artifacts/contracts/Drive.sol/Drive.json'
import DataUpload from '@/components/DataUpload';
import ShowFile from '@/components/ShowFile';
import { ethers, resolveAddress } from 'ethers';
import { BrowserProvider, parseUnits } from "ethers";
import { useState,useEffect } from "react";
import Share from '@/components/Share';
export default function Home() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
   const provider = new ethers.BrowserProvider(window.ethereum)

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer =await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let CONTRACT_ADDRESS = "0x0530ca6fE5C5F17daA6Fd4Bf55Fe23DFc624511B"
        // console.log(CONTRACT_ADDRESS)

        

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          Drive.abi,
          signer
        );
    
        // console.log(contract);
        // console.log("abi:",Drive.abi)
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
    <div className='flex-col  bg-black items-center text-white p-3  '>
    <p>
          Account : {account ? account : "Not connected"}
        </p>
        <DataUpload   account={account}
          provider={provider}
          contract={contract}/>
          <ShowFile contract={contract} account={account}/>

          {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Share setModalOpen={setModalOpen} contract={contract}></Share>
      )}
    </div>
    </>
  );
}
