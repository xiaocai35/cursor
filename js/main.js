// 蓝诚人力微信小程序交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化UI交互效果
    initUIInteractions();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化筛选功能
    initFilter();
});

// 初始化UI交互效果
function initUIInteractions() {
    // 获取所有按钮元素
    const buttons = document.querySelectorAll('button');
    
    // 为每个按钮添加点击效果
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('opacity-70');
            setTimeout(() => {
                this.classList.remove('opacity-70');
            }, 150);
            
            // 如果是报名按钮，则触发报名流程
            if (this.textContent.trim() === '报名') {
                handleJobApplication(this);
            }
        });
    });

    // 获取所有职位卡片元素
    const jobCards = document.querySelectorAll('.card-hover');
    
    // 为每个职位卡片添加点击效果
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取职位信息
            const jobTitle = this.querySelector('.font-medium').textContent;
            const company = this.querySelector('.text-gray-500').textContent;
            
            // 这里可以跳转到职位详情页
            console.log(`查看职位: ${jobTitle} - ${company}`);
            // window.location.href = `job-detail.html?job=${encodeURIComponent(jobTitle)}`;
        });
    });
    
    // 为底部导航添加点击效果
    const navItems = document.querySelectorAll('.flex.flex-col.items-center');
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 根据索引跳转到不同页面
            const pages = ['index.html', 'messages.html', 'account.html'];
            if (window.location.pathname.includes(pages[index])) return;
            // window.location.href = pages[index];
            console.log(`导航到: ${pages[index]}`);
        });
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('input[placeholder="搜索职位名称、公司"]');
    
    searchInput.addEventListener('focus', function() {
        // 添加搜索框获得焦点效果
        this.parentElement.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    
    searchInput.addEventListener('blur', function() {
        // 移除搜索框失去焦点效果
        this.parentElement.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    
    searchInput.addEventListener('input', function() {
        // 可以在这里实现实时搜索功能
        console.log(`搜索: ${this.value}`);
    });
}

// 初始化筛选功能
function initFilter() {
    const filterButton = document.querySelector('span:contains("筛选")');
    const locationTags = document.querySelectorAll('.text-gray-700.px-2.py-1.bg-gray-100.rounded-full');
    
    // 为筛选按钮添加点击事件
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            console.log('打开筛选选项');
            // 这里可以弹出筛选弹窗
        });
    }
    
    // 为地区标签添加点击事件
    locationTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 选中当前标签，取消其他标签
            locationTags.forEach(t => t.classList.remove('bg-primary', 'text-white'));
            this.classList.add('bg-primary', 'text-white');
            
            // 根据地区筛选职位
            const location = this.textContent.trim();
            console.log(`按地区筛选: ${location}`);
        });
    });
}

// 处理工作报名流程
function handleJobApplication(button) {
    const jobCard = button.closest('.card-hover');
    const jobTitle = jobCard.querySelector('.font-medium').textContent;
    const company = jobCard.querySelector('.text-gray-500').textContent;
    
    console.log(`申请职位: ${jobTitle} - ${company}`);
    
    // 显示报名成功提示
    showToast('报名成功，请留意消息通知');
}

// 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 fade-in';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 2秒后自动移除
    setTimeout(() => {
        toast.classList.add('opacity-0');
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 2000);
}

// 跳转到登录页面
function goToLogin() {
    window.location.href = 'login.html';
}