# Solana Name Service Resolver For Chrome

Lightweight chrome extension that lets users access `.sol` domains in the browser! Works by redirecting requests for sol domains to the url, ip address or ipfs hash stored in the "content" field on Solana's SPL Name Service.

## Vision
For web 3.0 to be truly decentralized, we can't rely on centralized domain registrars and DNS services. The goal of this extension is to use the Solana blockchain as a name server and pave the way for a trustless and easy-to-use permaweb.

## Install and run
1. Clone this repo
2. Load the extension on chrome following
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select this folder.

## Search engines
Since .sol is not a recognized domain extension, Chrome will automatically search for the domain in the user's default search engine if entered into the address bar (unless the user appends a scheme like `http://` or ends their query with a `/`). The extension takes this search query and redirect it. For this reason it needs access to the hostnames of every supported search engine.

Currently we support:
- Google: all domains in <https://www.google.com/supported_domains>
- DuckDuckGo: `duckduckgo.com`

## Verify
This is an open source chrome extension and anyone can read the code.

`solana-web3.min.js` is the minified version of v1.31.0 of the solana web3 library with "use strict" removed from the first line. It can be verified here: <https://unpkg.com/@solana/web3.js@1.31.0/lib/index.iife.min.js>.

`crypto-js.min.js` is the minified version of v4.1.1 of the crypto-js library without any modifications. It can be verified here: <https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js>.
