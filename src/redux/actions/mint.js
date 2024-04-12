import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mintAbi } from '../../../pages/nft/mintabi';

const stakingContractAddress = "0x3e3641e52c22dc0F49c3c769F975bCD3dF12c70e";
const stakingABI = [
  // ... Your ABI here ...
];

const StakingPage = () => {
  const [address, setAddress] = useState(null);
  const [nftCount, setNftCount] = useState(0);
  const [rewards, setRewards] = useState("0");
  const [nftTierStatus, setNftTierStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!window.ethereum) {
        console.error("MetaMask is not installed!");
        return;
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(stakingContractAddress, stakingABI, provider);
      const signer = provider.getSigner();

      try {
        const address = await signer.getAddress();
        setAddress(address);

        const nftCountData = await contract.getNftCount(address);
        setNftCount(parseInt(nftCountData.toString(), 10));

        const rewardsData = await contract.calculateRewards(address);
        setRewards(ethers.utils.formatEther(rewardsData.toString()).substring(0, 6));

        const nftTierStatusDataRaw = await contract.getUserNftTierStatus(address);
        const [tokenIds, currentTiers, daysUntilNextTier, bonusMultipliers] = nftTierStatusDataRaw;
        
        setNftTierStatus({
          tokenIds: tokenIds.map(Number),
          currentTiers: currentTiers.map(Number),
          daysUntilNextTier: daysUntilNextTier.map(Number),
          bonusMultipliers: bonusMultipliers.map(Number),
        });
      } catch (error) {
        console.error("Failed to fetch contract data:", error);
      }
    };

    fetchData();
  }, []);

  const claimRewards = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(stakingContractAddress, stakingABI, provider);
    const signer = provider.getSigner();

    try {
      const tx = await contract.connect(signer).claimRewards();
      await tx.wait();
      console.log("ClaimRewards success:", tx);
    } catch (error) {
      console.error("ClaimRewards error:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', fontSize: '1.5rem', position: 'relative', width: '100%', height: '100vh' }}>
      <button onClick={claimRewards} style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        Claim Rewards
      </button>
      {nftTierStatus && (
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div>NFT Count: {nftCount}</div>
          <div>Rewards: {rewards} ETH</div>
          {nftTierStatus.tokenIds.map((tokenId, index) => (
            <div key={tokenId}>
              <div>Token ID: {tokenId}</div>
              <div>Current Tier: {nftTierStatus.currentTiers[index]}</div>
              <div>Days Until Next Tier: {nftTierStatus.daysUntilNextTier[index]}</div>
              <div>Bonus Multiplier: {nftTierStatus.bonusMultipliers[index]}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StakingPage;
