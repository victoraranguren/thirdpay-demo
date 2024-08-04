"use client";
import { NextPage } from "next";
import { client } from "@/app/client";
import { useEffect, useState } from "react";
import { defineChain, getContract, prepareContractCall, toWei } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

const Burn: NextPage = () => {
  //Estado de la data para la transacción
  const [amount, setAmount] = useState<string>("");
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
      method: "function burn(uint256 amount)",
      params: [toWei(amount)],
    });

    console.log("handleClick Activated", amount);
    sendTransaction(transaction);
  };

  //Actualiza el monto en el estado cada vez que se modifica el input
  const handleChangeAmount = (e: any) => {
    setAmount(e.target.value);
  };

  //Envía por consola el valor de la data de la transacción cada vez que se modifica el estado
  useEffect(() => {
    console.log("Amount", typeof amount, amount);
  }, [amount]);

  return (
    <main className="p-4 pb-10 min-h-[100vh] ">
      <div className="flex flex-col gap-2 w-[600px] m-auto border p-6 rounded">
        <h2 className="text-4xl">Quemar tETH</h2>
        <label htmlFor="amount">
          Para un Token coloque el monto de tETH a quemar
        </label>
        <input
          name="amount"
          onChange={handleChangeAmount}
          type="number"
          placeholder="Monto a enviar"
          min={0}
          className="border p-2"
        />

        <button onClick={handleClick} className="p-2 bg-blue-700 text-white">
          Quemar
        </button>
      </div>
    </main>
  );
};

export default Burn;