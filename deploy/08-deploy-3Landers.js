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
  const Landers = await deploy("Landers", {
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
    await verify(Landers.address, arguments, "ERC4907/3Landers", "Landers");
  }
  log("-----------------");
};
module.exports.tags = ["all", "main", "ERC4907"];
