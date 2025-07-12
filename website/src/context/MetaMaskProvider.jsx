"use client";

import { createContext, useContext, useEffect, useState } from "react";

const MetaMaskContext = createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("MetaMask Provider initializing");

    const checkConnection = async () => {
      if (typeof window === "undefined") {
        console.log("Window is undefined, skipping MetaMask check");
        return;
      }

      const { ethereum } = window;
      if (!ethereum) {
        console.log("MetaMask not installed");
        setIsMetaMaskInstalled(false);
        setIsLoading(false);
        return;
      }

      try {
        console.log("Checking existing accounts");
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          console.log("Found account:", accounts[0]);
          setAccount(accounts[0]);
          await fetch("/api/auth/user/metamask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ metamaskAddress: accounts[0]}),
          });
          setIsConnected(true);
        } else {
          console.log("No accounts found");
        }
      } catch (err) {
        console.error("Failed to get accounts", err);
      } finally {
        setIsLoading(false);
        console.log("MetaMask initialization complete");
      }
    };

    const handleAccountsChanged = (accounts) => {
      console.log("Accounts changed:", accounts);
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        setAccount(null);
        setIsConnected(false);
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not installed");
      return;
    }

    try {
      console.log("Requesting wallet connection");
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Wallet connected:", accounts[0]);
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  };

  const disconnectWallet = () => {
    console.log("Disconnecting wallet");
    setAccount(null);
    setIsConnected(false);
  };

  return (
    <MetaMaskContext.Provider
      value={{
        account,
        isConnected,
        isMetaMaskInstalled,
        isLoading,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

// ✅ Fixed: Added back the error checking
export const useMetaMask = () => {
  const context = useContext(MetaMaskContext);
  if (!context) {
    throw new Error("useMetaMask must be used within a MetaMaskProvider");
  }
  return context;
};
