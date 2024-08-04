"use client";
import { NextPage } from "next";
import { client } from "@/app/client";
import { defineChain, getContract, prepareContractCall, toWei } from "thirdweb";
import {
  TransactionButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";

const Burn: NextPage = () => {
  const activeAccount = useActiveAccount();

  //Hook para hacer la transacción
  const { mutate: sendTransaction } = useSendTransaction();

  //Contract tETH
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: "0x385E0Ba92AbFCb54a23D311FF3E8f0B614D0cb5a",
  });

  //Función para preparar los datos y enviar la transacción
  const handleClick = async () => {
    const transaction = prepareContractCall({
      contract,
      method: "function mintTo(address to, uint256 amount)",
      params: [activeAccount.address, toWei("10")],
    });

    let res = sendTransaction(transaction);
    console.log("handleClick Activated");
    console.log(res);
  };

  return (
    <main className="p-4 pb-10 min-h-[100vh] ">
      <div className="flex flex-col gap-2 w-[600px] m-auto border p-6 rounded">
        <h2 className="text-4xl">Mintea 10 tETH</h2>

        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract,
              method: "function mintTo(address to, uint256 amount)",
              params: [activeAccount.address, toWei("10")],
            })
          }
          unstyled
          className="p-2 bg-blue-700 text-white"
        >
          Mintear
        </TransactionButton>
      </div>
    </main>
  );
};

export default Burn;
