// 蓝诚人力 - 个人工时详情页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initPersonData();
    initMonthSelector();
    initLoadMoreButton();
    
    // 加载详情数据
    loadPersonWorkDetails();
});

// 初始化人员数据
function initPersonData() {
    // 从URL参数获取人员信息
    const urlParams = new URLSearchParams(window.location.search);
    const personName = urlParams.get('name') || '张三';
    const personPhone = urlParams.get('phone') || '138****5678';
    const personPosition = urlParams.get('position') || '生产线操作工';
    const personStatus = urlParams.get('status') || '在职';
    
    // 更新页面显示
    document.getElementById('personName').textContent = personName;
    document.getElementById('personPhone').textContent = personPhone;
    document.getElementById('personPosition').textContent = personPosition;
    document.getElementById('personAvatar').textContent = personName.charAt(0);
    
    // 更新状态样式
    const statusElement = document.getElementById('personStatus');
    statusElement.textContent = getStatusText(personStatus);
    statusElement.className = `status-badge ${getStatusClass(personStatus)}`;
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'working': '在职',
        'resigned': '已离职',
        'arrived': '已到岗',
        'pending': '待到岗'
    };
    return statusMap[status] || status;
}

// 获取状态样式类
function getStatusClass(status) {
    const statusClassMap = {
        'working': 'status-working',
        'resigned': 'status-resigned',
        'arrived': 'status-arrived',
        'pending': 'status-pending'
    };
    return statusClassMap[status] || 'status-working';
}

// 初始化月份选择器
function initMonthSelector() {
    const monthButtons = document.querySelectorAll('.month-btn');
    
    monthButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            monthButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 加载对应月份的数据
            const month = this.dataset.month;
            loadMonthWorkDetails(month);
            
            showToast(`已切换到${this.textContent}数据`);
        });
    });
}

// 初始化加载更多按钮
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.text-rewardRed.text-sm.font-medium');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreWorkDetails();
        });
    }
}

// 加载人员工时详情
function loadPersonWorkDetails() {
    const personName = document.getElementById('personName').textContent;
    const currentMonth = document.querySelector('.month-btn.active').dataset.month;
    
    // 模拟加载数据
    showLoading(true);
    
    setTimeout(() => {
        const workData = getPersonWorkData(personName, currentMonth);
        renderWorkDetails(workData);
        updateSummaryStats(workData);
        showLoading(false);
    }, 1000);
}

// 加载月份工时详情
function loadMonthWorkDetails(month) {
    const personName = document.getElementById('personName').textContent;
    
    showLoading(true);
    
    setTimeout(() => {
        const workData = getPersonWorkData(personName, month);
        renderWorkDetails(workData);
        updateSummaryStats(workData);
        showLoading(false);
    }, 800);
}

// 获取人员工时数据（模拟数据）
function getPersonWorkData(personName, month) {
    const workDataMap = {
        '张三': {
            '2024-12': {
                totalHours: 180,
                workDays: 22,
                totalReward: 720,
                dailyRecords: [
                    { date: '2024-12-01', weekday: '星期日', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-12-02', weekday: '星期一', hours: 9, reward: 36, workTime: '08:00-18:00（休息1小时）' },
                    { date: '2024-12-03', weekday: '星期二', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-12-04', weekday: '星期三', hours: 10, reward: 40, workTime: '08:00-19:00（休息1小时）' },
                    { date: '2024-12-05', weekday: '星期四', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-12-06', weekday: '星期五', hours: 9, reward: 36, workTime: '08:00-18:00（休息1小时）' },
                    { date: '2024-12-07', weekday: '星期六', hours: 0, reward: 0, workTime: '休息日，无工时记录', isRest: true },
                    { date: '2024-12-08', weekday: '星期日', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' }
                ]
            },
            '2024-11': {
                totalHours: 150,
                workDays: 20,
                totalReward: 600,
                dailyRecords: [
                    { date: '2024-11-01', weekday: '星期五', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-11-02', weekday: '星期六', hours: 0, reward: 0, workTime: '休息日，无工时记录', isRest: true },
                    { date: '2024-11-03', weekday: '星期日', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-11-04', weekday: '星期一', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2024-11-05', weekday: '星期二', hours: 9, reward: 36, workTime: '08:00-18:00（休息1小时）' }
                ]
            },
            '2025-01': {
                totalHours: 200,
                workDays: 24,
                totalReward: 800,
                dailyRecords: [
                    { date: '2025-01-01', weekday: '星期三', hours: 0, reward: 0, workTime: '元旦休息', isRest: true },
                    { date: '2025-01-02', weekday: '星期四', hours: 8, reward: 32, workTime: '08:00-17:00（休息1小时）' },
                    { date: '2025-01-03', weekday: '星期五', hours: 9, reward: 36, workTime: '08:00-18:00（休息1小时）' }
                ]
            }
        },
        '李四': {
            '2024-12': {
                totalHours: 200,
                workDays: 24,
                totalReward: 800,
                dailyRecords: [
                    { date: '2024-12-01', weekday: '星期日', hours: 10, reward: 40, workTime: '08:00-19:00（休息1小时）' },
                    { date: '2024-12-02', weekday: '星期一', hours: 10, reward: 40, workTime: '08:00-19:00（休息1小时）' },
                    { date: '2024-12-03', weekday: '星期二', hours: 9, reward: 36, workTime: '08:00-18:00（休息1小时）' }
                ]
            }
        }
    };
    
    return workDataMap[personName]?.[month] || workDataMap['张三']['2024-12'];
}

// 渲染工时详情
function renderWorkDetails(workData) {
    const container = document.getElementById('workDetailsList');
    
    // 清空现有内容
    container.innerHTML = '';
    
    // 渲染每日记录
    workData.dailyRecords.forEach(record => {
        const dayCard = createDayCard(record);
        container.appendChild(dayCard);
    });
    
    // 添加加载更多按钮
    const loadMoreDiv = document.createElement('div');
    loadMoreDiv.className = 'text-center py-4';
    loadMoreDiv.innerHTML = `
        <div class="text-sm text-gray-400">... 显示更多日期记录 ...</div>
        <button class="mt-2 text-rewardRed text-sm font-medium">加载更多</button>
    `;
    container.appendChild(loadMoreDiv);
    
    // 重新绑定加载更多事件
    initLoadMoreButton();
}

// 创建日期卡片
function createDayCard(record) {
    const dayCard = document.createElement('div');
    dayCard.className = record.isRest ? 'work-day-card rest-day' : 'work-day-card';
    
    const textColor = record.isRest ? 'text-gray-500' : 'text-gray-800';
    const rewardColor = record.isRest ? 'text-gray-400' : 'text-rewardRed';
    const hoursColor = record.isRest ? 'text-gray-400' : 'text-gray-500';
    
    dayCard.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <div class="font-medium ${textColor}">${record.date}</div>
                <div class="text-xs ${hoursColor}">${record.weekday}</div>
            </div>
            <div class="text-right">
                <div class="text-lg font-bold ${rewardColor}">¥${record.reward}</div>
                <div class="text-xs ${hoursColor}">${record.isRest ? '休息日' : `工时：${record.hours}小时`}</div>
            </div>
        </div>
        <div class="mt-2 text-xs text-gray-400">
            ${record.workTime}
        </div>
    `;
    
    return dayCard;
}

// 更新汇总统计
function updateSummaryStats(workData) {
    document.getElementById('monthTotalHours').textContent = workData.totalHours;
    document.getElementById('monthWorkDays').textContent = workData.workDays;
    document.getElementById('monthTotalReward').textContent = `¥${workData.totalReward}`;
    
    // 更新月度总结
    const summaryData = {
        workDays: workData.workDays,
        totalHours: workData.totalHours,
        avgHours: (workData.totalHours / workData.workDays).toFixed(1),
        restDays: 31 - workData.workDays,
        totalReward: workData.totalReward
    };
    
    updateMonthlySummary(summaryData);
}

// 更新月度总结
function updateMonthlySummary(data) {
    const summaryContainer = document.querySelector('.total-summary .space-y-3');
    
    summaryContainer.innerHTML = `
        <div class="flex justify-between items-center">
            <span class="text-gray-600">总工作天数：</span>
            <span class="font-medium">${data.workDays}天</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-gray-600">总工时：</span>
            <span class="font-medium">${data.totalHours}小时</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-gray-600">平均每日工时：</span>
            <span class="font-medium">${data.avgHours}小时</span>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-gray-600">休息天数：</span>
            <span class="font-medium">${data.restDays}天</span>
        </div>
        <div class="border-t pt-3">
            <div class="flex justify-between items-center">
                <span class="text-gray-800 font-medium">总佣金：</span>
                <span class="text-rewardRed font-bold text-xl">¥${data.totalReward}</span>
            </div>
        </div>
    `;
}

// 加载更多工时详情
function loadMoreWorkDetails() {
    showToast('正在加载更多数据...');
    
    // 模拟加载更多数据
    setTimeout(() => {
        const moreData = generateMoreWorkData();
        appendMoreWorkDetails(moreData);
        showToast('加载完成');
    }, 1500);
}

// 生成更多工时数据
function generateMoreWorkData() {
    const moreRecords = [];
    
    for (let i = 9; i <= 15; i++) {
        const day = i.toString().padStart(2, '0');
        const isWeekend = i % 7 === 0 || i % 7 === 6;
        
        moreRecords.push({
            date: `2024-12-${day}`,
            weekday: getWeekdayName(i),
            hours: isWeekend ? 0 : Math.floor(Math.random() * 3) + 8,
            reward: isWeekend ? 0 : (Math.floor(Math.random() * 3) + 8) * 4,
            workTime: isWeekend ? '休息日，无工时记录' : '08:00-17:00（休息1小时）',
            isRest: isWeekend
        });
    }
    
    return moreRecords;
}

// 获取星期名称
function getWeekdayName(day) {
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    return weekdays[day % 7];
}

// 添加更多工时详情到列表
function appendMoreWorkDetails(records) {
    const container = document.getElementById('workDetailsList');
    const loadMoreDiv = container.querySelector('.text-center.py-4');
    
    // 在加载更多按钮前插入新记录
    records.forEach(record => {
        const dayCard = createDayCard(record);
        container.insertBefore(dayCard, loadMoreDiv);
    });
}

// 显示加载状态
function showLoading(show) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (show) {
        if (!loadingIndicator) {
            const loading = document.createElement('div');
            loading.id = 'loadingIndicator';
            loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            loading.innerHTML = `
                <div class="bg-white rounded-lg p-4 flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-rewardRed"></div>
                    <span class="text-gray-700">加载中...</span>
                </div>
            `;
            document.body.appendChild(loading);
        }
    } else {
        if (loadingIndicator) {
            loadingIndicator.remove();
        }
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
    }, 2000);
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 计算工时统计
function calculateWorkStats(records) {
    const workRecords = records.filter(record => !record.isRest);
    const totalHours = workRecords.reduce((sum, record) => sum + record.hours, 0);
    const totalReward = workRecords.reduce((sum, record) => sum + record.reward, 0);
    
    return {
        totalHours,
        workDays: workRecords.length,
        totalReward,
        avgHours: workRecords.length > 0 ? (totalHours / workRecords.length).toFixed(1) : 0,
        restDays: records.filter(record => record.isRest).length
    };
} 