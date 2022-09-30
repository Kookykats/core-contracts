import { readContract } from "../utils/io";
import { verifyContract } from "../utils/deployer";

async function main() {
  const KooKyKatMinter = readContract("kooky-kat-sale");
  await verifyContract(KooKyKatMinter.address, KooKyKatMinter.args);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
