import {contract} from './webthreesetup'
const BADGE_METADATA = {
  "eco-hero": "ipfs://bafkreifz6ligifhpgfhmgjxqmjufuqgvhptormdbbsxcciigjgrdu26wji",
  "top-lister": "ipfs://bafkreidgyxdx5s636iyfigjfmiezqdoqtepicodycn2gkfdw4hmxf67x64", 
  "golden-reputation": "ipfs://bafkreig7uxpbgxsoifhd7cxhzphxmfemf5qf6ja6xlszbvopbpvmt4ywsa"
};

const GET_BADGE_URL = {
   "eco-hero": "https://aquamarine-urban-firefly-16.mypinata.cloud/ipfs/bafkreifz6ligifhpgfhmgjxqmjufuqgvhptormdbbsxcciigjgrdu26wji",
  "top-lister": "https://aquamarine-urban-firefly-16.mypinata.cloud/ipfs/bafkreidgyxdx5s636iyfigjfmiezqdoqtepicodycn2gkfdw4hmxf67x64", 
  "golden-reputation": "https://aquamarine-urban-firefly-16.mypinata.cloud/ipfs/bafkreig7uxpbgxsoifhd7cxhzphxmfemf5qf6ja6xlszbvopbpvmt4ywsa"
}

function getURLfromBadgeName(badgeName){
    return GET_BADGE_URL[badgeName]
}

async function mintBadgeToUser(walletAddress, badgeName) {
  try {
    const metadataURI = BADGE_METADATA[badgeName];
    
    if (!metadataURI) {
      throw new Error(`Badge "${badgeName}" not found`);
    }

    console.log(`Minting ${badgeName} to ${walletAddress}...`);
    
    // Call smart contract function
    const tx = await contract.awardBadge(walletAddress, badgeName, metadataURI);
    
    console.log(`Transaction sent: ${tx.hash}`);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    
    console.log(`✅ Badge minted! Gas used: ${receipt.gasUsed}`);
    
    return {
      success: true,
      transactionHash: tx.hash,
      tokenId: parseInt(receipt.logs[0]?.topics[3], 16) // Extract token ID from event
    };
    
  } catch (error) {
    console.error(`Failed to mint badge:`, error);
    throw error;
  }
}

async function checkUserHasBadge(walletAddress, badgeName) {
  try {
    return await contract.hasBadge(walletAddress, badgeName);
  } catch (error) {
    console.error('Error checking badge:', error);
    return false;
  }
}

async function getUserBadgeCount(walletAddress) {
  try {
    const badgeTokenIds = await contract.getUserBadges(walletAddress);
    return badgeTokenIds.length;
  } catch (error) {
    console.error('Error getting badge count:', error);
    return 0;
  }
}
async function getAllBadgesForUser(walletAddress) {
  const tokenIds = await contract.getUserBadges(walletAddress);
  const badges = await Promise.all(tokenIds.map(id => contract.getBadgeDetails(id)));
  return badges.map(b => ({ 
    name: b.name, 
    timestamp: b.timestamp.toString(), 
    url: getURLfromBadgeName(b.name)}));
}


export {
  mintBadgeToUser,
  checkUserHasBadge,
  getUserBadgeCount,
  getAllBadgesForUser
};