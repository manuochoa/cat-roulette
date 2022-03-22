import { ethers, providers } from "ethers";

let tokenAddress = "0x4653cd996a326dFB900A053c883103C88b156562";

let tokenAbi = [
  "function mint(uint256 _amount) payable public",
  "function totalSupply() external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
];

let provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
);

let tokenInstance = new ethers.Contract(tokenAddress, tokenAbi, provider);

export const getInitialSupply = async () => {
  try {
    let supply = await tokenInstance.totalSupply();

    return supply;
  } catch (error) {
    console.log(error, "supply");
  }
};

export const mint = async (_amount, walletType, walletProvider) => {
  try {
    let newInstance = await tokenContractInstance(walletType, walletProvider);

    let tx = await newInstance.mint(_amount, {
      value: paymentAmount(_amount),
      gasLimit: 1000000,
    });

    let receipt = await tx.wait();

    return receipt;
  } catch (error) {
    if (error.data) {
      window.alert(error.data.message);
    }
    console.log(error);
  }
};

const paymentAmount = async (amount) => {
  let supply = (await tokenInstance.totalSupply()) + 1;
  let price = 0;

  for (let i = 0; i < amount; i++) {
    price += getPrice(Number(supply) + i);
  }
  console.log(price);

  return price.toString();
};

const getPrice = (_tokenId) => {
  if (_tokenId <= 150) {
    return 150000000000000000;
  } else if (_tokenId <= 300) {
    return 200000000000000000;
  } else {
    return 250000000000000000;
  }
};

const tokenContractInstance = async (walletType, walletProvider) => {
  if (walletType === "WALLET_CONNECT") {
    const web3Provider = new providers.Web3Provider(walletProvider);

    let signer = web3Provider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  } else {
    let newProvider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = newProvider.getSigner(0);

    return new ethers.Contract(tokenAddress, tokenAbi, signer);
  }
};
