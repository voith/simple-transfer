// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Test.sol";
import "forge-std/console.sol";

import "../contracts/SimpleTransfer.sol";
import "../contracts/mocks/SampleERC20.sol";

contract SimpleTransferTest is Test {

    SimpleTransfer sTransfer;
    SampleERC20 SERC20;
    address userA = address(0x51);
    address userB = address(0x52);

    function setUp() external {
        sTransfer = new SimpleTransfer();
        SERC20 = new SampleERC20();
        SERC20.mint(userA, 100 ether);
        vm.deal(userA, 300 ether);
    }

    function testTransferToken() external {
        vm.startPrank(userA);
        uint256 amountToTransfer = 10 ether;
        uint256 initialUserABalance = SERC20.balanceOf(userA);
        uint256 initialUserBBalance = SERC20.balanceOf(userB);
        SERC20.approve(address(sTransfer), amountToTransfer);
        sTransfer.transferToken(address(SERC20), userB, amountToTransfer);
        assertEq(SERC20.balanceOf(userA), initialUserABalance - amountToTransfer);
        assertEq(SERC20.balanceOf(userB), initialUserBBalance + amountToTransfer);
        vm.stopPrank();
    }

    function testTransferEth() external {
        vm.startPrank(userA);
        uint256 amountToTransfer = 10 ether;
        uint256 initialUserABalance = userA.balance;
        uint256 initialUserBBalance = userB.balance;
        sTransfer.transferEth{value: amountToTransfer}(payable(userB));
        assertEq(userA.balance, initialUserABalance - amountToTransfer);
        assertEq(userB.balance, initialUserBBalance + amountToTransfer);
        vm.stopPrank();
    }
}
