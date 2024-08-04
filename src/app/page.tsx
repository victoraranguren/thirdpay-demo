"use client";
import { NextPage } from "next";
import { client } from "@/app/client";
import { useEffect, useState } from "react";
import { defineChain, getContract, prepareContractCall, toWei } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import Link from "next/link";

const Home: NextPage = () => {
  //Estado de la data para la transacción
  const [amount, setAmount] = useState<string>("");
  const [to, setTo] = useState<string>("");
  //Hook para hacer la transacción
  const { mutate: sendTransaction } = useSendTransaction();

  //Contract tETH
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: "0x385E0Ba92AbFCb54a23D311FF3E8f0B614D0cb5a",
  });

  //Función para preparar los datos y enviar la transacción
  const handleClick = () => {
    const transaction = prepareContractCall({
      contract,
      method: "function transfer(address to, uint256 amount) returns (bool)",
      params: [to, toWei(amount)],
    });

    console.log("handleClick Activated", to, amount);
    sendTransaction(transaction);
  };

  //Actualiza el monto en el estado cada vez que se modifica el input
  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };
  //Actualiza el destinatario en el estado cada vez que se modifica el input
  const handleChangeTo = (e: any) => {
    setTo(e.target.value);
  };

  //Envía por consola el valor de la data de la transacción cada vez que se modifica el estado
  useEffect(() => {
    console.log("Amount", typeof amount, amount);
    console.log("To", typeof amount, to);
  }, [amount, to]);

  return (
    <main className="p-4 pb-10 min-h-[100vh] ">
      <h1 className="text-center text-6xl	my-8">Bienvenido a ThirdPay</h1>

      <div className="flex flex-row justify-between">
        <Link href="/send" className="inline-block m-auto border p-6 rounded">
          <h2 className="text-2xl">Enviar tETH</h2>
        </Link>
        <Link href="/mint" className="inline-block m-auto border p-6 rounded">
          <h2 className="text-2xl">Mintear tETH</h2>
        </Link>
        <Link href="/burn" className="inline-block m-auto border p-6 rounded">
          <h2 className="text-2xl">Quemar tETH</h2>
        </Link>
      </div>
    </main>
  );
};

export default Home;
