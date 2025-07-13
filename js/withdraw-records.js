// 提现记录管理
let allRecords = [];
let currentFilter = 'all';

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    loadWithdrawRecords();
});

// 加载提现记录
function loadWithdrawRecords() {
    const loadingState = document.getElementById('loadingState');
    const recordsList = document.getElementById('recordsList');
    const emptyState = document.getElementById('emptyState');
    
    // 显示加载状态
    loadingState.style.display = 'block';
    recordsList.style.display = 'none';
    emptyState.style.display = 'none';
    
    // 模拟加载延迟
    setTimeout(() => {
        try {
            // 从localStorage读取记录
            const savedRecords = localStorage.getItem('withdrawRecords');
            allRecords = savedRecords ? JSON.parse(savedRecords) : [];
            
            // 添加一些示例记录（如果没有记录的话）
            if (allRecords.length === 0) {
                allRecords = generateSampleRecords();
                localStorage.setItem('withdrawRecords', JSON.stringify(allRecords));
            }
            
            // 按时间倒序排列
            allRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            loadingState.style.display = 'none';
            renderRecords();
            
        } catch (error) {
            console.error('加载提现记录失败:', error);
            loadingState.style.display = 'none';
            showEmptyState();
        }
    }, 500);
}

// 生成示例记录（用于演示）
function generateSampleRecords() {
    const methods = ['银行卡', '支付宝', '微信', '银行卡'];
    const statuses = ['success', 'processing', 'success', 'success'];
    const methodDetails = ['工商银行 ****1234', '支付宝 ****5678', '微信 ****9012', '建设银行 ****3456'];
    const records = [];
    
    // 创建几条示例记录
    for (let i = 0; i < 4; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i * 3);
        
        records.push({
            id: 'WD' + Date.now() + i,
            amount: 1286.50 - i * 200,
            method: methods[i],
            methodDetail: methodDetails[i],
            status: statuses[i],
            timestamp: date.toISOString(),
            applyTime: formatDateTime(date),
            estimatedTime: i === 1 ? '预计24小时内到账' : '已到账'
        });
    }
    
    return records;
}

// 渲染记录列表
function renderRecords() {
    const recordsList = document.getElementById('recordsList');
    const emptyState = document.getElementById('emptyState');
    
    // 根据当前筛选条件过滤记录
    const filteredRecords = filterRecordsByStatus(allRecords, currentFilter);
    
    if (filteredRecords.length === 0) {
        showEmptyState();
        return;
    }
    
    recordsList.innerHTML = '';
    emptyState.style.display = 'none';
    recordsList.style.display = 'block';
    
    filteredRecords.forEach(record => {
        const recordCard = createRecordCard(record);
        recordsList.appendChild(recordCard);
    });
}

// 创建记录卡片
function createRecordCard(record) {
    const card = document.createElement('div');
    card.className = 'record-card';
    
    const statusClass = getStatusClass(record.status);
    const statusText = getStatusText(record.status);
    const methodIcon = getMethodIcon(record.method);
    
    card.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
                <div class="method-icon mr-3">
                    ${methodIcon}
                </div>
                <div>
                    <div class="font-medium text-gray-900 text-base">${record.method}提现</div>
                    <div class="text-sm text-textGray">${record.methodDetail}</div>
                </div>
            </div>
            <div class="text-right">
                <div class="font-semibold text-lg text-gray-900">¥${formatAmount(record.amount)}</div>
                <div class="text-xs ${statusClass} mt-1">${statusText}</div>
            </div>
        </div>
        
        <div class="border-t border-gray-100 pt-3 mt-3">
            <div class="flex justify-between items-center text-sm text-textGray">
                <span>申请时间</span>
                <span>${record.applyTime}</span>
            </div>
            <div class="flex justify-between items-center text-sm text-textGray mt-2">
                <span>预计到账</span>
                <span>${record.estimatedTime}</span>
            </div>
        </div>
    `;
    
    // 添加点击事件
    card.addEventListener('click', () => {
        showRecordDetail(record);
    });
    
    return card;
}

// 获取状态样式类
function getStatusClass(status) {
    switch (status) {
        case 'processing':
            return 'status-processing';
        case 'success':
            return 'status-success';
        case 'failed':
            return 'status-failed';
        default:
            return 'status-processing';
    }
}

// 获取状态文本
function getStatusText(status) {
    switch (status) {
        case 'processing':
            return '处理中';
        case 'success':
            return '成功';
        case 'failed':
            return '失败';
        default:
            return '处理中';
    }
}

// 获取支付方式图标
function getMethodIcon(method) {
    switch (method) {
        case '银行卡':
            return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>';
        case '支付宝':
            return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
        case '微信':
            return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>';
        default:
            return '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>';
    }
}

// 根据状态筛选记录
function filterRecordsByStatus(records, status) {
    if (status === 'all') {
        return records;
    }
    return records.filter(record => record.status === status);
}

// 筛选记录
function filterRecords(status) {
    currentFilter = status;
    
    // 更新筛选标签样式
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    // 重新渲染记录
    renderRecords();
}

// 显示空状态
function showEmptyState() {
    const recordsList = document.getElementById('recordsList');
    const emptyState = document.getElementById('emptyState');
    
    recordsList.style.display = 'none';
    emptyState.style.display = 'block';
}

// 显示记录详情
function showRecordDetail(record) {
    const detail = `提现详情

提现金额：¥${formatAmount(record.amount)}
提现方式：${record.method}
账户信息：${record.methodDetail}
申请时间：${record.applyTime}
处理状态：${getStatusText(record.status)}
订单编号：${record.id}`;
    
    alert(detail);
}

// 格式化金额
function formatAmount(amount) {
    return parseFloat(amount).toFixed(2);
}

// 格式化日期时间
function formatDateTime(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 返回上一页
function goBack() {
    // 检查是否有历史记录
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 如果没有历史记录，跳转到个人中心
        window.location.href = 'profile.html';
    }
}

// 刷新记录
function refreshRecords() {
    loadWithdrawRecords();
}

// 导出功能供其他页面使用
window.withdrawRecords = {
    refresh: refreshRecords
}; 