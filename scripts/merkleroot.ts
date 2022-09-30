import { generateTree } from "./utils/merkle";
import { writeFile } from "./utils/io";
import WhitelistJSON from "./utils/whitelist.json";

async function main() {
  const tree = generateTree(WhitelistJSON);
  writeFile(tree, 'merkleroot.json');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
