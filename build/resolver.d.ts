import { DIDResolver } from 'did-resolver';
/**
 * Resolves DID Document.
 * @param did
 * @returns Return DID Document on chain.
 */
export declare function getResolver(): Record<string, DIDResolver>;
