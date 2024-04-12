import * as React from "react";
//import { type FC } from "react";
import { useState, useEffect, } from "react";
import Link from "next/link";
import {  Button, Alert, AlertIcon } from "@chakra-ui/react";
import { writeContract, readContract, watchContractEvent,  } from "@wagmi/core";
import { ethers } from "ethers";
import { useAccount} from "wagmi";
import Layout from "../src/layout/Layout";
import { wagmiConfig } from "../src/components/config";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';




interface NFTAttribute {
  trait_type: string;
  value: string;
}

// This might be a more detailed type depending on the actual shape of your NFT metadata.
interface NFTMetadata {
  image: string;
  attributes: NFTAttribute[] | Record<string, unknown>;
}


const MintNFT = () => {
  const { address: ethAddress, isConnected } = useAccount();
  const [mintInfo, setMintInfo] = useState({ tokenId: '', tokenURI: '' });
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const [nftImage, setNftImage] = useState<string | null>(null);
  const [nftAttributes, setNftAttributes] = useState<NFTAttribute[]>([]);
  const [totalMinted, setTotalMinted] = useState<number | null>(null);
  const [maxSupply, setMaxSupply] = useState<number | null>(null);
  const nftImages = [/* ... array of NFT image URLs ... */];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalMintedResponse = await readContract(wagmiConfig, {
          address: '0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b',
          abi: mintAbi,
          functionName: 'totalSupply',
        });
        // You must properly handle the response type here
        const totalMinted = Number(totalMintedResponse);
        setTotalMinted(totalMinted);
  
        const maxSupplyResponse = await readContract(wagmiConfig, {
          address: '0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b',
          abi: mintAbi,
          functionName: 'maxSupply',
        });
        // Similarly, handle the maxSupply response type
        const maxSupply = Number(maxSupplyResponse);
        setMaxSupply(maxSupply);
      } catch (error) {
        console.error('Error fetching data from the contract:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const unwatch = watchContractEvent(wagmiConfig, {
      address: '0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b',
      abi: mintAbi,
      eventName: 'TokenMinted',
      onLogs: (logs) => {
        console.log('New logs!', logs);
        // Assuming the first log is the one we're interested in
        // This approach might not work directly due to type limitations
        const event: any = logs[0]; // Use any to bypass the type system (not recommended)
        if (event) {
          const tokenId = event.args.tokenId.toString();
          readContract(wagmiConfig,{
            address: '0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b',
            abi: mintAbi,
            functionName: 'tokenURI',
            args: [tokenId],
          }).then((tokenURI: any) => { // Use any to bypass the type system (not recommended)
            const uri = tokenURI as string; // Asserting to string
            setMintInfo({ tokenId, tokenURI: uri });
            fetchMetadata(uri);
          }).catch(error => {
            console.error('Failed to fetch token URI:', error);
            setMintError('Failed to fetch token URI');
          });
        }
      },
      onError: (error) => {
        console.error('Event watching error:', error);
        setMintError('Error watching mint events');
      }
    });
  
    return () => unwatch();
  }, []);

  const fetchMetadata = async (tokenURI: string) => {
    try {
      const response = await axios.get(tokenURI);
      const metadata = response.data;
      setNftImage(metadata.image);
  
      // Initialize an empty array for the traits
      let traits: NFTAttribute[] = [];
  
      // Handle 'object_traits' which is an array of objects
      if (metadata.attributes?.object_traits) {
        traits = metadata.attributes.object_traits.map((trait: Record<string, string>) => {
          const [traitType, value] = Object.entries(trait)[0];
          return { trait_type: traitType, value: value };
        });
      }
  
      // Handle 'personality' trait, if it exists
      if (metadata.attributes?.personality) {
        traits.push({ trait_type: 'personality', value: metadata.attributes.personality });
      }
  
      // Update the state with the new traits array
      setNftAttributes(traits);
    } catch (error) {
      console.error('Failed to fetch metadata:', error);
      setMintError('Failed to fetch metadata. Check console for details.');
    }
  };
  
  
  // Error display timeout function
  
  const increaseQuantity = () => {
    setMintAmount((prevAmount) => (prevAmount < 5 ? prevAmount + 1 : prevAmount)); // Max 5 mints per wallet
  };

  const decreaseQuantity = () => {
    setMintAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : prevAmount)); // Min 1 mint
  };
  

  const handleMint = async (mintType: "FLR" | "FREE") => {
    setIsMinting(true);
    setMintError(null);

    try {
      let result;
      const ethPrice = 50;
      const totalCostInEther = (ethPrice * mintAmount).toString();
      const totalCostInWei = ethers.parseUnits(totalCostInEther, "ether");

      if (mintType === "FLR") {
        result = await writeContract(wagmiConfig,{
          
          abi: mintAbi,
          address: "0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b",
          functionName: "mintWithFLR",
          args: [ethAddress, mintAmount],
          value: totalCostInWei,
        });
      } else {
        result = await writeContract(wagmiConfig,{
        
          abi: mintAbi,
          address: "0x1Ab19146ec7eA9fc8156C6629cc73D7B0f56922b",
          functionName: "freeMint",
          args: [mintAmount],
        });
      }
      console.log("Transaction hash:", result);

    } catch (error) {
      console.error(`Error during ${mintType} minting:`, error);
      
    } finally {
      setIsMinting(false);
    }
  };



  if (!isConnected) {
    return (
      <Alert status="warning">
        <AlertIcon />
        Please connect your wallet.
      </Alert>
    );
  }





  return (
    <Layout pageTitle="Minting">
      <div className="metaportal_fn_mintpage">
        
          
            
              
              
             
              
            </div>
          
          {/* !Mint Top */}
          {/* Mint Box */}
          <div className="metaportal_fn_mintbox" style={{ marginTop: '200px', width: '80%', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)',}}>
            <div className="mint_left">
              <div className="mint_title"style={{ marginTop: '350px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <span>Public Mint is Live</span>
              </div>
              <div className="mint_list">
                <ul>
                  <li>
                    <div className="item">
                      <h4>Price</h4>
                      <h3>200 FLR</h3>
                    </div>
                  </li>
                  <li>
                    <div className="item">
                    <h4>Total Minted</h4>
                    <h3>{`${totalMinted}/${maxSupply}`}</h3>
                    </div>
                  </li>
                  <li>
                  <div className="item">
                      <h4>Quantity</h4>
                      <div className="qnt">
                        <button onClick={decreaseQuantity}>-</button>
                        <span className="summ">{mintAmount}</span>
                        <button onClick={increaseQuantity}>+</button>
                      </div>
                    </div>
                        </li>
                  <li>
                    <div className="item">
                    <h4>Total Price</h4>
                     <h3>{(200 * mintAmount).toFixed(2)} FLR</h3> {/* Assuming FLR is the currency */}
                    </div>
                  </li>
                </ul>
              </div>
              <div className="mint_desc">
              <Button onClick={() => handleMint("FLR")}>Mint NFT</Button>
              
                  
                
                <p>
                  By clicking “MINT NOW” button, you agree to our{" "}
                  <a href="#">Terms of Service</a> and our{" "}
                  <a href="#">Privacy Policy</a>.
                </p>
              </div>
              <div className="metaportal_fn_share" style={{ float: 'right', zIndex: '5', }}>
                <h5 className="label">Share:</h5>
                <ul>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/twitter-1.svg"
                        alt=""
                        className="fn__svg"
                        
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/facebook-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="/svg/social/instagram-1.svg"
                        alt=""
                        className="fn__svg"
                      />
                    </a>
                  </li>
                  
                  
                </ul>
              </div>
            </div>
            <div className="mint_right">
              <div className="img">
              {nftImage ? (
              <img src={nftImage} alt="Minted NFT" style={{ zIndex: '0', position: 'relative', boxShadow: '5px 5px 5px grey', border: '2px solid purple', borderRadius: '15px' }} />
            ) : (
              <p>Mint Will Appear Here</p>
            )}
                <div className="mint_checked">
                 
                </div>
                <div className="mint_info">
                  
                </div>
              </div>
            </div>
          </div>
          {/* !Mint Box */}
          <div className="metaportal_fn_nft_cats"style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '2px purple', borderRadius: '10px',}}>
  {nftAttributes.length > 0 ? (
    <ul>
      {nftAttributes.map((attr, index) => (
        <li key={index}>
          <div className="item">
            <h4 className="parent_category">{attr.trait_type}</h4>
            <h3 className="child_category" title={attr.value}>
              {attr.value}
            </h3>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No traits available for this NFT.</div>
              )}
            </div>
          {/* Similar Items */}
          <div className="metaportal_fn_similar" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', border: '2px purple', borderRadius: '10px',}}>
            <h3 className="fn__maintitle" data-text="Similar Items">
              Similar Items
            </h3>
            <div className="fn_cs_divider">
              <div className="divider">
                <span />
                <span />
              </div>
            </div>
            <div className="metaportal_fn_drops">
              <ul className="grid">
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/1.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4588</a>
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/2.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4587</a>
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/3.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4586</a>
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/4.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4585</a>
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/5.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4584</a>
                      </h3>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="nft__item">
                    <div className="img_holder">
                      <img src="/img/drops/6.jpg" alt="" />
                      <Link href="/nft-single">
                        <a className="full_link" />
                      </Link>
                    </div>
                    <div className="title_holder">
                      <h3 className="fn_title">
                        <a href="#">Lilcootie #4583</a>
                      </h3>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* !Similar Items */}
        
      
    </Layout>
  );
};
export default MintNFT;
const mintAbi = [
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
