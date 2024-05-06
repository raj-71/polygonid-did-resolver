"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResolver = void 0;
const ethers_1 = require("ethers");
const polygon_did_registry_contract_1 = __importDefault(require("@ayanworks/polygon-did-registry-contract"));
const did_1 = require("./utils/did");
/**
 * Resolves DID Document.
 * @param did
 * @returns Return DID Document on chain.
 */
function getResolver() {
    function resolve(did) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isValidDid = (0, did_1.validateDid)(did);
                if (!isValidDid) {
                    throw new Error('invalid did provided');
                }
                const parsedDid = (0, did_1.parseDid)(did);
                const provider = new ethers_1.providers.JsonRpcProvider(parsedDid.networkUrl);
                const registry = new ethers_1.Contract(parsedDid.contractAddress, polygon_did_registry_contract_1.default.abi, provider);
                // Calling smart contract with getting DID Document
                const didDocument = yield registry.functions.getDIDDoc(parsedDid.didAddress);
                if (!didDocument[0]) {
                    return {
                        didDocument: null,
                        didDocumentMetadata: {},
                        didResolutionMetadata: {
                            error: `NotFound!`,
                            message: `resolver_error: Unable to resolve did '${did}'`,
                        },
                    };
                }
                const didDocumentJson = JSON.parse(didDocument[0]);
                if (!(didDocumentJson === null || didDocumentJson === void 0 ? void 0 : didDocumentJson.verificationMethod)) {
                    return {
                        didDocument: didDocumentJson,
                        didDocumentMetadata: {
                            linkedResourceMetadata: [],
                            deactivated: true,
                        },
                        didResolutionMetadata: { contentType: 'application/did+ld+json' },
                    };
                }
                return {
                    didDocument: didDocumentJson,
                    didDocumentMetadata: {
                        linkedResourceMetadata: didDocument[1].map((element) => {
                            return JSON.parse(element);
                        }),
                    },
                    didResolutionMetadata: { contentType: 'application/did+ld+json' },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    return { polygon: resolve };
}
exports.getResolver = getResolver;
//# sourceMappingURL=resolver.js.map