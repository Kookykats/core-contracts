import { writeContract } from "../utils/io";
import { deployContract } from "../utils/deployer";

const ROYALTY_RECEIVER = '0x95C0F35F81a5Ac7db9D309CF6e05F58B301a123d'

async function main() {
  const args = ["KookyKats", "KKAT", 8000, 750];
  const KooKyKat = await deployContract("KookyKats", args);

  console.info("KookyKats", KooKyKat.address);
  writeContract("kooky-kat", KooKyKat.address, args);

  const tx = await KooKyKat.setRoyaltyReceiver(ROYALTY_RECEIVER)
  await tx.wait();

  console.info("Set Royalty receiver address: ", ROYALTY_RECEIVER)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
