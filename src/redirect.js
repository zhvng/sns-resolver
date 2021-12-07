const web3 = solanaWeb3;

/**
 * Redirects the solana url to the domain/ip/ipfs hash(TODO) it points to.
 * 
 * window.location.href has one param `solanaUrl`, which contains the hostname and path 
 *  of the solana url that is passed in. Not required to contain other elements.
 */
async function main() {
    const solanaUrl = addHttps(new URL(window.location.href).searchParams.get("solanaUrl"));
    const solanaUrlParsed = new URL(solanaUrl);
    const hostnameArray = solanaUrlParsed.hostname.split('.');
    const SNSDomain = hostnameArray[hostnameArray.length - 2];

    document.getElementById('display').textContent = SNSDomain + '.sol';
    try{
        const publicKey = await getKey(SNSDomain);
        const data = await getContentFromAccount(publicKey);
        const url = data + solanaUrlParsed.pathname;
        window.location.href = addHttps(url);
    } catch(err) {
        window.location.href = './404.html';
    }
}

/**
 * Append the `https://` scheme to the beginning of a url if it does not have it.
 * 
 * @param {string} url to add the scheme to
 * @returns String of the url with a scheme
 */
function addHttps(url) {
    if (!url.match(/^(?:f|ht)tps?:\/\//)) {
        url = "https://" + url;
    }
    return url;
}

/**
 * 
 * @param {web3.PublicKey} publicKey 
 * @returns 
 */
async function getContentFromAccount(publicKey) {
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
    const nameAccount = await connection.getAccountInfo(publicKey, 'processed');
    const data = nameAccount.data.toString('ascii').slice(96).replace(/\0/g, '');
    return data;
}

async function getKey(name) {
    const HASH_PREFIX = 'SPL Name Service';
    const SOL_TLD_AUTHORITY = new web3.PublicKey(
        "58PwtjSDuFHuUkYjH9BYnnQKHfwo9reZhC2zMJv9JPkx"
    ); 
    const NAME_PROGRAM_ID = new web3.PublicKey(
        'namesLPneVptA9Z5rqUDD9tMTWEJwofgaYwp8cawRkX'
    );

    // HASH DOMAIN NAME WITH HASH PREFIX
    const input = HASH_PREFIX + name;
    
    const fromHexString = hexString =>
        new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

    const hashed_name = fromHexString(CryptoJS.SHA256(input).toString());

    // BUILD SEEDS AND FIND ADDRESS
    const seeds = [hashed_name];
    seeds.push(new Uint8Array(32));
    seeds.push(SOL_TLD_AUTHORITY.toBuffer());
    const [nameAccountKey] = await web3.PublicKey.findProgramAddress(
      seeds,
      NAME_PROGRAM_ID
    );
    return nameAccountKey;
}

main();
