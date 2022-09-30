import { writeContract } from "../utils/io";
import { deployContract } from "../utils/deployer";

async function main() {
  const args = ["KookyKats", "KKAT", 500, 10];
  const KooKyKat = await deployContract("KookyKats", args);
  console.info("KookyKats", KooKyKat.address);
  writeContract("kooty-kat", KooKyKat.address, args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
