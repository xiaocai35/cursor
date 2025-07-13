// 蓝诚人力 - 添加提现方式页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('添加提现方式页面加载完成');
});

// 添加银行卡
function addBankCard() {
    window.location.href = 'add-bank-card.html';
}

// 添加支付宝
function addAlipay() {
    window.location.href = 'add-alipay.html';
}

// 添加微信
function addWeChat() {
    window.location.href = 'add-wechat.html';
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 显示加载状态
function showLoading(message = '加载中...') {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-4 flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <div class="text-gray-700">${message}</div>
        </div>
    `;
    
    document.body.appendChild(loading);
}

// 隐藏加载状态
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
} 