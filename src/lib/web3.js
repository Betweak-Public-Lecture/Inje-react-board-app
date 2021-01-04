import Web3 from 'web3';
import BusSafe from './BusSafe.json'

let web3 = undefined;
let smartContract = undefined;
if(window.ethereum !== undefined) {
  window.ethereum.enable();
  let provider = Web3.givenProvider;
  web3 = new Web3(provider);
  smartContract = new web3.eth.Contract(
    BusSafe.abi,
    BusSafe.networks[5777].address
  )
} else{
  alert("Please Install the Metamask.");
}




export {
  web3, smartContract
}

export default web3;
