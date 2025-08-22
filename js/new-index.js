// 新首页JavaScript逻辑
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

// 模拟岗位数据
const jobsData = [
    {
        id: 1,
        title: "电子厂操作工",
        company: "富士康科技集团",
        salary: "5500-7000",
        location: "泉州市",
        type: "正式工",
        tags: ["包吃住", "五险一金", "加班费"],
        workTime: "8小时制",
        urgent: true,
        description: "负责电子产品组装，工作环境良好，提供培训"
    },
    {
        id: 2,
        title: "仓库理货员",
        company: "京东物流",
        salary: "4800-6200",
        location: "泉州市",
        type: "日结",
        tags: ["日结", "包吃", "交通补助"],
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
        tags: ["临时工", "按天结算", "包吃"],
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
        tags: ["技能培训", "五险一金", "年终奖"],
        workTime: "8小时制",
        urgent: false,
        description: "服装制作，有经验者优先，提供技能培训"
    },
    {
        id: 5,
        title: "清洁工",
        company: "万达商业管理",
        salary: "20-25/时",
        location: "泉州市",
        type: "小时工",
        tags: ["小时工", "弹性时间", "就近安排"],
        workTime: "2-8小时",
        urgent: false,
        description: "商场清洁工作，工作时间灵活，就近安排"
    },
    {
        id: 6,
        title: "食品厂包装工",
        company: "达利食品集团",
        salary: "5200-6800",
        location: "惠安县",
        type: "正式工",
        tags: ["包吃住", "五险", "节日福利"],
        workTime: "12小时制",
        urgent: true,
        description: "食品包装工作，环境干净，福利待遇好"
    }
];

// 当前已加载的岗位数量
let currentJobCount = 0;
const jobsPerLoad = 3; // 每次加载3个岗位

// 轮播当前索引
let currentBannerIndex = 0;
const bannerCount = 4;

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

// 初始化轮播
function initializeBanner() {
    // 自动轮播
    setInterval(() => {
        nextBanner();
    }, 4000); // 每4秒切换一次
    
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
        slider.style.transition = 'transform 0.5s ease';
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
            jobCard.classList.add('fade-in');
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
                loadMoreBtn.textContent = '加载更多岗位';
                loadMoreBtn.disabled = false;
            }
        }
    }, 800);
}

// 创建岗位卡片
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer';
    card.onclick = () => goToJobDetail(job.id);
    
    const urgentBadge = job.urgent ? 
        '<span class="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full mb-2">急招</span>' : '';
    
    const tags = job.tags.map(tag => 
        `<span class="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">${tag}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div class="flex-1">
                ${urgentBadge}
                <h3 class="text-lg font-semibold text-gray-800 mb-1">${job.title}</h3>
                <p class="text-gray-600 text-sm">${job.company}</p>
            </div>
            <div class="text-right">
                <p class="text-lg font-bold text-primary">${job.salary}</p>
                <p class="text-xs text-gray-500">${job.type}</p>
            </div>
        </div>
        
        <div class="flex items-center text-sm text-gray-600 mb-3">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="mr-4">${job.location}</span>
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>${job.workTime}</span>
        </div>
        
        <p class="text-gray-600 text-sm mb-3 line-clamp-2">${job.description}</p>
        
        <div class="flex flex-wrap gap-2">
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
        // 跳转到搜索结果页面
        window.location.href = `search-results.html?keyword=${encodeURIComponent(keyword)}`;
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
    window.location.href = `search-results.html?type=${encodeURIComponent(keyword)}`;
}

// 跳转到岗位详情
function goToJobDetail(jobId) {
    // 添加点击效果
    showMessage('正在跳转...', 'info');
    
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
    document.body.style.opacity = '0.7';
    
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
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 300);
    }, 2000);
}

// 本地存储相关函数
function saveUserPreferences() {
    const preferences = {
        lastVisited: Date.now(),
        searchHistory: getSearchHistory(),
        favoriteJobTypes: getFavoriteJobTypes()
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

function getSearchHistory() {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : [];
}

function getFavoriteJobTypes() {
    const favorites = localStorage.getItem('favoriteJobTypes');
    return favorites ? JSON.parse(favorites) : [];
}

// 添加搜索历史
function addToSearchHistory(keyword) {
    const history = getSearchHistory();
    const newHistory = [keyword, ...history.filter(item => item !== keyword)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
}

// 页面可见性变化监听
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时，可以刷新数据
        console.log('页面重新可见，刷新时间显示');
        updateCurrentTime();
    }
});

// 页面卸载时保存用户偏好
window.addEventListener('beforeunload', function() {
    saveUserPreferences();
});

// 滚动监听（可选：添加滚动效果）
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 搜索框悬浮效果
    const searchContainer = document.querySelector('.floating-search');
    if (searchContainer && scrollTop > 50) {
        searchContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else if (searchContainer) {
        searchContainer.style.backgroundColor = 'transparent';
    }
});

// 导出主要函数供外部调用
window.NewIndexPage = {
    performSearch,
    searchByType,
    goToJobDetail,
    goToMyJob,
    goToSearchResults,
    goToMessages,
    goToProfile,
    navigateTo,
    showMessage,
    loadMoreJobs
};

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