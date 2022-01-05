async function main () {
    const gatewaySelect = document.getElementById('gateways');
    IPFSGateways.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        gatewaySelect.appendChild(option);
    });
    const currentGateway = await getIPFSGateway();
    gatewaySelect.value = currentGateway;
    gatewaySelect.addEventListener('change', async event=>{
        await setIPFSGateway(event.target.value);
    });
}

main();