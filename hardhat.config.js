require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.0",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/7a48cfa4b33742b5accc25d37f359423",
      accounts: ['152fa317cdb6ae23ff9e4208b1b3ba51315c2ba5e0c01d6cbdfd584a50bb5472']
    }
  }
};

  