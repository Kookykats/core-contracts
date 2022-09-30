# KooKyKat Core smart contracts

1. Structure of smart contracts

- KooKyKats (contracts/KooKyKats.sol) KooKyKats NFT contract - ERC721A
- KooKyKatsSale (contracts/KooKyKatsSale.sol) KooKyKats NFT sale contract

2. How to deploy contracts

- env variables (refer .env.example)
```
DEPLOYER_PRIVATE_KEY=
INFURA_PROJECT_ID=
ETHERSCAN_API_KEY=
REPORT_GAS=
DEPLOY_NETWORK=
```

- Install modules & compile contracts
```
yarn
npx hardhat compile
npx hardhat typechain
```

- Deploy contracts

```
npx hardhat run scripts/kooky-kat/deploy.ts --network goerli
npx hardhat run scripts/minter/deploy.ts --network goerli
```

- Verify contracts

```
npx hardhat run scripts/kooky-kat/deploy.ts --network goerli
npx hardhat run scripts/minter/deploy.ts --network goerli
```

