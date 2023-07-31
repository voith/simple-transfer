import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { hardhatArguments, ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  SampleERC20__factory,
  SimpleTransfer__factory,
} from "../../typechain-types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  if (hardhatArguments.network !== "lineaGoerli") {
    return;
  }

  const { deployments, getNamedAccounts } = hre;
  const { deployer } = await getNamedAccounts();
  const deployerSigner: SignerWithAddress = await ethers.getSigner(deployer);

  const recipient = "0x4D517Aef039A48b3B6bF921e210b7551C8E37107";
  const erc20Deployment = await deployments.get("SampleERC20");
  const simpleTransferDeployment = await deployments.get("SimpleTransfer");
  const erc20 = new SampleERC20__factory(deployerSigner).attach(
    erc20Deployment.address
  );
  const simpleTransfer = new SimpleTransfer__factory(deployerSigner).attach(
    simpleTransferDeployment.address
  );
  console.log("minting tokens");
  let tx = await erc20.mint(deployer, ethers.utils.parseEther("100"));
  console.log(tx);
  await tx.wait();
  console.log("minted tokens");
  let tx = await erc20.approve(
    simpleTransferDeployment.address,
    ethers.utils.parseEther("10000")
  );
  console.log(tx);
  await tx.wait();
  console.log("approved tokens");
  tx = await simpleTransfer.transferToken(
    erc20Deployment.address,
    recipient,
    ethers.utils.parseEther("10")
  );
  await tx.wait();
  console.log("transferred tokens");
  tx = await simpleTransfer.transferEth(recipient, {
    value: ethers.utils.parseEther("0.0001"),
  });
  await tx.wait();
  console.log("transferred ETH");
};

export default func;

func.tags = ["TransferTokens"];
