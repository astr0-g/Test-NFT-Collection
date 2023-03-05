const { getContractFactory } = require("@nomiclabs/hardhat-ethers/types");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const {
  networkConfig,
  developmentChains,
  get,
} = require("../helper-hardhat-config");
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  log("-----------------");
  arguments = [];
  const InvisibleFriends = await deploy("InvisibleFriends", {
    from: deployer,
    args: arguments,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("verifying...");
    await verify(
      InvisibleFriends.address,
      arguments,
      "ERC721/InvisibleFriends",
      "InvisibleFriends"
    );
  }
  log("-----------------");
};
module.exports.tags = ["all", "new", "InvisibleFriends"];
