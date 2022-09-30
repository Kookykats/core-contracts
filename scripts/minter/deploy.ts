import { writeContract, readContract, readFile } from "../utils/io";
import { deployContract } from "../utils/deployer";

async function main() {
  const KookyKat = readContract("kooky-kat");
  const merkleroot = readFile("merkleroot.json");

  const args = [
    KookyKat.address,
    merkleroot?.root || "",
  ];
  const KookyKatMinter = await deployContract("KookyKatsSale", args);
  console.info("KookyKatsSale", KookyKatMinter.address);
  writeContract("kooky-kat-sale", KookyKatMinter.address, args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
