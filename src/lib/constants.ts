import { SupportedChainId, DepositContractMap } from '@/lib/types'

export const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

export const API_URL = 'https://perpetra-api.aftermiracle.com'

export const MAIN_DATE_TIME_FORMAT = 'h:mm a MM/dd/yy'

export const API_ROUTES = {
  auth: '/auth',
  balance: '/funding/balance',
  orders: '/orders',
  positions: '/positions',
  positionsClose: '/positions/close',
  trades: '/trades',
  darkPoolSummary: '/darkpool/summary',
}

export const QUERY_KEYS = {
  balance: ['balance'],
  orders: ['orders'],
  positions: ['positions'],
  trades: ['trades'],
  darkPoolSummary: ['darkPoolSummary'],
}

export const DEPOSIT_CONTRACTS: Record<SupportedChainId, DepositContractMap> = {
  // sepolia
  11155111: {
    // https://sepolia.etherscan.io/address/0x1c7d4b196cb0c7b01d743fbc6116a902379c7238
    usdc: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    // https://sepolia.etherscan.io/address/0xEb0a08b456Be2cf2111d1353f26174e25d351e4C
    depositContract: '0xEb0a08b456Be2cf2111d1353f26174e25d351e4C',
  },
  // baseSepolia
  84532: {
    // https://sepolia.basescan.org/address/0x036CbD53842c5426634e7929541eC2318f3dCF7e
    usdc: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    // https://sepolia.basescan.org/address/0x536B6ca1344DBBa5Bfce3341a38fd77A10D6cf0B
    depositContract: '0x536B6ca1344DBBa5Bfce3341a38fd77A10D6cf0B',
  },
}

export const DEPOSIT_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_router', type: 'address' },
      { internalType: 'address', name: '_usdc', type: 'address' },
      { internalType: 'uint64', name: '_destinationChainSelector', type: 'uint64' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [{ internalType: 'address', name: 'router', type: 'address' }], name: 'InvalidRouter', type: 'error' },
  {
    inputs: [
      { internalType: 'uint256', name: 'balance', type: 'uint256' },
      { internalType: 'uint256', name: 'fee', type: 'uint256' },
    ],
    name: 'NotEnoughNativeFee',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'OwnershipTransferRequested',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'VAULT_CHAIN_ID',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [
      {
        components: [
          { internalType: 'bytes32', name: 'messageId', type: 'bytes32' },
          { internalType: 'uint64', name: 'sourceChainSelector', type: 'uint64' },
          { internalType: 'bytes', name: 'sender', type: 'bytes' },
          { internalType: 'bytes', name: 'data', type: 'bytes' },
          {
            components: [
              { internalType: 'address', name: 'token', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            internalType: 'struct Client.EVMTokenAmount[]',
            name: 'destTokenAmounts',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct Client.Any2EVMMessage',
        name: 'message',
        type: 'tuple',
      },
    ],
    name: 'ccipReceive',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'destinationChainSelector',
    outputs: [{ internalType: 'uint64', name: '', type: 'uint64' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRouter',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastReceivedMessageId',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'perpetraCrossChainBridgeSepolia',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'requestWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'safeVaultSepolia',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint64', name: 'selector', type: 'uint64' }],
    name: 'setDestinationChainSelector',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'setPerpetraCrossChainBridgeSepolia',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_vault', type: 'address' }],
    name: 'setSafeVaultSepolia',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'usdc',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'to', type: 'address' }],
    name: 'withdrawNative',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
    ],
    name: 'withdrawToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
]
