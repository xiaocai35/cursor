// 在职员工首页 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initTime();
    loadEmployeeInfo();
    loadPromotionStats();
    updateAttendanceInfo();
    checkMessages();
});

// 初始化时间显示
function initTime() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = timeStr;
    
    // 每分钟更新一次时间
    setInterval(() => {
        const newTime = new Date();
        const newTimeStr = newTime.getHours().toString().padStart(2, '0') + ':' + 
                          newTime.getMinutes().toString().padStart(2, '0');
        document.getElementById('currentTime').textContent = newTimeStr;
    }, 60000);
}

// 加载员工信息
function loadEmployeeInfo() {
    // 从本地存储获取员工信息
    const employmentInfo = JSON.parse(localStorage.getItem('employmentInfo') || '{}');
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // 更新页面显示
    if (employmentInfo.employeeName) {
        document.getElementById('employeeName').textContent = employmentInfo.employeeName;
    }
    
    if (employmentInfo.factory && employmentInfo.factory.text) {
        document.getElementById('companyName').textContent = employmentInfo.factory.text;
    }
    
    if (employmentInfo.position && employmentInfo.position.text) {
        document.getElementById('positionName').textContent = employmentInfo.position.text;
    }
    
    // 计算入职天数
    if (employmentInfo.hireDate) {
        const hireDate = new Date(employmentInfo.hireDate);
        const today = new Date();
        const diffTime = Math.abs(today - hireDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        document.getElementById('workDays').textContent = diffDays;
        
        // 根据入职天数计算预期工资和可借支金额
        const baseSalary = 4200;
        const dailySalary = baseSalary / 30;
        const expectedSalary = Math.round(diffDays * dailySalary);
        document.getElementById('expectedSalary').textContent = expectedSalary.toLocaleString();
        
        // 计算可借支金额（入职7天后可借支300元）
        const availableAdvance = diffDays >= 7 ? 300 : 0;
        document.getElementById('availableAdvance').textContent = availableAdvance;
    }
}

// 加载推广统计
function loadPromotionStats() {
    // 从本地存储获取推广统计
    const inviteStats = JSON.parse(localStorage.getItem('inviteStats') || '{}');
    
    if (inviteStats.totalInvites) {
        document.getElementById('totalReferrals').textContent = inviteStats.totalInvites;
    }
    
    // 计算本月收益（模拟数据）
    const monthlyEarnings = inviteStats.totalEarnings ? Math.round(inviteStats.totalEarnings * 0.3) : 800;
    document.getElementById('monthlyEarnings').textContent = monthlyEarnings;
}

// 更新考勤信息
function updateAttendanceInfo() {
    const now = new Date();
    const hours = now.getHours();
    
    // 模拟考勤状态
    if (hours >= 8 && hours <= 18) {
        document.getElementById('attendanceTime').textContent = '08:30 已打卡';
        document.getElementById('attendanceStatus').textContent = '正常到岗';
        document.getElementById('attendanceStatus').className = 'text-xs text-green-600 mt-1';
    } else {
        document.getElementById('attendanceTime').textContent = '未打卡';
        document.getElementById('attendanceStatus').textContent = '非工作时间';
        document.getElementById('attendanceStatus').className = 'text-xs text-gray-500 mt-1';
    }
}

// 检查消息数量
function checkMessages() {
    // 模拟未读消息
    const unreadCount = 3;
    const messageCountElement = document.getElementById('messageCount');
    
    if (unreadCount > 0) {
        messageCountElement.textContent = unreadCount;
        messageCountElement.style.display = 'flex';
    }
}

// 导航到工资预支页面
function navigateToAdvanceSalary() {
    navigateTo('advance-salary.html');
}

// 显示客服热线
function showCustomerService() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 mx-4 w-full max-w-sm">
            <div class="text-center mb-4">
                <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">客服热线</h3>
                <p class="text-gray-600 mb-4">如有任何问题，请联系我们</p>
            </div>
            
            <div class="space-y-3 mb-6">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">工作日 9:00-18:00</span>
                    <a href="tel:400-888-0123" class="text-primary font-medium">400-888-0123</a>
                </div>
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span class="text-gray-700">紧急联系</span>
                    <a href="tel:138-0123-4567" class="text-primary font-medium">138-0123-4567</a>
                </div>
            </div>
            
            <button onclick="closeModal(this)" class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
                关闭
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 关闭模态框
function closeModal(button) {
    const modal = button.closest('.fixed');
    document.body.removeChild(modal);
}

// 通用导航函数
function navigateTo(url) {
    // 检查页面是否存在
    const existingPages = [
        'index.html', 'job-detail.html', 'profile.html', 'referral-reward.html', 
        'advance-salary.html', 'salary.html', 'feedback.html', 'about.html', 
        'search-results.html', 'messages.html', 'settings.html', 'employment-info.html', 
        'qr-code.html', 'employee-home.html'
    ];
    
    if (existingPages.includes(url)) {
        window.location.href = url;
    } else {
        showToast('功能开发中，敬请期待', 'info');
    }
}

// 显示提示信息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 transition-opacity duration-300`;
    
    if (type === 'error') {
        toast.className += ' bg-red-500';
    } else if (type === 'success') {
        toast.className += ' bg-green-500';
    } else {
        toast.className += ' bg-blue-500';
    }
    
    toast.textContent = message;
    toast.style.opacity = '0';
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 检查用户是否为在职员工
function checkEmploymentStatus() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    return userInfo.employmentStatus === 'submitted';
}

// 页面可见性变化时刷新数据
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        loadEmployeeInfo();
        loadPromotionStats();
        updateAttendanceInfo();
    }
});

// 导出函数供其他页面使用
window.employeeHome = {
    checkEmploymentStatus,
    navigateTo,
    showToast
}; 

// 切换到求职模式
function switchToJobSeekerMode() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 mx-4 w-full max-w-sm">
            <div class="text-center mb-4">
                <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">切换到求职模式</h3>
                <p class="text-gray-600 mb-4">您确定要切换到求职模式吗？这将清除您的在职状态信息。</p>
            </div>
            
            <div class="flex space-x-3">
                <button onclick="closeModal(this)" class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
                    取消
                </button>
                <button onclick="confirmSwitchMode()" class="flex-1 bg-orange-500 text-white py-3 rounded-lg font-medium">
                    确认切换
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 确认切换模式
function confirmSwitchMode() {
    // 清除在职状态
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    delete userInfo.employmentStatus;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 可选：清除在职信息
    // localStorage.removeItem('employmentInfo');
    
    showToast('已切换到求职模式', 'success');
    
    // 3秒后跳转到求职首页
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
} 