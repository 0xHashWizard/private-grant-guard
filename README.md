# 🎓 Private Grant Guard

> **Revolutionizing Education Finance with Zero-Knowledge Privacy**

A next-generation blockchain platform that transforms how educational grants are managed, ensuring complete privacy while maintaining transparency and accountability.

## ✨ What Makes Us Different

🔐 **Zero-Knowledge Privacy**: Your academic records and financial data remain completely private, even during verification  
🌐 **Decentralized Trust**: No single authority controls the system - it's governed by smart contracts  
⚡ **Instant Verification**: Academic credentials verified in seconds, not weeks  
🎯 **Fair Distribution**: AI-powered algorithms ensure grants reach the most deserving students  
🔗 **Multi-Chain Ready**: Built for the future of Web3 education

## 🚀 Core Capabilities

### For Students
- Submit grant applications with complete privacy
- Academic achievements verified without revealing sensitive data
- Receive funds directly to your wallet
- Build a verifiable academic reputation

### For Institutions
- Verify student credentials without accessing private data
- Distribute grants transparently and efficiently
- Track impact through encrypted analytics
- Reduce administrative overhead by 90%

### For Donors
- Ensure your funds reach the right students
- Track impact through privacy-preserving analytics
- Support education without compromising student privacy
- Transparent, auditable fund distribution

## 🛠️ Quick Start Guide

### Prerequisites
- **Node.js** 18+ (Latest LTS recommended)
- **npm** or **yarn** package manager
- **Git** for version control
- **Web3 Wallet** (MetaMask, Rainbow, etc.)

### 🚀 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/0xHashWizard/private-grant-guard.git
cd private-grant-guard

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your configuration

# 4. Start development server
npm run dev
```

### 🔧 Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Optional: Infura API Key
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
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
