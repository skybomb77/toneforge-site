// ToneForge 配置
const CONFIG = {
    api: "https://interstaminal-unvirtuously-gennie.ngrok-free.dev/toneforge",
    name: "ToneForge",
    version: "1.0.0"
};

// 自動偵測：本地開發 vs 生產
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    CONFIG.api = 'http://localhost:5001';
}

// API fetch helper — 自動帶 ngrok skip header
async function apiFetch(url, opts = {}) {
    const headers = opts.headers || {};
    headers['ngrok-skip-browser-warning'] = 'true';
    if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        opts.body = JSON.stringify(opts.body);
    }
    const token = localStorage.getItem('kc_token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, { ...opts, headers });
}
