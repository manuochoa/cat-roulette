import { useState } from "react";
import ConnectPopup from "./components/ConnectPopup";
import Header from "./components/Header";
import Mint from "./components/Mint";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

export default function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [walletType, setWalletType] = useState("");
  const [walletProvider, setWalletProvider] = useState();

  const connectMetamask = async () => {
    console.log("hola");
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);

      window.localStorage.setItem("userAddress", accounts[0]);

      const chainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      if (chainId !== "0x61") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x61" }],
        });
      }

      window.ethereum.on("accountsChanged", function (accounts) {
        setUserAddress(accounts[0]);
      });

      window.ethereum.on("chainChanged", (_chainId) =>
        window.location.reload()
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWalletConnect = async () => {
    try {
      console.log("hola");
      const provider = new WalletConnectProvider({
        rpc: {
          //   56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        // network: "binance",
        chainId: 97,
        infuraId: null,
      });

      await provider.enable();
      setWalletProvider(provider);
      const web3 = new Web3(provider);

      // const accounts = await ethers.listAccounts();
      const accounts = await web3.eth.getAccounts();

      setUserAddress(accounts[0]);
      setWalletType("WALLET_CONNECT");
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = async () => {
    if (walletType === "WALLET_CONNECT") {
      const provider = new WalletConnectProvider({
        rpc: {
          //   56: "https://bsc-dataseed1.ninicoin.io/",

          97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        },
        chainId: 97,
        infuraId: null,
      });
      await provider.disconnect();
    } else {
    }

    setUserAddress("");
  };

  return (
    <>
      <Header
        userAddress={userAddress}
        disconnectWallet={disconnectWallet}
        setPopupVisible={setPopupVisible}
      />
      <Mint
        setPopupVisible={setPopupVisible}
        userAddress={userAddress}
        walletType={walletType}
        walletProvider={walletProvider}
      />
      <ConnectPopup
        connectMetamask={connectMetamask}
        connectWalletConnect={connectWalletConnect}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
    </>
  );
}
