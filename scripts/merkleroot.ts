import { generateTree } from "./utils/merkle";
import { writeFile } from "./utils/io";
import PaidWhitelistJSON from "./utils/paid-whitelist.json";
import FreeWhitelistJSON from "./utils/free-whitelist.json";

async function main() {
  const tree = generateTree(PaidWhitelistJSON);
  writeFile(tree, 'paid-merkleroot.json');
  
  const freeTree = generateTree(FreeWhitelistJSON);
  writeFile(freeTree, 'free-merkleroot.json');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
