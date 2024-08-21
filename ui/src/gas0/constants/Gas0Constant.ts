import { Address } from "wagmi";
import { ChainId } from "../../constant/constant";
import { Hash } from "viem";

const walletBytecode =
  "0x60c060405260066080908152652d3cba3937b760d11b60a0526000906200002790826200018e565b503480156200003557600080fd5b5060405162000cf838038062000cf883398101604081905262000058916200025a565b600280546001600160a01b0319166001600160a01b0383161790556040517fcc85e4a69ca54da41cc4383bb845cbd1e15ef8a13557a6bed09b8bea2a0d92ff90620000a6906000906200028c565b60408051918290038220602083019390935281019190915246606082015260800160408051601f198184030181529190528051602090910120600155506200030a565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011457607f821691505b6020821081036200013557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200018957600081815260208120601f850160051c81016020861015620001645750805b601f850160051c820191505b81811015620001855782815560010162000170565b5050505b505050565b81516001600160401b03811115620001aa57620001aa620000e9565b620001c281620001bb8454620000ff565b846200013b565b602080601f831160018114620001fa5760008415620001e15750858301515b600019600386901b1c1916600185901b17855562000185565b600085815260208120601f198616915b828110156200022b578886015182559484019460019091019084016200020a565b50858210156200024a5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6000602082840312156200026d57600080fd5b81516001600160a01b03811681146200028557600080fd5b9392505050565b60008083546200029c81620000ff565b60018281168015620002b75760018114620002cd57620002fe565b60ff1984168752821515830287019450620002fe565b8760005260208060002060005b85811015620002f55781548a820152908401908201620002da565b50505082870194505b50929695505050505050565b6109de806200031a6000396000f3fe60806040526004361061004e5760003560e01c8063201ca1a31461005a5780635f5e685e1461007c5780638da5cb5b1461009c578063affed0e0146100d9578063da8c229e146100fd57600080fd5b3661005557005b600080fd5b34801561006657600080fd5b5061007a6100753660046107ec565b61013d565b005b34801561008857600080fd5b5061007a61009736600461084a565b610293565b3480156100a857600080fd5b506002546100bc906001600160a01b031681565b6040516001600160a01b0390911681526020015b60405180910390f35b3480156100e557600080fd5b506100ef60035481565b6040519081526020016100d0565b34801561010957600080fd5b5061012d61011836600461090f565b60046020526000908152604090205460ff1681565b60405190151581526020016100d0565b600154600354604080517f519a1c62344acd7d1f738f159a98ad7a2e0a3ff4e7dbe7da9dc314153d48ffc760208201526001600160a01b03891691810191909152861515606082015260808101919091526000919060a001604051602081830303815290604052805190602001206040516020016101d292919061190160f01b81526002810192909252602282015260420190565b60405160208183030381529060405280519060200120905060006101f8828686866104d9565b6002549091506001600160a01b0380831691161461024a5760405162461bcd60e51b815260206004820152600a60248201526927b7363c9037bbb732b960b11b60448201526064015b60405180910390fd5b60016003600082825461025d919061092c565b909155505050506001600160a01b03949094166000908152600460205260409020805460ff191693151593909317909255505050565b6001600160a01b03881630146102da5760405162461bcd60e51b815260206004820152600c60248201526b496e76616c69642066726f6d60a01b6044820152606401610241565b478611156103215760405162461bcd60e51b8152602060048201526014602482015273496e73756666696369656e742062616c616e636560601b6044820152606401610241565b60006001547f09e1965ed513b27294ab3f9c684e9f3a43d56683a3ba8db5f64624058face1566003548b8b8b8b8b60405161035d929190610953565b6040805191829003822060208301979097528101949094526001600160a01b0392831660608501529116608083015260a082015260c081019190915260e001604051602081830303815290604052805190602001206040516020016103d992919061190160f01b81526002810192909252602282015260420190565b60405160208183030381529060405280519060200120905060006103ff828686866104d9565b6002549091506001600160a01b038083169116148061043657506001600160a01b03811660009081526004602052604090205460ff165b6104705760405162461bcd60e51b815260206004820152600b60248201526a27b7363c9039b4b3b732b960a91b6044820152606401610241565b600160036000828254610483919061092c565b925050819055506104cc8988888080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152508d9250610507915050565b5050505050505050505050565b6000806000806104eb888888886105ad565b9250925092506104fb828261067c565b50909695505050505050565b6060814710156105335760405163cf47918160e01b815247600482015260248101839052604401610241565b600080856001600160a01b0316848660405161054f9190610963565b60006040518083038185875af1925050503d806000811461058c576040519150601f19603f3d011682016040523d82523d6000602084013e610591565b606091505b50915091506105a1868383610739565b925050505b9392505050565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08411156105e85750600091506003905082610672565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa15801561063c573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b03811661066857506000925060019150829050610672565b9250600091508190505b9450945094915050565b600082600381111561069057610690610992565b03610699575050565b60018260038111156106ad576106ad610992565b036106cb5760405163f645eedf60e01b815260040160405180910390fd5b60028260038111156106df576106df610992565b036107005760405163fce698f760e01b815260048101829052602401610241565b600382600381111561071457610714610992565b03610735576040516335e2f38360e21b815260048101829052602401610241565b5050565b60608261074e5761074982610795565b6105a6565b815115801561076557506001600160a01b0384163b155b1561078e57604051639996b31560e01b81526001600160a01b0385166004820152602401610241565b50806105a6565b8051156107a55780518082602001fd5b60405163d6bda27560e01b815260040160405180910390fd5b50565b6001600160a01b03811681146107be57600080fd5b803560ff811681146107e757600080fd5b919050565b600080600080600060a0868803121561080457600080fd5b853561080f816107c1565b94506020860135801515811461082457600080fd5b9350610832604087016107d6565b94979396509394606081013594506080013592915050565b60008060008060008060008060e0898b03121561086657600080fd5b8835610871816107c1565b97506020890135610881816107c1565b965060408901359550606089013567ffffffffffffffff808211156108a557600080fd5b818b0191508b601f8301126108b957600080fd5b8135818111156108c857600080fd5b8c60208285010111156108da57600080fd5b6020830197508096505050506108f260808a016107d6565b925060a0890135915060c089013590509295985092959890939650565b60006020828403121561092157600080fd5b81356105a6816107c1565b8082018082111561094d57634e487b7160e01b600052601160045260246000fd5b92915050565b8183823760009101908152919050565b6000825160005b81811015610984576020818601810151858301520161096a565b506000920191825250919050565b634e487b7160e01b600052602160045260246000fdfea2646970667358221220bf0b1b683a8e6cd0bf6ca74147b2290f0b4d994b12787af3df7d8e0d6406ce2964736f6c63430008150033" as Hash;
export type IGas0Config = {
  Deployer: Address;
  api: string;
  walletBytecode: Hash;
};
export const Gas0Constants: Record<string, IGas0Config> = {
  [ChainId.ZytronLineaSepoliaTestnet]: {
    Deployer: "0x2F0aAD09969DCC8f950d50B4F8c400d698b281a4",
    api: "https://rpc-zytron-testnet-linea.zypher.game/api",
    walletBytecode,
  },
  [ChainId.ZytronLineaMain]: {
    Deployer: "0x84a86ee605b1abd68e713cd86362892b8be8673c",
    api: "https://zytron-linea-mainnet-0gas.zypher.game/api",
    walletBytecode,
  },
};
