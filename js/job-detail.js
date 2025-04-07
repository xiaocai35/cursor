// 蓝诚人力 - 职位详情页交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化返回按钮
    initBackButton();
    
    // 初始化收藏功能
    initFavoriteButton();
    
    // 初始化报名按钮
    initApplyButton();
    
    // 初始化在线沟通
    initChatButton();
});

// 初始化返回按钮
function initBackButton() {
    const backButton = document.querySelector('.flex.items-center svg[stroke-width="2"][d*="M15 19l-7-7"]').parentElement;
    
    backButton.addEventListener('click', function() {
        // 返回上一页
        window.history.back();
    });
}

// 初始化收藏功能
function initFavoriteButton() {
    const favoriteButton = document.querySelector('svg[d*="M11.049 2.927"]').parentElement;
    let isFavorite = false;
    
    favoriteButton.addEventListener('click', function() {
        isFavorite = !isFavorite;
        if (isFavorite) {
            // 收藏状态
            this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>`;
            showToast('已收藏');
        } else {
            // 未收藏状态
            this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>`;
            showToast('已取消收藏');
        }
    });
}

// 初始化报名按钮
function initApplyButton() {
    const applyButton = document.querySelector('button.flex-1');
    
    applyButton.addEventListener('click', function() {
        // 这里可以添加报名逻辑或跳转到报名页面
        showToast('正在提交报名申请...');
        
        // 模拟报名成功
        setTimeout(() => {
            showToast('报名成功，请留意消息通知');
        }, 1500);
    });
}

// 初始化在线沟通
function initChatButton() {
    const chatButton = document.querySelector('.w-10.h-10.rounded-full');
    
    chatButton.addEventListener('click', function() {
        // 这里可以添加在线沟通逻辑或跳转到聊天页面
        showToast('正在连接客服...');
    });
}

// 显示提示消息
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

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

// 处理工资计算
function calculateSalary(hourlyRate, hours) {
    return (hourlyRate * hours).toFixed(2);
} 