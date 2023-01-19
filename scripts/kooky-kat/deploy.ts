import { writeContract } from "../utils/io";
import { deployContract } from "../utils/deployer";

const TOTAL_SUPPLY = 5000
// const TOTAL_SUPPLY = 10
const ROYALTY_PERCENTAGE = 500
const ROYALTY_RECEIVER = '0x1C72B70604c0Ab14c4E62748a72c85FAF0f8FC09'
const BASE_URI = 'ipfs://QmeEar1BgcbVB5V3QQ3gAugjB7eQAgKXqsiC4JCZetejhg/'
const PLACEHOLDER_URI = 'ipfs://QmditYP3YPzGnLTZ1h5w5nF3DFpCApZDtjPchjTTeN8C9Y/'

async function main() {
  const args = ["KookyKats", "KKAT", TOTAL_SUPPLY, ROYALTY_PERCENTAGE];
  const KooKyKats = await deployContract("KookyKats", args);

  console.info("KookyKats", KooKyKats.address);
  writeContract("kooky-kat", KooKyKats.address, args);

  const tx = await KooKyKats.setRoyaltyReceiver(ROYALTY_RECEIVER)
  await tx.wait();
  console.info("Set Royalty receiver address: ", ROYALTY_RECEIVER)

  const tx1 = await KooKyKats.setBaseTokenURI(BASE_URI)
  await tx1.wait();
  console.info("Set BaseToken URI: ", BASE_URI)

  const tx2 = await KooKyKats.setPlaceholderTokenURI(PLACEHOLDER_URI)
  await tx2.wait();
  console.info("Set placeholder token URI: ", PLACEHOLDER_URI)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
