import { ethers, run } from "hardhat";

export const deployContract = async (contractName: string, args: any = []) => {
  const Contract = await ethers.getContractFactory(contractName);
  const contract = await Contract.deploy(...args);
  await contract.deployed();

  return contract;
};

export const verifyContract = async (
  contractAddress: string,
  args: any = []
) => {
  await run("verify:verify", {
    address: contractAddress,
    constructorArguments: args,
  });
};
