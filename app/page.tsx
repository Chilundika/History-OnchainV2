"use client";

import {
  useMiniKit,
  useAddFrame,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import {
  Name,
  Identity,
  Address,
  Avatar,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { useEffect, useMemo, useState, useCallback } from "react";
import { RewardsDisplay } from "./components/RewardsDisplay";

export default function App() {
  const { setFrameReady, isFrameReady, context } = useMiniKit();
  const [frameAdded, setFrameAdded] = useState(false);

  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleAddFrame = useCallback(async () => {
    const frameAdded = await addFrame();
    setFrameAdded(Boolean(frameAdded));
  }, [addFrame]);

  const saveFrameButton = useMemo(() => {
    if (context && !context.client.added) {
      return (
        <button
          onClick={handleAddFrame}
          className="text-[var(--app-accent)] hover:underline text-sm font-medium transition-colors"
        >
          Save Frame
        </button>
      );
    }

    if (frameAdded) {
      return (
        <div className="text-sm font-medium text-[var(--app-accent)] animate-fade-out">
          ✓ Saved
        </div>
      );
    }

    return null;
  }, [context, frameAdded, handleAddFrame]);

  return (
    <div className="flex flex-col min-h-screen font-sans text-[var(--app-foreground)] bg-[var(--app-background)]">
      {/* Header */}
      <div className="w-full max-w-md mx-auto px-4 py-4 border-b border-[var(--app-card-border)]">
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[var(--app-accent)] post-shadow flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-[var(--app-foreground)]">
                History Onchain
              </h1>
              <p className="text-xs text-[var(--app-foreground-muted)]">
                Discover • Learn • Earn
              </p>
            </div>
          </div>
          {saveFrameButton}
        </header>

        {/* Wallet Connection */}
        <div className="mt-4">
          <Wallet className="w-full">
            <ConnectWallet>
              <Name className="text-inherit" />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 py-6 space-y-6 overflow-y-auto pb-20">
        {/* Dashboard Link */}
        <div className="bg-[var(--app-card-bg)] border border-[var(--app-card-border)] rounded-2xl p-4 post-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[var(--app-foreground)]">📊 Full Dashboard</h2>
            <a
              href="/dashboard"
              className="px-4 py-2 bg-[var(--app-accent)] text-white rounded-lg hover:bg-[var(--app-accent-hover)] transition-colors text-sm font-medium"
            >
              Open Dashboard →
            </a>
          </div>
          <p className="text-sm text-[var(--app-foreground-muted)]">
            View your full progress, connect wallet with Base Pay, and use the advanced camera system
          </p>
        </div>
        
        <RewardsDisplay />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-md mx-auto px-4 py-4 border-t border-[var(--app-card-border)]">
        <button
          onClick={() => openUrl("https://base.org/builders/minikit")}
          className="text-[var(--app-foreground-muted)] text-xs hover:text-[var(--app-foreground)] transition-colors w-full text-center"
        >
          Built on Base with MiniKit
        </button>
      </footer>
    </div>
  );
}
