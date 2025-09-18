# Private Grant Guard

A decentralized scholarship management platform built with FHE (Fully Homomorphic Encryption) for privacy-preserving grant applications and disbursements.

## Features

- **Privacy-First Design**: All sensitive data (academic scores, financial need, amounts) is encrypted using FHE
- **Decentralized Verification**: Academic records and applications are verified on-chain
- **Transparent Disbursements**: Grant funds are distributed transparently through smart contracts
- **Reputation System**: Students and institutions build reputation through verified interactions
- **Multi-Wallet Support**: Connect with Rainbow, MetaMask, and other popular wallets

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet), Solidity
- **Privacy**: Zama FHEVM for encrypted computations
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/0xHashWizard/private-grant-guard.git
cd private-grant-guard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment variables
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
```

4. Start the development server:
```bash
npm run dev
```

### Smart Contract Deployment

1. Install Hardhat dependencies:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @fhevm/solidity
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Update the contract address in your frontend configuration.

## Architecture

### Smart Contract Features

- **Encrypted Data Storage**: All sensitive information is stored as encrypted values
- **Role-Based Access**: Separate roles for students, verifiers, and treasury
- **Automated Workflows**: Application submission, review, and disbursement processes
- **Reputation Tracking**: On-chain reputation for students and institutions

### Frontend Features

- **Wallet Integration**: Seamless connection with multiple wallet providers
- **Responsive Design**: Mobile-first approach with modern UI components
- **Real-time Updates**: Live status updates for applications and disbursements
- **Privacy Indicators**: Clear visual indicators for encrypted data

## Security Considerations

- All sensitive data is encrypted using FHE before being stored on-chain
- Private keys are never exposed to the application
- Smart contracts include proper access controls and validation
- Regular security audits recommended for production deployment

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue on GitHub or contact the development team.

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Mobile application
- [ ] Integration with academic institutions
- [ ] Automated compliance reporting
