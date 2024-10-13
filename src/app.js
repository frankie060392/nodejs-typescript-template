/**
 * The following lines intialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
import * as dotenv from 'dotenv';
dotenv.config();
import { Account, ProgramManager, AleoKeyProvider, NetworkRecordProvider, AleoNetworkClient } from '@provablehq/sdk';

export const sum = (a, b) => {
  return a + b;
};
(async function() {
  try {

    // Initialize a program manager with the key provider to automatically fetch keys for executions
    const USER_1_ADDRESS = "aleo1zj7shg6l7vlru8k5exe26yl8hmvdwk8s9vwjuxnq3tn04pxgmyysvfaycs";
    const sendAdd = "aleo1dm7fgexyrn02vqsvrlw42q6dqnlkvt3hsmcx4ejvl7mgnqnulgrqtz4cqv"
    // Step 1: Initialize the Aleo account with private key

    const account = new Account({
      privateKey: process.env.KEY,
    });
    const keyProvider = new AleoKeyProvider();

    const networkClient = new AleoNetworkClient("https://api.explorer.aleo.org/v1");
    // Step 3: Create a record provider to manage transaction records
    const recordProvider = new NetworkRecordProvider(account, networkClient);
    const programManager = new ProgramManager("https://api.explorer.aleo.org/v1", keyProvider, recordProvider);
    // Step 4: Initialize a program manager to execute Aleo programs
    programManager.setAccount(account);
    console.log(123123)

    // Check the value of your public balance
    const public_balance = await programManager.networkClient.getProgramMappingValue("credits.aleo", "account", sendAdd);

    console.log("🚀 ~ public_balance:", public_balance)

    const txId = await programManager.transfer(0.1, USER_1_ADDRESS, "transfer_public", 0.2);
    console.log(23123)
    // Step 6: Confirm the transaction by checking the status
    const transaction = await programManager.networkClient.getTransaction(txId);
    console.log(`Transaction ID: ${transaction}`);
    return {
      txid: txId
    }
  } catch (error) {
    console.log("🚀 ~ BlockchainService ~ sendAleoTx ~ error:", error)
    return error
  }
})()
