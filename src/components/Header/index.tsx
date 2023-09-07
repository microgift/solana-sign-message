import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useContext, useEffect, useState } from "react";
import { connection } from "../../../program/constant";
import Head from "next/head";

export default function Header() {
  const wallet = useWallet();

  return (
    <div
      className="w-full flex justify-between p-[18px] border-b-[1px] border-[#d9d9d9] z-50 fixed
    bg-white backdrop-blur-md"
    >
      <Head>
        <link rel="icon" href="../img/money.png" />
      </Head>
      <div className="font-extrabold text-[28px] text-[#C4ACFF] uppercase">
        {/* <h1>Click button</h1> */}
      </div>
      <div className="flex gap-[18px] items-center">
        <div className="bg-white border border-black rounded-md wallet">
          <WalletModalProvider>
            <WalletMultiButton className="text-black" />
          </WalletModalProvider>
        </div>
      </div>
    </div>
  );
}
