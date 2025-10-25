'use client';

import { useState, useEffect } from 'react';
import CameraComponent from '@/components/CameraComponent';
import { connectWallet, makeBasePayment } from '@/lib/basepay';
import { fetchUserProfile, updateDiscovery } from '@/lib/supabaseApi';

export default function Dashboard() {
  const [showCamera, setShowCamera] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [userData, setUserData] = useState({ level: 1, points: 0, discoveries: 0 });
  const [isConnecting, setIsConnecting] = useState(false);

  // Fetch persisted user data if wallet is connected
  useEffect(() => {
    if (walletAddress) {
      fetchUserProfile(walletAddress).then((data) => {
        if (data) setUserData(data);
      });
    }
  }, [walletAddress]);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (err) {
      console.error(err);
      const error = err as Error;
      alert(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePayment = async () => {
    setIsPaying(true);
    try {
      await makeBasePayment();
      alert('Payment successful! 🎉');
    } catch (err) {
      console.error(err);
      alert('Payment failed. Please try again.');
    } finally {
      setIsPaying(false);
    }
  };

  const handleDiscoveryCaptured = async (imageData: string) => {
    // Simulate recognition + update Supabase
    const updated = await updateDiscovery(walletAddress, imageData);
    if (updated) {
      setUserData(updated);
      alert('Monument discovered! +25 points awarded! 🎉');
    } else {
      // Fallback to local update if Supabase is not available
      const newDiscoveries = userData.discoveries + 1;
      const newPoints = userData.points + 25;
      const newLevel = Math.floor(newPoints / 100) + 1;
      setUserData({ level: newLevel, points: newPoints, discoveries: newDiscoveries });
      alert('Monument discovered! +25 points awarded! 🎉');
    }
    setShowCamera(false);
  };

  if (showCamera)
    return <CameraComponent onClose={() => setShowCamera(false)} onCapture={handleDiscoveryCaptured} />;

  const progressPercentage = Math.min((userData.discoveries / 10) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">History Onchain</h1>
        <p className="text-gray-600">Discover monuments, learn history, earn rewards</p>
      </div>

      {/* User Progress Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 w-full max-w-md border border-gray-100">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-1">Level {userData.level}</p>
          <h2 className="text-indigo-600 text-4xl font-bold mb-2">{userData.points} Points</h2>
          <p className="text-sm text-gray-600 mb-4">{userData.discoveries} Discoveries</p>
          
          {/* Progress Bar */}
          <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {10 - userData.discoveries} more discoveries until next level
          </p>
        </div>
      </div>

      {/* Base Pay Wallet Card */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6 w-full max-w-md border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-2 text-lg">Base Pay</h3>
        <p className="text-gray-600 mb-4 text-sm">Seamless USDC payments on Base Mainnet</p>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-gray-700">
          <div className="flex items-center justify-between">
            <span>Payment Amount:</span>
            <span className="font-semibold text-indigo-600">$0.01 USD</span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span>Network:</span>
            <span className="font-semibold">Base Mainnet</span>
          </div>
        </div>

        {!walletAddress ? (
          <button
            onClick={handleConnectWallet}
            disabled={isConnecting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white w-full py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isConnecting ? 'Connecting...' : 'Sign in with Base'}
          </button>
        ) : (
          <>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4 text-sm">
              <div className="text-gray-600 mb-1">Connected Wallet:</div>
              <div className="font-mono text-xs text-gray-800 break-all">
                {walletAddress}
              </div>
            </div>
            <button
              disabled={isPaying}
              onClick={handlePayment}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white w-full py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isPaying ? 'Processing Payment…' : 'Send $0.01 USDC'}
            </button>
          </>
        )}
      </div>

      {/* Discovery Section */}
      <div className="bg-white shadow-xl rounded-2xl p-6 text-center w-full max-w-md border border-gray-100">
        <div className="text-indigo-600 mb-3 flex justify-center">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2 text-lg">Start Your Discovery</h3>
        <p className="text-gray-600 text-sm mb-6">
          Point your camera at a historical monument to learn about its history and earn points!
        </p>
        <button
          onClick={() => setShowCamera(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 w-full shadow-lg"
        >
          📷 Start Camera
        </button>
      </div>

      {/* Footer */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        Explore history, one monument at a time. 🏛️
      </p>
    </div>
  );
}
