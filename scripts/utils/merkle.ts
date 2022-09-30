import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";

export const hashStringAddress = (address: string) =>
  keccak256(Buffer.from(address.substring(2), "hex"));

export const getProof = (tree: MerkleTree, address: string) =>
  tree.getHexProof(hashStringAddress(address));

export const generateMerkleTree = (addresses: string[]) => {
  const leaves = addresses.map((v) => hashStringAddress(v));
  return new MerkleTree(leaves, keccak256, { sort: true });
};

export const generateTree = (addresses: string[]) => {
  // const addresses = JSON.parse(AddressesJSON);
  const merkleTree = generateMerkleTree(addresses);
  const merkleRoot = merkleTree.getHexRoot();
  const merkleProof = [];
  for (const address of addresses) {
    merkleProof.push({
      address,
      proofs: getProof(merkleTree, address).join(","),
    });
  }

  return {
    root: merkleRoot,
    proofs: merkleProof,
  };
};
