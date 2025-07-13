// 蓝诚人力 - 提现成功页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面数据
    initSuccessData();
    
    // 清理sessionStorage中的临时数据
    cleanupTempData();
});

// 初始化成功页面数据
function initSuccessData() {
    // 从sessionStorage获取提现信息
    const withdrawInfo = JSON.parse(sessionStorage.getItem('finalWithdrawInfo'));
    
    if (withdrawInfo) {
        updateSuccessDisplay(withdrawInfo);
        
        // 保存提现记录到本地存储
        saveWithdrawRecord(withdrawInfo);
    } else {
        // 如果没有提现信息，使用默认数据
        const defaultInfo = {
            amount: '1286.50',
            formattedAmount: '1,286.50',
            method: {
                name: '🏦 银行卡提现',
                account: '工商银行 ****1234',
                timeDesc: '1-3个工作日'
            },
            timestamp: new Date().toISOString()
        };
        updateSuccessDisplay(defaultInfo);
    }
}

// 更新成功页面显示
function updateSuccessDisplay(withdrawInfo) {
    const formattedAmount = `¥${withdrawInfo.formattedAmount}`;
    
    // 更新金额显示
    document.getElementById('successAmount').textContent = formattedAmount;
    document.getElementById('withdrawAmount').textContent = formattedAmount;
    
    // 更新提现方式
    document.getElementById('withdrawMethod').textContent = withdrawInfo.method.account;
    
    // 更新申请时间
    const applyTime = formatDateTime(withdrawInfo.timestamp);
    document.getElementById('applyTime').textContent = applyTime;
    
    // 更新预计到账时间
    document.getElementById('arrivalTime').textContent = `预计${withdrawInfo.method.timeDesc}到账`;
}

// 格式化日期时间
function formatDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 保存提现记录
function saveWithdrawRecord(withdrawInfo) {
    const record = {
        id: generateRecordId(),
        amount: withdrawInfo.amount,
        formattedAmount: withdrawInfo.formattedAmount,
        method: withdrawInfo.method,
        applyTime: withdrawInfo.timestamp,
        status: 'processing', // processing, success, failed
        statusText: '处理中'
    };
    
    // 获取现有记录
    const existingRecords = JSON.parse(localStorage.getItem('withdrawRecords')) || [];
    
    // 添加新记录到开头
    existingRecords.unshift(record);
    
    // 保持最多20条记录
    if (existingRecords.length > 20) {
        existingRecords.splice(20);
    }
    
    // 保存到本地存储
    localStorage.setItem('withdrawRecords', JSON.stringify(existingRecords));
}

// 生成记录ID
function generateRecordId() {
    return 'WD' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// 清理临时数据
function cleanupTempData() {
    // 延迟清理，给页面足够时间显示数据
    setTimeout(() => {
        sessionStorage.removeItem('withdrawAmount');
        sessionStorage.removeItem('withdrawMethod');
        sessionStorage.removeItem('finalWithdrawInfo');
    }, 2000);
}

// 跳转到提现记录页面
function goToWithdrawHistory() {
    window.location.href = 'withdraw-records.html';
}

// 返回首页
function goToHome() {
    window.location.href = 'index.html';
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