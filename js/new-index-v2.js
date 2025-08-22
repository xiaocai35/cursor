// 第二版本首页JavaScript逻辑 - 简洁卡片风格
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializePage();
    
    // 初始化轮播
    initializeBanner();
    
    // 加载岗位数据
    loadJobList();
    
    // 绑定事件监听器
    bindEventListeners();
});

// 模拟岗位数据（同第一版本但样式简化）
const jobsData = [
    {
        id: 1,
        title: "电子厂操作工",
        company: "富士康科技集团",
        salary: "5500-7000",
        location: "泉州市",
        type: "正式工",
        tags: ["包吃住", "五险一金"],
        workTime: "8小时制",
        urgent: true,
        description: "负责电子产品组装，工作环境良好"
    },
    {
        id: 2,
        title: "仓库理货员",
        company: "京东物流",
        salary: "4800-6200",
        location: "泉州市",
        type: "日结",
        tags: ["日结", "包吃"],
        workTime: "10小时制",
        urgent: false,
        description: "负责货物分拣、整理，工作轻松"
    },
    {
        id: 3,
        title: "快递分拣员",
        company: "圆通速递",
        salary: "150-200/天",
        location: "晋江市",
        type: "临时工",
        tags: ["临时工", "按天结算"],
        workTime: "弹性工作",
        urgent: true,
        description: "负责快递分拣，工作时间灵活"
    },
    {
        id: 4,
        title: "服装厂车工",
        company: "安踏体育用品",
        salary: "6000-8500",
        location: "晋江市",
        type: "正式工",
        tags: ["技能培训", "年终奖"],
        workTime: "8小时制",
        urgent: false,
        description: "服装制作，有经验者优先"
    },
    {
        id: 5,
        title: "清洁工",
        company: "万达商业管理",
        salary: "20-25/时",
        location: "泉州市",
        type: "小时工",
        tags: ["小时工", "弹性时间"],
        workTime: "2-8小时",
        urgent: false,
        description: "商场清洁工作，时间灵活"
    },
    {
        id: 6,
        title: "食品厂包装工",
        company: "达利食品集团",
        salary: "5200-6800",
        location: "惠安县",
        type: "正式工",
        tags: ["包吃住", "五险"],
        workTime: "12小时制",
        urgent: true,
        description: "食品包装工作，环境干净"
    }
];

// 当前已加载的岗位数量
let currentJobCount = 0;
const jobsPerLoad = 4; // 每次加载4个岗位

// 轮播当前索引
let currentBannerIndex = 0;
const bannerCount = 3;

// 初始化页面
function initializePage() {
    // 设置当前时间
    updateCurrentTime();
    setInterval(updateCurrentTime, 30000);
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// 初始化轮播
function initializeBanner() {
    // 自动轮播
    setInterval(() => {
        nextBanner();
    }, 5000); // 每5秒切换一次
    
    // 添加轮播点击事件
    const bannerSlider = document.getElementById('bannerSlider');
    if (bannerSlider) {
        bannerSlider.addEventListener('click', nextBanner);
    }
}

// 下一张轮播
function nextBanner() {
    currentBannerIndex = (currentBannerIndex + 1) % bannerCount;
    updateBannerDisplay();
}

// 更新轮播显示
function updateBannerDisplay() {
    const slider = document.getElementById('bannerSlider');
    const indicators = document.getElementById('bannerIndicators');
    
    if (slider) {
        slider.style.transform = `translateX(-${currentBannerIndex * 100}%)`;
    }
    
    // 更新指示器
    if (indicators) {
        const dots = indicators.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].style.opacity = i === currentBannerIndex ? '1' : '0.5';
        }
    }
}

// 绑定事件监听器
function bindEventListeners() {
    // 搜索框回车事件
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', handleSearch);
    }
}

// 加载岗位列表
function loadJobList() {
    const jobList = document.getElementById('jobList');
    if (!jobList) return;
    
    // 清空现有内容
    jobList.innerHTML = '';
    currentJobCount = 0;
    
    // 加载初始岗位
    loadMoreJobs();
}

// 加载更多岗位
function loadMoreJobs() {
    const jobList = document.getElementById('jobList');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!jobList) return;
    
    // 显示加载状态
    if (loadMoreBtn) {
        loadMoreBtn.textContent = '加载中...';
        loadMoreBtn.disabled = true;
    }
    
    setTimeout(() => {
        const nextJobs = jobsData.slice(currentJobCount, currentJobCount + jobsPerLoad);
        
        nextJobs.forEach((job, index) => {
            const jobCard = createJobCard(job);
            jobCard.style.animationDelay = `${index * 0.1}s`;
            jobCard.classList.add('fade-up');
            jobList.appendChild(jobCard);
        });
        
        currentJobCount += nextJobs.length;
        
        // 更新按钮状态
        if (loadMoreBtn) {
            if (currentJobCount >= jobsData.length) {
                loadMoreBtn.textContent = '已显示全部岗位';
                loadMoreBtn.disabled = true;
                loadMoreBtn.classList.add('opacity-50');
            } else {
                loadMoreBtn.textContent = '查看更多岗位';
                loadMoreBtn.disabled = false;
            }
        }
    }, 600);
}

// 创建岗位卡片（简洁版本）
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'clean-card p-4 cursor-pointer';
    card.onclick = () => goToJobDetail(job.id);
    
    const urgentBadge = job.urgent ? 
        '<span class="urgent-tag job-tag mr-2">急招</span>' : '';
    
    const tags = job.tags.slice(0, 2).map(tag => 
        `<span class="job-tag">${tag}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
                <div class="flex items-center mb-1">
                    ${urgentBadge}
                    <h3 class="text-base font-semibold text-gray-800">${job.title}</h3>
                </div>
                <p class="text-gray-600 text-sm">${job.company}</p>
            </div>
            <div class="text-right">
                <p class="text-lg font-bold salary-text">${job.salary}</p>
                <p class="text-xs text-gray-500">${job.type}</p>
            </div>
        </div>
        
        <div class="flex items-center text-sm text-gray-500 mb-3">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="mr-4">${job.location}</span>
            <span>${job.workTime}</span>
        </div>
        
        <p class="text-gray-600 text-sm mb-3">${job.description}</p>
        
        <div class="flex flex-wrap gap-1">
            ${tags}
        </div>
    `;
    
    return card;
}

// 搜索处理
function handleSearch(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput?.value.trim();
    
    if (keyword) {
        // 添加搜索历史
        addToSearchHistory(keyword);
        // 跳转到搜索结果页面
        window.location.href = `search-results.html?keyword=${encodeURIComponent(keyword)}`;
    } else {
        showMessage('请输入搜索关键词', 'error');
    }
}

// 按工作类型搜索
function searchByType(type) {
    const typeMap = {
        'daily': '日结',
        'formal': '正式工',
        'temporary': '临时工',
        'hourly': '小时工'
    };
    
    const keyword = typeMap[type] || type;
    showMessage(`正在搜索${keyword}岗位...`, 'info');
    
    setTimeout(() => {
        window.location.href = `search-results.html?type=${encodeURIComponent(keyword)}`;
    }, 500);
}

// 跳转到岗位详情
function goToJobDetail(jobId) {
    // 添加点击效果
    showMessage('正在查看岗位详情...', 'info');
    
    setTimeout(() => {
        window.location.href = `job-detail.html?id=${jobId}`;
    }, 300);
}

// 跳转到我的工作
function goToMyJob() {
    navigateTo('my-job.html');
}

// 跳转到搜索结果
function goToSearchResults() {
    navigateTo('search-results.html');
}

// 跳转到消息页面
function goToMessages() {
    navigateTo('messages.html');
}

// 跳转到个人中心
function goToProfile() {
    navigateTo('profile.html');
}

// 通用页面跳转函数
function navigateTo(url) {
    // 添加页面切换动画效果
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.8';
    
    setTimeout(() => {
        window.location.href = url;
    }, 200);
}

// 更新当前时间
function updateCurrentTime() {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// 显示消息提示（简洁版）
function showMessage(message, type = 'success') {
    // 移除已存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // 创建新消息
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-toast fixed top-16 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-primary'
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
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 2000);
}

// 搜索历史管理
function addToSearchHistory(keyword) {
    const history = getSearchHistory();
    const newHistory = [keyword, ...history.filter(item => item !== keyword)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
}

function getSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

// 用户偏好保存
function saveUserPreferences() {
    const preferences = {
        lastVisited: Date.now(),
        version: 'v2',
        searchHistory: getSearchHistory()
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// 页面可见性变化监听
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateCurrentTime();
    }
});

// 页面卸载时保存用户偏好
window.addEventListener('beforeunload', function() {
    saveUserPreferences();
});

// 全局函数导出（供HTML onclick调用）
window.performSearch = performSearch;
window.handleSearch = handleSearch;
window.searchByType = searchByType;
window.goToJobDetail = goToJobDetail;
window.goToMyJob = goToMyJob;
window.goToSearchResults = goToSearchResults;
window.goToMessages = goToMessages;
window.goToProfile = goToProfile;
window.loadMoreJobs = loadMoreJobs; 