import { readContract } from "../utils/io";
import { verifyContract } from "../utils/deployer";

async function main() {
  const KooKyKat = readContract("kooky-kat");
  await verifyContract(KooKyKat.address, KooKyKat.args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
