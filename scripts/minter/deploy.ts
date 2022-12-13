import { writeContract, readContract, readFile } from "../utils/io";
import { deployContract } from "../utils/deployer";

async function main() {
  const KookyKat = readContract("kooky-kat");

  const args = [KookyKat.address];
  const KookyKatMinter = await deployContract("KookyKatsSale", args);
  console.info("KookyKatsSale", KookyKatMinter.address);
  writeContract("kooky-kat-sale", KookyKatMinter.address, args);

  const freeWhitelist = readFile("free-merkleroot.json");
  const tx = await KookyKatMinter.setFreeMintWhitelist(freeWhitelist.root);
  await tx.wait();
  console.info("Set free whitelist", tx.hash);

  const paidWhitelist = readFile("paid-merkleroot.json");
  const tx1 = await KookyKatMinter.setPaidMintWhitelist(paidWhitelist.root);
  await tx1.wait();
  console.info("Set paid whitelist", tx.hash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
