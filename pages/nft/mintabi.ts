export const mintAbi = [
    {
      type: "constructor",
      inputs: [
        {
          type: "string",
          name: "initialBaseURI",
          internalType: "string",
        },
        {
          type: "address",
          name: "initialOwner",
          internalType: "address",
        },
        {
          type: "address[]",
          name: "accounts",
          internalType: "address[]",
        },
        {
          type: "uint256[]",
          name: "freeMintCounts",
          internalType: "uint256[]",
        },
        {
          type: "uint256",
          name: "initialEthPrice",
          internalType: "uint256",
        },
        {
          type: "bool",
          name: "initialUseERC20Payment",
          internalType: "bool",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "LEADERBOARD_SIZE",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "addCurrency",
      inputs: [
        {
          type: "address",
          name: "_payToken",
          internalType: "contract IERC20",
        },
        {
          type: "uint256",
          name: "_costValue",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "payToken",
          internalType: "contract IERC20",
        },
        {
          type: "uint256",
          name: "costValue",
          internalType: "uint256",
        },
      ],
      name: "allowedCrypto",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "approve",
      inputs: [
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "balanceOf",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      name: "baseExtension",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      name: "baseURI",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "burn",
      inputs: [
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "freeMint",
      inputs: [
        {
          type: "uint256",
          name: "_mintAmount",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "freeMints",
      inputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      name: "getApproved",
      inputs: [
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      name: "isApprovedForAll",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
        {
          type: "address",
          name: "operator",
          internalType: "address",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      name: "isPresaleActive",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "holder",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "count",
          internalType: "uint256",
        },
      ],
      name: "leaderboard",
      inputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "maxMintAmount",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "maxSupply",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "mintWithERC20",
      inputs: [
        {
          type: "address",
          name: "_to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "_mintAmount",
          internalType: "uint256",
        },
        {
          type: "uint256",
          name: "_pid",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "payable",
      outputs: [],
      name: "mintWithFLR",
      inputs: [
        {
          type: "address",
          name: "_to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "_mintAmount",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      name: "name",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      name: "owner",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      name: "ownerOf",
      inputs: [
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "pause",
      inputs: [
        {
          type: "bool",
          name: "_state",
          internalType: "bool",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      name: "paused",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "renounceOwnership",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "address",
          name: "",
          internalType: "address",
        },
      ],
      name: "royaltyAccount",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "royaltyPercentage",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "safeTransferFrom",
      inputs: [
        {
          type: "address",
          name: "from",
          internalType: "address",
        },
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "safeTransferFrom",
      inputs: [
        {
          type: "address",
          name: "from",
          internalType: "address",
        },
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
        {
          type: "bytes",
          name: "data",
          internalType: "bytes",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setApprovalForAll",
      inputs: [
        {
          type: "address",
          name: "operator",
          internalType: "address",
        },
        {
          type: "bool",
          name: "approved",
          internalType: "bool",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setBaseExtension",
      inputs: [
        {
          type: "string",
          name: "_newBaseExtension",
          internalType: "string",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setBaseURI",
      inputs: [
        {
          type: "string",
          name: "_newBaseURI",
          internalType: "string",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setEthPrice",
      inputs: [
        {
          type: "uint256",
          name: "_newEthPrice",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setMaxMintAmount",
      inputs: [
        {
          type: "uint256",
          name: "_newMaxMintAmount",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setPresaleState",
      inputs: [
        {
          type: "bool",
          name: "_state",
          internalType: "bool",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "setRoyaltyInfo",
      inputs: [
        {
          type: "address",
          name: "_royaltyAccount",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "_royaltyPercentage",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      name: "supportsInterface",
      inputs: [
        {
          type: "bytes4",
          name: "interfaceId",
          internalType: "bytes4",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      name: "symbol",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "toggleERC20Payment",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "tokenByIndex",
      inputs: [
        {
          type: "uint256",
          name: "index",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "tokenOfOwnerByIndex",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "index",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "string",
          name: "",
          internalType: "string",
        },
      ],
      name: "tokenURI",
      inputs: [
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256",
          name: "",
          internalType: "uint256",
        },
      ],
      name: "totalSupply",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "transferFrom",
      inputs: [
        {
          type: "address",
          name: "from",
          internalType: "address",
        },
        {
          type: "address",
          name: "to",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "transferOwnership",
      inputs: [
        {
          type: "address",
          name: "newOwner",
          internalType: "address",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "bool",
          name: "",
          internalType: "bool",
        },
      ],
      name: "useERC20Payment",
      inputs: [],
    },
    {
      type: "function",
      stateMutability: "view",
      outputs: [
        {
          type: "uint256[]",
          name: "",
          internalType: "uint256[]",
        },
      ],
      name: "walletOfOwner",
      inputs: [
        {
          type: "address",
          name: "_owner",
          internalType: "address",
        },
      ],
    },
    {
      type: "function",
      stateMutability: "nonpayable",
      outputs: [],
      name: "withdraw",
      inputs: [
        {
          type: "uint256",
          name: "_pid",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "event",
      name: "Approval",
      inputs: [
        {
          type: "address",
          name: "owner",
          indexed: true,
        },
        {
          type: "address",
          name: "approved",
          indexed: true,
        },
        {
          type: "uint256",
          name: "tokenId",
          indexed: true,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ApprovalForAll",
      inputs: [
        {
          type: "address",
          name: "owner",
          indexed: true,
        },
        {
          type: "address",
          name: "operator",
          indexed: true,
        },
        {
          type: "bool",
          name: "approved",
          indexed: false,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "NftTransfer",
      inputs: [
        {
          type: "address",
          name: "from",
          indexed: true,
        },
        {
          type: "address",
          name: "to",
          indexed: true,
        },
        {
          type: "uint256",
          name: "tokenId",
          indexed: true,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          type: "address",
          name: "previousOwner",
          indexed: true,
        },
        {
          type: "address",
          name: "newOwner",
          indexed: true,
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        {
          type: "address",
          name: "from",
          indexed: true,
        },
        {
          type: "address",
          name: "to",
          indexed: true,
        },
        {
          type: "uint256",
          name: "tokenId",
          indexed: true,
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AddressEmptyCode",
      inputs: [
        {
          type: "address",
          name: "target",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "AddressInsufficientBalance",
      inputs: [
        {
          type: "address",
          name: "account",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721EnumerableForbiddenBatchMint",
      inputs: [],
    },
    {
      type: "error",
      name: "ERC721IncorrectOwner",
      inputs: [
        {
          type: "address",
          name: "sender",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InsufficientApproval",
      inputs: [
        {
          type: "address",
          name: "operator",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidApprover",
      inputs: [
        {
          type: "address",
          name: "approver",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidOperator",
      inputs: [
        {
          type: "address",
          name: "operator",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidOwner",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidReceiver",
      inputs: [
        {
          type: "address",
          name: "receiver",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721InvalidSender",
      inputs: [
        {
          type: "address",
          name: "sender",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721NonexistentToken",
      inputs: [
        {
          type: "uint256",
          name: "tokenId",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "ERC721OutOfBoundsIndex",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
        {
          type: "uint256",
          name: "index",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "FailedInnerCall",
      inputs: [],
    },
    {
      type: "error",
      name: "OwnableInvalidOwner",
      inputs: [
        {
          type: "address",
          name: "owner",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "OwnableUnauthorizedAccount",
      inputs: [
        {
          type: "address",
          name: "account",
          internalType: "address",
        },
      ],
    },
    {
      type: "error",
      name: "ReentrancyGuardReentrantCall",
      inputs: [],
    },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [
        {
          type: "address",
          name: "token",
          internalType: "address",
        },
      ],
    },
  ];
  