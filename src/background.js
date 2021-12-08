/**
 * Listener for direct .sol/ requests. i.e. if the user specifies 'http://' or a '/' at the end 
 */
 chrome.webRequest.onBeforeRequest.addListener(  
    async (details) => {
        await redirect(details.url);
    },
    {
        urls: ["*://*.sol/*"]
    },
[]);

/**
 * Listener for requests that are auto-converted into google search queries by Chrome.
 * Since .sol is not a recognized domain extension, chrome will automatically search for the domain in 
 *  the user's default search engine if entered into the address bar. This listener redirects the search request.
 * We are assuming the default search engine is google.com. Support for additional search engines coming later.
 */
chrome.webRequest.onBeforeRequest.addListener(  
    async (details) => {
        const solanaUrl = new URL(details.url).searchParams.get('q');
        await redirect(solanaUrl);
    },
    {
        urls: ["*://www.google.com/search?q=*.sol&*", "*://www.google.com/search?q=*.sol%2F*&*"]
    },
[]);

/**
 * Retreive the tab the user is navigating from
 * 
 * @returns current active tab
 */
async function getCurrentTab () {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    return tab;
}

/**
 * Opens redirect.html and passes in the Solana url our user wants to navigate to in the params.
 * The redirect page will look the url up on the blockchain and redirect to what it points to.
 * 
 * @param {string} solanaUrl the url the user is navigating to
 */
async function redirect(solanaUrl) {
    const tab = await getCurrentTab();
    if (tab !== undefined && solanaUrl !== undefined) {
        chrome.tabs.update(tab.id, {url: `./src/redirect.html?solanaUrl=${solanaUrl}`});
    }
}

