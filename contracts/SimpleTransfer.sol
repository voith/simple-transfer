// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SimpleTransfer is ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice transfers ERC20 from msg.sender to recipient.
    /// @dev sender needs to approve tokens to this contract before calling this function.
    /// @param tokenAddress address of the ERC20 contract.
    /// @param recipient address receiving the ERC20 tokens.
    /// @param amount number of ERC20 tokens to transfer.
    function transferToken(
        address tokenAddress,
        address recipient,
        uint256 amount
    ) external nonReentrant returns (bool) {
        IERC20(tokenAddress).safeTransferFrom(msg.sender, recipient, amount);
        return true;
    }

    /// @notice transfers ETH from msg.sender to recipient.
    /// @dev msg.sender needs to send ETH in msg.value
    /// @param recipient address receiving the ETH.
    function transferEth(
        address payable recipient
    ) external payable nonReentrant returns (bool success) {
        (success, ) = recipient.call{value: msg.value}("");
        require(success, "Failed to send eth");
    }
}
