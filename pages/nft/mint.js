// pages/api/mint.js
import { ethers } from 'ethers';
import mintAbi from '../../src/nft/mintabi';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { quantity, totalPrice } = req.body;
    try {
      const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
      const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
      const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, mintAbi, wallet);
      const tx = await contract.mint(quantity, { value: totalPrice });
      await tx.wait();
      res.status(200).json({ success: true, hash: tx.hash });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
