"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDid = exports.parseDid = exports.getNetworkFromDid = void 0;
const config_1 = require("../config");
const helpers_1 = require("./helpers");
function getNetworkFromDid(did) {
    const network = did.split(':')[2];
    if (network === 'testnet') {
        return 'testnet';
    }
    return 'mainnet';
}
exports.getNetworkFromDid = getNetworkFromDid;
function parseDid(did) {
    const network = getNetworkFromDid(did);
    const didAddress = network === 'testnet' ? did.split(':')[3] : did.split(':')[2];
    const contractAddress = config_1.networkConfig[network].CONTRACT_ADDRESS;
    const networkUrl = config_1.networkConfig[network].URL;
    return {
        network,
        contractAddress,
        networkUrl,
        didAddress,
    };
}
exports.parseDid = parseDid;
function validateDid(did) {
    return helpers_1.POLYGON_DID_REGEX.test(did);
}
exports.validateDid = validateDid;
//# sourceMappingURL=did.js.map