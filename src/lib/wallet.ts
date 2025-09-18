import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { CHAIN_ID, RPC_URL, WALLET_CONNECT_PROJECT_ID } from '../../config';

export const config = getDefaultConfig({
  appName: 'Private Grant Guard',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [sepolia],
  ssr: false,
});
