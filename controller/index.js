require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.API_URL;

const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/myNft.sol/MyNFT.json");
const contractAddress = "0x7B5c05708decd1F4C14C0ae28380Ca0AB40BEbeF";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

exports.mint = async (req, res) => {
  try {
    const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce
    const tx = {
      from: req.body.publickey,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 2999999987,
      data: nftContract.methods
        .mintNFT(req.body.address, req.body.tokenUri)
        .encodeABI(),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    let latest_block = await web3.eth.getBlockNumber();
    const events = await nftContract.getPastEvents(
      "Transfer", // change if your looking for a different event
      { fromBlock: "latest", toBlock: "latest" }
    );
    return res.status(200).json({ events });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.transferfrom = async (req, res) => {
  try {
    const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce
    console.log(nonce);
    //the transaction
    const tx = {
      from: req.body.publickey,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 2999999987,
      data: nftContract.methods
        .transferFrom(
          req.body.addressfrom,
          req.body.addressto,
          req.body.tokenId
        )
        .encodeABI(),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
    return res.status(200).json({ transactionReceipt });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.transferOwnership = async (req, res) => {
  try {
    const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce
    console.log(nonce);
    //the transaction
    const tx = {
      from: req.body.publickey,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 2999999987,
      data: nftContract.methods
        .transferOwnership(req.body.addressto)
        .encodeABI(),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
    return res.status(200).json({ transactionReceipt });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.setApprovalForAll = async (req, res) => {
  try {
    const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce
    console.log(nonce);
    //the transaction
    const tx = {
      from: req.body.publickey,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      maxPriorityFeePerGas: 2999999987,
      data: nftContract.methods
        .setApprovalForAll(req.body.operatorAddress, req.body.approved)
        .encodeABI(),
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
    return res.status(200).json({ transactionReceipt });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.rentnft = async (req, res) => {
    try {
        const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce

        //the transaction
        const tx = {
          from: req.body.publickey,
          to: contractAddress,
          nonce: nonce,
          gas: 500000,
          maxPriorityFeePerGas: 2999999987,
          data: nftContract.methods
            .rentNFT(req.body.tokenId, req.body.address)
            .encodeABI(),
        };
      
        const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
        const transactionReceipt = await web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );
      
        console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
        return res.status(200).json({ transactionReceipt });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  
  exports.approve = async (req, res) => {
      try {
        const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce
      
        //the transaction
        const tx = {
          from: req.body.publickey,
          to: contractAddress,
          nonce: nonce,
          gas: 500000,
          maxPriorityFeePerGas: 2999999987,
          data: nftContract.methods
            .approve(req.body.address, req.body.tokenId)
            .encodeABI(),
        };
      
        const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
        const transactionReceipt = await web3.eth.sendSignedTransaction(
          signedTx.rawTransaction
        );
      
        console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
        return res.status(200).json({ transactionReceipt });
        
    } catch (err) {
      return res.status(400).json({ err });
    }
  };



  exports.removeTenant = async (req, res) => {
    try{
      const nonce = await web3.eth.getTransactionCount(req.body.publickey, "latest"); //get latest nonce 
    
      //the transaction
      const tx = {
        from: req.body.publickey,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        maxPriorityFeePerGas: 2999999987,
        data: nftContract.methods
          .removeTenant(req.body.tokenId, req.body.address)
          .encodeABI(),
      };
    
      const signedTx = await web3.eth.accounts.signTransaction(tx, req.body.privatekey);
      const transactionReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
    
      console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
      return res.status(200).json({ transactionReceipt });
    }
    catch(err){
      return res.status(400).json({ err });
    }
  };




  exports.isTenant = async (req, res) => {
    try {
        const answer = await nftContract.methods
    .isTenant(req.body.tokenId, req.body.address)
    .call();
  return res.status(200).json({ answer });

    } catch (err) {
      return res.status(400).json({ err });
    }
  };


  exports.balanceOf = async (req, res) => {
    try {
        console.log(nftContract);
  const answer = await nftContract.methods.balanceOf(req.body.address).call();
  return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  exports.name = async (req, res) => {
    try {
        console.log(nftContract);
        const answer = await nftContract.methods.name().call();
        return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };


  exports.owner = async (req, res) => {
    try {
        console.log(nftContract);
        const answer = await nftContract.methods.owner().call();
        return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  exports.ownerOf = async (req, res) => {
    try {
        console.log(nftContract);
        const answer = await nftContract.methods.ownerOf(req.body.tokenId).call();
        return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  exports.paused = async (req, res) => {
    try {
        console.log(nftContract);
        const answer = await nftContract.methods.paused().call();
        return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  exports.symbol = async (req, res) => {
    try {
        console.log(nftContract);
  const answer = await nftContract.methods.symbol().call();
  return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };

  exports.tokenURI = async (req, res) => {
    try {
        console.log(nftContract);
        const answer = await nftContract.methods.tokenURI(req.body.tokenId).call();
        return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };



  exports.getApproved = async (req, res) => {
    try {
        console.log(nftContract);
  const answer = await nftContract.methods.getApproved(req.body.tokenId).call();
  return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };



  exports.isapprovedforall = async (req, res) => {
    try {
        console.log(nftContract);
  const answer = await nftContract.methods.isApprovedForAll(req.body.ownerAddress, req.body.operatorAddress).call();
  return res.status(200).json({ answer });
    } catch (err) {
      return res.status(400).json({ err });
    }
  };