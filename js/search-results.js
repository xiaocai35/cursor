// 聚贤人力 - 搜索结果页面交互脚本

// 搜索状态管理
const SEARCH_STATE = {
    keyword: '',
    filters: {
        location: [],
        salaryRange: '',
        jobType: ''
    },
    sort: 'default',
    currentPage: 1,
    pageSize: 10,
    totalResults: 0,
    results: [],
    loading: false
};

// 模拟工作数据
const JOB_DATABASE = [
    {
        id: 'job001',
        title: '电子厂普工',
        company: '泉州顺丰电子有限公司',
        location: '石狮',
        salaryMin: 4500,
        salaryMax: 6500,
        salaryRange: '4500-6500元/月',
        tags: ['包吃住', '无需经验', '当天入职'],
        type: '普工',
        distance: '2.3km',
        urgent: true,
        description: '电子产品组装，无需经验，提供培训',
        requirements: ['18-45岁', '身体健康', '能适应倒班'],
        welfare: ['包吃住', '五险', '定期体检', '年终奖'],
        publishTime: '1小时前'
    },
    {
        id: 'job002',
        title: '服装厂车工',
        company: '晋江华美服装有限公司',
        location: '晋江',
        salaryMin: 5000,
        salaryMax: 8000,
        salaryRange: '5000-8000元/月',
        tags: ['计件工资', '多劳多得', '包住'],
        type: '操作工',
        distance: '5.1km',
        urgent: false,
        description: '服装缝制操作，熟手优先',
        requirements: ['有缝纫经验', '手脚灵活', '责任心强'],
        welfare: ['包住', '加班费', '技能培训', '节日福利'],
        publishTime: '3小时前'
    },
    {
        id: 'job003',
        title: '食品包装工',
        company: '泉州美味食品厂',
        location: '泉州',
        salaryMin: 4000,
        salaryMax: 5500,
        salaryRange: '4000-5500元/月',
        tags: ['包吃住', '环境干净', '女性优先'],
        type: '包装工',
        distance: '1.8km',
        urgent: true,
        description: '食品包装作业，环境整洁',
        requirements: ['女性优先', '细心负责', '无不良嗜好'],
        welfare: ['包吃住', '五险', '免费体检', '员工餐厅'],
        publishTime: '2小时前'
    },
    {
        id: 'job004',
        title: '质检员',
        company: '石狮精密制造公司',
        location: '石狮',
        salaryMin: 5500,
        salaryMax: 7000,
        salaryRange: '5500-7000元/月',
        tags: ['技术岗位', '五险一金', '双休'],
        type: '质检员',
        distance: '3.2km',
        urgent: false,
        description: '产品质量检验，需要一定技术基础',
        requirements: ['有质检经验', '责任心强', '视力良好'],
        welfare: ['五险一金', '双休', '技术津贴', '职业培训'],
        publishTime: '6小时前'
    },
    {
        id: 'job005',
        title: '仓库管理员',
        company: '泉州物流园区',
        location: '泉州',
        salaryMin: 4800,
        salaryMax: 6200,
        salaryRange: '4800-6200元/月',
        tags: ['管理岗位', '包住', '交通便利'],
        type: '仓管员',
        distance: '4.5km',
        urgent: false,
        description: '仓库货物管理，需要责任心',
        requirements: ['有仓管经验', '会电脑操作', '责任心强'],
        welfare: ['包住', '五险', '交通补贴', '年终奖'],
        publishTime: '4小时前'
    },
    {
        id: 'job006',
        title: '搬运工',
        company: '顺达物流公司',
        location: '晋江',
        salaryMin: 4200,
        salaryMax: 5800,
        salaryRange: '4200-5800元/月',
        tags: ['体力活', '按天结算', '包吃'],
        type: '搬运工',
        distance: '6.8km',
        urgent: true,
        description: '货物搬运装卸，按天结算工资',
        requirements: ['身体健康', '能吃苦耐劳', '18-50岁'],
        welfare: ['包吃', '按天结算', '加班费', '意外保险'],
        publishTime: '30分钟前'
    },
    {
        id: 'job007',
        title: '机械操作工',
        company: '南安机械制造厂',
        location: '南安',
        salaryMin: 6000,
        salaryMax: 9000,
        salaryRange: '6000-9000元/月',
        tags: ['技术岗位', '高薪', '包吃住'],
        type: '操作工',
        distance: '8.2km',
        urgent: false,
        description: '机械设备操作，有技术含量',
        requirements: ['有机械操作经验', '能适应倒班', '责任心强'],
        welfare: ['包吃住', '五险', '技术补贴', '带薪年假'],
        publishTime: '5小时前'
    },
    {
        id: 'job008',
        title: '清洁工',
        company: '石狮保洁服务公司',
        location: '石狮',
        salaryMin: 3200,
        salaryMax: 4200,
        salaryRange: '3200-4200元/月',
        tags: ['轻松工作', '时间自由', '就近安排'],
        type: '普工',
        distance: '1.2km',
        urgent: false,
        description: '清洁卫生工作，时间相对自由',
        requirements: ['身体健康', '勤快负责', '45岁以下'],
        welfare: ['灵活时间', '就近安排', '月休4天', '节日费'],
        publishTime: '8小时前'
    },
    {
        id: 'job009',
        title: '电工',
        company: '惠安建筑工程公司',
        location: '惠安',
        salaryMin: 7000,
        salaryMax: 10000,
        salaryRange: '7000-10000元/月',
        tags: ['技术工种', '高薪', '证书优先'],
        type: '技术工',
        distance: '12.5km',
        urgent: true,
        description: '电气安装维修，需要电工证',
        requirements: ['有电工证', '3年以上经验', '能出差'],
        welfare: ['高薪', '五险一金', '技术津贴', '项目奖金'],
        publishTime: '1小时前'
    },
    {
        id: 'job010',
        title: '厨房帮工',
        company: '安溪餐饮连锁',
        location: '安溪',
        salaryMin: 3800,
        salaryMax: 4800,
        salaryRange: '3800-4800元/月',
        tags: ['包吃住', '学技术', '环境好'],
        type: '普工',
        distance: '15.3km',
        urgent: false,
        description: '厨房辅助工作，可以学习厨艺',
        requirements: ['身体健康', '勤快好学', '无不良嗜好'],
        welfare: ['包吃住', '学技术', '师傅带教', '晋升机会'],
        publishTime: '7小时前'
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initSearchPage();
});

// 初始化搜索页面
function initSearchPage() {
    // 获取URL参数
    parseUrlParams();
    
    // 执行初始搜索
    executeSearch();
    
    // 初始化交互
    initInteractions();
    
    console.log('搜索结果页面初始化完成');
}

// 解析URL参数
function parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get('q') || urlParams.get('keyword');
    const location = urlParams.get('location');
    
    if (keyword) {
        SEARCH_STATE.keyword = keyword;
        document.getElementById('searchInput').value = keyword;
    }
    
    if (location) {
        SEARCH_STATE.filters.location = [location];
        // 激活对应的筛选按钮
        const locationChips = document.querySelectorAll('.filter-chip');
        locationChips.forEach(chip => {
            if (chip.textContent.trim() === location) {
                chip.classList.add('active');
            }
        });
    }
}

// 执行搜索
function executeSearch() {
    const keyword = document.getElementById('searchInput').value.trim();
    SEARCH_STATE.keyword = keyword;
    SEARCH_STATE.currentPage = 1;
    
    showLoading();
    
    // 模拟搜索延迟
    setTimeout(() => {
        performSearch();
        hideLoading();
    }, 800);
}

// 执行实际搜索逻辑
function performSearch() {
    let results = [...JOB_DATABASE];
    
    // 关键词搜索
    if (SEARCH_STATE.keyword) {
        results = results.filter(job => 
            job.title.toLowerCase().includes(SEARCH_STATE.keyword.toLowerCase()) ||
            job.company.toLowerCase().includes(SEARCH_STATE.keyword.toLowerCase()) ||
            job.type.toLowerCase().includes(SEARCH_STATE.keyword.toLowerCase())
        );
    }
    
    // 地区筛选
    if (SEARCH_STATE.filters.location.length > 0) {
        results = results.filter(job => 
            SEARCH_STATE.filters.location.includes(job.location)
        );
    }
    
    // 薪资范围筛选
    if (SEARCH_STATE.filters.salaryRange) {
        results = filterBySalaryRange(results, SEARCH_STATE.filters.salaryRange);
    }
    
    // 工作类型筛选
    if (SEARCH_STATE.filters.jobType) {
        results = results.filter(job => job.type === SEARCH_STATE.filters.jobType);
    }
    
    // 排序
    results = sortResults(results, SEARCH_STATE.sort);
    
    SEARCH_STATE.results = results;
    SEARCH_STATE.totalResults = results.length;
    
    updateResultsDisplay();
}

// 按薪资范围筛选
function filterBySalaryRange(results, range) {
    switch (range) {
        case '3000-5000':
            return results.filter(job => job.salaryMax <= 5000);
        case '5000-8000':
            return results.filter(job => job.salaryMin >= 5000 && job.salaryMax <= 8000);
        case '8000-12000':
            return results.filter(job => job.salaryMin >= 8000 && job.salaryMax <= 12000);
        case '12000+':
            return results.filter(job => job.salaryMin >= 12000);
        default:
            return results;
    }
}

// 结果排序
function sortResults(results, sortType) {
    switch (sortType) {
        case 'salary':
            return results.sort((a, b) => b.salaryMax - a.salaryMax);
        case 'distance':
            return results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        case 'default':
        default:
            // 默认排序：紧急招聘优先，然后按发布时间
            return results.sort((a, b) => {
                if (a.urgent && !b.urgent) return -1;
                if (!a.urgent && b.urgent) return 1;
                return 0; // 保持原有顺序
            });
    }
}

// 更新结果显示
function updateResultsDisplay() {
    const container = document.getElementById('searchResults');
    const totalElement = document.getElementById('totalResults');
    const emptyContainer = document.getElementById('emptyContainer');
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    
    totalElement.textContent = SEARCH_STATE.totalResults;
    
    if (SEARCH_STATE.totalResults === 0) {
        container.innerHTML = '';
        emptyContainer.style.display = 'block';
        loadMoreContainer.style.display = 'none';
        return;
    }
    
    emptyContainer.style.display = 'none';
    
    // 计算当前页要显示的结果
    const startIndex = (SEARCH_STATE.currentPage - 1) * SEARCH_STATE.pageSize;
    const endIndex = Math.min(startIndex + SEARCH_STATE.pageSize, SEARCH_STATE.totalResults);
    const currentPageResults = SEARCH_STATE.results.slice(0, endIndex);
    
    // 渲染结果
    container.innerHTML = '';
    currentPageResults.forEach((job, index) => {
        const jobCard = createJobCard(job);
        jobCard.style.animationDelay = `${index * 0.1}s`;
        jobCard.classList.add('fade-in');
        container.appendChild(jobCard);
    });
    
    // 显示或隐藏加载更多按钮
    if (endIndex < SEARCH_STATE.totalResults) {
        loadMoreContainer.style.display = 'block';
    } else {
        loadMoreContainer.style.display = 'none';
    }
}

// 创建工作卡片
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card mx-4 my-3 bg-white rounded-lg p-3 card-hover fade-in';
    card.onclick = () => goToJobDetail(job.id);
    
    // 生成随机报名人数
    const applicantCount = Math.floor(Math.random() * 20) + 5;
    
    // 生成发布日期（基于publishTime转换为日期格式）
    const publishDate = getDateFromPublishTime(job.publishTime);
    
    // 急招标签
    const urgentTag = job.urgent ? '<span class="bg-red-500 text-white text-xs px-1 py-0.5 rounded mr-1">急招</span>' : '';
    
    // 标签HTML
    const tagsHtml = job.tags.map(tag => 
        `<span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">${tag}</span>`
    ).join(' ');
    
    card.innerHTML = `
        <div class="block">
            <div class="flex items-start">
                <div class="mr-2 bg-purple-100 rounded-full p-1 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div class="flex-1">
                    <div class="flex items-center">
                        <span class="text-amber-500 text-sm">${publishDate}</span>
                        ${urgentTag}
                        <span class="ml-2 font-medium">${job.title}</span>
                        <span class="ml-auto text-purple-700 font-medium">${job.salaryRange}</span>
                    </div>
                    <div class="text-sm text-gray-500 mt-1.5">${job.company} 福建省·${job.location}</div>
                    <div class="flex flex-wrap mt-1.5 gap-1">
                        ${tagsHtml}
                    </div>
                </div>
            </div>
            <div class="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                <div class="text-sm text-gray-500">已报名: <span class="text-primary">${applicantCount}${applicantCount > 15 ? '+' : ''}</span></div>
                <button class="primary-gradient text-white px-5 py-1 rounded-full text-sm wx-button-hover" onclick="event.stopPropagation(); applyJob('${job.id}')">
                    报名
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// 根据发布时间生成日期
function getDateFromPublishTime(publishTime) {
    const now = new Date();
    let targetDate = new Date(now);
    
    if (publishTime.includes('小时前')) {
        const hours = parseInt(publishTime);
        targetDate.setHours(now.getHours() - hours);
    } else if (publishTime.includes('分钟前')) {
        const minutes = parseInt(publishTime);
        targetDate.setMinutes(now.getMinutes() - minutes);
    } else {
        // 默认为今天
        targetDate = now;
    }
    
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    
    return `${month}月${day}日`;
}

// 搜索关键词处理
function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        executeSearch();
    }
}

// 切换筛选
function toggleFilter(type, value) {
    if (type === 'location') {
        const index = SEARCH_STATE.filters.location.indexOf(value);
        if (index > -1) {
            SEARCH_STATE.filters.location.splice(index, 1);
        } else {
            SEARCH_STATE.filters.location.push(value);
        }
        
        // 更新按钮状态
        const buttons = document.querySelectorAll('.filter-chip');
        buttons.forEach(btn => {
            if (btn.textContent.trim() === value) {
                btn.classList.toggle('active');
            }
        });
        
        performSearch();
    }
}

// 改变排序
function changeSort(sortType) {
    SEARCH_STATE.sort = sortType;
    
    // 更新排序按钮状态
    document.querySelectorAll('.sort-option').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    performSearch();
}

// 显示筛选模态框
function showFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.classList.remove('hidden');
    
    // 设置当前选中状态
    updateFilterModalState();
    
    // 添加显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 隐藏筛选模态框
function hideFilterModal() {
    const modal = document.getElementById('filterModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 更新筛选模态框状态
function updateFilterModalState() {
    // 薪资范围
    document.querySelectorAll('.salary-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick.toString().includes(SEARCH_STATE.filters.salaryRange)) {
            btn.classList.add('active');
        }
    });
    
    // 工作类型
    document.querySelectorAll('.job-type-filter').forEach(btn => {
        btn.classList.remove('active');
        if (btn.onclick.toString().includes(SEARCH_STATE.filters.jobType)) {
            btn.classList.add('active');
        }
    });
    
    // 地区
    document.querySelectorAll('.location-filter').forEach(btn => {
        btn.classList.remove('active');
        const location = btn.textContent.trim();
        if (SEARCH_STATE.filters.location.includes(location)) {
            btn.classList.add('active');
        }
    });
}

// 选择薪资范围
function selectSalaryRange(range) {
    SEARCH_STATE.filters.salaryRange = SEARCH_STATE.filters.salaryRange === range ? '' : range;
    
    document.querySelectorAll('.salary-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (SEARCH_STATE.filters.salaryRange) {
        event.target.classList.add('active');
    }
}

// 选择工作类型
function selectJobType(type) {
    SEARCH_STATE.filters.jobType = SEARCH_STATE.filters.jobType === type ? '' : type;
    
    document.querySelectorAll('.job-type-filter').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (SEARCH_STATE.filters.jobType) {
        event.target.classList.add('active');
    }
}

// 选择地区
function selectLocation(location) {
    const index = SEARCH_STATE.filters.location.indexOf(location);
    if (index > -1) {
        SEARCH_STATE.filters.location.splice(index, 1);
        event.target.classList.remove('active');
    } else {
        SEARCH_STATE.filters.location.push(location);
        event.target.classList.add('active');
    }
}

// 重置筛选
function resetFilters() {
    SEARCH_STATE.filters = {
        location: [],
        salaryRange: '',
        jobType: ''
    };
    
    updateFilterModalState();
}

// 应用筛选
function applyFilters() {
    hideFilterModal();
    performSearch();
    
    // 更新主页面的筛选按钮状态
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.remove('active');
        const location = btn.textContent.trim();
        if (SEARCH_STATE.filters.location.includes(location)) {
            btn.classList.add('active');
        }
    });
}

// 清除筛选条件
function clearFilters() {
    SEARCH_STATE.filters = {
        location: [],
        salaryRange: '',
        jobType: ''
    };
    SEARCH_STATE.keyword = '';
    document.getElementById('searchInput').value = '';
    
    // 重置所有按钮状态
    document.querySelectorAll('.filter-chip').forEach(btn => {
        btn.classList.remove('active');
    });
    
    performSearch();
}

// 加载更多结果
function loadMoreResults() {
    SEARCH_STATE.currentPage++;
    updateResultsDisplay();
}

// 跳转到工作详情
function goToJobDetail(jobId) {
    window.location.href = `job-detail.html?id=${jobId}`;
}

// 申请工作
function applyJob(jobId) {
    showToast('报名成功，请留意消息通知');
    
    // 可以在这里添加申请逻辑
    console.log(`报名工作: ${jobId}`);
}

// 显示/隐藏加载状态
function showLoading() {
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('emptyContainer').style.display = 'none';
    SEARCH_STATE.loading = true;
}

function hideLoading() {
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('searchResults').style.display = 'block';
    SEARCH_STATE.loading = false;
}

// 初始化交互
function initInteractions() {
    // 点击模态框背景关闭
    const modal = document.getElementById('filterModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideFilterModal();
        }
    });
    
    // 搜索框自动完成（可选功能）
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        // 可以在这里添加搜索建议功能
    });
}

// 工具函数

// 显示提示消息
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 10);
    
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

// 保存搜索历史
function saveSearchHistory(keyword) {
    if (!keyword.trim()) return;
    
    try {
        let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
        
        // 移除重复项
        history = history.filter(item => item !== keyword);
        
        // 添加到开头
        history.unshift(keyword);
        
        // 只保留最近10条
        history = history.slice(0, 10);
        
        localStorage.setItem('searchHistory', JSON.stringify(history));
    } catch (e) {
        console.error('保存搜索历史失败:', e);
    }
}

// 获取搜索历史
function getSearchHistory() {
    try {
        return JSON.parse(localStorage.getItem('searchHistory') || '[]');
    } catch (e) {
        console.error('获取搜索历史失败:', e);
        return [];
    }
}

console.log('搜索结果页面脚本加载完成'); 