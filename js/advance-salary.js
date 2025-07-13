// 蓝诚人力 - 我的预支页面交互脚本

// 用户数据配置
const USER_CONFIG = {
    name: '张师傅',
    position: '装配工',
    hireDate: '2024-01-01', // 入职日期
    advanceAmount: 300, // 固定预支金额
    monthlyLimit: 1 // 每月申请次数限制
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initAdvancePage();
});

// 初始化预支页面
function initAdvancePage() {
    // 加载用户信息
    loadUserInfo();
    
    // 检查申请资格
    checkEligibility();
    
    // 加载预支记录
    loadAdvanceRecords();
    
    console.log('预支页面初始化完成');
}

// 加载用户信息
function loadUserInfo() {
    document.getElementById('userName').textContent = USER_CONFIG.name;
    document.getElementById('userPosition').textContent = USER_CONFIG.position;
}

// 检查申请资格
function checkEligibility() {
    const hireDate = new Date(USER_CONFIG.hireDate);
    const currentDate = new Date();
    const workDays = Math.floor((currentDate - hireDate) / (1000 * 60 * 60 * 24));
    
    // 检查是否满7天
    const isEligibleByDays = workDays >= 7;
    
    // 检查本月是否已申请
    const currentMonth = getCurrentMonth();
    const monthlyApplications = getMonthlyApplications(currentMonth);
    const hasAppliedThisMonth = monthlyApplications.length >= USER_CONFIG.monthlyLimit;
    
    // 更新页面显示
    updateEligibilityDisplay(workDays, isEligibleByDays, hasAppliedThisMonth, currentMonth);
}

// 更新资格显示
function updateEligibilityDisplay(workDays, isEligibleByDays, hasAppliedThisMonth, currentMonth) {
    const workDaysElement = document.getElementById('workDays');
    const currentStatusElement = document.getElementById('currentStatus');
    const remainingCountElement = document.getElementById('remainingCount');
    const unlockTimeElement = document.getElementById('unlockTime');
    const availableAmountElement = document.getElementById('availableAmount');
    const applyButton = document.getElementById('applyButton');
    
    if (!isEligibleByDays) {
        // 入职不满7天
        const remainingDays = 7 - workDays;
        workDaysElement.textContent = `${workDays}天 ❌`;
        currentStatusElement.textContent = `还需${remainingDays}天可申请`;
        remainingCountElement.textContent = '0次';
        
        const unlockDate = new Date();
        unlockDate.setDate(unlockDate.getDate() + remainingDays);
        unlockTimeElement.textContent = formatDate(unlockDate);
        
        availableAmountElement.textContent = '¥0.00';
        applyButton.textContent = `${remainingDays}天后可申请`;
        applyButton.disabled = true;
        applyButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else if (hasAppliedThisMonth) {
        // 本月已申请
        workDaysElement.textContent = `${workDays}天 ✅`;
        currentStatusElement.textContent = '本月已申请';
        remainingCountElement.textContent = '0次';
        unlockTimeElement.textContent = '下月可申请';
        
        availableAmountElement.textContent = '¥0.00';
        applyButton.textContent = '本月已申请，下月可再次申请';
        applyButton.disabled = true;
        applyButton.classList.add('opacity-50', 'cursor-not-allowed');
    } else {
        // 可以申请
        workDaysElement.textContent = `${workDays}天 ✅`;
        currentStatusElement.textContent = '可申请预支';
        remainingCountElement.textContent = '1次';
        unlockTimeElement.textContent = '已解锁';
        
        availableAmountElement.textContent = `¥${USER_CONFIG.advanceAmount}.00`;
        applyButton.textContent = '立即申请预支';
        applyButton.disabled = false;
        applyButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}

// 申请预支
function applyAdvance() {
    // 再次检查资格
    const hireDate = new Date(USER_CONFIG.hireDate);
    const currentDate = new Date();
    const workDays = Math.floor((currentDate - hireDate) / (1000 * 60 * 60 * 24));
    
    if (workDays < 7) {
        showToast('入职未满7天，无法申请预支');
        return;
    }
    
    const currentMonth = getCurrentMonth();
    const monthlyApplications = getMonthlyApplications(currentMonth);
    if (monthlyApplications.length >= USER_CONFIG.monthlyLimit) {
        showToast('本月已申请过，下月可再次申请');
        return;
    }
    
    // 显示确认对话框
    showConfirmDialog();
}

// 显示确认对话框
function showConfirmDialog() {
    const confirmHtml = `
        <div id="confirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg p-6 w-full max-w-sm">
                <div class="text-center mb-6">
                    <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-800 mb-2">申请预支确认</h3>
                </div>
                
                <div class="space-y-3 mb-6">
                    <div class="flex justify-between">
                        <span class="text-gray-600">申请金额：</span>
                        <span class="font-medium">¥${USER_CONFIG.advanceAmount}.00</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">扣除时间：</span>
                        <span class="font-medium">下月工资</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-gray-600">预计到账：</span>
                        <span class="font-medium">2小时内</span>
                    </div>
                </div>
                
                <div class="flex space-x-3">
                    <button onclick="closeConfirmDialog()" class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        取消
                    </button>
                    <button onclick="confirmAdvanceApplication()" class="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-purple-700">
                        确认申请
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', confirmHtml);
}

// 关闭确认对话框
function closeConfirmDialog() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
        modal.remove();
    }
}

// 确认申请预支
function confirmAdvanceApplication() {
    closeConfirmDialog();
    
    // 显示加载状态
    showLoading('正在提交申请...');
    
    // 模拟申请处理
    setTimeout(() => {
        hideLoading();
        
        // 生成申请记录
        const applicationId = generateApplicationId();
        const currentDate = new Date();
        
        const newApplication = {
            id: applicationId,
            amount: USER_CONFIG.advanceAmount,
            applyDate: currentDate.toISOString(),
            status: 'approved',
            statusText: '已发放',
            deductionMonth: getNextMonth(),
            deductionStatus: 'pending'
        };
        
        // 保存申请记录
        saveAdvanceRecord(newApplication);
        
        // 显示成功对话框
        showSuccessDialog(applicationId);
        
        // 刷新页面状态
        setTimeout(() => {
            checkEligibility();
            loadAdvanceRecords();
        }, 1000);
    }, 2000);
}

// 显示成功对话框
function showSuccessDialog(applicationId) {
    const successHtml = `
        <div id="successModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg p-6 w-full max-w-sm text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h3 class="text-lg font-medium text-gray-800 mb-2">申请提交成功</h3>
                
                <div class="space-y-2 mb-6 text-sm text-gray-600">
                    <div>申请编号：${applicationId}</div>
                    <div>预计到账时间：2小时内</div>
                    <div>可在"预支记录"中查看状态</div>
                </div>
                
                <button onclick="closeSuccessDialog()" class="w-full py-2 px-4 bg-primary text-white rounded-lg hover:bg-purple-700">
                    我知道了
                </button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHtml);
}

// 关闭成功对话框
function closeSuccessDialog() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.remove();
    }
}

// 加载预支记录
function loadAdvanceRecords() {
    const records = getAdvanceRecords();
    const recordsList = document.getElementById('recordsList');
    
    if (records.length === 0) {
        recordsList.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div class="text-sm">暂无预支记录</div>
            </div>
        `;
        return;
    }
    
    // 显示最近3条记录
    const recentRecords = records.slice(0, 3);
    const recordsHtml = recentRecords.map(record => createRecordCard(record)).join('');
    recordsList.innerHTML = recordsHtml;
}

// 创建记录卡片
function createRecordCard(record) {
    const statusColor = getStatusColor(record.status);
    const statusIcon = getStatusIcon(record.status);
    
    return `
        <div class="record-card border border-gray-200 rounded-lg p-3 cursor-pointer" onclick="viewRecordDetail('${record.id}')">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <div class="flex items-center mb-1">
                        <span class="text-sm font-medium text-gray-800">预支申请 - ${record.statusText}</span>
                        <span class="${statusColor} ml-2">${statusIcon}</span>
                    </div>
                    <div class="text-lg font-bold text-gray-800">¥${record.amount}.00</div>
                    <div class="text-xs text-gray-500 mt-1">${formatDate(new Date(record.applyDate))}</div>
                </div>
                <div class="text-right">
                    <div class="text-xs text-gray-500">
                        ${getDeductionStatusText(record)}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 获取状态颜色
function getStatusColor(status) {
    const colors = {
        'pending': 'text-orange-500',
        'approved': 'text-green-500',
        'rejected': 'text-red-500',
        'completed': 'text-gray-500'
    };
    return colors[status] || 'text-gray-500';
}

// 获取状态图标
function getStatusIcon(status) {
    const icons = {
        'pending': '⏳',
        'approved': '✅',
        'rejected': '❌',
        'completed': '✓'
    };
    return icons[status] || '•';
}

// 获取扣除状态文本
function getDeductionStatusText(record) {
    if (record.deductionStatus === 'completed') {
        return `已从${record.deductionMonth}工资扣除`;
    } else {
        return `将从${record.deductionMonth}工资扣除`;
    }
}

// 查看记录详情
function viewRecordDetail(recordId) {
    showToast('记录详情功能开发中');
}

// 查看全部记录
function viewAllRecords() {
    showToast('查看全部记录功能开发中');
}

// 工具函数：获取当前月份
function getCurrentMonth() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// 工具函数：获取下个月份
function getNextMonth() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return `${nextMonth.getFullYear()}年${nextMonth.getMonth() + 1}月`;
}

// 工具函数：格式化日期
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 工具函数：生成申请编号
function generateApplicationId() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `AS${year}${month}${day}${random}`;
}

// 数据管理：获取月度申请记录
function getMonthlyApplications(month) {
    const allRecords = getAdvanceRecords();
    return allRecords.filter(record => {
        const recordDate = new Date(record.applyDate);
        const recordMonth = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}`;
        return recordMonth === month;
    });
}

// 数据管理：获取所有预支记录
function getAdvanceRecords() {
    return JSON.parse(localStorage.getItem('advanceRecords') || '[]');
}

// 数据管理：保存预支记录
function saveAdvanceRecord(record) {
    const records = getAdvanceRecords();
    records.unshift(record); // 添加到开头
    localStorage.setItem('advanceRecords', JSON.stringify(records));
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