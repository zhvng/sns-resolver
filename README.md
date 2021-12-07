# Solana Name Service Resolver For Chrome

For web 3.0 to truly blossom, it must be freed from the shackles of centralized domain registrars and DNS services. We are building a decentralized solution that will pave the way for an easy to use, trustless permaweb.

## Overview
Lightweight chrome extension that allows users to access `.sol` domains in the browser. Works by redirecting requests for sol domains to the ip address or ipfs hash stored in the "content" field on Solana's SPL Name Service.

## How to install
Clone the repo. Open Chrome, navigate to Extensions -> Load unpacked, and load this folder.

## Verify
This is a simple chrome extension and anyone can easily read/understand the code.

`solana-web3.min.js` is the minified version of v1.31.0 of the solana web3 library with "use strict" removed from the first line. It can be verified here: <https://unpkg.com/@solana/web3.js@1.31.0/lib/index.iife.min.js>.

`crypto-js.min.js` is the minified version of v4.1.1 of the crypto-js library withou any modifications. It can be verified here: <https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js>.