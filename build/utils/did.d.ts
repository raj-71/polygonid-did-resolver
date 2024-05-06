export declare function getNetworkFromDid(did: string): "amoy" | "mainnet";
export declare function parseDid(did: string): {
    network: string;
    contractAddress: string;
    networkUrl: string;
    didAddress: string;
};
export declare function validateDid(did: string): boolean;
