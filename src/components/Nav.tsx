"use client";
import { client } from "@/app/client";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

export default function Home() {
  return (
    <nav className="flex justify-between items-center gap-2 p-4 border">
      <a href="/" className="inline-block text-2xl">
        Thirdpay
      </a>
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
        wallets={[createWallet("io.metamask")]}
        locale={"es_ES"}
        chain={{ id: 84532, rpc: "https://84532.rpc.thirdweb.com" }}
        theme={"light"}
      />
    </nav>
  );
}
