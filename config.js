// ToneForge 配置
const CONFIG = {
    api: "https://interstaminal-unvirtuously-gennie.ngrok-free.dev/toneforge",
    name: "ToneForge",
    version: "1.0.0"
};

// 自動偵測：本地 vs ngrok vs 生產
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    CONFIG.api = 'http://localhost:5001';
} else if (location.hostname.includes('ngrok')) {
    CONFIG.api = '';  // same-origin, no CORS
}

// API fetch helper — 自動帶 ngrok skip header + 繞過警告頁
async function apiFetch(url, opts = {}) {
    const headers = opts.headers || {};
    headers['ngrok-skip-browser-warning'] = 'true';
    // Custom UA to bypass ngrok free-tier interstitial page
    if (url.includes('ngrok')) {
        headers['User-Agent'] = 'KCStudioApp/1.0';
    }
    if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        opts.body = JSON.stringify(opts.body);
    }
    const token = localStorage.getItem('kc_token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, { ...opts, headers });
}
