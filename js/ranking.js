// 推荐排行榜页面脚本
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializePage();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载初始数据
    loadRankingData('month');
});

// 模拟排行榜数据
const rankingData = {
    month: {
        period: '2024年12月',
        stats: {
            participants: 128,
            totalRewards: '¥8,650',
            avgScore: 465
        },
        topThree: [
            {
                rank: 1,
                name: '王小华',
                avatar: 'gold',
                score: 1580,
                referrals: 8,
                avgDays: 35,
                reward: 1200
            },
            {
                rank: 2,
                name: '李明',
                avatar: 'silver',
                score: 1250,
                referrals: 6,
                avgDays: 32,
                reward: 800
            },
            {
                rank: 3,
                name: '张伟',
                avatar: 'bronze',
                score: 980,
                referrals: 5,
                avgDays: 28,
                reward: 500
            }
        ],
        rankings: [
            {
                rank: 4,
                name: '刘娟',
                avatar: 'default',
                score: 720,
                referrals: 6,
                avgDays: 24,
                reward: 300
            },
            {
                rank: 5,
                name: '陈强',
                avatar: 'default',
                score: 650,
                referrals: 5,
                avgDays: 26,
                reward: 200
            },
            {
                rank: 6,
                name: '赵丽',
                avatar: 'default',
                score: 580,
                referrals: 4,
                avgDays: 29,
                reward: 150
            },
            {
                rank: 7,
                name: '黄勇',
                avatar: 'default',
                score: 520,
                referrals: 4,
                avgDays: 26,
                reward: 120
            },
            {
                rank: 8,
                name: '吴芳',
                avatar: 'default',
                score: 480,
                referrals: 3,
                avgDays: 32,
                reward: 100
            },
            {
                rank: 9,
                name: '郑磊',
                avatar: 'default',
                score: 450,
                referrals: 3,
                avgDays: 30,
                reward: 80
            },
            {
                rank: 10,
                name: '孙梅',
                avatar: 'default',
                score: 420,
                referrals: 3,
                avgDays: 28,
                reward: 50
            }
        ],
        myRanking: {
            rank: 15,
            name: '我',
            score: 180,
            referrals: 2,
            avgDays: 15,
            reward: 0
        }
    },
    quarter: {
        period: '2024年Q4',
        stats: {
            participants: 245,
            totalRewards: '¥15,200',
            avgScore: 680
        },
        topThree: [
            {
                rank: 1,
                name: '王小华',
                avatar: 'gold',
                score: 2580,
                referrals: 12,
                avgDays: 38,
                reward: 1800
            },
            {
                rank: 2,
                name: '李明',
                avatar: 'silver',
                score: 2150,
                referrals: 10,
                avgDays: 35,
                reward: 1200
            },
            {
                rank: 3,
                name: '张伟',
                avatar: 'bronze',
                score: 1880,
                referrals: 8,
                avgDays: 32,
                reward: 800
            }
        ],
        rankings: [
            {
                rank: 4,
                name: '刘娟',
                avatar: 'default',
                score: 1520,
                referrals: 8,
                avgDays: 30,
                reward: 500
            },
            {
                rank: 5,
                name: '陈强',
                avatar: 'default',
                score: 1350,
                referrals: 7,
                avgDays: 29,
                reward: 400
            }
        ],
        myRanking: {
            rank: 28,
            name: '我',
            score: 380,
            referrals: 4,
            avgDays: 19,
            reward: 0
        }
    },
    year: {
        period: '2024年',
        stats: {
            participants: 586,
            totalRewards: '¥45,600',
            avgScore: 890
        },
        topThree: [
            {
                rank: 1,
                name: '王小华',
                avatar: 'gold',
                score: 5580,
                referrals: 25,
                avgDays: 42,
                reward: 3000
            },
            {
                rank: 2,
                name: '李明',
                avatar: 'silver',
                score: 4850,
                referrals: 22,
                avgDays: 38,
                reward: 2000
            },
            {
                rank: 3,
                name: '张伟',
                avatar: 'bronze',
                score: 4280,
                referrals: 20,
                avgDays: 35,
                reward: 1500
            }
        ],
        rankings: [
            {
                rank: 4,
                name: '刘娟',
                avatar: 'default',
                score: 3520,
                referrals: 18,
                avgDays: 32,
                reward: 1000
            },
            {
                rank: 5,
                name: '陈强',
                avatar: 'default',
                score: 3150,
                referrals: 15,
                avgDays: 35,
                reward: 800
            }
        ],
        myRanking: {
            rank: 45,
            name: '我',
            score: 680,
            referrals: 8,
            avgDays: 22,
            reward: 0
        }
    }
};

// 初始化页面
function initializePage() {
    // 设置当前时间
    updateCurrentTime();
    setInterval(updateCurrentTime, 30000); // 每30秒更新一次时间
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// 绑定事件监听器
function bindEventListeners() {
    // 时间周期切换按钮
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchPeriod(this.dataset.period);
        });
    });
    
    // 查看更多按钮
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreRankings);
    }
    
    // 排行榜项点击事件
    document.addEventListener('click', function(e) {
        if (e.target.closest('.ranking-card')) {
            const card = e.target.closest('.ranking-card');
            if (!card.id === 'myRanking') {
                showUserDetail(card);
            }
        }
    });
}

// 切换时间周期
function switchPeriod(period) {
    // 更新按钮状态
    document.querySelectorAll('.period-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'text-primary');
        btn.classList.add('text-white/80');
    });
    
    const activeBtn = document.querySelector(`[data-period="${period}"]`);
    activeBtn.classList.add('active', 'bg-white', 'text-primary');
    activeBtn.classList.remove('text-white/80');
    
    // 显示加载状态
    showLoadingState();
    
    // 延迟加载数据（模拟网络请求）
    setTimeout(() => {
        loadRankingData(period);
        hideLoadingState();
    }, 800);
}

// 显示加载状态
function showLoadingState() {
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('topThreeSection').style.opacity = '0.3';
    document.getElementById('rankingListSection').style.opacity = '0.3';
}

// 隐藏加载状态
function hideLoadingState() {
    document.getElementById('loadingState').classList.add('hidden');
    document.getElementById('topThreeSection').style.opacity = '1';
    document.getElementById('rankingListSection').style.opacity = '1';
}

// 加载排行榜数据
function loadRankingData(period) {
    const data = rankingData[period];
    if (!data) return;
    
    // 更新统计信息
    updateStats(data.stats);
    
    // 更新周期文本
    document.getElementById('currentPeriodText').textContent = data.period;
    
    // 更新前三名
    updateTopThree(data.topThree);
    
    // 更新排行榜列表
    updateRankingList(data.rankings);
    
    // 更新我的排名
    updateMyRanking(data.myRanking);
    
    // 添加数据更新动画
    animateDataUpdate();
}

// 更新统计信息
function updateStats(stats) {
    animateNumber('totalParticipants', stats.participants);
    document.getElementById('totalRewards').textContent = stats.totalRewards;
    animateNumber('avgScore', stats.avgScore);
}

// 更新前三名
function updateTopThree(topThree) {
    // 这里可以根据实际数据更新前三名信息
    // 当前使用静态数据，可以扩展为动态更新
    console.log('更新前三名数据:', topThree);
}

// 更新排行榜列表
function updateRankingList(rankings) {
    const container = document.getElementById('rankingList');
    container.innerHTML = '';
    
    rankings.forEach((item, index) => {
        const rankingItem = createRankingItem(item);
        rankingItem.style.animationDelay = `${index * 0.1}s`;
        rankingItem.classList.add('fade-in');
        container.appendChild(rankingItem);
    });
}

// 创建排行榜项
function createRankingItem(item) {
    const div = document.createElement('div');
    div.className = 'ranking-card bg-white rounded-lg p-4 border border-gray-100 cursor-pointer hover:shadow-md transition-all';
    
    div.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">${item.rank}</div>
                <img src="${getAvatarUrl(item.avatar)}" alt="${item.name}" class="w-10 h-10 rounded-full">
                <div>
                    <p class="font-medium text-gray-800">${item.name}</p>
                    <p class="text-xs text-gray-500">推荐${item.referrals}人 • 平均${item.avgDays}天</p>
                </div>
            </div>
            <div class="text-right">
                <p class="font-semibold text-gray-800">${item.score}积分</p>
                <p class="text-sm text-primary font-medium">¥${item.reward}</p>
            </div>
        </div>
    `;
    
    return div;
}

// 更新我的排名
function updateMyRanking(myData) {
    const container = document.getElementById('myRanking');
    container.querySelector('.w-8.h-8').textContent = myData.rank;
    container.querySelector('.font-semibold').textContent = `${myData.score}积分`;
    container.querySelector('.text-xs.text-gray-500').textContent = `推荐${myData.referrals}人 • 平均${myData.avgDays}天`;
    
    const rewardText = myData.reward > 0 ? `¥${myData.reward}` : '未获奖';
    container.querySelector('.text-right .text-sm').textContent = rewardText;
}

// 获取头像URL
function getAvatarUrl(type) {
    const avatars = {
        gold: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI0ZGRjdFRCIvPgo8cGF0aCBkPSJNMTAgMzVDMTAgMjkuNDc3MiAxNC40NzcyIDI1IDIwIDI1QzI1LjUyMjggMjUgMzAgMjkuNDc3MiAzMCAzNVYzNUgxMFoiIGZpbGw9IiNGRkY3RUQiLz4KPC9zdmc+',
        silver: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNDMEMwQzAiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI0ZGRjdFRCIvPgo8cGF0aCBkPSJNMTAgMzVDMTAgMjkuNDc3MiAxNC40NzcyIDI1IDIwIDI1QzI1LjUyMjggMjUgMzAgMjkuNDc3MiAzMCAzNVYzNUgxMFoiIGZpbGw9IiNGRkY3RUQiLz4KPC9zdmc+',
        bronze: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNEMjY5MUUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iI0ZGRjdFRCIvPgo8cGF0aCBkPSJNMTAgMzVDMTAgMjkuNDc3MiAxNC40NzcyIDI1IDIwIDI1QzI1LjUyMjggMjUgMzAgMjkuNDc3MiAzMCAzNVYzNUgxMFoiIGZpbGw9IiNGRkY3RUQiLz4KPC9zdmc+',
        default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIxNSIgcj0iNSIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTAgMzVDMTAgMjkuNDc3MiAxNC40NzcyIDI1IDIwIDI1QzI1LjUyMjggMjUgMzAgMjkuNDc3MiAzMCAzNVYzNUgxMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+'
    };
    
    return avatars[type] || avatars.default;
}

// 数字动画
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    const startNumber = parseInt(element.textContent) || 0;
    const duration = 1000; // 1秒
    const startTime = Date.now();
    
    function updateNumber() {
        const currentTime = Date.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3); // easeOut动画
        
        const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * easeOutProgress);
        element.textContent = currentNumber;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = targetNumber;
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 数据更新动画
function animateDataUpdate() {
    // 添加数据更新的视觉反馈
    const elements = document.querySelectorAll('.number-animation');
    elements.forEach(el => {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 200);
    });
}

// 加载更多排名
function loadMoreRankings() {
    const button = document.getElementById('loadMoreBtn');
    button.textContent = '加载中...';
    button.disabled = true;
    
    // 模拟加载延迟
    setTimeout(() => {
        // 这里可以加载更多数据
        showMessage('已显示全部排名数据', 'info');
        button.textContent = '已显示全部';
        button.disabled = true;
        button.classList.add('text-gray-400');
    }, 1000);
}

// 显示用户详情
function showUserDetail(card) {
    // 添加点击效果
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 150);
    
    // 这里可以跳转到用户详情页面或显示详情弹窗
    console.log('查看用户详情');
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    document.getElementById('currentTime').textContent = timeString;
}

// 显示规则说明弹窗
function showRules() {
    document.getElementById('rulesModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// 隐藏规则说明弹窗
function hideRules() {
    document.getElementById('rulesModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// 显示消息提示
function showMessage(message, type = 'success') {
    // 创建消息提示元素
    const messageDiv = document.createElement('div');
    messageDiv.className = `fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    }`;
    messageDiv.textContent = message;
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translate(-50%, -20px)';
    
    document.body.appendChild(messageDiv);
    
    // 显示动画
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translate(-50%, 0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 300);
    }, 3000);
}

// 本地存储相关函数
function saveRankingPreferences(period) {
    localStorage.setItem('rankingPreferences', JSON.stringify({
        lastViewedPeriod: period,
        lastViewedTime: Date.now()
    }));
}

function loadRankingPreferences() {
    const saved = localStorage.getItem('rankingPreferences');
    if (saved) {
        return JSON.parse(saved);
    }
    return null;
}

// 页面卸载时保存用户偏好
window.addEventListener('beforeunload', function() {
    const activePeriod = document.querySelector('.period-btn.active')?.dataset.period || 'month';
    saveRankingPreferences(activePeriod);
});

// 添加页面可见性变化监听
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时，可以刷新数据
        console.log('页面重新可见，可以刷新排行榜数据');
    }
});

// 导出主要函数供外部调用
window.RankingPage = {
    loadRankingData,
    switchPeriod,
    showRules,
    hideRules,
    showMessage
}; 