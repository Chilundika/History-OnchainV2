import { ethers } from 'ethers';

// Connect to wallet on Base Mainnet
export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error('MetaMask not detected. Please install MetaMask.');
  }
  
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const address = accounts[0];
  console.log('Connected wallet:', address);
  return address;
}

// Simulate a micropayment on Base Pay
export async function makeBasePayment(): Promise<void> {
  console.log('Simulating Base Pay payment...');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('Payment simulated successfully.');
  
  // In production, this would:
  // 1. Create a Base Pay transaction
  // 2. Send $0.01 USD as USDC on Base Mainnet
  // 3. Handle transaction hash and receipts
}
