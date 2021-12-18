setTimeout(window.close, 5000)
window.addEventListener('blur', window.close)
window.addEventListener('click', window.close)

const params = new URL(window.location.href).searchParams
document.getElementById('solanaDomain').textContent = params.get('solanaDomain');
document.getElementById('redirectDomain').textContent = params.get('redirectDomain');
document.getElementById('details').textContent = params.get('details');
const path = params.get('path');
document.getElementById('path').textContent = path === '/'? '' : path;