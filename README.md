## SIMPLE TRANSFER

This is a demo project that contains a smart contract called `SimpleTransfer`
that allows the `caller(msg.sender)` to transfer `ERC20 tokens` or `ETH` to a recipient.

#### contract SimpleTransfer

###### functions

```solidity
function transferToken(address tokenAddress, address recipient, uint256 amount)

transfers `amount` number of `ERC20` tokens deployed at `tokenAddress` to `recipient` from msg.sender.
`msg.sender` needs to approve ERC20 tokens to `SimpelTransfer` before calling this function 
```

```solidity
function transferEth(address tokenAddress, address recipient, uint256 amount)

transfers ETH to `recipient` from `msg.sender`
ETH that needs to be sent along in the transaction as msg.value
```

#### Deployments

| Network      | Explorer                                                                                 |
|--------------| ---------------------------------------------------------------------------------------- |
| Linea Goerli | https://explorer.goerli.linea.build/address/0xF488E8645AF56E12093e97612d8a4Db7a6325198   |


#### Testing
run the following commands for running the tests 
```
$ yarn
$ forge test -vvv
```