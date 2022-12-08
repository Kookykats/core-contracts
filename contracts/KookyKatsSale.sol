// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IKookyKats.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract KookyKatsSale is Ownable, Pausable, ReentrancyGuard {
    enum MINT_ROUNDS {
        NONE,
        WHITELIST_PAID_MINT,
        WHITELIST_FREE_MINT,
        PUBLIC_PAID_MINT
    }

    /// @dev Merkle root of kookykats whitelisted users
    bytes32 public KOOKY_KATS_WHITELIST;

    /// @dev Current ongoing mint round Id
    MINT_ROUNDS public ROUND_ID;

    /// @dev Max LLC amount per person in each round
    uint16 public MAX_MINT_AMOUNT;

    /// @dev KookyKats NFT contract
    IKookyKats public KOOKY_KATS;

    /// @dev Fee for minting KookyKats NFT
    uint256 public MINT_FEE;

    /// @dev Minting participants data per minting round
    mapping(MINT_ROUNDS => mapping(address => uint256)) public participants;

    constructor(address kat) {
        setKookyKats(kat);
        _pause();
    }

    /// @dev Set the merkle root of kookykats whitelisted users
    function setWhitelist(bytes32 root) public onlyOwner {
        KOOKY_KATS_WHITELIST = root;
        emit Whitelisted(root);
    }

    function setKookyKats(address kat) public onlyOwner {
        KOOKY_KATS = IKookyKats(kat);
        emit SetKookyKats(kat);
    }

    /// @dev Open new mint phrase
    function openMintRound(
        MINT_ROUNDS roundId,
        uint16 maxAmount,
        uint256 fee,
        bytes32 whitelist
    ) external onlyOwner {
        require(
            ROUND_ID == MINT_ROUNDS.NONE,
            "KookyKatsSale: Close ongoing mint round first"
        );
        require(
            roundId != MINT_ROUNDS.NONE,
            "KookyKatsSale: Invalid minting roundId"
        );
        require(maxAmount > 0, "KookyKatsSale: Invalid max amount");
        ROUND_ID = roundId;
        MAX_MINT_AMOUNT = maxAmount;
        MINT_FEE = fee;
        setWhitelist(whitelist);
        emit MintRoundOpend(roundId, maxAmount, fee, whitelist);
    }

    /// @dev Close mint phrase
    function closeMintRound() external onlyOwner {
        require(
            ROUND_ID != MINT_ROUNDS.NONE,
            "KookyKatsSale: No ongoing mint round"
        );
        ROUND_ID = MINT_ROUNDS.NONE;
        MAX_MINT_AMOUNT = 0;
        MINT_FEE = 0;
        emit MintRoundClosed();
    }

    /// @dev Pause minting
    function pause() external onlyOwner {
        _pause();
    }

    /// @dev Unpause minting
    function unpause() external onlyOwner {
        _unpause();
    }

    /// @dev Withdraw funds from contract
    function withdraw(address to) external onlyOwner {
        payable(to).transfer(payable(address(this)).balance);
    }

    function mint(
        bytes32[] calldata proofs,
        uint256 amount
    ) external payable nonReentrant whenNotPaused {
        require(
            ROUND_ID != MINT_ROUNDS.NONE,
            "KookyKatsSale: No ongoing minting round"
        );
        require(amount > 0, "KookyKatsSale: Invalid mint amount");

        uint256 fee = MINT_FEE * amount;
        require(msg.value == fee, "KookyKatsSale: Invalid minting fee");

        uint256 mintedAmount = participants[ROUND_ID][_msgSender()] + amount;
        require(mintedAmount <= MAX_MINT_AMOUNT, "KookyKatsSale: Overflow");

        if (ROUND_ID != MINT_ROUNDS.PUBLIC_PAID_MINT) {
            require(
                MerkleProof.verify(
                    proofs,
                    KOOKY_KATS_WHITELIST,
                    keccak256(abi.encodePacked(_msgSender()))
                ),
                "KookyKatsSale: Only whitelisted users can participate"
            );
        }

        KOOKY_KATS.mint(_msgSender(), amount);
        participants[ROUND_ID][_msgSender()] = mintedAmount;
        emit Participated(ROUND_ID, _msgSender(), amount);
    }

    event Whitelisted(bytes32 indexed root);

    event SetKookyKats(address indexed kookykats);

    event MintRoundOpend(
        MINT_ROUNDS roundId,
        uint16 maxAmount,
        uint256 fee,
        bytes32 whitelist
    );

    event MintRoundClosed();

    event Participated(
        MINT_ROUNDS roundId,
        address indexed who,
        uint256 amount
    );
}
