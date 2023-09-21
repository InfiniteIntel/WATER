const RippleAPI = require('ripple-lib').RippleAPI;

// Configuration
const api = new RippleAPI({ server: 'wss://s1.ripple.com' }); // Use a suitable server

// Replace with your secret and contract owner's address
const contractOwnerSecret = 'CONTRACT_OWNER_SECRET';
const contractOwnerAddress = 'CONTRACT_OWNER_ADDRESS';

// Replace with the destination address for the commodity exchange
const exchangeAddress = 'EXCHANGE_ADDRESS';

async function createWaterExchangeOrder(amountInXRP) {
  try {
    // Connect to the XRP Ledger
    await api.connect();

    // Get contract owner's account info
    const contractOwnerAccount = await api.getAccountInfo(contractOwnerAddress);

    // Construct an order to sell water for XRP
    const order = {
      TransactionType: 'OfferCreate',
      Account: contractOwnerAccount.address,
      TakerGets: `${amountInXRP} XRP`, // Amount in XRP to receive
      TakerPays: '1 WATER', // Amount of WATER tokens to send
    };

    // Sign and submit the order
    const preparedOrder = await api.prepareOrder(contractOwnerAccount.address, order);
    const signedOrder = api.sign(preparedOrder.txJSON, contractOwnerSecret);
    const orderResult = await api.submit(signedOrder.signedTransaction);

    console.log('Order Result:', orderResult);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Disconnect from the XRP Ledger
    await api.disconnect();
  }
}

// Call the function to create a water exchange order
// Replace the amount with the desired amount in XRP
createWaterExchangeOrder(10);
