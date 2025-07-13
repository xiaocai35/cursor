// 蓝诚人力微信小程序 - 个人中心交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化UI交互效果
    initUIInteractions();
    
    // 初始化服务项目点击
    initServiceItems();
    
    // 初始化底部导航
    initBottomNavigation();
});

// 初始化UI交互效果
function initUIInteractions() {
    // 添加点击反馈效果
    const clickableElements = document.querySelectorAll('.service-grid > div, .bottom-nav-item');
    
    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
    
    // 初始化头像上传功能
    const avatarContainer = document.querySelector('.relative img.rounded-full').parentElement;
    if (avatarContainer) {
        avatarContainer.addEventListener('click', function() {
            // 这里可以添加上传头像的逻辑
            showToast('头像上传功能即将开放');
        });
    }
}

// 初始化服务项目点击
function initServiceItems() {
    const serviceItems = document.querySelectorAll('.service-grid > div');
    
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const serviceName = this.querySelector('.text-xs').textContent;
            
            // 根据不同的服务名执行不同的操作
            switch(serviceName) {
                case '我的求职':
                    navigateTo('job-applications.html');
                    break;
                case '在职证明':
                    navigateTo('employment-certificate.html');
                    break;
                case '入职资料':
                    navigateTo('onboarding-docs.html');
                    break;
                case '我的薪资':
                    navigateTo('salary.html');
                    break;
                case '推荐奖励':
                    navigateTo('referral-reward.html');
                    break;
                case '我的预支':
                    navigateTo('advance-salary.html');
                    break;
                case '我的钱包':
                    navigateTo('wallet.html');
                    break;
                case '投诉建议':
                    navigateTo('feedback.html');
                    break;
                case '行为检举':
                    navigateTo('report.html');
                    break;
                case '帮助中心':
                    navigateTo('help-center.html');
                    break;
                case '关于我们':
                    navigateTo('about.html');
                    break;
                case '更多':
                    showToast('更多服务即将上线');
                    break;
                default:
                    showToast('该功能正在开发中');
            }
        });
    });
}

// 初始化底部导航
function initBottomNavigation() {
    const navItems = document.querySelectorAll('.flex.justify-around.items-center > a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 不阻止首页链接的默认行为
            if (!this.getAttribute('href').includes('index.html')) {
                e.preventDefault();
                const pageName = this.querySelector('.text-xs').textContent;
                
                if (pageName === '消息') {
                    navigateTo('messages.html');
                }
            }
        });
    });
}

// 导航到指定页面
function navigateTo(url) {
    // 如果页面已存在，则直接跳转
    // 否则显示开发中提示
    const existingPages = ['index.html', 'job-detail.html', 'profile.html', 'referral-reward.html', 'advance-salary.html'];
    
    if (existingPages.includes(url)) {
        window.location.href = url;
    } else {
        showToast('该页面正在开发中');
    }
}

// 跳转到推荐奖励页面
function goToReferralReward() {
    window.location.href = 'referral-reward.html';
}

// 跳转到收益详情页面
function goToEarningsDetail() {
    window.location.href = 'withdraw-records.html';
}

// 跳转到提现页面
function goToWithdraw() {
    // 跳转到提现流程页面
    window.location.href = 'withdraw-amount.html?amount=1286.50';
}

// 跳转到我的预支页面
function goToAdvanceSalary() {
    window.location.href = 'advance-salary.html';
}

// 显示提示消息
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg z-50';
    toast.innerText = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 设置定时器，2秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        
        // 完全移除元素
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 2000);
} 