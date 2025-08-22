// 蓝诚人力 - 推荐奖励详情页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initFilterButtons();
    initMonthSelector();
    initSearchFunction();
    initExpandButtons();
    initBackButton();
    
    // 加载数据
    loadRewardData();
});

// 初始化筛选按钮
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选卡片
            const status = this.dataset.status;
            filterPersonCards(status);
            
            // 更新统计数据
            updateStatistics(status);
        });
    });
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
            loadMonthData(month);
            
            showToast(`已切换到${this.textContent}数据`);
        });
    });
}

// 初始化搜索功能
function initSearchFunction() {
    const searchInput = document.querySelector('.search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        // 延迟搜索，避免频繁触发
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase();
            searchPersonCards(searchTerm);
        }, 300);
    });
}

// 初始化展开按钮
function initExpandButtons() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            toggleDetails(this);
        });
    });
}

// 初始化返回按钮
function initBackButton() {
    const backButton = document.querySelector('.px-4.py-3 .flex.items-center');
    
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }
}

// 筛选人员卡片
function filterPersonCards(status) {
    const cards = document.querySelectorAll('.person-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 如果没有匹配的卡片，显示提示
    showEmptyState(visibleCount === 0);
}

// 搜索人员卡片
function searchPersonCards(searchTerm) {
    const cards = document.querySelectorAll('.person-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const name = card.querySelector('.font-medium').textContent.toLowerCase();
        const phone = card.querySelector('.text-xs').textContent.toLowerCase();
        
        if (name.includes(searchTerm) || phone.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    showEmptyState(visibleCount === 0);
}

// 跳转到个人工时详情页面
function toggleDetails(button) {
    // 获取人员信息
    const personCard = button.closest('.person-card');
    const personName = personCard.querySelector('.font-medium').textContent;
    const personPhone = personCard.querySelector('.text-xs').textContent;
    
    // 获取岗位信息
    const positionElements = personCard.querySelectorAll('.text-sm span');
    let personPosition = '生产线操作工';
    
    for (let span of positionElements) {
        const spanText = span.textContent;
        if (spanText.includes('入职岗位：')) {
            personPosition = spanText.replace('入职岗位：', '');
            break;
        } else if (spanText.includes('应聘岗位：')) {
            personPosition = spanText.replace('应聘岗位：', '');
            break;
        } else if (spanText.includes('原岗位：')) {
            personPosition = spanText.replace('原岗位：', '');
            break;
        }
    }
    
    // 获取状态信息
    const statusElement = personCard.querySelector('.status-badge');
    let personStatus = 'working';
    if (statusElement.classList.contains('status-resigned')) {
        personStatus = 'resigned';
    } else if (statusElement.classList.contains('status-arrived')) {
        personStatus = 'arrived';
    } else if (statusElement.classList.contains('status-pending')) {
        personStatus = 'pending';
    }
    
    // 构建跳转URL
    const params = new URLSearchParams({
        name: personName,
        phone: personPhone,
        position: personPosition,
        status: personStatus
    });
    
    // 跳转到新页面
    window.location.href = `person-work-detail.html?${params.toString()}`;
}

// 加载月份数据
function loadMonthData(month) {
    // 模拟加载数据的过程
    showLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
        // 更新数据
        updateMonthlyData(month);
        showLoading(false);
    }, 1000);
}

// 更新月度数据
function updateMonthlyData(month) {
    const monthData = getMonthData(month);
    
    // 更新统计概览
    updateOverviewStats(monthData.stats);
    
    // 更新奖励统计
    updateRewardSummary(monthData.rewards);
    
    // 更新人员卡片的工时数据
    updatePersonCardData(monthData.persons);
}

// 获取月份数据（模拟数据）
function getMonthData(month) {
    const monthlyData = {
        '2024-11': {
            stats: { total: 4, working: 2, resigned: 1, reward: 1800 },
            rewards: [
                { name: '张三', amount: 600 },
                { name: '李四', amount: 800 },
                { name: '赵六', amount: 400 }
            ],
            persons: [
                { name: '张三', hours: 150, weeks: [38, 40, 36, 36] },
                { name: '李四', hours: 200, weeks: [50, 48, 52, 50] }
            ]
        },
        '2024-12': {
            stats: { total: 5, working: 3, resigned: 1, reward: 2000 },
            rewards: [
                { name: '张三', amount: 720 },
                { name: '李四', amount: 800 },
                { name: '赵六', amount: 480 }
            ],
            persons: [
                { name: '张三', hours: 180, weeks: [44, 46, 45, 45] },
                { name: '李四', hours: 200, weeks: [50, 48, 52, 50] }
            ]
        },
        '2025-01': {
            stats: { total: 6, working: 4, resigned: 0, reward: 2400 },
            rewards: [
                { name: '张三', amount: 720 },
                { name: '李四', amount: 800 },
                { name: '王五', amount: 600 },
                { name: '新人', amount: 280 }
            ],
            persons: [
                { name: '张三', hours: 180, weeks: [44, 46, 45, 45] },
                { name: '李四', hours: 200, weeks: [50, 48, 52, 50] }
            ]
        }
    };
    
    return monthlyData[month] || monthlyData['2024-12'];
}

// 更新统计概览
function updateOverviewStats(stats) {
    const overviewCards = document.querySelectorAll('.bg-white.bg-opacity-20 .text-center');
    
    if (overviewCards.length >= 4) {
        overviewCards[0].querySelector('.text-lg').textContent = stats.total;
        overviewCards[1].querySelector('.text-lg').textContent = stats.working;
        overviewCards[2].querySelector('.text-lg').textContent = stats.resigned;
        overviewCards[3].querySelector('.text-lg').textContent = `¥${stats.reward}`;
    }
}

// 更新奖励总结
function updateRewardSummary(rewards) {
    const summaryContainer = document.querySelector('.mt-6.bg-white.rounded-lg .space-y-2');
    
    if (summaryContainer) {
        // 清空现有内容
        summaryContainer.innerHTML = '';
        
        // 添加新的奖励项
        let totalAmount = 0;
        rewards.forEach(reward => {
            const rewardItem = document.createElement('div');
            rewardItem.className = 'flex justify-between text-sm';
            rewardItem.innerHTML = `
                <span class="text-gray-600">${reward.name}工时奖励：</span>
                <span class="text-rewardRed font-medium">¥${reward.amount}</span>
            `;
            summaryContainer.appendChild(rewardItem);
            totalAmount += reward.amount;
        });
        
        // 添加总计
        const totalItem = document.createElement('div');
        totalItem.className = 'border-t pt-2';
        totalItem.innerHTML = `
            <div class="flex justify-between font-medium">
                <span>本月总奖励：</span>
                <span class="text-rewardRed text-lg">¥${totalAmount}</span>
            </div>
        `;
        summaryContainer.appendChild(totalItem);
    }
}

// 更新人员卡片数据
function updatePersonCardData(persons) {
    const personCards = document.querySelectorAll('.person-card');
    
    persons.forEach(person => {
        const card = Array.from(personCards).find(card => 
            card.querySelector('.font-medium').textContent === person.name
        );
        
        if (card) {
            // 更新工时显示
            const timeRecord = card.querySelector('.time-record');
            if (timeRecord) {
                const hoursSpan = timeRecord.querySelector('span');
                if (hoursSpan) {
                    hoursSpan.textContent = `12月工时：${person.hours}小时`;
                }
                
                // 更新详情
                const details = timeRecord.querySelector('.details .space-y-1');
                if (details && person.weeks) {
                    details.innerHTML = '';
                    person.weeks.forEach((hours, index) => {
                        const weekItem = document.createElement('div');
                        weekItem.className = 'flex justify-between';
                        weekItem.innerHTML = `
                            <span>第${index + 1}周：${hours}小时</span>
                            <span>奖励：¥${hours * 4}</span>
                        `;
                        details.appendChild(weekItem);
                    });
                    
                    // 添加总计
                    const totalItem = document.createElement('div');
                    totalItem.className = 'border-t pt-1 mt-1';
                    const totalHours = person.weeks.reduce((sum, h) => sum + h, 0);
                    totalItem.innerHTML = `
                        <div class="flex justify-between font-medium">
                            <span>月度总计：${totalHours}小时</span>
                            <span class="text-rewardRed">¥${totalHours * 4}</span>
                        </div>
                    `;
                    details.appendChild(totalItem);
                }
            }
        }
    });
}

// 更新统计数据
function updateStatistics(status) {
    const cards = document.querySelectorAll('.person-card');
    let count = 0;
    let totalReward = 0;
    
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            if (card.style.display !== 'none') {
                count++;
                const rewardElement = card.querySelector('.reward-amount');
                if (rewardElement) {
                    const amount = parseInt(rewardElement.textContent.replace('¥', ''));
                    totalReward += amount;
                }
            }
        }
    });
    
    // 可以在这里更新页面上的统计显示
    console.log(`筛选结果：${count}人，总奖励：¥${totalReward}`);
}

// 显示空状态
function showEmptyState(show) {
    let emptyState = document.querySelector('.empty-state');
    
    if (show) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state flex flex-col items-center justify-center py-20';
            emptyState.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-gray-400 text-sm">暂无匹配的推荐记录</p>
            `;
            document.querySelector('.space-y-3').appendChild(emptyState);
        }
        emptyState.style.display = 'flex';
    } else {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
}

// 显示加载状态
function showLoading(show) {
    let loadingOverlay = document.querySelector('.loading-overlay');
    
    if (show) {
        if (!loadingOverlay) {
            loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            loadingOverlay.innerHTML = `
                <div class="bg-white rounded-lg p-4 flex items-center space-x-3">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-rewardRed"></div>
                    <span class="text-gray-700">加载中...</span>
                </div>
            `;
            document.body.appendChild(loadingOverlay);
        }
        loadingOverlay.style.display = 'flex';
    } else {
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }
}

// 加载奖励数据
function loadRewardData() {
    // 模拟从服务器加载数据
    console.log('正在加载推荐奖励数据...');
    
    // 这里可以添加实际的API调用
    // fetchRewardData().then(data => {
    //     updatePageData(data);
    // });
}

// 显示提示信息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 添加淡入动画
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // 2秒后自动移除
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 跳转到排行榜页面
function goToRanking() {
    // 添加页面切换动画效果
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.7';
    
    setTimeout(() => {
        window.location.href = 'ranking.html';
    }, 200);
}

// 导出函数供全局使用
window.toggleDetails = toggleDetails;
window.showToast = showToast;
window.goToRanking = goToRanking; 