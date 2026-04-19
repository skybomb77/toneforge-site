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
