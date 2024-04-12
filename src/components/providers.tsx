// Assuming your Redux store is set up in a file that can be imported as below
import { Provider as ReduxProvider } from 'react-redux';
import store from '../redux/store'; // Adjust this import path to where your Redux store is defined

import { type ReactNode, useState, useEffect } from "react";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "../components/config";
import { ChakraProvider } from "@chakra-ui/react";


export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);  // This ensures that the component only mounts on the client side
  }, []);

  const queryClient = new QueryClient();

  const appInfo = {
    appName: "Next-Web3-Boilerplate",
  };

  return (
    <ReduxProvider store={store}> {/* Wrap everything in ReduxProvider */}
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <RainbowKitProvider  theme={darkTheme({
                  accentColor: '#7b3fe4',
                  accentColorForeground: 'white',
                  borderRadius: 'small',
                  fontStack: 'system',
                  overlayBlur: 'small',
                })}
               
              >
            {mounted && children}
          </RainbowKitProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ReduxProvider>
  );
}
