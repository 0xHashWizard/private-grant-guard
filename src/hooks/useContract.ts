import { useContract, useContractWrite, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';

// Contract ABI - this would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_treasury", "type": "address"},
      {"internalType": "address", "name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "student", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "institution", "type": "string"}
    ],
    "name": "ApplicationSubmitted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_studentName", "type": "string"},
      {"internalType": "string", "name": "_institution", "type": "string"},
      {"internalType": "string", "name": "_program", "type": "string"},
      {"internalType": "bytes", "name": "_requestedAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "_academicScore", "type": "bytes"},
      {"internalType": "bytes", "name": "_financialNeed", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "submitGrantApplication",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"internalType": "bool", "name": "isApproved", "type": "bool"},
      {"internalType": "string", "name": "reason", "type": "string"}
    ],
    "name": "reviewApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "applicationId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "disburseGrant",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address - this would be set after deployment
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual deployed address

export const usePrivateGrantGuard = () => {
  const { address } = useAccount();
  
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
  });

  const submitApplication = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'submitGrantApplication',
  });

  const reviewApplication = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'reviewApplication',
  });

  const disburseGrant = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'disburseGrant',
  });

  const getApplicationInfo = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getApplicationInfo',
  });

  return {
    contract,
    submitApplication,
    reviewApplication,
    disburseGrant,
    getApplicationInfo,
    isConnected: !!address,
    address,
  };
};
