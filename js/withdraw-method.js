// 蓝诚人力 - 提现方式选择页面交互脚本

let selectedMethod = 'bank'; // 默认选中银行卡

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面数据
    initWithdrawMethodData();
});

// 初始化提现方式数据
function initWithdrawMethodData() {
    // 从URL参数获取提现金额
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount') || sessionStorage.getItem('withdrawAmount') || '1286.50';
    
    // 更新金额显示
    updateAmountDisplay(amount);
    
    // 存储金额信息
    sessionStorage.setItem('withdrawAmount', amount);
}

// 更新金额显示
function updateAmountDisplay(amount) {
    const formattedAmount = formatAmount(amount);
    document.getElementById('withdrawAmount').textContent = `¥${formattedAmount}`;
}

// 格式化金额
function formatAmount(amount) {
    const num = parseFloat(amount);
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 选择提现方式
function selectMethod(method) {
    // 移除之前的选中状态
    const allCards = document.querySelectorAll('.method-card');
    allCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加新的选中状态
    const selectedCard = document.querySelector(`[data-method="${method}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedMethod = method;
    }
}

// 添加新的提现方式
function addNewMethod() {
    window.location.href = 'add-withdraw-method.html';
}

// 确认提现
function confirmWithdraw() {
    const amount = sessionStorage.getItem('withdrawAmount');
    
    if (!amount || parseFloat(amount) <= 0) {
        showToast('提现金额无效');
        return;
    }
    
    if (!selectedMethod) {
        showToast('请选择提现方式');
        return;
    }
    
    // 存储选中的提现方式信息
    const methodInfo = getMethodInfo(selectedMethod);
    sessionStorage.setItem('withdrawMethod', JSON.stringify(methodInfo));
    
    // 跳转到确认页面
    window.location.href = `withdraw-confirm.html?amount=${amount}&method=${selectedMethod}`;
}

// 获取提现方式信息
function getMethodInfo(method) {
    const methodMap = {
        'bank': {
            type: 'bank',
            name: '🏦 银行卡提现',
            account: '工商银行 ****1234',
            timeDesc: '1-3个工作日'
        },
        'alipay': {
            type: 'alipay',
            name: '💰 支付宝提现',
            account: '183****5678',
            timeDesc: '2小时内'
        },
        'wechat': {
            type: 'wechat',
            name: '💚 微信钱包提现',
            account: '微信用户',
            timeDesc: '2小时内'
        }
    };
    
    return methodMap[method] || methodMap['bank'];
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