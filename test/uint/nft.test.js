const { assert, expect } = require("chai");
const { parseEther } = require("ethers/lib/utils");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("NFT test", function () {
      let nftmarketplace,
        deployer,
        player1,
        player2,
        player3,
        player4,
        player5,
        player6,
        player7,
        player8,
        player9;
      const PRICE = ethers.utils.parseEther("0.01");
      const PRICE2 = ethers.utils.parseEther("0.1");
      const Token_ID = 0;
      beforeEach(async () => {
        deployer = (await getNamedAccounts()).deployer;
        accounts = await ethers.getSigners();
        player1 = accounts[1];
        player2 = accounts[2];
        player3 = accounts[3];
        player4 = accounts[4];
        player5 = accounts[5];
        player6 = accounts[6];
        player7 = accounts[7];
        player8 = accounts[8];
        player9 = accounts[9];
        await deployments.fixture(["all"]);
        Azuki = await ethers.getContract("Azuki");
        BoredApeYachtClub = await ethers.getContract("BoredApeYachtClub");
        CloneX = await ethers.getContract("clonex");
        Doodles = await ethers.getContract("Doodles");
        Moonbirds = await ethers.getContract("Moonbirds");
        MurakamiFlowers = await ethers.getContract("MurakamiFlowers");
        Nyancat = await ethers.getContract("Nyancat");
        OthersideLand = await ethers.getContract("OthersideLand");
        Landers = await ethers.getContract("Landers");
        CoolCats = await ethers.getContract("CoolCats");
        CryptoSkulls = await ethers.getContract("CryptoSkulls");
        CyberKongz = await ethers.getContract("CyberKongz");
        InvisibleFriends = await ethers.getContract("InvisibleFriends");
        Karafuru = await ethers.getContract("Karafuru");
      });

      describe("Construtor", () => {
        it("URL test", async () => {
          await Karafuru.mint("1", { value: PRICE2 });
          const url = await Karafuru.tokenURI(1);
          console.log(url);
        });
        it("URL test", async () => {
          await InvisibleFriends.mint("1", { value: PRICE2 });
          const url = await InvisibleFriends.tokenURI(1);
          console.log(url);
        });
        it("URL test", async () => {
          await CyberKongz.mint("1", { value: PRICE2 });
          const url = await CyberKongz.tokenURI(1);
          console.log(url);
        });
        it("URL test", async () => {
          await CryptoSkulls.mint("1", { value: PRICE2 });
          const url = await CryptoSkulls.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await CoolCats.mint("1", { value: PRICE2 });
          const url = await CoolCats.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await Azuki.mint("1", { value: PRICE });
          const url = await Azuki.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await BoredApeYachtClub.mint("1", { value: PRICE });
          const url = await BoredApeYachtClub.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await CloneX.mint("1", { value: PRICE });
          const url = await CloneX.tokenURI(1);
          console.log(url);
        });
        it("URL test", async () => {
          await Doodles.mint("1", { value: PRICE });
          const url = await Doodles.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await Moonbirds.mint("1", { value: PRICE });
          const url = await Moonbirds.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await MurakamiFlowers.mint("1", { value: PRICE });
          const url = await MurakamiFlowers.tokenURI(1);
          console.log(url);
        });
        it("URL test", async () => {
          await OthersideLand.mint("1", { value: PRICE });
          const url = await OthersideLand.tokenURI(0);
          console.log(url);
        });
        it("URL test", async () => {
          await Landers.mint("1", { value: PRICE });
          const url = await Landers.tokenURI(1);
          console.log(url);
        });
        it("mint test", async () => {
          for (i = 0; i < 2; i++) {
            await Nyancat.mint({ value: PRICE });
            const url = await Nyancat.avaliableTokens();
            // console.log(`${i}:  ${url.toString()}`)
          }
          for (i = 0; i < 25; i++) {
            const url = await Nyancat.tokenIds(i);
            console.log(`${i}:  ${url.toString()}`);
          }
        });
      });
    });
