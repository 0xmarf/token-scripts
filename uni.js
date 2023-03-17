const Web3 = require('web3');
const NonfungiblePositionManager = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json');

async function main() {
  // Connect to Ethereum node
  const web3 = new Web3(new Web3.providers.HttpProvider('YOUR_API_KEY'));

    // Set the pool contract address and token address
    const poolContractAddress = '';
    const tokenAddress = '';

  // Create contract object for position manager
  const positionManagerContract = new web3.eth.Contract(
    NonfungiblePositionManager.abi,
    positionManagerAddress
  );

  // Get the token addresses and balances of the tokens held in the position
  const [token0Address, token1Address, token0Balance, token1Balance, _, _] = await positionManagerContract.methods.getPosition(positionId).call();


  // Create contract objects for the token contracts
  const token0Contract = new web3.eth.Contract(balanceOfAbi, token0Address);
  const token1Contract = new web3.eth.Contract(balanceOfAbi, token1Address);

  // Get the balances of the tokens held in the position
    const token0BalancePosition = await token0Contract.methods.balanceOf(positionManagerAddress).call();
    const token1BalancePosition = await token1Contract.methods.balanceOf(positionManagerAddress).call();

    console.log(`Token0 balance in the position: ${token0BalancePosition}`);
    console.log(`Token1 balance in the position: ${token1BalancePosition}`);
}

main();

