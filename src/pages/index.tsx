import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from "@solana/wallet-adapter-react";

import { BarLoader } from "react-spinners";
import { successAlert, errorAlert, infoAlert } from "../components/ToastGroup";
import bs58 from "bs58";

const Home: NextPage = () => {
  const { wallet, signMessage } = useWallet();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const sign = async () => {
    if (wallet) {
      setLoading(true);
      console.log("loading");

      try {
        const msg = new TextEncoder().encode(message);
        const sig = await signMessage?.(msg);

        const res = bs58.encode(sig as Uint8Array);
        setSignedMessage(res);
        successAlert("Message signed.");
      } catch (e) {
        errorAlert("Failed to sign message.");
      }
    } else {
      infoAlert("Please connect your wallet.");
    }
    setLoading(false);
  };

  return (
    <main className="z-40 w-full">
      <div className="mx-auto lg:container">
        <div className="w-full text-center gap-[20px] mt-[17px]">
          <div className="absolute top-0 bottom-0 left-0 right-0 z-40 flex flex-col items-center justify-center space-y-6">
            <textarea
              className="text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-dark"
              style={{ width: "80%", height: "25%", padding: "10px" }}
              value={message}
              onChange={handleMessageChange}
            />
            <button
              className="px-10 py-5 text-3xl text-black transition-all duration-300 bg-white border border-black rounded-md hover:bg-black hover:text-white"
              onClick={sign}
            >
              Click to sign
            </button>
            <textarea
              className="text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-dark"
              style={{ width: "80%", height: "20%", padding: "10px" }}
              value={signedMessage}
            />
          </div>
        </div>
      </div>
      {loading && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-black flex
      bg-opacity-10 backdrop-blur-md z-[51]"
        >
          <BarLoader color="black" />
        </div>
      )}
    </main>
  );
};

export default Home;
