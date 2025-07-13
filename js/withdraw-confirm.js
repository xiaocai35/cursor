// 蓝诚人力 - 提现确认页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面数据
    initConfirmData();
});

// 初始化确认页面数据
function initConfirmData() {
    // 从URL参数和sessionStorage获取数据
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount') || sessionStorage.getItem('withdrawAmount') || '1286.50';
    const methodType = urlParams.get('method') || 'bank';
    
    // 获取提现方式详细信息
    const methodInfo = JSON.parse(sessionStorage.getItem('withdrawMethod')) || getDefaultMethodInfo(methodType);
    
    // 更新页面显示
    updateConfirmDisplay(amount, methodInfo);
}

// 更新确认页面显示
function updateConfirmDisplay(amount, methodInfo) {
    const formattedAmount = formatAmount(amount);
    
    // 更新金额信息
    document.getElementById('withdrawAmount').textContent = `¥${formattedAmount}`;
    document.getElementById('actualAmount').textContent = `¥${formattedAmount}`;
    
    // 更新提现方式信息
    document.getElementById('withdrawMethod').textContent = methodInfo.name;
    document.getElementById('withdrawAccount').textContent = methodInfo.account;
    document.getElementById('arrivalTime').textContent = `预计${methodInfo.timeDesc}到账`;
    
    // 存储最终的提现信息
    const withdrawInfo = {
        amount: amount,
        formattedAmount: formattedAmount,
        method: methodInfo,
        timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('finalWithdrawInfo', JSON.stringify(withdrawInfo));
}

// 获取默认提现方式信息
function getDefaultMethodInfo(methodType) {
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
    
    return methodMap[methodType] || methodMap['bank'];
}

// 格式化金额
function formatAmount(amount) {
    const num = parseFloat(amount);
    return num.toLocaleString('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// 提交提现申请
function submitWithdraw() {
    const withdrawInfo = JSON.parse(sessionStorage.getItem('finalWithdrawInfo'));
    
    if (!withdrawInfo) {
        showToast('提现信息丢失，请重新操作');
        return;
    }
    
    // 显示处理中状态
    showProcessing();
    
    // 模拟提交处理
    setTimeout(() => {
        hideProcessing();
        
        // 模拟提交成功
        if (Math.random() > 0.1) { // 90% 成功率
            // 跳转到成功页面
            window.location.href = 'withdraw-success.html';
        } else {
            // 模拟失败
            showToast('提现申请失败，请稍后重试');
        }
    }, 2000);
}

// 显示处理中状态
function showProcessing() {
    const button = document.querySelector('button[onclick="submitWithdraw()"]');
    if (button) {
        button.disabled = true;
        button.innerHTML = `
            <div class="flex items-center justify-center space-x-2">
                <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>处理中...</span>
            </div>
        `;
    }
}

// 隐藏处理中状态
function hideProcessing() {
    const button = document.querySelector('button[onclick="submitWithdraw()"]');
    if (button) {
        button.disabled = false;
        button.textContent = '确认提现';
    }
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
} 