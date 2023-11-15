"use client";
import {
  __commonJS
} from "./chunk-O3ZY5NC2.js";

// node_modules/viem/dist/cjs/accounts/utils/parseAccount.js
var require_parseAccount = __commonJS({
  "node_modules/viem/dist/cjs/accounts/utils/parseAccount.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseAccount = void 0;
    function parseAccount(account) {
      if (typeof account === "string")
        return { address: account, type: "json-rpc" };
      return account;
    }
    exports.parseAccount = parseAccount;
  }
});

// node_modules/viem/dist/cjs/constants/abis.js
var require_abis = __commonJS({
  "node_modules/viem/dist/cjs/constants/abis.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.universalSignatureValidatorAbi = exports.smartAccountAbi = exports.addressResolverAbi = exports.textResolverAbi = exports.universalResolverReverseAbi = exports.universalResolverResolveAbi = exports.multicall3Abi = void 0;
    exports.multicall3Abi = [
      {
        inputs: [
          {
            components: [
              {
                name: "target",
                type: "address"
              },
              {
                name: "allowFailure",
                type: "bool"
              },
              {
                name: "callData",
                type: "bytes"
              }
            ],
            name: "calls",
            type: "tuple[]"
          }
        ],
        name: "aggregate3",
        outputs: [
          {
            components: [
              {
                name: "success",
                type: "bool"
              },
              {
                name: "returnData",
                type: "bytes"
              }
            ],
            name: "returnData",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ];
    var universalResolverErrors = [
      {
        inputs: [],
        name: "ResolverNotFound",
        type: "error"
      },
      {
        inputs: [],
        name: "ResolverWildcardNotSupported",
        type: "error"
      }
    ];
    exports.universalResolverResolveAbi = [
      ...universalResolverErrors,
      {
        name: "resolve",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes" },
          { name: "data", type: "bytes" }
        ],
        outputs: [
          { name: "", type: "bytes" },
          { name: "address", type: "address" }
        ]
      }
    ];
    exports.universalResolverReverseAbi = [
      ...universalResolverErrors,
      {
        name: "reverse",
        type: "function",
        stateMutability: "view",
        inputs: [{ type: "bytes", name: "reverseName" }],
        outputs: [
          { type: "string", name: "resolvedName" },
          { type: "address", name: "resolvedAddress" },
          { type: "address", name: "reverseResolver" },
          { type: "address", name: "resolver" }
        ]
      }
    ];
    exports.textResolverAbi = [
      {
        name: "text",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "key", type: "string" }
        ],
        outputs: [{ name: "", type: "string" }]
      }
    ];
    exports.addressResolverAbi = [
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "name", type: "bytes32" }],
        outputs: [{ name: "", type: "address" }]
      },
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "coinType", type: "uint256" }
        ],
        outputs: [{ name: "", type: "bytes" }]
      }
    ];
    exports.smartAccountAbi = [
      {
        name: "isValidSignature",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "hash", type: "bytes32" },
          { name: "signature", type: "bytes" }
        ],
        outputs: [{ name: "", type: "bytes4" }]
      }
    ];
    exports.universalSignatureValidatorAbi = [
      {
        inputs: [
          {
            internalType: "address",
            name: "_signer",
            type: "address"
          },
          {
            internalType: "bytes32",
            name: "_hash",
            type: "bytes32"
          },
          {
            internalType: "bytes",
            name: "_signature",
            type: "bytes"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      }
    ];
  }
});

// node_modules/viem/dist/cjs/constants/contract.js
var require_contract = __commonJS({
  "node_modules/viem/dist/cjs/constants/contract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.aggregate3Signature = void 0;
    exports.aggregate3Signature = "0x82ad56cb";
  }
});

// node_modules/viem/dist/cjs/errors/version.js
var require_version = __commonJS({
  "node_modules/viem/dist/cjs/errors/version.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.version = void 0;
    exports.version = "1.10.2";
  }
});

// node_modules/viem/dist/cjs/errors/utils.js
var require_utils = __commonJS({
  "node_modules/viem/dist/cjs/errors/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getVersion = exports.getUrl = exports.getContractAddress = void 0;
    var version_js_1 = require_version();
    var getContractAddress = (address) => address;
    exports.getContractAddress = getContractAddress;
    var getUrl = (url) => url;
    exports.getUrl = getUrl;
    var getVersion = () => `viem@${version_js_1.version}`;
    exports.getVersion = getVersion;
  }
});

// node_modules/viem/dist/cjs/errors/base.js
var require_base = __commonJS({
  "node_modules/viem/dist/cjs/errors/base.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseError = void 0;
    var utils_js_1 = require_utils();
    var BaseError = class extends Error {
      constructor(shortMessage, args = {}) {
        super();
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ViemError"
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: (0, utils_js_1.getVersion)()
        });
        const details = args.cause instanceof BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
        const docsPath = args.cause instanceof BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
        this.message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsPath ? [
            `Docs: https://viem.sh${docsPath}.html${args.docsSlug ? `#${args.docsSlug}` : ""}`
          ] : [],
          ...details ? [`Details: ${details}`] : [],
          `Version: ${this.version}`
        ].join("\n");
        if (args.cause)
          this.cause = args.cause;
        this.details = details;
        this.docsPath = docsPath;
        this.metaMessages = args.metaMessages;
        this.shortMessage = shortMessage;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
    exports.BaseError = BaseError;
    function walk(err, fn) {
      if (fn?.(err))
        return err;
      if (err && typeof err === "object" && "cause" in err)
        return walk(err.cause, fn);
      return fn ? null : err;
    }
  }
});

// node_modules/viem/dist/cjs/errors/chain.js
var require_chain = __commonJS({
  "node_modules/viem/dist/cjs/errors/chain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidChainIdError = exports.ClientChainNotConfiguredError = exports.ChainNotFoundError = exports.ChainMismatchError = exports.ChainDoesNotSupportContract = void 0;
    var base_js_1 = require_base();
    var ChainDoesNotSupportContract = class extends base_js_1.BaseError {
      constructor({ blockNumber, chain, contract }) {
        super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
          metaMessages: [
            "This could be due to any of the following:",
            ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
              `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
            ] : [
              `- The chain does not have the contract "${contract.name}" configured.`
            ]
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ChainDoesNotSupportContract"
        });
      }
    };
    exports.ChainDoesNotSupportContract = ChainDoesNotSupportContract;
    var ChainMismatchError = class extends base_js_1.BaseError {
      constructor({ chain, currentChainId }) {
        super(`The current chain of the wallet (id: ${currentChainId}) does not match the target chain for the transaction (id: ${chain.id} \u2013 ${chain.name}).`, {
          metaMessages: [
            `Current Chain ID:  ${currentChainId}`,
            `Expected Chain ID: ${chain.id} \u2013 ${chain.name}`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ChainMismatchError"
        });
      }
    };
    exports.ChainMismatchError = ChainMismatchError;
    var ChainNotFoundError = class extends base_js_1.BaseError {
      constructor() {
        super([
          "No chain was provided to the request.",
          "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient."
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ChainNotFoundError"
        });
      }
    };
    exports.ChainNotFoundError = ChainNotFoundError;
    var ClientChainNotConfiguredError = class extends base_js_1.BaseError {
      constructor() {
        super("No chain was provided to the Client.");
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ClientChainNotConfiguredError"
        });
      }
    };
    exports.ClientChainNotConfiguredError = ClientChainNotConfiguredError;
    var InvalidChainIdError = class extends base_js_1.BaseError {
      constructor({ chainId }) {
        super(`Chain ID "${chainId}" is invalid.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidChainIdError"
        });
      }
    };
    exports.InvalidChainIdError = InvalidChainIdError;
  }
});

// node_modules/viem/dist/cjs/constants/solidity.js
var require_solidity = __commonJS({
  "node_modules/viem/dist/cjs/constants/solidity.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.solidityPanic = exports.solidityError = exports.panicReasons = void 0;
    exports.panicReasons = {
      1: "An `assert` condition failed.",
      17: "Arithmic operation resulted in underflow or overflow.",
      18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
      33: "Attempted to convert to an invalid type.",
      34: "Attempted to access a storage byte array that is incorrectly encoded.",
      49: "Performed `.pop()` on an empty array",
      50: "Array index is out of bounds.",
      65: "Allocated too much memory or created an array which is too large.",
      81: "Attempted to call a zero-initialized variable of internal function type."
    };
    exports.solidityError = {
      inputs: [
        {
          name: "message",
          type: "string"
        }
      ],
      name: "Error",
      type: "error"
    };
    exports.solidityPanic = {
      inputs: [
        {
          name: "reason",
          type: "uint256"
        }
      ],
      name: "Panic",
      type: "error"
    };
  }
});

// node_modules/viem/dist/cjs/utils/abi/formatAbiItem.js
var require_formatAbiItem = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/formatAbiItem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatAbiParams = exports.formatAbiItem = void 0;
    var abi_js_1 = require_abi();
    function formatAbiItem(abiItem, { includeName = false } = {}) {
      if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
        throw new abi_js_1.InvalidDefinitionTypeError(abiItem.type);
      return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
    }
    exports.formatAbiItem = formatAbiItem;
    function formatAbiParams(params, { includeName = false } = {}) {
      if (!params)
        return "";
      return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
    }
    exports.formatAbiParams = formatAbiParams;
    function formatAbiParam(param, { includeName }) {
      if (param.type.startsWith("tuple")) {
        return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
      }
      return param.type + (includeName && param.name ? ` ${param.name}` : "");
    }
  }
});

// node_modules/viem/dist/cjs/utils/data/isHex.js
var require_isHex = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/isHex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isHex = void 0;
    function isHex(value, { strict = true } = {}) {
      if (!value)
        return false;
      if (typeof value !== "string")
        return false;
      return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
    }
    exports.isHex = isHex;
  }
});

// node_modules/viem/dist/cjs/utils/data/size.js
var require_size = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/size.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.size = void 0;
    var isHex_js_1 = require_isHex();
    function size(value) {
      if ((0, isHex_js_1.isHex)(value, { strict: false }))
        return Math.ceil((value.length - 2) / 2);
      return value.length;
    }
    exports.size = size;
  }
});

// node_modules/viem/dist/cjs/errors/abi.js
var require_abi = __commonJS({
  "node_modules/viem/dist/cjs/errors/abi.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnsupportedPackedAbiType = exports.InvalidDefinitionTypeError = exports.InvalidArrayError = exports.InvalidAbiDecodingTypeError = exports.InvalidAbiEncodingTypeError = exports.DecodeLogTopicsMismatch = exports.DecodeLogDataMismatch = exports.BytesSizeMismatchError = exports.AbiFunctionSignatureNotFoundError = exports.AbiFunctionOutputsNotFoundError = exports.AbiFunctionNotFoundError = exports.AbiEventNotFoundError = exports.AbiEventSignatureNotFoundError = exports.AbiEventSignatureEmptyTopicsError = exports.AbiErrorSignatureNotFoundError = exports.AbiErrorNotFoundError = exports.AbiErrorInputsNotFoundError = exports.AbiEncodingLengthMismatchError = exports.AbiEncodingBytesSizeMismatchError = exports.AbiEncodingArrayLengthMismatchError = exports.AbiDecodingZeroDataError = exports.AbiDecodingDataSizeTooSmallError = exports.AbiDecodingDataSizeInvalidError = exports.AbiConstructorParamsNotFoundError = exports.AbiConstructorNotFoundError = void 0;
    var formatAbiItem_js_1 = require_formatAbiItem();
    var size_js_1 = require_size();
    var base_js_1 = require_base();
    var AbiConstructorNotFoundError = class extends base_js_1.BaseError {
      constructor({ docsPath }) {
        super([
          "A constructor was not found on the ABI.",
          "Make sure you are using the correct ABI and that the constructor exists on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiConstructorNotFoundError"
        });
      }
    };
    exports.AbiConstructorNotFoundError = AbiConstructorNotFoundError;
    var AbiConstructorParamsNotFoundError = class extends base_js_1.BaseError {
      constructor({ docsPath }) {
        super([
          "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
          "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiConstructorParamsNotFoundError"
        });
      }
    };
    exports.AbiConstructorParamsNotFoundError = AbiConstructorParamsNotFoundError;
    var AbiDecodingDataSizeInvalidError = class extends base_js_1.BaseError {
      constructor({ data, size }) {
        super([
          `Data size of ${size} bytes is invalid.`,
          "Size must be in increments of 32 bytes (size % 32 === 0)."
        ].join("\n"), { metaMessages: [`Data: ${data} (${size} bytes)`] });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiDecodingDataSizeInvalidError"
        });
      }
    };
    exports.AbiDecodingDataSizeInvalidError = AbiDecodingDataSizeInvalidError;
    var AbiDecodingDataSizeTooSmallError = class extends base_js_1.BaseError {
      constructor({ data, params, size }) {
        super([`Data size of ${size} bytes is too small for given parameters.`].join("\n"), {
          metaMessages: [
            `Params: (${(0, formatAbiItem_js_1.formatAbiParams)(params, { includeName: true })})`,
            `Data:   ${data} (${size} bytes)`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiDecodingDataSizeTooSmallError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "params", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "size", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = data;
        this.params = params;
        this.size = size;
      }
    };
    exports.AbiDecodingDataSizeTooSmallError = AbiDecodingDataSizeTooSmallError;
    var AbiDecodingZeroDataError = class extends base_js_1.BaseError {
      constructor() {
        super('Cannot decode zero data ("0x") with ABI parameters.');
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiDecodingZeroDataError"
        });
      }
    };
    exports.AbiDecodingZeroDataError = AbiDecodingZeroDataError;
    var AbiEncodingArrayLengthMismatchError = class extends base_js_1.BaseError {
      constructor({ expectedLength, givenLength, type }) {
        super([
          `ABI encoding array length mismatch for type ${type}.`,
          `Expected length: ${expectedLength}`,
          `Given length: ${givenLength}`
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEncodingArrayLengthMismatchError"
        });
      }
    };
    exports.AbiEncodingArrayLengthMismatchError = AbiEncodingArrayLengthMismatchError;
    var AbiEncodingBytesSizeMismatchError = class extends base_js_1.BaseError {
      constructor({ expectedSize, value }) {
        super(`Size of bytes "${value}" (bytes${(0, size_js_1.size)(value)}) does not match expected size (bytes${expectedSize}).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEncodingBytesSizeMismatchError"
        });
      }
    };
    exports.AbiEncodingBytesSizeMismatchError = AbiEncodingBytesSizeMismatchError;
    var AbiEncodingLengthMismatchError = class extends base_js_1.BaseError {
      constructor({ expectedLength, givenLength }) {
        super([
          "ABI encoding params/values length mismatch.",
          `Expected length (params): ${expectedLength}`,
          `Given length (values): ${givenLength}`
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEncodingLengthMismatchError"
        });
      }
    };
    exports.AbiEncodingLengthMismatchError = AbiEncodingLengthMismatchError;
    var AbiErrorInputsNotFoundError = class extends base_js_1.BaseError {
      constructor(errorName, { docsPath }) {
        super([
          `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
          "Cannot encode error result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the inputs exist on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiErrorInputsNotFoundError"
        });
      }
    };
    exports.AbiErrorInputsNotFoundError = AbiErrorInputsNotFoundError;
    var AbiErrorNotFoundError = class extends base_js_1.BaseError {
      constructor(errorName, { docsPath } = {}) {
        super([
          `Error ${errorName ? `"${errorName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiErrorNotFoundError"
        });
      }
    };
    exports.AbiErrorNotFoundError = AbiErrorNotFoundError;
    var AbiErrorSignatureNotFoundError = class extends base_js_1.BaseError {
      constructor(signature, { docsPath }) {
        super([
          `Encoded error signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiErrorSignatureNotFoundError"
        });
        Object.defineProperty(this, "signature", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.signature = signature;
      }
    };
    exports.AbiErrorSignatureNotFoundError = AbiErrorSignatureNotFoundError;
    var AbiEventSignatureEmptyTopicsError = class extends base_js_1.BaseError {
      constructor({ docsPath }) {
        super("Cannot extract event signature from empty topics.", {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEventSignatureEmptyTopicsError"
        });
      }
    };
    exports.AbiEventSignatureEmptyTopicsError = AbiEventSignatureEmptyTopicsError;
    var AbiEventSignatureNotFoundError = class extends base_js_1.BaseError {
      constructor(signature, { docsPath }) {
        super([
          `Encoded event signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the event exists on it.",
          `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEventSignatureNotFoundError"
        });
      }
    };
    exports.AbiEventSignatureNotFoundError = AbiEventSignatureNotFoundError;
    var AbiEventNotFoundError = class extends base_js_1.BaseError {
      constructor(eventName, { docsPath } = {}) {
        super([
          `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the event exists on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiEventNotFoundError"
        });
      }
    };
    exports.AbiEventNotFoundError = AbiEventNotFoundError;
    var AbiFunctionNotFoundError = class extends base_js_1.BaseError {
      constructor(functionName, { docsPath } = {}) {
        super([
          `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiFunctionNotFoundError"
        });
      }
    };
    exports.AbiFunctionNotFoundError = AbiFunctionNotFoundError;
    var AbiFunctionOutputsNotFoundError = class extends base_js_1.BaseError {
      constructor(functionName, { docsPath }) {
        super([
          `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
          "Cannot decode function result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the function exists on it."
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiFunctionOutputsNotFoundError"
        });
      }
    };
    exports.AbiFunctionOutputsNotFoundError = AbiFunctionOutputsNotFoundError;
    var AbiFunctionSignatureNotFoundError = class extends base_js_1.BaseError {
      constructor(signature, { docsPath }) {
        super([
          `Encoded function signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it.",
          `You can look up the signature here: https://openchain.xyz/signatures?query=${signature}.`
        ].join("\n"), {
          docsPath
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiFunctionSignatureNotFoundError"
        });
      }
    };
    exports.AbiFunctionSignatureNotFoundError = AbiFunctionSignatureNotFoundError;
    var BytesSizeMismatchError = class extends base_js_1.BaseError {
      constructor({ expectedSize, givenSize }) {
        super(`Expected bytes${expectedSize}, got bytes${givenSize}.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BytesSizeMismatchError"
        });
      }
    };
    exports.BytesSizeMismatchError = BytesSizeMismatchError;
    var DecodeLogDataMismatch = class extends base_js_1.BaseError {
      constructor({ abiItem, data, params, size }) {
        super([
          `Data size of ${size} bytes is too small for non-indexed event parameters.`
        ].join("\n"), {
          metaMessages: [
            `Params: (${(0, formatAbiItem_js_1.formatAbiParams)(params, { includeName: true })})`,
            `Data:   ${data} (${size} bytes)`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "DecodeLogDataMismatch"
        });
        Object.defineProperty(this, "abiItem", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "params", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "size", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.abiItem = abiItem;
        this.data = data;
        this.params = params;
        this.size = size;
      }
    };
    exports.DecodeLogDataMismatch = DecodeLogDataMismatch;
    var DecodeLogTopicsMismatch = class extends base_js_1.BaseError {
      constructor({ abiItem, param }) {
        super([
          `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${(0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true })}".`
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "DecodeLogTopicsMismatch"
        });
        Object.defineProperty(this, "abiItem", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.abiItem = abiItem;
      }
    };
    exports.DecodeLogTopicsMismatch = DecodeLogTopicsMismatch;
    var InvalidAbiEncodingTypeError = class extends base_js_1.BaseError {
      constructor(type, { docsPath }) {
        super([
          `Type "${type}" is not a valid encoding type.`,
          "Please provide a valid ABI type."
        ].join("\n"), { docsPath });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiEncodingType"
        });
      }
    };
    exports.InvalidAbiEncodingTypeError = InvalidAbiEncodingTypeError;
    var InvalidAbiDecodingTypeError = class extends base_js_1.BaseError {
      constructor(type, { docsPath }) {
        super([
          `Type "${type}" is not a valid decoding type.`,
          "Please provide a valid ABI type."
        ].join("\n"), { docsPath });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiDecodingType"
        });
      }
    };
    exports.InvalidAbiDecodingTypeError = InvalidAbiDecodingTypeError;
    var InvalidArrayError = class extends base_js_1.BaseError {
      constructor(value) {
        super([`Value "${value}" is not a valid array.`].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidArrayError"
        });
      }
    };
    exports.InvalidArrayError = InvalidArrayError;
    var InvalidDefinitionTypeError = class extends base_js_1.BaseError {
      constructor(type) {
        super([
          `"${type}" is not a valid definition type.`,
          'Valid types: "function", "event", "error"'
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidDefinitionTypeError"
        });
      }
    };
    exports.InvalidDefinitionTypeError = InvalidDefinitionTypeError;
    var UnsupportedPackedAbiType = class extends base_js_1.BaseError {
      constructor(type) {
        super(`Type "${type}" is not supported for packed encoding.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnsupportedPackedAbiType"
        });
      }
    };
    exports.UnsupportedPackedAbiType = UnsupportedPackedAbiType;
  }
});

// node_modules/viem/dist/cjs/errors/data.js
var require_data = __commonJS({
  "node_modules/viem/dist/cjs/errors/data.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SizeExceedsPaddingSizeError = exports.SliceOffsetOutOfBoundsError = void 0;
    var base_js_1 = require_base();
    var SliceOffsetOutOfBoundsError = class extends base_js_1.BaseError {
      constructor({ offset, position, size }) {
        super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size}).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SliceOffsetOutOfBoundsError"
        });
      }
    };
    exports.SliceOffsetOutOfBoundsError = SliceOffsetOutOfBoundsError;
    var SizeExceedsPaddingSizeError = class extends base_js_1.BaseError {
      constructor({ size, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size}) exceeds padding size (${targetSize}).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SizeExceedsPaddingSizeError"
        });
      }
    };
    exports.SizeExceedsPaddingSizeError = SizeExceedsPaddingSizeError;
  }
});

// node_modules/viem/dist/cjs/utils/data/slice.js
var require_slice = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/slice.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sliceHex = exports.sliceBytes = exports.slice = void 0;
    var data_js_1 = require_data();
    var isHex_js_1 = require_isHex();
    var size_js_1 = require_size();
    function slice(value, start, end, { strict } = {}) {
      if ((0, isHex_js_1.isHex)(value, { strict: false }))
        return sliceHex(value, start, end, {
          strict
        });
      return sliceBytes(value, start, end, {
        strict
      });
    }
    exports.slice = slice;
    function assertStartOffset(value, start) {
      if (typeof start === "number" && start > 0 && start > (0, size_js_1.size)(value) - 1)
        throw new data_js_1.SliceOffsetOutOfBoundsError({
          offset: start,
          position: "start",
          size: (0, size_js_1.size)(value)
        });
    }
    function assertEndOffset(value, start, end) {
      if (typeof start === "number" && typeof end === "number" && (0, size_js_1.size)(value) !== end - start) {
        throw new data_js_1.SliceOffsetOutOfBoundsError({
          offset: end,
          position: "end",
          size: (0, size_js_1.size)(value)
        });
      }
    }
    function sliceBytes(value_, start, end, { strict } = {}) {
      assertStartOffset(value_, start);
      const value = value_.slice(start, end);
      if (strict)
        assertEndOffset(value, start, end);
      return value;
    }
    exports.sliceBytes = sliceBytes;
    function sliceHex(value_, start, end, { strict } = {}) {
      assertStartOffset(value_, start);
      const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
      if (strict)
        assertEndOffset(value, start, end);
      return value;
    }
    exports.sliceHex = sliceHex;
  }
});

// node_modules/viem/dist/cjs/utils/contract/extractFunctionParts.js
var require_extractFunctionParts = __commonJS({
  "node_modules/viem/dist/cjs/utils/contract/extractFunctionParts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extractFunctionType = exports.extractFunctionParams = exports.extractFunctionName = exports.extractFunctionParts = void 0;
    var paramsRegex = /((function|event)\s)?(.*)(\((.*)\))/;
    function extractFunctionParts(def) {
      const parts = def.match(paramsRegex);
      const type = parts?.[2] || void 0;
      const name = parts?.[3];
      const params = parts?.[5] || void 0;
      return { type, name, params };
    }
    exports.extractFunctionParts = extractFunctionParts;
    function extractFunctionName(def) {
      return extractFunctionParts(def).name;
    }
    exports.extractFunctionName = extractFunctionName;
    function extractFunctionParams(def) {
      const params = extractFunctionParts(def).params;
      const splitParams = params?.split(",").map((x) => x.trim().split(" "));
      return splitParams?.map((param) => ({
        type: param[0],
        name: param[1] === "indexed" ? param[2] : param[1],
        ...param[1] === "indexed" ? { indexed: true } : {}
      }));
    }
    exports.extractFunctionParams = extractFunctionParams;
    function extractFunctionType(def) {
      return extractFunctionParts(def).type;
    }
    exports.extractFunctionType = extractFunctionType;
  }
});

// node_modules/viem/dist/cjs/utils/data/pad.js
var require_pad = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/pad.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.padBytes = exports.padHex = exports.pad = void 0;
    var data_js_1 = require_data();
    function pad(hexOrBytes, { dir, size = 32 } = {}) {
      if (typeof hexOrBytes === "string")
        return padHex(hexOrBytes, { dir, size });
      return padBytes(hexOrBytes, { dir, size });
    }
    exports.pad = pad;
    function padHex(hex_, { dir, size = 32 } = {}) {
      if (size === null)
        return hex_;
      const hex = hex_.replace("0x", "");
      if (hex.length > size * 2)
        throw new data_js_1.SizeExceedsPaddingSizeError({
          size: Math.ceil(hex.length / 2),
          targetSize: size,
          type: "hex"
        });
      return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size * 2, "0")}`;
    }
    exports.padHex = padHex;
    function padBytes(bytes, { dir, size = 32 } = {}) {
      if (size === null)
        return bytes;
      if (bytes.length > size)
        throw new data_js_1.SizeExceedsPaddingSizeError({
          size: bytes.length,
          targetSize: size,
          type: "bytes"
        });
      const paddedBytes = new Uint8Array(size);
      for (let i = 0; i < size; i++) {
        const padEnd = dir === "right";
        paddedBytes[padEnd ? i : size - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
      }
      return paddedBytes;
    }
    exports.padBytes = padBytes;
  }
});

// node_modules/viem/dist/cjs/errors/encoding.js
var require_encoding = __commonJS({
  "node_modules/viem/dist/cjs/errors/encoding.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SizeOverflowError = exports.OffsetOutOfBoundsError = exports.InvalidHexValueError = exports.InvalidHexBooleanError = exports.InvalidBytesBooleanError = exports.IntegerOutOfRangeError = exports.DataLengthTooShortError = exports.DataLengthTooLongError = void 0;
    var base_js_1 = require_base();
    var DataLengthTooLongError = class extends base_js_1.BaseError {
      constructor({ consumed, length }) {
        super(`Consumed bytes (${consumed}) is shorter than data length (${length - 1}).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "DataLengthTooLongError"
        });
      }
    };
    exports.DataLengthTooLongError = DataLengthTooLongError;
    var DataLengthTooShortError = class extends base_js_1.BaseError {
      constructor({ length, dataLength }) {
        super(`Data length (${dataLength - 1}) is shorter than prefix length (${length - 1}).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "DataLengthTooShortError"
        });
      }
    };
    exports.DataLengthTooShortError = DataLengthTooShortError;
    var IntegerOutOfRangeError = class extends base_js_1.BaseError {
      constructor({ max, min, signed, size, value }) {
        super(`Number "${value}" is not in safe ${size ? `${size * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "IntegerOutOfRangeError"
        });
      }
    };
    exports.IntegerOutOfRangeError = IntegerOutOfRangeError;
    var InvalidBytesBooleanError = class extends base_js_1.BaseError {
      constructor(bytes) {
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidBytesBooleanError"
        });
      }
    };
    exports.InvalidBytesBooleanError = InvalidBytesBooleanError;
    var InvalidHexBooleanError = class extends base_js_1.BaseError {
      constructor(hex) {
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidHexBooleanError"
        });
      }
    };
    exports.InvalidHexBooleanError = InvalidHexBooleanError;
    var InvalidHexValueError = class extends base_js_1.BaseError {
      constructor(value) {
        super(`Hex value "${value}" is an odd length (${value.length}). It must be an even length.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidHexValueError"
        });
      }
    };
    exports.InvalidHexValueError = InvalidHexValueError;
    var OffsetOutOfBoundsError = class extends base_js_1.BaseError {
      constructor({ nextOffset, offset }) {
        super(`Next offset (${nextOffset}) is greater than previous offset + consumed bytes (${offset})`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "OffsetOutOfBoundsError"
        });
      }
    };
    exports.OffsetOutOfBoundsError = OffsetOutOfBoundsError;
    var SizeOverflowError = class extends base_js_1.BaseError {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SizeOverflowError"
        });
      }
    };
    exports.SizeOverflowError = SizeOverflowError;
  }
});

// node_modules/viem/dist/cjs/utils/data/trim.js
var require_trim = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/trim.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.trim = void 0;
    function trim(hexOrBytes, { dir = "left" } = {}) {
      let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
      let sliceLength = 0;
      for (let i = 0; i < data.length - 1; i++) {
        if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
          sliceLength++;
        else
          break;
      }
      data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
      if (typeof hexOrBytes === "string") {
        if (data.length === 1 && dir === "right")
          data = `${data}0`;
        return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
      }
      return data;
    }
    exports.trim = trim;
  }
});

// node_modules/viem/dist/cjs/utils/encoding/fromHex.js
var require_fromHex = __commonJS({
  "node_modules/viem/dist/cjs/utils/encoding/fromHex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hexToString = exports.hexToNumber = exports.hexToBool = exports.hexToBigInt = exports.fromHex = exports.assertSize = void 0;
    var encoding_js_1 = require_encoding();
    var size_js_1 = require_size();
    var trim_js_1 = require_trim();
    var toBytes_js_1 = require_toBytes();
    function assertSize(hexOrBytes, { size }) {
      if ((0, size_js_1.size)(hexOrBytes) > size)
        throw new encoding_js_1.SizeOverflowError({
          givenSize: (0, size_js_1.size)(hexOrBytes),
          maxSize: size
        });
    }
    exports.assertSize = assertSize;
    function fromHex(hex, toOrOpts) {
      const opts = typeof toOrOpts === "string" ? { to: toOrOpts } : toOrOpts;
      const to = opts.to;
      if (to === "number")
        return hexToNumber(hex, opts);
      if (to === "bigint")
        return hexToBigInt(hex, opts);
      if (to === "string")
        return hexToString(hex, opts);
      if (to === "boolean")
        return hexToBool(hex, opts);
      return (0, toBytes_js_1.hexToBytes)(hex, opts);
    }
    exports.fromHex = fromHex;
    function hexToBigInt(hex, opts = {}) {
      const { signed } = opts;
      if (opts.size)
        assertSize(hex, { size: opts.size });
      const value = BigInt(hex);
      if (!signed)
        return value;
      const size = (hex.length - 2) / 2;
      const max = (1n << BigInt(size) * 8n - 1n) - 1n;
      if (value <= max)
        return value;
      return value - BigInt(`0x${"f".padStart(size * 2, "f")}`) - 1n;
    }
    exports.hexToBigInt = hexToBigInt;
    function hexToBool(hex_, opts = {}) {
      let hex = hex_;
      if (opts.size) {
        assertSize(hex, { size: opts.size });
        hex = (0, trim_js_1.trim)(hex);
      }
      if ((0, trim_js_1.trim)(hex) === "0x00")
        return false;
      if ((0, trim_js_1.trim)(hex) === "0x01")
        return true;
      throw new encoding_js_1.InvalidHexBooleanError(hex);
    }
    exports.hexToBool = hexToBool;
    function hexToNumber(hex, opts = {}) {
      return Number(hexToBigInt(hex, opts));
    }
    exports.hexToNumber = hexToNumber;
    function hexToString(hex, opts = {}) {
      let bytes = (0, toBytes_js_1.hexToBytes)(hex);
      if (opts.size) {
        assertSize(bytes, { size: opts.size });
        bytes = (0, trim_js_1.trim)(bytes, { dir: "right" });
      }
      return new TextDecoder().decode(bytes);
    }
    exports.hexToString = hexToString;
  }
});

// node_modules/viem/dist/cjs/utils/encoding/toHex.js
var require_toHex = __commonJS({
  "node_modules/viem/dist/cjs/utils/encoding/toHex.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringToHex = exports.numberToHex = exports.bytesToHex = exports.boolToHex = exports.toHex = void 0;
    var encoding_js_1 = require_encoding();
    var pad_js_1 = require_pad();
    var fromHex_js_1 = require_fromHex();
    var hexes = Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    function toHex(value, opts = {}) {
      if (typeof value === "number" || typeof value === "bigint")
        return numberToHex(value, opts);
      if (typeof value === "string") {
        return stringToHex(value, opts);
      }
      if (typeof value === "boolean")
        return boolToHex(value, opts);
      return bytesToHex(value, opts);
    }
    exports.toHex = toHex;
    function boolToHex(value, opts = {}) {
      const hex = `0x${Number(value)}`;
      if (typeof opts.size === "number") {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        return (0, pad_js_1.pad)(hex, { size: opts.size });
      }
      return hex;
    }
    exports.boolToHex = boolToHex;
    function bytesToHex(value, opts = {}) {
      let hexString = "";
      for (let i = 0; i < value.length; i++) {
        hexString += hexes[value[i]];
      }
      const hex = `0x${hexString}`;
      if (typeof opts.size === "number") {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        return (0, pad_js_1.pad)(hex, { dir: "right", size: opts.size });
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex;
    function numberToHex(value_, opts = {}) {
      const { signed, size } = opts;
      const value = BigInt(value_);
      let maxValue;
      if (size) {
        if (signed)
          maxValue = (1n << BigInt(size) * 8n - 1n) - 1n;
        else
          maxValue = 2n ** (BigInt(size) * 8n) - 1n;
      } else if (typeof value_ === "number") {
        maxValue = BigInt(Number.MAX_SAFE_INTEGER);
      }
      const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
      if (maxValue && value > maxValue || value < minValue) {
        const suffix = typeof value_ === "bigint" ? "n" : "";
        throw new encoding_js_1.IntegerOutOfRangeError({
          max: maxValue ? `${maxValue}${suffix}` : void 0,
          min: `${minValue}${suffix}`,
          signed,
          size,
          value: `${value_}${suffix}`
        });
      }
      const hex = `0x${(signed && value < 0 ? (1n << BigInt(size * 8)) + BigInt(value) : value).toString(16)}`;
      if (size)
        return (0, pad_js_1.pad)(hex, { size });
      return hex;
    }
    exports.numberToHex = numberToHex;
    var encoder = new TextEncoder();
    function stringToHex(value_, opts = {}) {
      const value = encoder.encode(value_);
      return bytesToHex(value, opts);
    }
    exports.stringToHex = stringToHex;
  }
});

// node_modules/viem/dist/cjs/utils/encoding/toBytes.js
var require_toBytes = __commonJS({
  "node_modules/viem/dist/cjs/utils/encoding/toBytes.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringToBytes = exports.numberToBytes = exports.hexToBytes = exports.boolToBytes = exports.toBytes = void 0;
    var base_js_1 = require_base();
    var isHex_js_1 = require_isHex();
    var pad_js_1 = require_pad();
    var fromHex_js_1 = require_fromHex();
    var toHex_js_1 = require_toHex();
    var encoder = new TextEncoder();
    function toBytes(value, opts = {}) {
      if (typeof value === "number" || typeof value === "bigint")
        return numberToBytes(value, opts);
      if (typeof value === "boolean")
        return boolToBytes(value, opts);
      if ((0, isHex_js_1.isHex)(value))
        return hexToBytes(value, opts);
      return stringToBytes(value, opts);
    }
    exports.toBytes = toBytes;
    function boolToBytes(value, opts = {}) {
      const bytes = new Uint8Array(1);
      bytes[0] = Number(value);
      if (typeof opts.size === "number") {
        (0, fromHex_js_1.assertSize)(bytes, { size: opts.size });
        return (0, pad_js_1.pad)(bytes, { size: opts.size });
      }
      return bytes;
    }
    exports.boolToBytes = boolToBytes;
    function hexToBytes(hex_, opts = {}) {
      let hex = hex_;
      if (opts.size) {
        (0, fromHex_js_1.assertSize)(hex, { size: opts.size });
        hex = (0, pad_js_1.pad)(hex, { dir: "right", size: opts.size });
      }
      let hexString = hex.slice(2);
      if (hexString.length % 2)
        hexString = `0${hexString}`;
      const bytes = new Uint8Array(hexString.length / 2);
      for (let index = 0; index < bytes.length; index++) {
        const start = index * 2;
        const hexByte = hexString.slice(start, start + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
          throw new base_js_1.BaseError(`Invalid byte sequence ("${hexByte}" in "${hexString}").`);
        bytes[index] = byte;
      }
      return bytes;
    }
    exports.hexToBytes = hexToBytes;
    function numberToBytes(value, opts) {
      const hex = (0, toHex_js_1.numberToHex)(value, opts);
      return hexToBytes(hex);
    }
    exports.numberToBytes = numberToBytes;
    function stringToBytes(value, opts = {}) {
      const bytes = encoder.encode(value);
      if (typeof opts.size === "number") {
        (0, fromHex_js_1.assertSize)(bytes, { size: opts.size });
        return (0, pad_js_1.pad)(bytes, { dir: "right", size: opts.size });
      }
      return bytes;
    }
    exports.stringToBytes = stringToBytes;
  }
});

// node_modules/@noble/hashes/_assert.js
var require_assert = __commonJS({
  "node_modules/@noble/hashes/_assert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
    function number(n) {
      if (!Number.isSafeInteger(n) || n < 0)
        throw new Error(`Wrong positive integer: ${n}`);
    }
    exports.number = number;
    function bool(b) {
      if (typeof b !== "boolean")
        throw new Error(`Expected boolean, not ${b}`);
    }
    exports.bool = bool;
    function bytes(b, ...lengths) {
      if (!(b instanceof Uint8Array))
        throw new Error("Expected Uint8Array");
      if (lengths.length > 0 && !lengths.includes(b.length))
        throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
    }
    exports.bytes = bytes;
    function hash(hash2) {
      if (typeof hash2 !== "function" || typeof hash2.create !== "function")
        throw new Error("Hash should be wrapped by utils.wrapConstructor");
      number(hash2.outputLen);
      number(hash2.blockLen);
    }
    exports.hash = hash;
    function exists(instance, checkFinished = true) {
      if (instance.destroyed)
        throw new Error("Hash instance has been destroyed");
      if (checkFinished && instance.finished)
        throw new Error("Hash#digest() has already been called");
    }
    exports.exists = exists;
    function output(out, instance) {
      bytes(out);
      const min = instance.outputLen;
      if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
      }
    }
    exports.output = output;
    var assert = { number, bool, bytes, hash, exists, output };
    exports.default = assert;
  }
});

// node_modules/@noble/hashes/_u64.js
var require_u64 = __commonJS({
  "node_modules/@noble/hashes/_u64.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.add5L = exports.add5H = exports.add4H = exports.add4L = exports.add3H = exports.add3L = exports.add = exports.rotlBL = exports.rotlBH = exports.rotlSL = exports.rotlSH = exports.rotr32L = exports.rotr32H = exports.rotrBL = exports.rotrBH = exports.rotrSL = exports.rotrSH = exports.shrSL = exports.shrSH = exports.toBig = exports.split = exports.fromBig = void 0;
    var U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    var _32n = /* @__PURE__ */ BigInt(32);
    function fromBig(n, le = false) {
      if (le)
        return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
      return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
    }
    exports.fromBig = fromBig;
    function split(lst, le = false) {
      let Ah = new Uint32Array(lst.length);
      let Al = new Uint32Array(lst.length);
      for (let i = 0; i < lst.length; i++) {
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [h, l];
      }
      return [Ah, Al];
    }
    exports.split = split;
    var toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
    exports.toBig = toBig;
    var shrSH = (h, _l, s) => h >>> s;
    exports.shrSH = shrSH;
    var shrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.shrSL = shrSL;
    var rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    exports.rotrSH = rotrSH;
    var rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    exports.rotrSL = rotrSL;
    var rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    exports.rotrBH = rotrBH;
    var rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    exports.rotrBL = rotrBL;
    var rotr32H = (_h, l) => l;
    exports.rotr32H = rotr32H;
    var rotr32L = (h, _l) => h;
    exports.rotr32L = rotr32L;
    var rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    exports.rotlSH = rotlSH;
    var rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    exports.rotlSL = rotlSL;
    var rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    exports.rotlBH = rotlBH;
    var rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    exports.rotlBL = rotlBL;
    function add(Ah, Al, Bh, Bl) {
      const l = (Al >>> 0) + (Bl >>> 0);
      return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
    }
    exports.add = add;
    var add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    exports.add3L = add3L;
    var add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
    exports.add3H = add3H;
    var add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
    exports.add4L = add4L;
    var add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
    exports.add4H = add4H;
    var add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
    exports.add5L = add5L;
    var add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
    exports.add5H = add5H;
    var u64 = {
      fromBig,
      split,
      toBig,
      shrSH,
      shrSL,
      rotrSH,
      rotrSL,
      rotrBH,
      rotrBL,
      rotr32H,
      rotr32L,
      rotlSH,
      rotlSL,
      rotlBH,
      rotlBL,
      add,
      add3L,
      add3H,
      add4L,
      add4H,
      add5H,
      add5L
    };
    exports.default = u64;
  }
});

// node_modules/@noble/hashes/crypto.js
var require_crypto = __commonJS({
  "node_modules/@noble/hashes/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.crypto = void 0;
    exports.crypto = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  }
});

// node_modules/@noble/hashes/utils.js
var require_utils2 = __commonJS({
  "node_modules/@noble/hashes/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomBytes = exports.wrapXOFConstructorWithOpts = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
    var crypto_1 = require_crypto();
    var u8a = (a) => a instanceof Uint8Array;
    var u8 = (arr) => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.u8 = u8;
    var u32 = (arr) => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
    exports.u32 = u32;
    var createView = (arr) => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
    exports.createView = createView;
    var rotr = (word, shift) => word << 32 - shift | word >>> shift;
    exports.rotr = rotr;
    exports.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
    if (!exports.isLE)
      throw new Error("Non little-endian hardware is not supported");
    var hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    function bytesToHex(bytes) {
      if (!u8a(bytes))
        throw new Error("Uint8Array expected");
      let hex = "";
      for (let i = 0; i < bytes.length; i++) {
        hex += hexes[bytes[i]];
      }
      return hex;
    }
    exports.bytesToHex = bytesToHex;
    function hexToBytes(hex) {
      if (typeof hex !== "string")
        throw new Error("hex string expected, got " + typeof hex);
      const len = hex.length;
      if (len % 2)
        throw new Error("padded hex string expected, got unpadded hex of length " + len);
      const array = new Uint8Array(len / 2);
      for (let i = 0; i < array.length; i++) {
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0)
          throw new Error("Invalid byte sequence");
        array[i] = byte;
      }
      return array;
    }
    exports.hexToBytes = hexToBytes;
    var nextTick = async () => {
    };
    exports.nextTick = nextTick;
    async function asyncLoop(iters, tick, cb) {
      let ts = Date.now();
      for (let i = 0; i < iters; i++) {
        cb(i);
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick)
          continue;
        await (0, exports.nextTick)();
        ts += diff;
      }
    }
    exports.asyncLoop = asyncLoop;
    function utf8ToBytes(str) {
      if (typeof str !== "string")
        throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
      return new Uint8Array(new TextEncoder().encode(str));
    }
    exports.utf8ToBytes = utf8ToBytes;
    function toBytes(data) {
      if (typeof data === "string")
        data = utf8ToBytes(data);
      if (!u8a(data))
        throw new Error(`expected Uint8Array, got ${typeof data}`);
      return data;
    }
    exports.toBytes = toBytes;
    function concatBytes(...arrays) {
      const r = new Uint8Array(arrays.reduce((sum, a) => sum + a.length, 0));
      let pad = 0;
      arrays.forEach((a) => {
        if (!u8a(a))
          throw new Error("Uint8Array expected");
        r.set(a, pad);
        pad += a.length;
      });
      return r;
    }
    exports.concatBytes = concatBytes;
    var Hash = class {
      clone() {
        return this._cloneInto();
      }
    };
    exports.Hash = Hash;
    var toStr = {}.toString;
    function checkOpts(defaults, opts) {
      if (opts !== void 0 && toStr.call(opts) !== "[object Object]")
        throw new Error("Options should be object or undefined");
      const merged = Object.assign(defaults, opts);
      return merged;
    }
    exports.checkOpts = checkOpts;
    function wrapConstructor(hashCons) {
      const hashC = (msg) => hashCons().update(toBytes(msg)).digest();
      const tmp = hashCons();
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = () => hashCons();
      return hashC;
    }
    exports.wrapConstructor = wrapConstructor;
    function wrapConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
    function wrapXOFConstructorWithOpts(hashCons) {
      const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
      const tmp = hashCons({});
      hashC.outputLen = tmp.outputLen;
      hashC.blockLen = tmp.blockLen;
      hashC.create = (opts) => hashCons(opts);
      return hashC;
    }
    exports.wrapXOFConstructorWithOpts = wrapXOFConstructorWithOpts;
    function randomBytes(bytesLength = 32) {
      if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === "function") {
        return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
      }
      throw new Error("crypto.getRandomValues must be defined");
    }
    exports.randomBytes = randomBytes;
  }
});

// node_modules/@noble/hashes/sha3.js
var require_sha3 = __commonJS({
  "node_modules/@noble/hashes/sha3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
    var _assert_js_1 = require_assert();
    var _u64_js_1 = require_u64();
    var utils_js_1 = require_utils2();
    var [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
    var _0n = /* @__PURE__ */ BigInt(0);
    var _1n = /* @__PURE__ */ BigInt(1);
    var _2n = /* @__PURE__ */ BigInt(2);
    var _7n = /* @__PURE__ */ BigInt(7);
    var _256n = /* @__PURE__ */ BigInt(256);
    var _0x71n = /* @__PURE__ */ BigInt(113);
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    var [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, _u64_js_1.split)(_SHA3_IOTA, true);
    var rotlH = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBH)(h, l, s) : (0, _u64_js_1.rotlSH)(h, l, s);
    var rotlL = (h, l, s) => s > 32 ? (0, _u64_js_1.rotlBL)(h, l, s) : (0, _u64_js_1.rotlSL)(h, l, s);
    function keccakP(s, rounds = 24) {
      const B = new Uint32Array(5 * 2);
      for (let round = 24 - rounds; round < 24; round++) {
        for (let x = 0; x < 10; x++)
          B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for (let x = 0; x < 10; x += 2) {
          const idx1 = (x + 8) % 10;
          const idx0 = (x + 2) % 10;
          const B0 = B[idx0];
          const B1 = B[idx0 + 1];
          const Th = rotlH(B0, B1, 1) ^ B[idx1];
          const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
          for (let y = 0; y < 50; y += 10) {
            s[x + y] ^= Th;
            s[x + y + 1] ^= Tl;
          }
        }
        let curH = s[2];
        let curL = s[3];
        for (let t = 0; t < 24; t++) {
          const shift = SHA3_ROTL[t];
          const Th = rotlH(curH, curL, shift);
          const Tl = rotlL(curH, curL, shift);
          const PI = SHA3_PI[t];
          curH = s[PI];
          curL = s[PI + 1];
          s[PI] = Th;
          s[PI + 1] = Tl;
        }
        for (let y = 0; y < 50; y += 10) {
          for (let x = 0; x < 10; x++)
            B[x] = s[y + x];
          for (let x = 0; x < 10; x++)
            s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
      }
      B.fill(0);
    }
    exports.keccakP = keccakP;
    var Keccak = class extends utils_js_1.Hash {
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        (0, _assert_js_1.number)(outputLen);
        if (0 >= this.blockLen || this.blockLen >= 200)
          throw new Error("Sha3 supports only keccak-f1600 function");
        this.state = new Uint8Array(200);
        this.state32 = (0, utils_js_1.u32)(this.state);
      }
      keccak() {
        keccakP(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        (0, _assert_js_1.exists)(this);
        const { blockLen, state } = this;
        data = (0, utils_js_1.toBytes)(data);
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        (0, _assert_js_1.exists)(this, false);
        (0, _assert_js_1.bytes)(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        (0, _assert_js_1.number)(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        (0, _assert_js_1.output)(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        this.state.fill(0);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    exports.Keccak = Keccak;
    var gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
    exports.sha3_224 = gen(6, 144, 224 / 8);
    exports.sha3_256 = gen(6, 136, 256 / 8);
    exports.sha3_384 = gen(6, 104, 384 / 8);
    exports.sha3_512 = gen(6, 72, 512 / 8);
    exports.keccak_224 = gen(1, 144, 224 / 8);
    exports.keccak_256 = gen(1, 136, 256 / 8);
    exports.keccak_384 = gen(1, 104, 384 / 8);
    exports.keccak_512 = gen(1, 72, 512 / 8);
    var genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapXOFConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === void 0 ? outputLen : opts.dkLen, true));
    exports.shake128 = genShake(31, 168, 128 / 8);
    exports.shake256 = genShake(31, 136, 256 / 8);
  }
});

// node_modules/viem/dist/cjs/utils/hash/keccak256.js
var require_keccak256 = __commonJS({
  "node_modules/viem/dist/cjs/utils/hash/keccak256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keccak256 = void 0;
    var sha3_1 = require_sha3();
    var isHex_js_1 = require_isHex();
    var toBytes_js_1 = require_toBytes();
    var toHex_js_1 = require_toHex();
    function keccak256(value, to_) {
      const to = to_ || "hex";
      const bytes = (0, sha3_1.keccak_256)((0, isHex_js_1.isHex)(value, { strict: false }) ? (0, toBytes_js_1.toBytes)(value) : value);
      if (to === "bytes")
        return bytes;
      return (0, toHex_js_1.toHex)(bytes);
    }
    exports.keccak256 = keccak256;
  }
});

// node_modules/viem/dist/cjs/utils/hash/hashFunction.js
var require_hashFunction = __commonJS({
  "node_modules/viem/dist/cjs/utils/hash/hashFunction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hashAbiItem = exports.hashFunction = void 0;
    var formatAbiItem_js_1 = require_formatAbiItem();
    var extractFunctionParts_js_1 = require_extractFunctionParts();
    var toBytes_js_1 = require_toBytes();
    var keccak256_js_1 = require_keccak256();
    var hash = (value) => (0, keccak256_js_1.keccak256)((0, toBytes_js_1.toBytes)(value));
    function hashFunction(def) {
      const name = (0, extractFunctionParts_js_1.extractFunctionName)(def);
      const params = (0, extractFunctionParts_js_1.extractFunctionParams)(def) || [];
      return hash(`${name}(${params.map(({ type }) => type).join(",")})`);
    }
    exports.hashFunction = hashFunction;
    function hashAbiItem(abiItem) {
      return hash((0, formatAbiItem_js_1.formatAbiItem)(abiItem));
    }
    exports.hashAbiItem = hashAbiItem;
  }
});

// node_modules/viem/dist/cjs/utils/hash/getFunctionSelector.js
var require_getFunctionSelector = __commonJS({
  "node_modules/viem/dist/cjs/utils/hash/getFunctionSelector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getFunctionSelector = void 0;
    var slice_js_1 = require_slice();
    var hashFunction_js_1 = require_hashFunction();
    var getFunctionSelector = (fn) => {
      if (typeof fn === "string")
        return (0, slice_js_1.slice)((0, hashFunction_js_1.hashFunction)(fn), 0, 4);
      return (0, slice_js_1.slice)((0, hashFunction_js_1.hashAbiItem)(fn), 0, 4);
    };
    exports.getFunctionSelector = getFunctionSelector;
  }
});

// node_modules/viem/dist/cjs/errors/address.js
var require_address = __commonJS({
  "node_modules/viem/dist/cjs/errors/address.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InvalidAddressError = void 0;
    var base_js_1 = require_base();
    var InvalidAddressError = class extends base_js_1.BaseError {
      constructor({ address }) {
        super(`Address "${address}" is invalid.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAddressError"
        });
      }
    };
    exports.InvalidAddressError = InvalidAddressError;
  }
});

// node_modules/viem/dist/cjs/utils/address/isAddress.js
var require_isAddress = __commonJS({
  "node_modules/viem/dist/cjs/utils/address/isAddress.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAddress = void 0;
    var addressRegex = /^0x[a-fA-F0-9]{40}$/;
    function isAddress(address) {
      return addressRegex.test(address);
    }
    exports.isAddress = isAddress;
  }
});

// node_modules/viem/dist/cjs/utils/address/getAddress.js
var require_getAddress = __commonJS({
  "node_modules/viem/dist/cjs/utils/address/getAddress.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getAddress = exports.checksumAddress = void 0;
    var address_js_1 = require_address();
    var toBytes_js_1 = require_toBytes();
    var keccak256_js_1 = require_keccak256();
    var isAddress_js_1 = require_isAddress();
    function checksumAddress(address_, chainId) {
      const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
      const hash = (0, keccak256_js_1.keccak256)((0, toBytes_js_1.stringToBytes)(hexAddress), "bytes");
      const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
      for (let i = 0; i < 40; i += 2) {
        if (hash[i >> 1] >> 4 >= 8 && address[i]) {
          address[i] = address[i].toUpperCase();
        }
        if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
          address[i + 1] = address[i + 1].toUpperCase();
        }
      }
      return `0x${address.join("")}`;
    }
    exports.checksumAddress = checksumAddress;
    function getAddress(address, chainId) {
      if (!(0, isAddress_js_1.isAddress)(address))
        throw new address_js_1.InvalidAddressError({ address });
      return checksumAddress(address, chainId);
    }
    exports.getAddress = getAddress;
  }
});

// node_modules/viem/dist/cjs/utils/data/concat.js
var require_concat = __commonJS({
  "node_modules/viem/dist/cjs/utils/data/concat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.concatHex = exports.concatBytes = exports.concat = void 0;
    function concat(values) {
      if (typeof values[0] === "string")
        return concatHex(values);
      return concatBytes(values);
    }
    exports.concat = concat;
    function concatBytes(values) {
      let length = 0;
      for (const arr of values) {
        length += arr.length;
      }
      const result = new Uint8Array(length);
      let offset = 0;
      for (const arr of values) {
        result.set(arr, offset);
        offset += arr.length;
      }
      return result;
    }
    exports.concatBytes = concatBytes;
    function concatHex(values) {
      return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
    }
    exports.concatHex = concatHex;
  }
});

// node_modules/viem/dist/cjs/utils/abi/encodeAbiParameters.js
var require_encodeAbiParameters = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/encodeAbiParameters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getArrayComponents = exports.encodeAbiParameters = void 0;
    var abi_js_1 = require_abi();
    var address_js_1 = require_address();
    var isAddress_js_1 = require_isAddress();
    var concat_js_1 = require_concat();
    var pad_js_1 = require_pad();
    var size_js_1 = require_size();
    var slice_js_1 = require_slice();
    var toHex_js_1 = require_toHex();
    function encodeAbiParameters(params, values) {
      if (params.length !== values.length)
        throw new abi_js_1.AbiEncodingLengthMismatchError({
          expectedLength: params.length,
          givenLength: values.length
        });
      const preparedParams = prepareParams({
        params,
        values
      });
      const data = encodeParams(preparedParams);
      if (data.length === 0)
        return "0x";
      return data;
    }
    exports.encodeAbiParameters = encodeAbiParameters;
    function prepareParams({ params, values }) {
      const preparedParams = [];
      for (let i = 0; i < params.length; i++) {
        preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
      }
      return preparedParams;
    }
    function prepareParam({ param, value }) {
      const arrayComponents = getArrayComponents(param.type);
      if (arrayComponents) {
        const [length, type] = arrayComponents;
        return encodeArray(value, { length, param: { ...param, type } });
      }
      if (param.type === "tuple") {
        return encodeTuple(value, {
          param
        });
      }
      if (param.type === "address") {
        return encodeAddress(value);
      }
      if (param.type === "bool") {
        return encodeBool(value);
      }
      if (param.type.startsWith("uint") || param.type.startsWith("int")) {
        const signed = param.type.startsWith("int");
        return encodeNumber(value, { signed });
      }
      if (param.type.startsWith("bytes")) {
        return encodeBytes(value, { param });
      }
      if (param.type === "string") {
        return encodeString(value);
      }
      throw new abi_js_1.InvalidAbiEncodingTypeError(param.type, {
        docsPath: "/docs/contract/encodeAbiParameters"
      });
    }
    function encodeParams(preparedParams) {
      let staticSize = 0;
      for (let i = 0; i < preparedParams.length; i++) {
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic)
          staticSize += 32;
        else
          staticSize += (0, size_js_1.size)(encoded);
      }
      const staticParams = [];
      const dynamicParams = [];
      let dynamicSize = 0;
      for (let i = 0; i < preparedParams.length; i++) {
        const { dynamic, encoded } = preparedParams[i];
        if (dynamic) {
          staticParams.push((0, toHex_js_1.numberToHex)(staticSize + dynamicSize, { size: 32 }));
          dynamicParams.push(encoded);
          dynamicSize += (0, size_js_1.size)(encoded);
        } else {
          staticParams.push(encoded);
        }
      }
      return (0, concat_js_1.concat)([...staticParams, ...dynamicParams]);
    }
    function encodeAddress(value) {
      if (!(0, isAddress_js_1.isAddress)(value))
        throw new address_js_1.InvalidAddressError({ address: value });
      return { dynamic: false, encoded: (0, pad_js_1.padHex)(value.toLowerCase()) };
    }
    function encodeArray(value, { length, param }) {
      const dynamic = length === null;
      if (!Array.isArray(value))
        throw new abi_js_1.InvalidArrayError(value);
      if (!dynamic && value.length !== length)
        throw new abi_js_1.AbiEncodingArrayLengthMismatchError({
          expectedLength: length,
          givenLength: value.length,
          type: `${param.type}[${length}]`
        });
      let dynamicChild = false;
      const preparedParams = [];
      for (let i = 0; i < value.length; i++) {
        const preparedParam = prepareParam({ param, value: value[i] });
        if (preparedParam.dynamic)
          dynamicChild = true;
        preparedParams.push(preparedParam);
      }
      if (dynamic || dynamicChild) {
        const data = encodeParams(preparedParams);
        if (dynamic) {
          const length2 = (0, toHex_js_1.numberToHex)(preparedParams.length, { size: 32 });
          return {
            dynamic: true,
            encoded: preparedParams.length > 0 ? (0, concat_js_1.concat)([length2, data]) : length2
          };
        }
        if (dynamicChild)
          return { dynamic: true, encoded: data };
      }
      return {
        dynamic: false,
        encoded: (0, concat_js_1.concat)(preparedParams.map(({ encoded }) => encoded))
      };
    }
    function encodeBytes(value, { param }) {
      const [, paramSize] = param.type.split("bytes");
      const bytesSize = (0, size_js_1.size)(value);
      if (!paramSize) {
        let value_ = value;
        if (bytesSize % 32 !== 0)
          value_ = (0, pad_js_1.padHex)(value_, {
            dir: "right",
            size: Math.ceil((value.length - 2) / 2 / 32) * 32
          });
        return {
          dynamic: true,
          encoded: (0, concat_js_1.concat)([(0, pad_js_1.padHex)((0, toHex_js_1.numberToHex)(bytesSize, { size: 32 })), value_])
        };
      }
      if (bytesSize !== parseInt(paramSize))
        throw new abi_js_1.AbiEncodingBytesSizeMismatchError({
          expectedSize: parseInt(paramSize),
          value
        });
      return { dynamic: false, encoded: (0, pad_js_1.padHex)(value, { dir: "right" }) };
    }
    function encodeBool(value) {
      return { dynamic: false, encoded: (0, pad_js_1.padHex)((0, toHex_js_1.boolToHex)(value)) };
    }
    function encodeNumber(value, { signed }) {
      return {
        dynamic: false,
        encoded: (0, toHex_js_1.numberToHex)(value, {
          size: 32,
          signed
        })
      };
    }
    function encodeString(value) {
      const hexValue = (0, toHex_js_1.stringToHex)(value);
      const partsLength = Math.ceil((0, size_js_1.size)(hexValue) / 32);
      const parts = [];
      for (let i = 0; i < partsLength; i++) {
        parts.push((0, pad_js_1.padHex)((0, slice_js_1.slice)(hexValue, i * 32, (i + 1) * 32), {
          dir: "right"
        }));
      }
      return {
        dynamic: true,
        encoded: (0, concat_js_1.concat)([
          (0, pad_js_1.padHex)((0, toHex_js_1.numberToHex)((0, size_js_1.size)(hexValue), { size: 32 })),
          ...parts
        ])
      };
    }
    function encodeTuple(value, { param }) {
      let dynamic = false;
      const preparedParams = [];
      for (let i = 0; i < param.components.length; i++) {
        const param_ = param.components[i];
        const index = Array.isArray(value) ? i : param_.name;
        const preparedParam = prepareParam({
          param: param_,
          value: value[index]
        });
        preparedParams.push(preparedParam);
        if (preparedParam.dynamic)
          dynamic = true;
      }
      return {
        dynamic,
        encoded: dynamic ? encodeParams(preparedParams) : (0, concat_js_1.concat)(preparedParams.map(({ encoded }) => encoded))
      };
    }
    function getArrayComponents(type) {
      const matches = type.match(/^(.*)\[(\d+)?\]$/);
      return matches ? [matches[2] ? Number(matches[2]) : null, matches[1]] : void 0;
    }
    exports.getArrayComponents = getArrayComponents;
  }
});

// node_modules/viem/dist/cjs/utils/abi/decodeAbiParameters.js
var require_decodeAbiParameters = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/decodeAbiParameters.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeAbiParameters = void 0;
    var abi_js_1 = require_abi();
    var getAddress_js_1 = require_getAddress();
    var size_js_1 = require_size();
    var slice_js_1 = require_slice();
    var trim_js_1 = require_trim();
    var fromHex_js_1 = require_fromHex();
    var encodeAbiParameters_js_1 = require_encodeAbiParameters();
    function decodeAbiParameters(params, data) {
      if (data === "0x" && params.length > 0)
        throw new abi_js_1.AbiDecodingZeroDataError();
      if ((0, size_js_1.size)(data) && (0, size_js_1.size)(data) < 32)
        throw new abi_js_1.AbiDecodingDataSizeTooSmallError({
          data,
          params,
          size: (0, size_js_1.size)(data)
        });
      return decodeParams({
        data,
        params
      });
    }
    exports.decodeAbiParameters = decodeAbiParameters;
    function decodeParams({ data, params }) {
      const decodedValues = [];
      let position = 0;
      for (let i = 0; i < params.length; i++) {
        if (position >= (0, size_js_1.size)(data))
          throw new abi_js_1.AbiDecodingDataSizeTooSmallError({
            data,
            params,
            size: (0, size_js_1.size)(data)
          });
        const param = params[i];
        const { consumed, value } = decodeParam({ data, param, position });
        decodedValues.push(value);
        position += consumed;
      }
      return decodedValues;
    }
    function decodeParam({ data, param, position }) {
      const arrayComponents = (0, encodeAbiParameters_js_1.getArrayComponents)(param.type);
      if (arrayComponents) {
        const [length, type] = arrayComponents;
        return decodeArray(data, {
          length,
          param: { ...param, type },
          position
        });
      }
      if (param.type === "tuple") {
        return decodeTuple(data, { param, position });
      }
      if (param.type === "string") {
        return decodeString(data, { position });
      }
      if (param.type.startsWith("bytes")) {
        return decodeBytes(data, { param, position });
      }
      const value = (0, slice_js_1.slice)(data, position, position + 32, { strict: true });
      if (param.type.startsWith("uint") || param.type.startsWith("int")) {
        return decodeNumber(value, { param });
      }
      if (param.type === "address") {
        return decodeAddress(value);
      }
      if (param.type === "bool") {
        return decodeBool(value);
      }
      throw new abi_js_1.InvalidAbiDecodingTypeError(param.type, {
        docsPath: "/docs/contract/decodeAbiParameters"
      });
    }
    function decodeAddress(value) {
      return { consumed: 32, value: (0, getAddress_js_1.checksumAddress)((0, slice_js_1.slice)(value, -20)) };
    }
    function decodeArray(data, { param, length, position }) {
      if (!length) {
        const offset = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, position, position + 32, { strict: true }));
        const length2 = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, offset, offset + 32, { strict: true }));
        let consumed2 = 0;
        const value2 = [];
        for (let i = 0; i < length2; ++i) {
          const decodedChild = decodeParam({
            data: (0, slice_js_1.slice)(data, offset + 32),
            param,
            position: consumed2
          });
          consumed2 += decodedChild.consumed;
          value2.push(decodedChild.value);
        }
        return { value: value2, consumed: 32 };
      }
      if (hasDynamicChild(param)) {
        const arrayComponents = (0, encodeAbiParameters_js_1.getArrayComponents)(param.type);
        const dynamicChild = !arrayComponents?.[0];
        let consumed2 = 0;
        const value2 = [];
        for (let i = 0; i < length; ++i) {
          const offset = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, position, position + 32, { strict: true }));
          const decodedChild = decodeParam({
            data: (0, slice_js_1.slice)(data, offset),
            param,
            position: dynamicChild ? consumed2 : i * 32
          });
          consumed2 += decodedChild.consumed;
          value2.push(decodedChild.value);
        }
        return { value: value2, consumed: 32 };
      }
      let consumed = 0;
      const value = [];
      for (let i = 0; i < length; ++i) {
        const decodedChild = decodeParam({
          data,
          param,
          position: position + consumed
        });
        consumed += decodedChild.consumed;
        value.push(decodedChild.value);
      }
      return { value, consumed };
    }
    function decodeBool(value) {
      return { consumed: 32, value: (0, fromHex_js_1.hexToBool)(value) };
    }
    function decodeBytes(data, { param, position }) {
      const [_, size] = param.type.split("bytes");
      if (!size) {
        const offset = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, position, position + 32, { strict: true }));
        const length = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, offset, offset + 32, { strict: true }));
        if (length === 0)
          return { consumed: 32, value: "0x" };
        const value2 = (0, slice_js_1.slice)(data, offset + 32, offset + 32 + length, {
          strict: true
        });
        return { consumed: 32, value: value2 };
      }
      const value = (0, slice_js_1.slice)(data, position, position + parseInt(size), {
        strict: true
      });
      return { consumed: 32, value };
    }
    function decodeNumber(value, { param }) {
      const signed = param.type.startsWith("int");
      const size = parseInt(param.type.split("int")[1] || "256");
      return {
        consumed: 32,
        value: size > 48 ? (0, fromHex_js_1.hexToBigInt)(value, { signed }) : (0, fromHex_js_1.hexToNumber)(value, { signed })
      };
    }
    function decodeString(data, { position }) {
      const offset = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, position, position + 32, { strict: true }));
      const length = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, offset, offset + 32, { strict: true }));
      if (length === 0)
        return { consumed: 32, value: "" };
      const value = (0, fromHex_js_1.hexToString)((0, trim_js_1.trim)((0, slice_js_1.slice)(data, offset + 32, offset + 32 + length, { strict: true })));
      return { consumed: 32, value };
    }
    function decodeTuple(data, { param, position }) {
      const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
      const value = hasUnnamedChild ? [] : {};
      let consumed = 0;
      if (hasDynamicChild(param)) {
        const offset = (0, fromHex_js_1.hexToNumber)((0, slice_js_1.slice)(data, position, position + 32, { strict: true }));
        for (let i = 0; i < param.components.length; ++i) {
          const component = param.components[i];
          const decodedChild = decodeParam({
            data: (0, slice_js_1.slice)(data, offset),
            param: component,
            position: consumed
          });
          consumed += decodedChild.consumed;
          value[hasUnnamedChild ? i : component?.name] = decodedChild.value;
        }
        return { consumed: 32, value };
      }
      for (let i = 0; i < param.components.length; ++i) {
        const component = param.components[i];
        const decodedChild = decodeParam({
          data,
          param: component,
          position: position + consumed
        });
        consumed += decodedChild.consumed;
        value[hasUnnamedChild ? i : component?.name] = decodedChild.value;
      }
      return { consumed, value };
    }
    function hasDynamicChild(param) {
      const { type } = param;
      if (type === "string")
        return true;
      if (type === "bytes")
        return true;
      if (type.endsWith("[]"))
        return true;
      if (type === "tuple")
        return param.components?.some(hasDynamicChild);
      const arrayComponents = (0, encodeAbiParameters_js_1.getArrayComponents)(param.type);
      if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
        return true;
      return false;
    }
  }
});

// node_modules/viem/dist/cjs/utils/abi/decodeErrorResult.js
var require_decodeErrorResult = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/decodeErrorResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeErrorResult = void 0;
    var solidity_js_1 = require_solidity();
    var abi_js_1 = require_abi();
    var slice_js_1 = require_slice();
    var getFunctionSelector_js_1 = require_getFunctionSelector();
    var decodeAbiParameters_js_1 = require_decodeAbiParameters();
    var formatAbiItem_js_1 = require_formatAbiItem();
    function decodeErrorResult({ abi, data }) {
      const signature = (0, slice_js_1.slice)(data, 0, 4);
      if (signature === "0x")
        throw new abi_js_1.AbiDecodingZeroDataError();
      const abi_ = [...abi || [], solidity_js_1.solidityError, solidity_js_1.solidityPanic];
      const abiItem = abi_.find((x) => x.type === "error" && signature === (0, getFunctionSelector_js_1.getFunctionSelector)((0, formatAbiItem_js_1.formatAbiItem)(x)));
      if (!abiItem)
        throw new abi_js_1.AbiErrorSignatureNotFoundError(signature, {
          docsPath: "/docs/contract/decodeErrorResult"
        });
      return {
        abiItem,
        args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? (0, decodeAbiParameters_js_1.decodeAbiParameters)(abiItem.inputs, (0, slice_js_1.slice)(data, 4)) : void 0,
        errorName: abiItem.name
      };
    }
    exports.decodeErrorResult = decodeErrorResult;
  }
});

// node_modules/viem/dist/cjs/utils/stringify.js
var require_stringify = __commonJS({
  "node_modules/viem/dist/cjs/utils/stringify.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringify = void 0;
    var stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
      const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
      return typeof replacer === "function" ? replacer(key, value2) : value2;
    }, space);
    exports.stringify = stringify;
  }
});

// node_modules/viem/dist/cjs/utils/abi/formatAbiItemWithArgs.js
var require_formatAbiItemWithArgs = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/formatAbiItemWithArgs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatAbiItemWithArgs = void 0;
    var stringify_js_1 = require_stringify();
    function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
      if (!("name" in abiItem))
        return;
      if (!("inputs" in abiItem))
        return;
      if (!abiItem.inputs)
        return;
      return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? (0, stringify_js_1.stringify)(args[i]) : args[i]}`).join(", ")})`;
    }
    exports.formatAbiItemWithArgs = formatAbiItemWithArgs;
  }
});

// node_modules/viem/dist/cjs/utils/hash/getEventSelector.js
var require_getEventSelector = __commonJS({
  "node_modules/viem/dist/cjs/utils/hash/getEventSelector.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getEventSelector = void 0;
    var hashFunction_js_1 = require_hashFunction();
    var getEventSelector = (event) => {
      if (typeof event === "string")
        return (0, hashFunction_js_1.hashFunction)(event);
      return (0, hashFunction_js_1.hashAbiItem)(event);
    };
    exports.getEventSelector = getEventSelector;
  }
});

// node_modules/viem/dist/cjs/utils/abi/getAbiItem.js
var require_getAbiItem = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/getAbiItem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isArgOfType = exports.getAbiItem = void 0;
    var isHex_js_1 = require_isHex();
    var getEventSelector_js_1 = require_getEventSelector();
    var getFunctionSelector_js_1 = require_getFunctionSelector();
    var isAddress_js_1 = require_isAddress();
    function getAbiItem({ abi, args = [], name }) {
      const isSelector = (0, isHex_js_1.isHex)(name, { strict: false });
      const abiItems = abi.filter((abiItem) => {
        if (isSelector) {
          if (abiItem.type === "function")
            return (0, getFunctionSelector_js_1.getFunctionSelector)(abiItem) === name;
          if (abiItem.type === "event")
            return (0, getEventSelector_js_1.getEventSelector)(abiItem) === name;
          return false;
        }
        return "name" in abiItem && abiItem.name === name;
      });
      if (abiItems.length === 0)
        return void 0;
      if (abiItems.length === 1)
        return abiItems[0];
      for (const abiItem of abiItems) {
        if (!("inputs" in abiItem))
          continue;
        if (!args || args.length === 0) {
          if (!abiItem.inputs || abiItem.inputs.length === 0)
            return abiItem;
          continue;
        }
        if (!abiItem.inputs)
          continue;
        if (abiItem.inputs.length === 0)
          continue;
        if (abiItem.inputs.length !== args.length)
          continue;
        const matched = args.every((arg, index) => {
          const abiParameter = "inputs" in abiItem && abiItem.inputs[index];
          if (!abiParameter)
            return false;
          return isArgOfType(arg, abiParameter);
        });
        if (matched)
          return abiItem;
      }
      return abiItems[0];
    }
    exports.getAbiItem = getAbiItem;
    function isArgOfType(arg, abiParameter) {
      const argType = typeof arg;
      const abiParameterType = abiParameter.type;
      switch (abiParameterType) {
        case "address":
          return (0, isAddress_js_1.isAddress)(arg);
        case "bool":
          return argType === "boolean";
        case "function":
          return argType === "string";
        case "string":
          return argType === "string";
        default: {
          if (abiParameterType === "tuple" && "components" in abiParameter)
            return Object.values(abiParameter.components).every((component, index) => {
              return isArgOfType(Object.values(arg)[index], component);
            });
          if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
            return argType === "number" || argType === "bigint";
          if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
            return argType === "string" || arg instanceof Uint8Array;
          if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
            return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
              ...abiParameter,
              type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
            }));
          }
          return false;
        }
      }
    }
    exports.isArgOfType = isArgOfType;
  }
});

// node_modules/viem/dist/cjs/constants/unit.js
var require_unit = __commonJS({
  "node_modules/viem/dist/cjs/constants/unit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.weiUnits = exports.gweiUnits = exports.etherUnits = void 0;
    exports.etherUnits = {
      gwei: 9,
      wei: 18
    };
    exports.gweiUnits = {
      ether: -9,
      wei: 9
    };
    exports.weiUnits = {
      ether: -18,
      gwei: -9
    };
  }
});

// node_modules/viem/dist/cjs/utils/unit/formatUnits.js
var require_formatUnits = __commonJS({
  "node_modules/viem/dist/cjs/utils/unit/formatUnits.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatUnits = void 0;
    function formatUnits(value, decimals) {
      let display = value.toString();
      const negative = display.startsWith("-");
      if (negative)
        display = display.slice(1);
      display = display.padStart(decimals, "0");
      let [integer, fraction] = [
        display.slice(0, display.length - decimals),
        display.slice(display.length - decimals)
      ];
      fraction = fraction.replace(/(0+)$/, "");
      return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
    }
    exports.formatUnits = formatUnits;
  }
});

// node_modules/viem/dist/cjs/utils/unit/formatEther.js
var require_formatEther = __commonJS({
  "node_modules/viem/dist/cjs/utils/unit/formatEther.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatEther = void 0;
    var unit_js_1 = require_unit();
    var formatUnits_js_1 = require_formatUnits();
    function formatEther(wei, unit = "wei") {
      return (0, formatUnits_js_1.formatUnits)(wei, unit_js_1.etherUnits[unit]);
    }
    exports.formatEther = formatEther;
  }
});

// node_modules/viem/dist/cjs/utils/unit/formatGwei.js
var require_formatGwei = __commonJS({
  "node_modules/viem/dist/cjs/utils/unit/formatGwei.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.formatGwei = void 0;
    var unit_js_1 = require_unit();
    var formatUnits_js_1 = require_formatUnits();
    function formatGwei(wei, unit = "wei") {
      return (0, formatUnits_js_1.formatUnits)(wei, unit_js_1.gweiUnits[unit]);
    }
    exports.formatGwei = formatGwei;
  }
});

// node_modules/viem/dist/cjs/errors/transaction.js
var require_transaction = __commonJS({
  "node_modules/viem/dist/cjs/errors/transaction.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WaitForTransactionReceiptTimeoutError = exports.TransactionReceiptNotFoundError = exports.TransactionNotFoundError = exports.TransactionExecutionError = exports.InvalidStorageKeySizeError = exports.InvalidSerializedTransactionError = exports.InvalidSerializedTransactionTypeError = exports.InvalidSerializableTransactionError = exports.InvalidLegacyVError = exports.FeeConflictError = exports.prettyPrint = void 0;
    var formatEther_js_1 = require_formatEther();
    var formatGwei_js_1 = require_formatGwei();
    var base_js_1 = require_base();
    function prettyPrint(args) {
      const entries = Object.entries(args).map(([key, value]) => {
        if (value === void 0 || value === false)
          return null;
        return [key, value];
      }).filter(Boolean);
      const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
      return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
    }
    exports.prettyPrint = prettyPrint;
    var FeeConflictError = class extends base_js_1.BaseError {
      constructor() {
        super([
          "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
          "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others."
        ].join("\n"));
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "FeeConflictError"
        });
      }
    };
    exports.FeeConflictError = FeeConflictError;
    var InvalidLegacyVError = class extends base_js_1.BaseError {
      constructor({ v }) {
        super(`Invalid \`v\` value "${v}". Expected 27 or 28.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidLegacyVError"
        });
      }
    };
    exports.InvalidLegacyVError = InvalidLegacyVError;
    var InvalidSerializableTransactionError = class extends base_js_1.BaseError {
      constructor({ transaction }) {
        super("Cannot infer a transaction type from provided transaction.", {
          metaMessages: [
            "Provided Transaction:",
            "{",
            prettyPrint(transaction),
            "}",
            "",
            "To infer the type, either provide:",
            "- a `type` to the Transaction, or",
            "- an EIP-1559 Transaction with `maxFeePerGas`, or",
            "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
            "- a Legacy Transaction with `gasPrice`"
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSerializableTransactionError"
        });
      }
    };
    exports.InvalidSerializableTransactionError = InvalidSerializableTransactionError;
    var InvalidSerializedTransactionTypeError = class extends base_js_1.BaseError {
      constructor({ serializedType }) {
        super(`Serialized transaction type "${serializedType}" is invalid.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSerializedTransactionType"
        });
        Object.defineProperty(this, "serializedType", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.serializedType = serializedType;
      }
    };
    exports.InvalidSerializedTransactionTypeError = InvalidSerializedTransactionTypeError;
    var InvalidSerializedTransactionError = class extends base_js_1.BaseError {
      constructor({ attributes, serializedTransaction, type }) {
        const missing = Object.entries(attributes).map(([key, value]) => typeof value === "undefined" ? key : void 0).filter(Boolean);
        super(`Invalid serialized transaction of type "${type}" was provided.`, {
          metaMessages: [
            `Serialized Transaction: "${serializedTransaction}"`,
            missing.length > 0 ? `Missing Attributes: ${missing.join(", ")}` : ""
          ].filter(Boolean)
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSerializedTransactionError"
        });
        Object.defineProperty(this, "serializedTransaction", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "type", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.serializedTransaction = serializedTransaction;
        this.type = type;
      }
    };
    exports.InvalidSerializedTransactionError = InvalidSerializedTransactionError;
    var InvalidStorageKeySizeError = class extends base_js_1.BaseError {
      constructor({ storageKey }) {
        super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidStorageKeySizeError"
        });
      }
    };
    exports.InvalidStorageKeySizeError = InvalidStorageKeySizeError;
    var TransactionExecutionError = class extends base_js_1.BaseError {
      constructor(cause, { account, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
        const prettyArgs = prettyPrint({
          chain: chain && `${chain?.name} (id: ${chain?.id})`,
          from: account?.address,
          to,
          value: typeof value !== "undefined" && `${(0, formatEther_js_1.formatEther)(value)} ${chain?.nativeCurrency.symbol || "ETH"}`,
          data,
          gas,
          gasPrice: typeof gasPrice !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(gasPrice)} gwei`,
          maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei`,
          maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(maxPriorityFeePerGas)} gwei`,
          nonce
        });
        super(cause.shortMessage, {
          cause,
          docsPath,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            "Request Arguments:",
            prettyArgs
          ].filter(Boolean)
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TransactionExecutionError"
        });
        this.cause = cause;
      }
    };
    exports.TransactionExecutionError = TransactionExecutionError;
    var TransactionNotFoundError = class extends base_js_1.BaseError {
      constructor({ blockHash, blockNumber, blockTag, hash, index }) {
        let identifier = "Transaction";
        if (blockTag && index !== void 0)
          identifier = `Transaction at block time "${blockTag}" at index "${index}"`;
        if (blockHash && index !== void 0)
          identifier = `Transaction at block hash "${blockHash}" at index "${index}"`;
        if (blockNumber && index !== void 0)
          identifier = `Transaction at block number "${blockNumber}" at index "${index}"`;
        if (hash)
          identifier = `Transaction with hash "${hash}"`;
        super(`${identifier} could not be found.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TransactionNotFoundError"
        });
      }
    };
    exports.TransactionNotFoundError = TransactionNotFoundError;
    var TransactionReceiptNotFoundError = class extends base_js_1.BaseError {
      constructor({ hash }) {
        super(`Transaction receipt with hash "${hash}" could not be found. The Transaction may not be processed on a block yet.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TransactionReceiptNotFoundError"
        });
      }
    };
    exports.TransactionReceiptNotFoundError = TransactionReceiptNotFoundError;
    var WaitForTransactionReceiptTimeoutError = class extends base_js_1.BaseError {
      constructor({ hash }) {
        super(`Timed out while waiting for transaction with hash "${hash}" to be confirmed.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "WaitForTransactionReceiptTimeoutError"
        });
      }
    };
    exports.WaitForTransactionReceiptTimeoutError = WaitForTransactionReceiptTimeoutError;
  }
});

// node_modules/viem/dist/cjs/errors/contract.js
var require_contract2 = __commonJS({
  "node_modules/viem/dist/cjs/errors/contract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RawContractError = exports.ContractFunctionZeroDataError = exports.ContractFunctionRevertedError = exports.ContractFunctionExecutionError = exports.CallExecutionError = void 0;
    var parseAccount_js_1 = require_parseAccount();
    var solidity_js_1 = require_solidity();
    var decodeErrorResult_js_1 = require_decodeErrorResult();
    var formatAbiItem_js_1 = require_formatAbiItem();
    var formatAbiItemWithArgs_js_1 = require_formatAbiItemWithArgs();
    var getAbiItem_js_1 = require_getAbiItem();
    var formatEther_js_1 = require_formatEther();
    var formatGwei_js_1 = require_formatGwei();
    var abi_js_1 = require_abi();
    var base_js_1 = require_base();
    var transaction_js_1 = require_transaction();
    var utils_js_1 = require_utils();
    var CallExecutionError = class extends base_js_1.BaseError {
      constructor(cause, { account: account_, docsPath, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
        const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : void 0;
        const prettyArgs = (0, transaction_js_1.prettyPrint)({
          from: account?.address,
          to,
          value: typeof value !== "undefined" && `${(0, formatEther_js_1.formatEther)(value)} ${chain?.nativeCurrency.symbol || "ETH"}`,
          data,
          gas,
          gasPrice: typeof gasPrice !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(gasPrice)} gwei`,
          maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei`,
          maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${(0, formatGwei_js_1.formatGwei)(maxPriorityFeePerGas)} gwei`,
          nonce
        });
        super(cause.shortMessage, {
          cause,
          docsPath,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            "Raw Call Arguments:",
            prettyArgs
          ].filter(Boolean)
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "CallExecutionError"
        });
        this.cause = cause;
      }
    };
    exports.CallExecutionError = CallExecutionError;
    var ContractFunctionExecutionError = class extends base_js_1.BaseError {
      constructor(cause, { abi, args, contractAddress, docsPath, functionName, sender }) {
        const abiItem = (0, getAbiItem_js_1.getAbiItem)({ abi, args, name: functionName });
        const formattedArgs = abiItem ? (0, formatAbiItemWithArgs_js_1.formatAbiItemWithArgs)({
          abiItem,
          args,
          includeFunctionName: false,
          includeName: false
        }) : void 0;
        const functionWithParams = abiItem ? (0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true }) : void 0;
        const prettyArgs = (0, transaction_js_1.prettyPrint)({
          address: contractAddress && (0, utils_js_1.getContractAddress)(contractAddress),
          function: functionWithParams,
          args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
          sender
        });
        super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
          cause,
          docsPath,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            "Contract Call:",
            prettyArgs
          ].filter(Boolean)
        });
        Object.defineProperty(this, "abi", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "args", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "contractAddress", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "formattedArgs", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "functionName", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "sender", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ContractFunctionExecutionError"
        });
        this.abi = abi;
        this.args = args;
        this.cause = cause;
        this.contractAddress = contractAddress;
        this.functionName = functionName;
        this.sender = sender;
      }
    };
    exports.ContractFunctionExecutionError = ContractFunctionExecutionError;
    var ContractFunctionRevertedError = class extends base_js_1.BaseError {
      constructor({ abi, data, functionName, message }) {
        let cause;
        let decodedData = void 0;
        let metaMessages;
        let reason;
        if (data && data !== "0x") {
          try {
            decodedData = (0, decodeErrorResult_js_1.decodeErrorResult)({ abi, data });
            const { abiItem, errorName, args: errorArgs } = decodedData;
            if (errorName === "Error") {
              reason = errorArgs[0];
            } else if (errorName === "Panic") {
              const [firstArg] = errorArgs;
              reason = solidity_js_1.panicReasons[firstArg];
            } else {
              const errorWithParams = abiItem ? (0, formatAbiItem_js_1.formatAbiItem)(abiItem, { includeName: true }) : void 0;
              const formattedArgs = abiItem && errorArgs ? (0, formatAbiItemWithArgs_js_1.formatAbiItemWithArgs)({
                abiItem,
                args: errorArgs,
                includeFunctionName: false,
                includeName: false
              }) : void 0;
              metaMessages = [
                errorWithParams ? `Error: ${errorWithParams}` : "",
                formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
              ];
            }
          } catch (err) {
            cause = err;
          }
        } else if (message)
          reason = message;
        let signature;
        if (cause instanceof abi_js_1.AbiErrorSignatureNotFoundError) {
          signature = cause.signature;
          metaMessages = [
            `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
            "Make sure you are using the correct ABI and that the error exists on it.",
            `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${signature}.`
          ];
        }
        super(reason && reason !== "execution reverted" || signature ? [
          `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
          reason || signature
        ].join("\n") : `The contract function "${functionName}" reverted.`, {
          cause,
          metaMessages
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ContractFunctionRevertedError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "reason", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "signature", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = decodedData;
        this.reason = reason;
        this.signature = signature;
      }
    };
    exports.ContractFunctionRevertedError = ContractFunctionRevertedError;
    var ContractFunctionZeroDataError = class extends base_js_1.BaseError {
      constructor({ functionName }) {
        super(`The contract function "${functionName}" returned no data ("0x").`, {
          metaMessages: [
            "This could be due to any of the following:",
            `  - The contract does not have the function "${functionName}",`,
            "  - The parameters passed to the contract function may be invalid, or",
            "  - The address is not a contract."
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ContractFunctionZeroDataError"
        });
      }
    };
    exports.ContractFunctionZeroDataError = ContractFunctionZeroDataError;
    var RawContractError = class extends base_js_1.BaseError {
      constructor({ data, message }) {
        super(message || "");
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: 3
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "RawContractError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = data;
      }
    };
    exports.RawContractError = RawContractError;
  }
});

// node_modules/viem/dist/cjs/utils/abi/decodeFunctionResult.js
var require_decodeFunctionResult = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/decodeFunctionResult.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decodeFunctionResult = void 0;
    var abi_js_1 = require_abi();
    var decodeAbiParameters_js_1 = require_decodeAbiParameters();
    var getAbiItem_js_1 = require_getAbiItem();
    var docsPath = "/docs/contract/decodeFunctionResult";
    function decodeFunctionResult({ abi, args, functionName, data }) {
      let abiItem = abi[0];
      if (functionName) {
        abiItem = (0, getAbiItem_js_1.getAbiItem)({
          abi,
          args,
          name: functionName
        });
        if (!abiItem)
          throw new abi_js_1.AbiFunctionNotFoundError(functionName, { docsPath });
      }
      if (abiItem.type !== "function")
        throw new abi_js_1.AbiFunctionNotFoundError(void 0, { docsPath });
      if (!abiItem.outputs)
        throw new abi_js_1.AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath });
      const values = (0, decodeAbiParameters_js_1.decodeAbiParameters)(abiItem.outputs, data);
      if (values && values.length > 1)
        return values;
      if (values && values.length === 1)
        return values[0];
      return void 0;
    }
    exports.decodeFunctionResult = decodeFunctionResult;
  }
});

// node_modules/viem/dist/cjs/utils/abi/encodeFunctionData.js
var require_encodeFunctionData = __commonJS({
  "node_modules/viem/dist/cjs/utils/abi/encodeFunctionData.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.encodeFunctionData = void 0;
    var abi_js_1 = require_abi();
    var concat_js_1 = require_concat();
    var getFunctionSelector_js_1 = require_getFunctionSelector();
    var encodeAbiParameters_js_1 = require_encodeAbiParameters();
    var formatAbiItem_js_1 = require_formatAbiItem();
    var getAbiItem_js_1 = require_getAbiItem();
    function encodeFunctionData({ abi, args, functionName }) {
      let abiItem = abi[0];
      if (functionName) {
        abiItem = (0, getAbiItem_js_1.getAbiItem)({
          abi,
          args,
          name: functionName
        });
        if (!abiItem)
          throw new abi_js_1.AbiFunctionNotFoundError(functionName, {
            docsPath: "/docs/contract/encodeFunctionData"
          });
      }
      if (abiItem.type !== "function")
        throw new abi_js_1.AbiFunctionNotFoundError(void 0, {
          docsPath: "/docs/contract/encodeFunctionData"
        });
      const definition = (0, formatAbiItem_js_1.formatAbiItem)(abiItem);
      const signature = (0, getFunctionSelector_js_1.getFunctionSelector)(definition);
      const data = "inputs" in abiItem && abiItem.inputs ? (0, encodeAbiParameters_js_1.encodeAbiParameters)(abiItem.inputs, args ?? []) : void 0;
      return (0, concat_js_1.concatHex)([signature, data ?? "0x"]);
    }
    exports.encodeFunctionData = encodeFunctionData;
  }
});

// node_modules/viem/dist/cjs/utils/chain.js
var require_chain2 = __commonJS({
  "node_modules/viem/dist/cjs/utils/chain.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChainContractAddress = exports.defineChain = exports.assertCurrentChain = void 0;
    var chain_js_1 = require_chain();
    function assertCurrentChain({ chain, currentChainId }) {
      if (!chain)
        throw new chain_js_1.ChainNotFoundError();
      if (currentChainId !== chain.id)
        throw new chain_js_1.ChainMismatchError({ chain, currentChainId });
    }
    exports.assertCurrentChain = assertCurrentChain;
    function defineChain(chain, config = {}) {
      const { fees = chain.fees, formatters = chain.formatters, serializers = chain.serializers } = config;
      return {
        ...chain,
        fees,
        formatters,
        serializers
      };
    }
    exports.defineChain = defineChain;
    function getChainContractAddress({ blockNumber, chain, contract: name }) {
      const contract = chain?.contracts?.[name];
      if (!contract)
        throw new chain_js_1.ChainDoesNotSupportContract({
          chain,
          contract: { name }
        });
      if (blockNumber && contract.blockCreated && contract.blockCreated > blockNumber)
        throw new chain_js_1.ChainDoesNotSupportContract({
          blockNumber,
          chain,
          contract: {
            name,
            blockCreated: contract.blockCreated
          }
        });
      return contract.address;
    }
    exports.getChainContractAddress = getChainContractAddress;
  }
});

// node_modules/viem/dist/cjs/errors/node.js
var require_node = __commonJS({
  "node_modules/viem/dist/cjs/errors/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnknownNodeError = exports.TipAboveFeeCapError = exports.TransactionTypeNotSupportedError = exports.IntrinsicGasTooLowError = exports.IntrinsicGasTooHighError = exports.InsufficientFundsError = exports.NonceMaxValueError = exports.NonceTooLowError = exports.NonceTooHighError = exports.FeeCapTooLowError = exports.FeeCapTooHighError = exports.ExecutionRevertedError = void 0;
    var formatGwei_js_1 = require_formatGwei();
    var base_js_1 = require_base();
    var ExecutionRevertedError = class extends base_js_1.BaseError {
      constructor({ cause, message } = {}) {
        const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
        super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ExecutionRevertedError"
        });
      }
    };
    Object.defineProperty(ExecutionRevertedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /execution reverted/
    });
    exports.ExecutionRevertedError = ExecutionRevertedError;
    var FeeCapTooHighError = class extends base_js_1.BaseError {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "FeeCapTooHigh"
        });
      }
    };
    Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
    });
    exports.FeeCapTooHighError = FeeCapTooHighError;
    var FeeCapTooLowError = class extends base_js_1.BaseError {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "FeeCapTooLow"
        });
      }
    };
    Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
    });
    exports.FeeCapTooLowError = FeeCapTooLowError;
    var NonceTooHighError = class extends base_js_1.BaseError {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "NonceTooHighError"
        });
      }
    };
    Object.defineProperty(NonceTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too high/
    });
    exports.NonceTooHighError = NonceTooHighError;
    var NonceTooLowError = class extends base_js_1.BaseError {
      constructor({ cause, nonce } = {}) {
        super([
          `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
          "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
        ].join("\n"), { cause });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "NonceTooLowError"
        });
      }
    };
    Object.defineProperty(NonceTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too low|transaction already imported|already known/
    });
    exports.NonceTooLowError = NonceTooLowError;
    var NonceMaxValueError = class extends base_js_1.BaseError {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "NonceMaxValueError"
        });
      }
    };
    Object.defineProperty(NonceMaxValueError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce has max value/
    });
    exports.NonceMaxValueError = NonceMaxValueError;
    var InsufficientFundsError = class extends base_js_1.BaseError {
      constructor({ cause } = {}) {
        super([
          "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
        ].join("\n"), {
          cause,
          metaMessages: [
            "This error could arise when the account does not have enough funds to:",
            " - pay for the total gas fee,",
            " - pay for the value to send.",
            " ",
            "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
            " - `gas` is the amount of gas needed for transaction to execute,",
            " - `gas fee` is the gas fee,",
            " - `value` is the amount of ether to send to the recipient."
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InsufficientFundsError"
        });
      }
    };
    Object.defineProperty(InsufficientFundsError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /insufficient funds/
    });
    exports.InsufficientFundsError = InsufficientFundsError;
    var IntrinsicGasTooHighError = class extends base_js_1.BaseError {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "IntrinsicGasTooHighError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too high|gas limit reached/
    });
    exports.IntrinsicGasTooHighError = IntrinsicGasTooHighError;
    var IntrinsicGasTooLowError = class extends base_js_1.BaseError {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "IntrinsicGasTooLowError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too low/
    });
    exports.IntrinsicGasTooLowError = IntrinsicGasTooLowError;
    var TransactionTypeNotSupportedError = class extends base_js_1.BaseError {
      constructor({ cause }) {
        super("The transaction type is not supported for this chain.", {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TransactionTypeNotSupportedError"
        });
      }
    };
    Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /transaction type not valid/
    });
    exports.TransactionTypeNotSupportedError = TransactionTypeNotSupportedError;
    var TipAboveFeeCapError = class extends base_js_1.BaseError {
      constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
        super([
          `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${(0, formatGwei_js_1.formatGwei)(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${(0, formatGwei_js_1.formatGwei)(maxFeePerGas)} gwei` : ""}).`
        ].join("\n"), {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TipAboveFeeCapError"
        });
      }
    };
    Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
    });
    exports.TipAboveFeeCapError = TipAboveFeeCapError;
    var UnknownNodeError = class extends base_js_1.BaseError {
      constructor({ cause }) {
        super(`An error occurred while executing: ${cause?.shortMessage}`, {
          cause
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownNodeError"
        });
      }
    };
    exports.UnknownNodeError = UnknownNodeError;
  }
});

// node_modules/viem/dist/cjs/errors/request.js
var require_request = __commonJS({
  "node_modules/viem/dist/cjs/errors/request.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeoutError = exports.RpcRequestError = exports.WebSocketRequestError = exports.HttpRequestError = void 0;
    var stringify_js_1 = require_stringify();
    var base_js_1 = require_base();
    var utils_js_1 = require_utils();
    var HttpRequestError = class extends base_js_1.BaseError {
      constructor({ body, details, headers, status, url }) {
        super("HTTP request failed.", {
          details,
          metaMessages: [
            status && `Status: ${status}`,
            `URL: ${(0, utils_js_1.getUrl)(url)}`,
            body && `Request body: ${(0, stringify_js_1.stringify)(body)}`
          ].filter(Boolean)
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "HttpRequestError"
        });
        Object.defineProperty(this, "body", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "status", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "url", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
      }
    };
    exports.HttpRequestError = HttpRequestError;
    var WebSocketRequestError = class extends base_js_1.BaseError {
      constructor({ body, details, url }) {
        super("WebSocket request failed.", {
          details,
          metaMessages: [`URL: ${(0, utils_js_1.getUrl)(url)}`, `Request body: ${(0, stringify_js_1.stringify)(body)}`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "WebSocketRequestError"
        });
      }
    };
    exports.WebSocketRequestError = WebSocketRequestError;
    var RpcRequestError = class extends base_js_1.BaseError {
      constructor({ body, error, url }) {
        super("RPC Request failed.", {
          cause: error,
          details: error.message,
          metaMessages: [`URL: ${(0, utils_js_1.getUrl)(url)}`, `Request body: ${(0, stringify_js_1.stringify)(body)}`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "RpcRequestError"
        });
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.code = error.code;
      }
    };
    exports.RpcRequestError = RpcRequestError;
    var TimeoutError = class extends base_js_1.BaseError {
      constructor({ body, url }) {
        super("The request took too long to respond.", {
          details: "The request timed out.",
          metaMessages: [`URL: ${(0, utils_js_1.getUrl)(url)}`, `Request body: ${(0, stringify_js_1.stringify)(body)}`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TimeoutError"
        });
      }
    };
    exports.TimeoutError = TimeoutError;
  }
});

// node_modules/viem/dist/cjs/errors/rpc.js
var require_rpc = __commonJS({
  "node_modules/viem/dist/cjs/errors/rpc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnknownRpcError = exports.SwitchChainError = exports.ChainDisconnectedError = exports.ProviderDisconnectedError = exports.UnsupportedProviderMethodError = exports.UnauthorizedProviderError = exports.UserRejectedRequestError = exports.JsonRpcVersionUnsupportedError = exports.LimitExceededRpcError = exports.MethodNotSupportedRpcError = exports.TransactionRejectedRpcError = exports.ResourceUnavailableRpcError = exports.ResourceNotFoundRpcError = exports.InvalidInputRpcError = exports.InternalRpcError = exports.InvalidParamsRpcError = exports.MethodNotFoundRpcError = exports.InvalidRequestRpcError = exports.ParseRpcError = exports.ProviderRpcError = exports.RpcError = void 0;
    var base_js_1 = require_base();
    var request_js_1 = require_request();
    var unknownErrorCode = -1;
    var RpcError = class extends base_js_1.BaseError {
      constructor(cause, { code, docsPath, metaMessages, shortMessage }) {
        super(shortMessage, {
          cause,
          docsPath,
          metaMessages: metaMessages || cause?.metaMessages
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "RpcError"
        });
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.name = cause.name;
        this.code = cause instanceof request_js_1.RpcRequestError ? cause.code : code ?? unknownErrorCode;
      }
    };
    exports.RpcError = RpcError;
    var ProviderRpcError = class extends RpcError {
      constructor(cause, options) {
        super(cause, options);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ProviderRpcError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = options.data;
      }
    };
    exports.ProviderRpcError = ProviderRpcError;
    var ParseRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: ParseRpcError.code,
          shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ParseRpcError"
        });
      }
    };
    Object.defineProperty(ParseRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32700
    });
    exports.ParseRpcError = ParseRpcError;
    var InvalidRequestRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: InvalidRequestRpcError.code,
          shortMessage: "JSON is not a valid request object."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidRequestRpcError"
        });
      }
    };
    Object.defineProperty(InvalidRequestRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32600
    });
    exports.InvalidRequestRpcError = InvalidRequestRpcError;
    var MethodNotFoundRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: MethodNotFoundRpcError.code,
          shortMessage: "The method does not exist / is not available."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "MethodNotFoundRpcError"
        });
      }
    };
    Object.defineProperty(MethodNotFoundRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32601
    });
    exports.MethodNotFoundRpcError = MethodNotFoundRpcError;
    var InvalidParamsRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: InvalidParamsRpcError.code,
          shortMessage: [
            "Invalid parameters were provided to the RPC method.",
            "Double check you have provided the correct parameters."
          ].join("\n")
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParamsRpcError"
        });
      }
    };
    Object.defineProperty(InvalidParamsRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32602
    });
    exports.InvalidParamsRpcError = InvalidParamsRpcError;
    var InternalRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: InternalRpcError.code,
          shortMessage: "An internal error was received."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InternalRpcError"
        });
      }
    };
    Object.defineProperty(InternalRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32603
    });
    exports.InternalRpcError = InternalRpcError;
    var InvalidInputRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: InvalidInputRpcError.code,
          shortMessage: [
            "Missing or invalid parameters.",
            "Double check you have provided the correct parameters."
          ].join("\n")
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidInputRpcError"
        });
      }
    };
    Object.defineProperty(InvalidInputRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32e3
    });
    exports.InvalidInputRpcError = InvalidInputRpcError;
    var ResourceNotFoundRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: ResourceNotFoundRpcError.code,
          shortMessage: "Requested resource not found."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ResourceNotFoundRpcError"
        });
      }
    };
    Object.defineProperty(ResourceNotFoundRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32001
    });
    exports.ResourceNotFoundRpcError = ResourceNotFoundRpcError;
    var ResourceUnavailableRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: ResourceUnavailableRpcError.code,
          shortMessage: "Requested resource not available."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ResourceUnavailableRpcError"
        });
      }
    };
    Object.defineProperty(ResourceUnavailableRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32002
    });
    exports.ResourceUnavailableRpcError = ResourceUnavailableRpcError;
    var TransactionRejectedRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: TransactionRejectedRpcError.code,
          shortMessage: "Transaction creation failed."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "TransactionRejectedRpcError"
        });
      }
    };
    Object.defineProperty(TransactionRejectedRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32003
    });
    exports.TransactionRejectedRpcError = TransactionRejectedRpcError;
    var MethodNotSupportedRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: MethodNotSupportedRpcError.code,
          shortMessage: "Method is not implemented."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "MethodNotSupportedRpcError"
        });
      }
    };
    Object.defineProperty(MethodNotSupportedRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32004
    });
    exports.MethodNotSupportedRpcError = MethodNotSupportedRpcError;
    var LimitExceededRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: LimitExceededRpcError.code,
          shortMessage: "Request exceeds defined limit."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "LimitExceededRpcError"
        });
      }
    };
    Object.defineProperty(LimitExceededRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32005
    });
    exports.LimitExceededRpcError = LimitExceededRpcError;
    var JsonRpcVersionUnsupportedError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          code: JsonRpcVersionUnsupportedError.code,
          shortMessage: "Version of JSON-RPC protocol is not supported."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "JsonRpcVersionUnsupportedError"
        });
      }
    };
    Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32006
    });
    exports.JsonRpcVersionUnsupportedError = JsonRpcVersionUnsupportedError;
    var UserRejectedRequestError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: UserRejectedRequestError.code,
          shortMessage: "User rejected the request."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UserRejectedRequestError"
        });
      }
    };
    Object.defineProperty(UserRejectedRequestError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4001
    });
    exports.UserRejectedRequestError = UserRejectedRequestError;
    var UnauthorizedProviderError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: UnauthorizedProviderError.code,
          shortMessage: "The requested method and/or account has not been authorized by the user."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnauthorizedProviderError"
        });
      }
    };
    Object.defineProperty(UnauthorizedProviderError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4100
    });
    exports.UnauthorizedProviderError = UnauthorizedProviderError;
    var UnsupportedProviderMethodError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: UnsupportedProviderMethodError.code,
          shortMessage: "The Provider does not support the requested method."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnsupportedProviderMethodError"
        });
      }
    };
    Object.defineProperty(UnsupportedProviderMethodError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4200
    });
    exports.UnsupportedProviderMethodError = UnsupportedProviderMethodError;
    var ProviderDisconnectedError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: ProviderDisconnectedError.code,
          shortMessage: "The Provider is disconnected from all chains."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ProviderDisconnectedError"
        });
      }
    };
    Object.defineProperty(ProviderDisconnectedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4900
    });
    exports.ProviderDisconnectedError = ProviderDisconnectedError;
    var ChainDisconnectedError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: ChainDisconnectedError.code,
          shortMessage: "The Provider is not connected to the requested chain."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ChainDisconnectedError"
        });
      }
    };
    Object.defineProperty(ChainDisconnectedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4901
    });
    exports.ChainDisconnectedError = ChainDisconnectedError;
    var SwitchChainError = class extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: SwitchChainError.code,
          shortMessage: "An error occurred when attempting to switch chain."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SwitchChainError"
        });
      }
    };
    Object.defineProperty(SwitchChainError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4902
    });
    exports.SwitchChainError = SwitchChainError;
    var UnknownRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          shortMessage: "An unknown RPC error occurred."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownRpcError"
        });
      }
    };
    exports.UnknownRpcError = UnknownRpcError;
  }
});

// node_modules/viem/dist/cjs/utils/errors/getNodeError.js
var require_getNodeError = __commonJS({
  "node_modules/viem/dist/cjs/utils/errors/getNodeError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getNodeError = exports.containsNodeError = void 0;
    var base_js_1 = require_base();
    var node_js_1 = require_node();
    var request_js_1 = require_request();
    var rpc_js_1 = require_rpc();
    function containsNodeError(err) {
      return err instanceof rpc_js_1.TransactionRejectedRpcError || err instanceof rpc_js_1.InvalidInputRpcError || err instanceof request_js_1.RpcRequestError && err.code === node_js_1.ExecutionRevertedError.code;
    }
    exports.containsNodeError = containsNodeError;
    function getNodeError(err, args) {
      const message = (err.details || "").toLowerCase();
      const executionRevertedError = err.walk((e) => e.code === node_js_1.ExecutionRevertedError.code);
      if (executionRevertedError instanceof base_js_1.BaseError) {
        return new node_js_1.ExecutionRevertedError({
          cause: err,
          message: executionRevertedError.details
        });
      } else if (node_js_1.ExecutionRevertedError.nodeMessage.test(message))
        return new node_js_1.ExecutionRevertedError({
          cause: err,
          message: err.details
        });
      else if (node_js_1.FeeCapTooHighError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooHighError({
          cause: err,
          maxFeePerGas: args?.maxFeePerGas
        });
      else if (node_js_1.FeeCapTooLowError.nodeMessage.test(message))
        return new node_js_1.FeeCapTooLowError({
          cause: err,
          maxFeePerGas: args?.maxFeePerGas
        });
      else if (node_js_1.NonceTooHighError.nodeMessage.test(message))
        return new node_js_1.NonceTooHighError({ cause: err, nonce: args?.nonce });
      else if (node_js_1.NonceTooLowError.nodeMessage.test(message))
        return new node_js_1.NonceTooLowError({ cause: err, nonce: args?.nonce });
      else if (node_js_1.NonceMaxValueError.nodeMessage.test(message))
        return new node_js_1.NonceMaxValueError({ cause: err, nonce: args?.nonce });
      else if (node_js_1.InsufficientFundsError.nodeMessage.test(message))
        return new node_js_1.InsufficientFundsError({ cause: err });
      else if (node_js_1.IntrinsicGasTooHighError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
      else if (node_js_1.IntrinsicGasTooLowError.nodeMessage.test(message))
        return new node_js_1.IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
      else if (node_js_1.TransactionTypeNotSupportedError.nodeMessage.test(message))
        return new node_js_1.TransactionTypeNotSupportedError({ cause: err });
      else if (node_js_1.TipAboveFeeCapError.nodeMessage.test(message))
        return new node_js_1.TipAboveFeeCapError({
          cause: err,
          maxFeePerGas: args?.maxFeePerGas,
          maxPriorityFeePerGas: args?.maxPriorityFeePerGas
        });
      return new node_js_1.UnknownNodeError({
        cause: err
      });
    }
    exports.getNodeError = getNodeError;
  }
});

// node_modules/viem/dist/cjs/utils/errors/getCallError.js
var require_getCallError = __commonJS({
  "node_modules/viem/dist/cjs/utils/errors/getCallError.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getCallError = void 0;
    var contract_js_1 = require_contract2();
    var node_js_1 = require_node();
    var getNodeError_js_1 = require_getNodeError();
    function getCallError(err, { docsPath, ...args }) {
      let cause = (0, getNodeError_js_1.getNodeError)(err, args);
      if (cause instanceof node_js_1.UnknownNodeError)
        cause = err;
      return new contract_js_1.CallExecutionError(cause, {
        docsPath,
        ...args
      });
    }
    exports.getCallError = getCallError;
  }
});

// node_modules/viem/dist/cjs/utils/formatters/extract.js
var require_extract = __commonJS({
  "node_modules/viem/dist/cjs/utils/formatters/extract.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extract = void 0;
    function extract(value, { format }) {
      if (!format)
        return {};
      const keys = Object.keys(format({}));
      return keys.reduce((data, key) => {
        if (value?.hasOwnProperty(key)) {
          data[key] = value[key];
        }
        return data;
      }, {});
    }
    exports.extract = extract;
  }
});

// node_modules/viem/dist/cjs/utils/formatters/formatter.js
var require_formatter = __commonJS({
  "node_modules/viem/dist/cjs/utils/formatters/formatter.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defineFormatter = void 0;
    function defineFormatter(type, format) {
      return ({ exclude, format: overrides }) => {
        return {
          exclude,
          format: (args) => {
            const formatted = format(args);
            if (exclude) {
              for (const key of exclude) {
                delete formatted[key];
              }
            }
            return {
              ...formatted,
              ...overrides(args)
            };
          },
          type
        };
      };
    }
    exports.defineFormatter = defineFormatter;
  }
});

// node_modules/viem/dist/cjs/utils/formatters/transactionRequest.js
var require_transactionRequest = __commonJS({
  "node_modules/viem/dist/cjs/utils/formatters/transactionRequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defineTransactionRequest = exports.formatTransactionRequest = exports.rpcTransactionType = void 0;
    var toHex_js_1 = require_toHex();
    var formatter_js_1 = require_formatter();
    exports.rpcTransactionType = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2"
    };
    function formatTransactionRequest(transactionRequest) {
      return {
        ...transactionRequest,
        gas: typeof transactionRequest.gas !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.gas) : void 0,
        gasPrice: typeof transactionRequest.gasPrice !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.gasPrice) : void 0,
        maxFeePerGas: typeof transactionRequest.maxFeePerGas !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.maxFeePerGas) : void 0,
        maxPriorityFeePerGas: typeof transactionRequest.maxPriorityFeePerGas !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.maxPriorityFeePerGas) : void 0,
        nonce: typeof transactionRequest.nonce !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.nonce) : void 0,
        type: typeof transactionRequest.type !== "undefined" ? exports.rpcTransactionType[transactionRequest.type] : void 0,
        value: typeof transactionRequest.value !== "undefined" ? (0, toHex_js_1.numberToHex)(transactionRequest.value) : void 0
      };
    }
    exports.formatTransactionRequest = formatTransactionRequest;
    exports.defineTransactionRequest = (0, formatter_js_1.defineFormatter)("transactionRequest", formatTransactionRequest);
  }
});

// node_modules/viem/dist/cjs/utils/promise/createBatchScheduler.js
var require_createBatchScheduler = __commonJS({
  "node_modules/viem/dist/cjs/utils/promise/createBatchScheduler.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createBatchScheduler = void 0;
    var schedulerCache = /* @__PURE__ */ new Map();
    function createBatchScheduler({ fn, id, shouldSplitBatch, wait = 0 }) {
      const exec = async () => {
        const scheduler = getScheduler();
        flush();
        const args = scheduler.map(({ args: args2 }) => args2);
        if (args.length === 0)
          return;
        fn(args).then((data) => {
          scheduler.forEach(({ pendingPromise }, i) => pendingPromise.resolve?.([data[i], data]));
        }).catch((err) => {
          scheduler.forEach(({ pendingPromise }) => pendingPromise.reject?.(err));
        });
      };
      const flush = () => schedulerCache.delete(id);
      const getBatchedArgs = () => getScheduler().map(({ args }) => args);
      const getScheduler = () => schedulerCache.get(id) || [];
      const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
      return {
        flush,
        async schedule(args) {
          const pendingPromise = {};
          const promise = new Promise((resolve, reject) => {
            pendingPromise.resolve = resolve;
            pendingPromise.reject = reject;
          });
          const split = shouldSplitBatch?.([...getBatchedArgs(), args]);
          if (split)
            exec();
          const hasActiveScheduler = getScheduler().length > 0;
          if (hasActiveScheduler) {
            setScheduler({ args, pendingPromise });
            return promise;
          }
          setScheduler({ args, pendingPromise });
          setTimeout(exec, wait);
          return promise;
        }
      };
    }
    exports.createBatchScheduler = createBatchScheduler;
  }
});

// node_modules/viem/dist/cjs/utils/transaction/assertRequest.js
var require_assertRequest = __commonJS({
  "node_modules/viem/dist/cjs/utils/transaction/assertRequest.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assertRequest = void 0;
    var parseAccount_js_1 = require_parseAccount();
    var address_js_1 = require_address();
    var node_js_1 = require_node();
    var transaction_js_1 = require_transaction();
    var isAddress_js_1 = require_isAddress();
    function assertRequest(args) {
      const { account: account_, gasPrice, maxFeePerGas, maxPriorityFeePerGas, to } = args;
      const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : void 0;
      if (account && !(0, isAddress_js_1.isAddress)(account.address))
        throw new address_js_1.InvalidAddressError({ address: account.address });
      if (to && !(0, isAddress_js_1.isAddress)(to))
        throw new address_js_1.InvalidAddressError({ address: to });
      if (typeof gasPrice !== "undefined" && (typeof maxFeePerGas !== "undefined" || typeof maxPriorityFeePerGas !== "undefined"))
        throw new transaction_js_1.FeeConflictError();
      if (maxFeePerGas && maxFeePerGas > 2n ** 256n - 1n)
        throw new node_js_1.FeeCapTooHighError({ maxFeePerGas });
      if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
        throw new node_js_1.TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
    }
    exports.assertRequest = assertRequest;
  }
});

// node_modules/viem/dist/cjs/actions/public/call.js
var require_call = __commonJS({
  "node_modules/viem/dist/cjs/actions/public/call.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRevertErrorData = exports.call = void 0;
    var parseAccount_js_1 = require_parseAccount();
    var abis_js_1 = require_abis();
    var contract_js_1 = require_contract();
    var base_js_1 = require_base();
    var chain_js_1 = require_chain();
    var contract_js_2 = require_contract2();
    var decodeFunctionResult_js_1 = require_decodeFunctionResult();
    var encodeFunctionData_js_1 = require_encodeFunctionData();
    var chain_js_2 = require_chain2();
    var toHex_js_1 = require_toHex();
    var getCallError_js_1 = require_getCallError();
    var extract_js_1 = require_extract();
    var transactionRequest_js_1 = require_transactionRequest();
    var createBatchScheduler_js_1 = require_createBatchScheduler();
    var assertRequest_js_1 = require_assertRequest();
    async function call(client, args) {
      const { account: account_ = client.account, batch = Boolean(client.batch?.multicall), blockNumber, blockTag = "latest", accessList, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, ...rest } = args;
      const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : void 0;
      try {
        (0, assertRequest_js_1.assertRequest)(args);
        const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : void 0;
        const block = blockNumberHex || blockTag;
        const format = client.chain?.formatters?.transactionRequest?.format || transactionRequest_js_1.formatTransactionRequest;
        const request = format({
          ...(0, extract_js_1.extract)(rest, { format }),
          from: account?.address,
          accessList,
          data,
          gas,
          gasPrice,
          maxFeePerGas,
          maxPriorityFeePerGas,
          nonce,
          to,
          value
        });
        if (batch && shouldPerformMulticall({ request })) {
          try {
            return await scheduleMulticall(client, {
              ...request,
              blockNumber,
              blockTag
            });
          } catch (err) {
            if (!(err instanceof chain_js_1.ClientChainNotConfiguredError) && !(err instanceof chain_js_1.ChainDoesNotSupportContract))
              throw err;
          }
        }
        const response = await client.request({
          method: "eth_call",
          params: block ? [request, block] : [request]
        });
        if (response === "0x")
          return { data: void 0 };
        return { data: response };
      } catch (err) {
        const data2 = getRevertErrorData(err);
        const { offchainLookup, offchainLookupSignature } = await import("./ccip-STPD7LGV.js");
        if (data2?.slice(0, 10) === offchainLookupSignature && to) {
          return { data: await offchainLookup(client, { data: data2, to }) };
        }
        throw (0, getCallError_js_1.getCallError)(err, {
          ...args,
          account,
          chain: client.chain
        });
      }
    }
    exports.call = call;
    function shouldPerformMulticall({ request }) {
      const { data, to, ...request_ } = request;
      if (!data)
        return false;
      if (data.startsWith(contract_js_1.aggregate3Signature))
        return false;
      if (!to)
        return false;
      if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
        return false;
      return true;
    }
    async function scheduleMulticall(client, args) {
      const { batchSize = 1024, wait = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
      const { blockNumber, blockTag = "latest", data, multicallAddress: multicallAddress_, to } = args;
      let multicallAddress = multicallAddress_;
      if (!multicallAddress) {
        if (!client.chain)
          throw new chain_js_1.ClientChainNotConfiguredError();
        multicallAddress = (0, chain_js_2.getChainContractAddress)({
          blockNumber,
          chain: client.chain,
          contract: "multicall3"
        });
      }
      const blockNumberHex = blockNumber ? (0, toHex_js_1.numberToHex)(blockNumber) : void 0;
      const block = blockNumberHex || blockTag;
      const { schedule } = (0, createBatchScheduler_js_1.createBatchScheduler)({
        id: `${client.uid}.${block}`,
        wait,
        shouldSplitBatch(args2) {
          const size = args2.reduce((size2, { data: data2 }) => size2 + (data2.length - 2), 0);
          return size > batchSize * 2;
        },
        fn: async (requests) => {
          const calls = requests.map((request) => ({
            allowFailure: true,
            callData: request.data,
            target: request.to
          }));
          const calldata = (0, encodeFunctionData_js_1.encodeFunctionData)({
            abi: abis_js_1.multicall3Abi,
            args: [calls],
            functionName: "aggregate3"
          });
          const data2 = await client.request({
            method: "eth_call",
            params: [
              {
                data: calldata,
                to: multicallAddress
              },
              block
            ]
          });
          return (0, decodeFunctionResult_js_1.decodeFunctionResult)({
            abi: abis_js_1.multicall3Abi,
            args: [calls],
            functionName: "aggregate3",
            data: data2 || "0x"
          });
        }
      });
      const [{ returnData, success }] = await schedule({ data, to });
      if (!success)
        throw new contract_js_2.RawContractError({ data: returnData });
      if (returnData === "0x")
        return { data: void 0 };
      return { data: returnData };
    }
    function getRevertErrorData(err) {
      if (!(err instanceof base_js_1.BaseError))
        return void 0;
      const error = err.walk();
      return typeof error.data === "object" ? error.data.data : error.data;
    }
    exports.getRevertErrorData = getRevertErrorData;
  }
});

// node_modules/viem/dist/cjs/errors/ccip.js
var require_ccip = __commonJS({
  "node_modules/viem/dist/cjs/errors/ccip.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OffchainLookupSenderMismatchError = exports.OffchainLookupResponseMalformedError = exports.OffchainLookupError = void 0;
    var stringify_js_1 = require_stringify();
    var base_js_1 = require_base();
    var utils_js_1 = require_utils();
    var OffchainLookupError = class extends base_js_1.BaseError {
      constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
        super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
          cause,
          metaMessages: [
            ...cause.metaMessages || [],
            cause.metaMessages?.length ? "" : [],
            "Offchain Gateway Call:",
            urls && [
              "  Gateway URL(s):",
              ...urls.map((url) => `    ${(0, utils_js_1.getUrl)(url)}`)
            ],
            `  Sender: ${sender}`,
            `  Data: ${data}`,
            `  Callback selector: ${callbackSelector}`,
            `  Extra data: ${extraData}`
          ].flat()
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "OffchainLookupError"
        });
      }
    };
    exports.OffchainLookupError = OffchainLookupError;
    var OffchainLookupResponseMalformedError = class extends base_js_1.BaseError {
      constructor({ result, url }) {
        super("Offchain gateway response is malformed. Response data must be a hex value.", {
          metaMessages: [
            `Gateway URL: ${(0, utils_js_1.getUrl)(url)}`,
            `Response: ${(0, stringify_js_1.stringify)(result)}`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "OffchainLookupResponseMalformedError"
        });
      }
    };
    exports.OffchainLookupResponseMalformedError = OffchainLookupResponseMalformedError;
    var OffchainLookupSenderMismatchError = class extends base_js_1.BaseError {
      constructor({ sender, to }) {
        super("Reverted sender address does not match target contract address (`to`).", {
          metaMessages: [
            `Contract address: ${to}`,
            `OffchainLookup sender address: ${sender}`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "OffchainLookupSenderMismatchError"
        });
      }
    };
    exports.OffchainLookupSenderMismatchError = OffchainLookupSenderMismatchError;
  }
});

// node_modules/viem/dist/cjs/utils/address/isAddressEqual.js
var require_isAddressEqual = __commonJS({
  "node_modules/viem/dist/cjs/utils/address/isAddressEqual.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAddressEqual = void 0;
    var address_js_1 = require_address();
    var isAddress_js_1 = require_isAddress();
    function isAddressEqual(a, b) {
      if (!(0, isAddress_js_1.isAddress)(a))
        throw new address_js_1.InvalidAddressError({ address: a });
      if (!(0, isAddress_js_1.isAddress)(b))
        throw new address_js_1.InvalidAddressError({ address: b });
      return a.toLowerCase() === b.toLowerCase();
    }
    exports.isAddressEqual = isAddressEqual;
  }
});

// node_modules/viem/dist/cjs/utils/ccip.js
var require_ccip2 = __commonJS({
  "node_modules/viem/dist/cjs/utils/ccip.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ccipFetch = exports.offchainLookup = exports.offchainLookupAbiItem = exports.offchainLookupSignature = void 0;
    var call_js_1 = require_call();
    var ccip_js_1 = require_ccip();
    var request_js_1 = require_request();
    var decodeErrorResult_js_1 = require_decodeErrorResult();
    var encodeAbiParameters_js_1 = require_encodeAbiParameters();
    var isAddressEqual_js_1 = require_isAddressEqual();
    var concat_js_1 = require_concat();
    var isHex_js_1 = require_isHex();
    var stringify_js_1 = require_stringify();
    exports.offchainLookupSignature = "0x556f1830";
    exports.offchainLookupAbiItem = {
      name: "OffchainLookup",
      type: "error",
      inputs: [
        {
          name: "sender",
          type: "address"
        },
        {
          name: "urls",
          type: "string[]"
        },
        {
          name: "callData",
          type: "bytes"
        },
        {
          name: "callbackFunction",
          type: "bytes4"
        },
        {
          name: "extraData",
          type: "bytes"
        }
      ]
    };
    async function offchainLookup(client, { blockNumber, blockTag, data, to }) {
      const { args } = (0, decodeErrorResult_js_1.decodeErrorResult)({
        data,
        abi: [exports.offchainLookupAbiItem]
      });
      const [sender, urls, callData, callbackSelector, extraData] = args;
      try {
        if (!(0, isAddressEqual_js_1.isAddressEqual)(to, sender))
          throw new ccip_js_1.OffchainLookupSenderMismatchError({ sender, to });
        const result = await ccipFetch({ data: callData, sender, urls });
        const { data: data_ } = await (0, call_js_1.call)(client, {
          blockNumber,
          blockTag,
          data: (0, concat_js_1.concat)([
            callbackSelector,
            (0, encodeAbiParameters_js_1.encodeAbiParameters)([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
          ]),
          to
        });
        return data_;
      } catch (err) {
        throw new ccip_js_1.OffchainLookupError({
          callbackSelector,
          cause: err,
          data,
          extraData,
          sender,
          urls
        });
      }
    }
    exports.offchainLookup = offchainLookup;
    async function ccipFetch({ data, sender, urls }) {
      let error = new Error("An unknown error occurred.");
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const method = url.includes("{sender}") || url.includes("{data}") ? "GET" : "POST";
        const body = method === "POST" ? { data, sender } : void 0;
        try {
          const response = await fetch(url.replace("{sender}", sender).replace("{data}", data), {
            body: JSON.stringify(body),
            method
          });
          let result;
          if (response.headers.get("Content-Type")?.startsWith("application/json")) {
            result = (await response.json()).data;
          } else {
            result = await response.text();
          }
          if (!response.ok) {
            error = new request_js_1.HttpRequestError({
              body,
              details: (0, stringify_js_1.stringify)(result.error) || response.statusText,
              headers: response.headers,
              status: response.status,
              url
            });
            continue;
          }
          if (!(0, isHex_js_1.isHex)(result)) {
            error = new ccip_js_1.OffchainLookupResponseMalformedError({
              result,
              url
            });
            continue;
          }
          return result;
        } catch (err) {
          error = new request_js_1.HttpRequestError({
            body,
            details: err.message,
            url
          });
        }
      }
      throw error;
    }
    exports.ccipFetch = ccipFetch;
  }
});
export default require_ccip2();
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
