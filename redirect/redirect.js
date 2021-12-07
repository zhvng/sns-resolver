const web3 = solanaWeb3;

async function main() {
    // PARSE PARAMS TO GET DOMAIN NAME
    const redirectUrl = new URL(window.location.href).searchParams.get("redirectUrl");
    const redirectUrlParsed = new URL(redirectUrl);
    const hostnameArray = redirectUrlParsed.hostname.split('.');
    const SNSDomain = hostnameArray[hostnameArray.length - 2];

    document.getElementById('display').textContent = SNSDomain + '.sol'
    try{
        const data = await getContentFromAccount(await getKey(SNSDomain));
        const url = data + redirectUrlParsed.pathname;
        window.location.href = addHttp(url);
    } catch(err) {
        window.location.href = './404.html';
    }
}

/**
 * 
 * @param {string} url URL to add http to
 * @returns 
 */
 function addHttp(url) {
    if (!url.match(/^(?:f|ht)tps?:\/\//)) {
        url = "https://" + url;
    }
    return url;
}

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
