// 聚贤人力 - 我的薪资页面交互脚本

// 用户配置和数据
const SALARY_CONFIG = {
    currentDate: new Date(),
    selectedMonth: new Date(),
    historyFilter: 'recent',
    loadedHistoryCount: 3
};

// 模拟薪资数据
const SALARY_DATA = {
    '2024-12': {
        netSalary: 3468,
        grossSalary: 5200,
        totalDeductions: 1732,
        workDays: 22,
        income: {
            基本工资: 3600,
            加班费: 960,
            绩效奖金: 400,
            津贴补助: 240
        },
        deductions: {
            养老保险: 416,
            医疗保险: 104,
            失业保险: 52,
            住房公积金: 180,
            个人所得税: 80,
            工资预支: 300,
            迟到扣款: 50,
            住宿费: 350,
            伙食费: 200
        },
        payDate: '2024-12-15',
        status: 'paid'
    },
    '2024-11': {
        netSalary: 3770,
        grossSalary: 5400,
        totalDeductions: 1630,
        workDays: 23,
        income: {
            基本工资: 3600,
            加班费: 1200,
            绩效奖金: 350,
            津贴补助: 250
        },
        deductions: {
            养老保险: 432,
            医疗保险: 108,
            失业保险: 54,
            住房公积金: 180,
            个人所得税: 106,
            工资预支: 300,
            迟到扣款: 0,
            住宿费: 350,
            伙食费: 100
        },
        payDate: '2024-11-15',
        status: 'paid'
    },
    '2024-10': {
        netSalary: 3506,
        grossSalary: 4900,
        totalDeductions: 1394,
        workDays: 21,
        income: {
            基本工资: 3600,
            加班费: 720,
            绩效奖金: 380,
            津贴补助: 200
        },
        deductions: {
            养老保险: 392,
            医疗保险: 98,
            失业保险: 49,
            住房公积金: 180,
            个人所得税: 25,
            工资预支: 300,
            迟到扣款: 100,
            住宿费: 350,
            伙食费: 0
        },
        payDate: '2024-10-15',
        status: 'paid'
    },
    '2024-09': {
        netSalary: 3788,
        grossSalary: 5100,
        totalDeductions: 1312,
        workDays: 22,
        income: {
            基本工资: 3600,
            加班费: 840,
            绩效奖金: 420,
            津贴补助: 240
        },
        deductions: {
            养老保险: 408,
            医疗保险: 102,
            失业保险: 51,
            住房公积金: 180,
            个人所得税: 71,
            工资预支: 0,
            迟到扣款: 0,
            住宿费: 350,
            伙食费: 150
        },
        payDate: '2024-09-15',
        status: 'paid'
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initSalaryPage();
});

// 初始化薪资页面
function initSalaryPage() {
    // 设置当前月份
    updateMonthDisplay();
    
    // 加载当前月份的薪资数据
    loadSalaryData();
    
    // 加载历史记录
    loadSalaryHistory();
    
    // 初始化交互效果
    initInteractions();
    
    console.log('薪资页面初始化完成');
}

// 更新月份显示
function updateMonthDisplay() {
    const monthElement = document.getElementById('currentMonth');
    const year = SALARY_CONFIG.selectedMonth.getFullYear();
    const month = SALARY_CONFIG.selectedMonth.getMonth() + 1;
    
    monthElement.textContent = `${year}年${month}月`;
    
    // 检查是否可以查看下个月
    const nextMonthBtn = document.getElementById('nextMonthBtn');
    const nextMonth = new Date(SALARY_CONFIG.selectedMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    if (nextMonth > SALARY_CONFIG.currentDate) {
        nextMonthBtn.style.opacity = '0.3';
        nextMonthBtn.disabled = true;
    } else {
        nextMonthBtn.style.opacity = '0.8';
        nextMonthBtn.disabled = false;
    }
}

// 加载薪资数据
function loadSalaryData() {
    const year = SALARY_CONFIG.selectedMonth.getFullYear();
    const month = SALARY_CONFIG.selectedMonth.getMonth() + 1;
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    
    const salaryData = SALARY_DATA[monthKey];
    
    if (salaryData) {
        // 更新概览数据
        document.getElementById('netSalary').textContent = `¥${formatAmount(salaryData.netSalary)}`;
        document.getElementById('grossSalary').textContent = `¥${formatAmount(salaryData.grossSalary)}`;
        document.getElementById('totalDeductions').textContent = `¥${formatAmount(salaryData.totalDeductions)}`;
        document.getElementById('workDays').textContent = `${salaryData.workDays}天`;
        
        // 更新收入明细
        updateIncomeDetails(salaryData.income);
        
        // 更新扣除明细
        updateDeductionDetails(salaryData.deductions);
        
    } else {
        // 显示无数据状态
        showNoDataState();
    }
}

// 更新收入明细
function updateIncomeDetails(incomeData) {
    const container = document.getElementById('incomeDetails');
    container.innerHTML = '';
    
    const colors = ['salaryGreen', 'salaryBlue', 'salaryOrange', 'purple-500'];
    let colorIndex = 0;
    let total = 0;
    
    Object.entries(incomeData).forEach(([key, value]) => {
        total += value;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'salary-item flex justify-between items-center py-2';
        itemDiv.innerHTML = `
            <div class="flex items-center">
                <div class="w-2 h-2 bg-${colors[colorIndex % colors.length]} rounded-full mr-3"></div>
                <span class="text-gray-700">${key}</span>
            </div>
            <span class="font-medium text-gray-900">¥${formatAmount(value)}</span>
        `;
        
        container.appendChild(itemDiv);
        colorIndex++;
    });
    
    // 添加小计
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-line flex justify-between items-center py-3 mt-2 rounded px-3';
    totalDiv.innerHTML = `
        <span class="font-medium text-gray-800">应发工资小计</span>
        <span class="font-bold text-lg text-salaryGreen">¥${formatAmount(total)}</span>
    `;
    
    container.appendChild(totalDiv);
}

// 更新扣除明细
function updateDeductionDetails(deductionData) {
    const container = document.getElementById('deductionDetails');
    container.innerHTML = '';
    
    // 定义不同类型扣除项的颜色
    const deductionColors = {
        '养老保险': 'salaryRed',
        '医疗保险': 'salaryRed', 
        '失业保险': 'salaryRed',
        '住房公积金': 'salaryRed',
        '个人所得税': 'salaryRed',
        '工资预支': 'purple-600',
        '迟到扣款': 'red-600',
        '住宿费': 'salaryOrange',
        '伙食费': 'salaryOrange'
    };
    
    let total = 0;
    
    Object.entries(deductionData).forEach(([key, value]) => {
        // 只显示大于0的扣除项
        if (value > 0) {
            total += value;
            
            const color = deductionColors[key] || 'salaryRed';
            const itemDiv = document.createElement('div');
            itemDiv.className = 'salary-item flex justify-between items-center py-2';
            itemDiv.innerHTML = `
                <div class="flex items-center">
                    <div class="w-2 h-2 bg-${color} rounded-full mr-3"></div>
                    <span class="text-gray-700">${key}</span>
                </div>
                <span class="font-medium text-gray-900">-¥${formatAmount(value)}</span>
            `;
            
            container.appendChild(itemDiv);
        }
    });
    
    // 添加小计
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-line flex justify-between items-center py-3 mt-2 rounded px-3';
    totalDiv.innerHTML = `
        <span class="font-medium text-gray-800">扣除金额小计</span>
        <span class="font-bold text-lg text-salaryRed">-¥${formatAmount(total)}</span>
    `;
    
    container.appendChild(totalDiv);
}

// 显示无数据状态
function showNoDataState() {
    const mainElements = ['netSalary', 'grossSalary', 'totalDeductions', 'workDays'];
    mainElements.forEach(id => {
        document.getElementById(id).textContent = '--';
    });
    
    document.getElementById('incomeDetails').innerHTML = '<div class="text-center text-gray-500 py-4">暂无数据</div>';
    document.getElementById('deductionDetails').innerHTML = '<div class="text-center text-gray-500 py-4">暂无数据</div>';
}

// 上一个月
function previousMonth() {
    SALARY_CONFIG.selectedMonth.setMonth(SALARY_CONFIG.selectedMonth.getMonth() - 1);
    updateMonthDisplay();
    showLoading();
    
    setTimeout(() => {
        loadSalaryData();
        hideLoading();
    }, 800);
}

// 下一个月
function nextMonth() {
    const nextMonth = new Date(SALARY_CONFIG.selectedMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    if (nextMonth <= SALARY_CONFIG.currentDate) {
        SALARY_CONFIG.selectedMonth = nextMonth;
        updateMonthDisplay();
        showLoading();
        
        setTimeout(() => {
            loadSalaryData();
            hideLoading();
        }, 800);
    }
}

// 加载薪资历史记录
function loadSalaryHistory() {
    const container = document.getElementById('salaryHistory');
    container.innerHTML = '';
    
    const historyData = getFilteredHistory();
    const displayCount = Math.min(SALARY_CONFIG.loadedHistoryCount, historyData.length);
    
    for (let i = 0; i < displayCount; i++) {
        const record = historyData[i];
        const recordCard = createHistoryCard(record);
        container.appendChild(recordCard);
    }
    
    // 更新"查看更多"按钮状态
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (displayCount >= historyData.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// 获取筛选后的历史记录
function getFilteredHistory() {
    const allRecords = Object.entries(SALARY_DATA).map(([month, data]) => ({
        month,
        ...data
    })).sort((a, b) => b.month.localeCompare(a.month));
    
    const currentDate = new Date();
    
    switch (SALARY_CONFIG.historyFilter) {
        case 'recent':
            return allRecords.slice(0, 6); // 最近6个月
        case 'year':
            const currentYear = currentDate.getFullYear();
            return allRecords.filter(record => record.month.startsWith(currentYear.toString()));
        case 'all':
        default:
            return allRecords;
    }
}

// 创建历史记录卡片
function createHistoryCard(record) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer';
    
    const [year, month] = record.month.split('-');
    const statusText = record.status === 'paid' ? '已发放' : '处理中';
    const statusClass = record.status === 'paid' ? 'text-salaryGreen' : 'text-salaryOrange';
    
    cardDiv.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <div class="font-medium text-gray-800">${year}年${parseInt(month)}月工资</div>
            <span class="text-xs ${statusClass}">${statusText}</span>
        </div>
        <div class="flex justify-between items-center mb-2">
            <span class="text-sm text-gray-600">实发工资</span>
            <span class="font-bold text-lg text-gray-900">¥${formatAmount(record.netSalary)}</span>
        </div>
        <div class="flex justify-between items-center text-sm text-gray-500">
            <span>发放日期：${record.payDate}</span>
            <span>工作${record.workDays}天</span>
        </div>
    `;
    
    // 点击查看详情
    cardDiv.addEventListener('click', () => {
        const [year, month] = record.month.split('-');
        SALARY_CONFIG.selectedMonth = new Date(parseInt(year), parseInt(month) - 1);
        updateMonthDisplay();
        loadSalaryData();
        
        // 滚动到顶部
        document.querySelector('.flex-1.overflow-y-auto').scrollTop = 0;
    });
    
    return cardDiv;
}

// 筛选历史记录
function filterHistory(filter) {
    SALARY_CONFIG.historyFilter = filter;
    SALARY_CONFIG.loadedHistoryCount = 3; // 重置加载数量
    
    // 更新标签样式
    document.querySelectorAll('.history-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('border-gray-300', 'text-gray-600');
    });
    
    event.target.classList.add('active');
    event.target.classList.remove('border-gray-300', 'text-gray-600');
    
    // 重新加载历史记录
    loadSalaryHistory();
}

// 加载更多历史记录
function loadMoreHistory() {
    SALARY_CONFIG.loadedHistoryCount += 3;
    loadSalaryHistory();
}

// 下载工资条
function downloadPayslip() {
    showLoading('正在生成工资条...');
    
    setTimeout(() => {
        hideLoading();
        
        // 模拟下载
        const year = SALARY_CONFIG.selectedMonth.getFullYear();
        const month = SALARY_CONFIG.selectedMonth.getMonth() + 1;
        const fileName = `聚贤人力_工资条_${year}年${month}月.pdf`;
        
        showToast(`${fileName} 下载完成`);
        
        // 实际项目中这里会调用下载API
        console.log('下载工资条:', fileName);
    }, 2000);
}

// 显示薪资帮助
function showSalaryHelp() {
    const helpContent = `
        <div class="text-left">
            <h4 class="font-bold mb-3">薪资计算说明</h4>
            
            <div class="mb-4">
                <h5 class="font-semibold text-sm mb-2 text-green-600">🔹 收入项目</h5>
                <div class="space-y-1 text-xs pl-2">
                    <p><strong>基本工资：</strong>固定月薪，按出勤天数计算</p>
                    <p><strong>加班费：</strong>超出标准工时的工资补偿</p>
                    <p><strong>绩效奖金：</strong>根据工作表现发放</p>
                    <p><strong>津贴补助：</strong>交通、餐补等福利</p>
                </div>
            </div>

            <div class="mb-4">
                <h5 class="font-semibold text-sm mb-2 text-red-600">🔹 扣除项目</h5>
                <div class="space-y-1 text-xs pl-2">
                    <p><strong>五险一金：</strong>按国家规定比例扣除</p>
                    <p><strong>个人所得税：</strong>按税法规定计算</p>
                    <p><strong>工资预支：</strong>已预支的工资金额</p>
                    <p><strong>住宿费：</strong>员工宿舍费用</p>
                    <p><strong>伙食费：</strong>员工餐厅用餐费用</p>
                    <p><strong>迟到扣款：</strong>因迟到产生的扣款</p>
                </div>
            </div>

            <div class="mt-4 p-3 bg-blue-50 rounded text-xs">
                💡 实发工资 = 应发工资 - 各项扣除<br/>
                如有疑问，请联系人事部门咨询
            </div>
        </div>
    `;
    
    showModal('薪资说明', helpContent);
}

// 初始化交互效果
function initInteractions() {
    // 添加卡片悬停效果
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 添加按钮点击反馈
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// 工具函数

// 格式化金额
function formatAmount(amount) {
    return amount.toLocaleString('zh-CN');
}

// 显示加载状态
function showLoading(message = '正在加载...') {
    const loadingMask = document.getElementById('loadingMask');
    if (loadingMask) {
        const messageElement = loadingMask.querySelector('.text-gray-700');
        if (messageElement) {
            messageElement.textContent = message;
        }
        loadingMask.style.display = 'flex';
    }
}

// 隐藏加载状态
function hideLoading() {
    const loadingMask = document.getElementById('loadingMask');
    if (loadingMask) {
        loadingMask.style.display = 'none';
    }
}

// 显示提示消息
function showToast(message, duration = 3000) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 显示动画
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -20px)';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, duration);
}

// 显示模态框
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-sm w-full">
            <div class="p-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium text-gray-800">${title}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p-4">
                ${content}
            </div>
            <div class="p-4 border-t border-gray-200">
                <button onclick="this.closest('.fixed').remove()" class="w-full bg-primary text-white py-2 rounded-lg">
                    确定
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 页面数据持久化
function saveSalaryData() {
    const salaryState = {
        selectedMonth: SALARY_CONFIG.selectedMonth.toISOString(),
        historyFilter: SALARY_CONFIG.historyFilter,
        loadedHistoryCount: SALARY_CONFIG.loadedHistoryCount
    };
    
    localStorage.setItem('salaryPageState', JSON.stringify(salaryState));
}

// 恢复页面数据
function restoreSalaryData() {
    const savedState = localStorage.getItem('salaryPageState');
    if (savedState) {
        try {
            const state = JSON.parse(savedState);
            SALARY_CONFIG.selectedMonth = new Date(state.selectedMonth);
            SALARY_CONFIG.historyFilter = state.historyFilter;
            SALARY_CONFIG.loadedHistoryCount = state.loadedHistoryCount;
        } catch (e) {
            console.log('恢复薪资页面状态失败:', e);
        }
    }
}

// 页面卸载时保存状态
window.addEventListener('beforeunload', function() {
    saveSalaryData();
});

console.log('薪资页面脚本加载完成'); 