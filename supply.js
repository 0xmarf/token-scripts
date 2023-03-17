// Import web3 library
const Web3 = require('web3');

// Connect to an Ethereum node
const web3 = new Web3('YOUR_NODE_URL');

// Define ERC20 interface
const ERC20 = require('./ERC20.json');


// Define token contract address
const tokenAddress = 'TOKEN_ADDRESS';

// Create token contract instance
const tokenContract = new web3.eth.Contract(ERC20, tokenAddress);

// Define addresses that hold non-circulating tokens
const nonCirculatingAddresses = ['CONTRACT_ADDRESS', 'CONTRACT_ADDRESS'];

// Get total supply of tokens
tokenContract.methods.totalSupply().call().then(totalSupply => {
  // Convert total supply from wei to ether
  totalSupply = web3.utils.fromWei(totalSupply);

  // Initialize circulating supply as total supply
  let circulatingSupply = totalSupply;

  // Initialize array to store promises for balance calls
  let balancePromises = [];

  // Loop through non-circulating addresses and add promises for balance calls
  for (let address of nonCirculatingAddresses) {
    let balancePromise = tokenContract.methods.balanceOf(address).call().then(balance => {
      // Convert balance from wei to ether
      balance = web3.utils.fromWei(balance);

      // Return balance as a number
      return Number(balance);
    });
    balancePromises.push(balancePromise);
  }

  // Wait for all balance calls to finish
  Promise.all(balancePromises).then(balances => {
    // Subtract balances from circulating supply
    for (let balance of balances) {
      circulatingSupply -= balance;
    }

    // Log circulating supply in console
    console.log('Circulating Supply: ' + circulatingSupply + ' tokens');
  });
});
