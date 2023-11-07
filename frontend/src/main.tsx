import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WagmiConfig, configureChains, createConfig  } from 'wagmi'
import { polygon, polygonMumbai } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
 
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon, polygonMumbai],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [
      new MetaMaskConnector({ chains })
  ]
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
        <App />
    </WagmiConfig>
  </React.StrictMode>,
)
