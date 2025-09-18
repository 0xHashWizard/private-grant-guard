const { ethers } = require("hardhat");

async function main() {
  // Get the contract factory
  const PrivateGrantGuard = await ethers.getContractFactory("PrivateGrantGuard");
  
  // Deploy the contract with treasury and verifier addresses
  const treasury = "0x742d35Cc6ab4502532C3C4031fcE8aF4c40B1b6a"; // Replace with actual treasury address
  const verifier = "0x8ba1f109551bD432803012645Hac136c"; // Replace with actual verifier address
  
  console.log("Deploying PrivateGrantGuard...");
  const privateGrantGuard = await PrivateGrantGuard.deploy(treasury, verifier);
  
  await privateGrantGuard.waitForDeployment();
  
  const contractAddress = await privateGrantGuard.getAddress();
  console.log("PrivateGrantGuard deployed to:", contractAddress);
  
  // Save contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    treasury: treasury,
    verifier: verifier,
    network: "sepolia"
  };
  
  fs.writeFileSync('./contract-address.json', JSON.stringify(contractInfo, null, 2));
  console.log("Contract info saved to contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
