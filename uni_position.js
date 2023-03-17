const Web3 = require('web3');

// Connect to Ethereum node
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/18bd809b41dc4037b2058f54f1a58e76'));

// Set the pool contract address and token address
const poolContractAddress = '0xc43102992464930c1b7b6e62e961553053ca1377';
const tokenAddress = '0xd502f487e1841fdc805130e13eae80c61186bc98';

// ABI for ERC20 `balanceOf` function
const balanceOfAbi = {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
};

// Create contract object for pool and token contracts
const poolContract = new web3.eth.Contract([balanceOfAbi], poolContractAddress);
const tokenContract = new web3.eth.Contract([balanceOfAbi], tokenAddress);

// Get the balance of tokens locked in the pool contract
tokenContract.methods.balanceOf(poolContract.options.address).call().then((balance) => {
    // Format balance with 18 decimal places
    const formattedBalance = balance / (10 ** 18);
    console.log(`Balance: ${formattedBalance}`);
  });