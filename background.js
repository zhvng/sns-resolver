/**
 * 
 * @returns Current active tab
 */
async function getCurrentTab () {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    return tab;
}

/**
 * 
 * @param {string} url URL to add http to
 * @returns 
 */
function addHttp(url) {
    if (!url.match(/^(?:f|ht)tps?:\/\//)) {
        url = "http://" + url;
    }
    return url;
}

/**
 * Opens redirect.html and passes in our target redirectUrl in the url params.
 * 
 * @param {string} redirectUrl 
 */
async function redirect(redirectUrl) {
    const tab = await getCurrentTab();
    if (tab !== undefined && redirectUrl !== undefined) {
        chrome.tabs.update(tab.id, {url: `./redirect/redirect.html?redirectUrl=${redirectUrl}`});
    }
}

/**
 * For direct .sol/ requests
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
 * For requests that get auto-converted into google search queries by Chrome.
 */
chrome.webRequest.onBeforeRequest.addListener(  
    async (details) => {
        const redirectUrl = addHttp(new URL(details.url).searchParams.get('q'));
        await redirect(redirectUrl);
    },
    {
        urls: ["*://*.google.com/search?q=*.sol&*", "*://*.google.com/search?q=*.sol%2F*&*"]
    },
[]);

