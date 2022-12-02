import { writeContract } from "../utils/io";
import { deployContract } from "../utils/deployer";

async function main() {
  const args = ["KookyKats", "KKAT", 8000, 10];
  const KooKyKat = await deployContract("KookyKats", args);
  console.info("KookyKats", KooKyKat.address);
  writeContract("kooky-kat", KooKyKat.address, args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
