// 蓝诚人力 - 提现金额选择页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面数据
    initWithdrawData();
});

// 初始化提现数据
function initWithdrawData() {
    // 从URL参数或者本地存储获取可提现金额
    const urlParams = new URLSearchParams(window.location.search);
    const availableAmount = urlParams.get('amount') || '1286.50';
    
    // 更新页面显示
    updateAmountDisplay(availableAmount);
}

// 更新金额显示
function updateAmountDisplay(amount) {
    const formattedAmount = formatAmount(amount);
    
    // 更新可提现金额
    document.getElementById('availableAmount').textContent = `¥${formattedAmount}`;
    
    // 更新提现金额（全额提现）
    document.getElementById('withdrawAmount').textContent = `¥ ${formattedAmount}`;
    
    // 存储金额信息供下一页使用
    sessionStorage.setItem('withdrawAmount', amount);
}

// 格式化金额
function formatAmount(amount) {
    const num = parseFloat(amount);
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 跳转到提现方式选择页面
function goToWithdrawMethod() {
    const amount = sessionStorage.getItem('withdrawAmount');
    
    if (!amount || parseFloat(amount) <= 0) {
        showToast('提现金额无效');
        return;
    }
    
    // 跳转到提现方式选择页面
    window.location.href = `withdraw-method.html?amount=${amount}`;
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