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

// ==================== 分享功能 ====================

// 显示分享弹窗
function showShareModal() {
    const modal = document.getElementById('shareModal');
    modal.classList.remove('hidden');
    // 添加显示动画
    setTimeout(() => {
        modal.querySelector('.absolute').style.transform = 'translateY(0)';
    }, 10);
}

// 隐藏分享弹窗
function hideShareModal() {
    const modal = document.getElementById('shareModal');
    const content = modal.querySelector('.absolute');
    content.style.transform = 'translateY(100%)';
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 分享到微信朋友圈
function shareToWechatMoments() {
    hideShareModal();
    showToast('正在跳转到朋友圈分享页面...');
    setTimeout(() => {
        window.location.href = 'share-wechat-moments.html';
    }, 1000);
}

// 分享给微信好友
function shareToWechatFriend() {
    hideShareModal();
    showToast('正在生成分享链接...');
    // 模拟分享给好友的逻辑
    setTimeout(() => {
        // 这里可以实现微信API分享或生成分享链接
        showToast('请复制链接发送给好友');
    }, 1500);
}

// 分享到小红书
function shareToXiaohongshu() {
    hideShareModal();
    showToast('正在跳转到小红书分享页面...');
    setTimeout(() => {
        window.location.href = 'share-xiaohongshu.html';
    }, 1000);
}

// 分享到抖音
function shareToDouyin() {
    hideShareModal();
    showToast('正在跳转到抖音分享页面...');
    setTimeout(() => {
        window.location.href = 'share-douyin.html';
    }, 1000);
}

// 分享到微信视频号
function shareToWechatVideo() {
    hideShareModal();
    showToast('正在跳转到视频号分享页面...');
    setTimeout(() => {
        window.location.href = 'share-wechat-video.html';
    }, 1000);
}

// ==================== 操作按钮功能 ====================

// 开始聊天
function startChat() {
    showToast('正在连接客服...');
    // 模拟连接客服的逻辑
    setTimeout(() => {
        showToast('客服暂时忙线，请稍后再试');
    }, 1500);
}

// 切换收藏状态
function toggleFavorite() {
    // 获取当前收藏状态
    const favoriteButton = event.currentTarget;
    const heartIcon = favoriteButton.querySelector('svg');
    
    // 检查当前是否已收藏
    const isCurrentlyFavorited = heartIcon.classList.contains('text-red-500');
    
    if (isCurrentlyFavorited) {
        // 取消收藏
        heartIcon.classList.remove('text-red-500');
        heartIcon.classList.add('text-gray-600');
        heartIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`;
        favoriteButton.querySelector('span').textContent = '❤️ 收藏职位';
        showToast('已取消收藏');
    } else {
        // 添加收藏
        heartIcon.classList.remove('text-gray-600');
        heartIcon.classList.add('text-red-500');
        heartIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`;
        favoriteButton.querySelector('span').innerHTML = '💖 已收藏';
        showToast('已收藏职位');
    }
}

// ==================== 获取岗位信息 ====================

// 获取当前岗位信息（用于分享）
function getCurrentJobInfo() {
    return {
        title: '公寓宿舍 免费体检',
        company: '珠海伟创力',
        location: '广东省·珠海市',
        salary: '22元/时',
        tags: ['报销车票', '可借支', '包住', '免费体检', '空调宿舍'],
        benefits: [
            '发薪日期：华辉发薪日每月12号',
            '22元/小时=21+1元全勤奖金',
            '体检补贴：免费',
            '车票报销：200.00元'
        ],
        description: '招聘企业：两班倒、坐班、普通生产线(有空调)/无尘车间',
        workType: '普工、学徒、普通车间/无尘车间'
    };
}

// 在页面加载时保存岗位信息到sessionStorage，供分享页面使用
document.addEventListener('DOMContentLoaded', function() {
    const jobInfo = getCurrentJobInfo();
    sessionStorage.setItem('currentJobInfo', JSON.stringify(jobInfo));
    
    // 为分享弹窗添加显示动画样式
    const style = document.createElement('style');
    style.textContent = `
        #shareModal .absolute {
            transform: translateY(100%);
            transition: transform 0.3s ease-out;
        }
        
        .share-platform-hover:hover {
            transform: scale(1.05);
            transition: transform 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 为平台图标添加hover效果
    const platformButtons = document.querySelectorAll('#shareModal .cursor-pointer');
    platformButtons.forEach(button => {
        button.classList.add('share-platform-hover');
    });
});