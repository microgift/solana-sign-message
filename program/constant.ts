
import { web3 } from "@project-serum/anchor";

const connection = new web3.Connection(
  "https://api.mainnet-beta.solana.com/",
  "confirmed"
);

export {
  connection
}
