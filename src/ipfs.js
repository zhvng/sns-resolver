/**
 * Some public IPFS Gateway URLs (https://ipfs.github.io/public-gateway-checker/)
 */
const IPFSGateways = [
    "dweb.link",
    "infura-ipfs.io",
    "cf-ipfs.com",
    "astyanax.io",
    "ipfs.io",
    "cloudflare-ipfs.com",
    "gateway.pinata.cloud",
];
const DEFAULT_GATEWAY = IPFSGateways[0];

/**
 * Build IPFS url from cid and path
 * 
 * @param {string} cid IPFS cid to access with url
 * @param {string} path path of the url (containing any search params)
 */
async function buildIPFSUrl(cid, path) {
    const gatewayUrl = await getIPFSGateway();
    return addHttps(gatewayUrl + "/ipfs/" + cid + path);
};

/**
 * Retreive user preferred IPFS gateway from local storage
 * 
 * @returns {Promise<string>} Stored IPFS gateway url
 */
async function getIPFSGateway() {
    const data = await chrome.storage.local.get('IPFSGateway');
    if ('IPFSGateway' in data) {
        return data['IPFSGateway'];
    } else {
        await chrome.storage.local.set({IPFSGateway: DEFAULT_GATEWAY});
        return DEFAULT_GATEWAY;
    }
};

/**
 * Set user's preferred IPFS gateway to a new gateway url. 
 * Retreive url from the `IPFSGateways` object or use a custom url if needed
 * 
 * @param {string} gateway New IPFS Gateway url
 */
async function setIPFSGateway(gateway) {
    await chrome.storage.local.set({IPFSGateway: gateway});
}

/**
 * Append the `https://` scheme to the beginning of a url if it does not have it.
 * 
 * @param {string} url to add the scheme to
 * @returns {string} url with a scheme
 */
function addHttps(url) {
    if (!url.match(/^(?:f|ht)tps?:\/\//)) {
        url = "https://" + url;
    }
    return url;
}