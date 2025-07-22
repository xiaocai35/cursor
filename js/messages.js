// 聚贤人力 - 消息中心页面交互脚本

// 消息状态管理
const MESSAGE_STATE = {
    currentTab: 'all',
    currentPage: 1,
    pageSize: 10,
    loading: false,
    messages: [],
    unreadCount: {
        all: 5,
        system: 2,
        work: 3
    }
};

// 模拟消息数据
const MESSAGE_DATABASE = [
    {
        id: 'msg001',
        type: 'system',
        title: '系统维护通知',
        content: '系统将于今晚23:00-01:00进行维护升级，期间可能会影响部分功能的正常使用，请您提前做好准备。维护完成后，我们将为您提供更稳定、更快速的服务体验。',
        sender: '系统通知',
        avatar: 'system',
        time: '2024-12-25 14:30',
        isRead: false,
        urgent: true,
        category: '系统维护'
    },
    {
        id: 'msg002',
        type: 'work',
        title: '面试邀请 - 电子厂普工',
        content: '恭喜您！您申请的"电子厂普工"职位已通过初审，泉州顺丰电子有限公司诚邀您于明天上午10:00参加面试。面试地址：石狮市工业区顺丰电子厂办公楼二楼。请准时参加，如有疑问请联系HR：13800138000。',
        sender: '泉州顺丰电子',
        avatar: 'company',
        time: '2024-12-25 13:45',
        isRead: false,
        urgent: true,
        category: '面试通知',
        actionButton: {
            text: '确认参加',
            action: 'confirmInterview'
        }
    },
    {
        id: 'msg003',
        type: 'work',
        title: '工作录用通知',
        content: '恭喜您成功入职晋江华美服装有限公司！您的入职日期为2024年12月28日，请于当日上午8:30到公司人事部报到。请携带身份证、学历证明等相关材料。我们期待与您共同创造美好未来！',
        sender: '晋江华美服装',
        avatar: 'company',
        time: '2024-12-25 11:20',
        isRead: false,
        urgent: false,
        category: '录用通知',
        actionButton: {
            text: '查看详情',
            action: 'viewJobDetails'
        }
    },
    {
        id: 'msg004',
        type: 'system',
        title: '实名认证成功',
        content: '您的实名认证已审核通过！现在您可以享受更多求职服务，包括：优先推荐职位、快速投递简历、获得面试机会等。感谢您的配合，祝您求职顺利！',
        sender: '系统通知',
        avatar: 'system',
        time: '2024-12-25 09:15',
        isRead: true,
        urgent: false,
        category: '认证通知'
    },
    {
        id: 'msg005',
        type: 'work',
        title: '薪资发放通知',
        content: '您12月份的工资已发放到账，实发金额¥4,368元。包含基本工资、绩效奖金、各项津贴，扣除五险一金等费用。如有疑问请联系财务部门或查看详细工资条。',
        sender: '财务部门',
        avatar: 'service',
        time: '2024-12-24 17:30',
        isRead: true,
        urgent: false,
        category: '薪资通知',
        actionButton: {
            text: '查看工资条',
            action: 'viewPayslip'
        }
    },
    {
        id: 'msg006',
        type: 'system',
        title: '新功能上线提醒',
        content: '聚贤人力APP新增"在线客服"功能！现在您可以直接在APP内咨询求职相关问题，我们的专业客服团队会为您提供及时、贴心的服务。快去体验吧！',
        sender: '系统通知',
        avatar: 'system',
        time: '2024-12-24 14:20',
        isRead: true,
        urgent: false,
        category: '功能更新'
    },
    {
        id: 'msg007',
        type: 'work',
        title: '工作推荐 - 质检员',
        content: '根据您的求职意向，我们为您推荐一个质检员职位：石狮精密制造公司，薪资5500-7000元/月，五险一金，双休。该职位与您的技能匹配度很高，建议您尽快投递！',
        sender: '职位推荐',
        avatar: 'work',
        time: '2024-12-24 10:45',
        isRead: true,
        urgent: false,
        category: '职位推荐',
        actionButton: {
            text: '立即查看',
            action: 'viewJob'
        }
    },
    {
        id: 'msg008',
        type: 'system',
        title: '账户安全提醒',
        content: '您的账户在新设备上登录，登录时间：2024-12-23 20:15，登录地点：福建省泉州市。如非本人操作，请立即修改密码并联系客服。为保障账户安全，建议您定期更改密码。',
        sender: '安全中心',
        avatar: 'system',
        time: '2024-12-23 20:15',
        isRead: true,
        urgent: true,
        category: '安全提醒'
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initMessageCenter();
});

// 初始化消息中心
function initMessageCenter() {
    // 加载消息列表
    loadMessages();
    
    // 更新未读计数
    updateUnreadCounts();
    
    // 初始化交互
    initInteractions();
    
    console.log('消息中心页面初始化完成');
}

// 加载消息列表
function loadMessages() {
    showLoading();
    
    // 模拟加载延迟
    setTimeout(() => {
        MESSAGE_STATE.messages = filterMessagesByTab(MESSAGE_STATE.currentTab);
        renderMessages();
        hideLoading();
    }, 500);
}

// 按标签页筛选消息
function filterMessagesByTab(tab) {
    if (tab === 'all') {
        return MESSAGE_DATABASE;
    }
    return MESSAGE_DATABASE.filter(message => message.type === tab);
}

// 渲染消息列表
function renderMessages() {
    const container = document.getElementById('messageList');
    const messages = MESSAGE_STATE.messages;
    
    if (messages.length === 0) {
        container.innerHTML = '';
        document.getElementById('emptyContainer').style.display = 'block';
        return;
    }
    
    document.getElementById('emptyContainer').style.display = 'none';
    
    container.innerHTML = '';
    messages.forEach((message, index) => {
        const messageCard = createMessageCard(message);
        messageCard.style.animationDelay = `${index * 0.1}s`;
        container.appendChild(messageCard);
    });
}

// 创建消息卡片
function createMessageCard(message) {
    const card = document.createElement('div');
    const unreadClass = message.isRead ? '' : 'message-unread';
    const urgentTag = message.urgent ? '<span class="bg-red-500 text-white text-xs px-1 py-0.5 rounded ml-2">紧急</span>' : '';
    
    card.className = `message-card mx-4 my-2 bg-white rounded-lg p-4 ${unreadClass} fade-in`;
    card.onclick = () => showMessageDetail(message);
    
    const actionButton = message.actionButton ? 
        `<button class="text-primary text-sm font-medium" onclick="event.stopPropagation(); handleMessageAction('${message.actionButton.action}', '${message.id}')">${message.actionButton.text}</button>` : '';
    
    card.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="message-avatar ${message.avatar}-avatar">
                ${getAvatarIcon(message.avatar)}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center">
                        <h3 class="font-medium text-gray-900 text-sm">${message.sender}</h3>
                        ${urgentTag}
                    </div>
                    <span class="message-time">${formatTime(message.time)}</span>
                </div>
                <h4 class="font-medium text-gray-800 text-sm mb-1">${message.title}</h4>
                <p class="message-content text-sm text-gray-600">${message.content}</p>
                ${actionButton ? `<div class="mt-3 flex justify-end">${actionButton}</div>` : ''}
            </div>
            ${!message.isRead ? '<div class="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>' : ''}
        </div>
    `;
    
    return card;
}

// 获取头像图标
function getAvatarIcon(type) {
    const icons = {
        system: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
        work: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10a2 2 0 002 2h4a2 2 0 002-2V8M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>',
        company: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>',
        service: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>'
    };
    return icons[type] || icons.system;
}

// 格式化时间
function formatTime(timeString) {
    const now = new Date();
    const time = new Date(timeString);
    const diff = now - time;
    
    // 小于1分钟
    if (diff < 60000) {
        return '刚刚';
    }
    
    // 小于1小时
    if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟前`;
    }
    
    // 小于24小时
    if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时前`;
    }
    
    // 小于7天
    if (diff < 604800000) {
        return `${Math.floor(diff / 86400000)}天前`;
    }
    
    // 超过7天显示具体日期
    return time.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 标签页切换
function switchTab(tab) {
    MESSAGE_STATE.currentTab = tab;
    
    // 更新标签按钮状态
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('text-primary');
        btn.classList.add('text-gray-500');
    });
    
    const activeTab = document.querySelector(`[data-tab="${tab}"]`);
    activeTab.classList.remove('text-gray-500');
    activeTab.classList.add('text-primary');
    
    // 移动指示器
    const indicator = document.getElementById('tabIndicator');
    const tabIndex = ['all', 'system', 'work'].indexOf(tab);
    indicator.style.transform = `translateX(${tabIndex * 100}%)`;
    
    // 重新加载消息
    loadMessages();
}

// 显示消息详情
function showMessageDetail(message) {
    const modal = document.getElementById('messageModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.textContent = message.title;
    
    content.innerHTML = `
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                    <div class="message-avatar ${message.avatar}-avatar w-8 h-8">
                        ${getAvatarIcon(message.avatar)}
                    </div>
                    <div>
                        <div class="font-medium text-sm">${message.sender}</div>
                        <div class="text-xs text-gray-500">${message.category}</div>
                    </div>
                </div>
                <div class="text-sm text-gray-500">${formatTime(message.time)}</div>
            </div>
            
            <div class="border-t pt-4">
                <p class="text-gray-700 leading-relaxed">${message.content}</p>
            </div>
            
            ${message.actionButton ? `
                <div class="border-t pt-4">
                    <button onclick="handleMessageAction('${message.actionButton.action}', '${message.id}')" 
                            class="w-full bg-primary text-white py-2 rounded-lg">
                        ${message.actionButton.text}
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.remove('hidden');
    
    // 标记为已读
    if (!message.isRead) {
        markMessageAsRead(message.id);
    }
    
    // 显示动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 隐藏消息详情
function hideMessageModal() {
    const modal = document.getElementById('messageModal');
    modal.style.opacity = '0';
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 处理消息操作
function handleMessageAction(action, messageId) {
    switch (action) {
        case 'confirmInterview':
            showToast('面试确认成功，请准时参加');
            break;
        case 'viewJobDetails':
            window.location.href = 'job-detail.html';
            break;
        case 'viewPayslip':
            window.location.href = 'salary.html';
            break;
        case 'viewJob':
            window.location.href = 'search-results.html';
            break;
        default:
            showToast('操作完成');
    }
    
    hideMessageModal();
}

// 标记消息为已读
function markMessageAsRead(messageId) {
    const message = MESSAGE_DATABASE.find(msg => msg.id === messageId);
    if (message && !message.isRead) {
        message.isRead = true;
        
        // 更新未读计数
        MESSAGE_STATE.unreadCount.all--;
        MESSAGE_STATE.unreadCount[message.type]--;
        
        updateUnreadCounts();
        
        // 重新渲染当前消息（移除未读标记）
        setTimeout(() => {
            renderMessages();
        }, 100);
    }
}

// 全部标记为已读
function markAllAsRead() {
    const currentMessages = filterMessagesByTab(MESSAGE_STATE.currentTab);
    const unreadMessages = currentMessages.filter(msg => !msg.isRead);
    
    if (unreadMessages.length === 0) {
        showToast('没有未读消息');
        return;
    }
    
    unreadMessages.forEach(message => {
        message.isRead = true;
        MESSAGE_STATE.unreadCount[message.type]--;
        MESSAGE_STATE.unreadCount.all--;
    });
    
    updateUnreadCounts();
    renderMessages();
    showToast(`已标记${unreadMessages.length}条消息为已读`);
}

// 更新未读计数显示
function updateUnreadCounts() {
    const allBadge = document.getElementById('allBadge');
    const systemBadge = document.getElementById('systemBadge');
    const workBadge = document.getElementById('workBadge');
    const bottomBadge = document.getElementById('bottomBadge');
    
    // 更新标签页徽章
    updateBadge(allBadge, MESSAGE_STATE.unreadCount.all);
    updateBadge(systemBadge, MESSAGE_STATE.unreadCount.system);
    updateBadge(workBadge, MESSAGE_STATE.unreadCount.work);
    updateBadge(bottomBadge, MESSAGE_STATE.unreadCount.all);
}

// 更新单个徽章
function updateBadge(element, count) {
    if (count > 0) {
        element.textContent = count > 99 ? '99+' : count;
        element.style.display = 'inline-block';
    } else {
        element.style.display = 'none';
    }
}

// 加载更多消息
function loadMoreMessages() {
    MESSAGE_STATE.currentPage++;
    
    const btn = document.getElementById('loadMoreBtn');
    btn.textContent = '加载中...';
    btn.disabled = true;
    
    // 模拟加载
    setTimeout(() => {
        // 这里可以加载更多消息数据
        btn.textContent = '加载更多';
        btn.disabled = false;
        
        // 如果没有更多数据，隐藏按钮
        document.getElementById('loadMoreContainer').style.display = 'none';
    }, 1000);
}

// 显示/隐藏加载状态
function showLoading() {
    document.getElementById('loadingContainer').style.display = 'block';
    document.getElementById('messageList').style.opacity = '0.5';
    MESSAGE_STATE.loading = true;
}

function hideLoading() {
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('messageList').style.opacity = '1';
    MESSAGE_STATE.loading = false;
}

// 初始化交互
function initInteractions() {
    // 点击模态框背景关闭
    const modal = document.getElementById('messageModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideMessageModal();
        }
    });
    
    // 添加下拉刷新功能（可选）
    let startY = 0;
    let pullStart = false;
    
    const messageList = document.getElementById('messageList');
    
    messageList.addEventListener('touchstart', function(e) {
        if (messageList.scrollTop === 0) {
            startY = e.touches[0].pageY;
            pullStart = true;
        }
    });
    
    messageList.addEventListener('touchmove', function(e) {
        if (pullStart && e.touches[0].pageY > startY + 50) {
            // 可以在这里添加下拉刷新的视觉效果
        }
    });
    
    messageList.addEventListener('touchend', function(e) {
        if (pullStart && e.changedTouches[0].pageY > startY + 100) {
            // 触发刷新
            loadMessages();
        }
        pullStart = false;
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

// 保存消息状态到本地存储
function saveMessageState() {
    try {
        const state = {
            unreadCount: MESSAGE_STATE.unreadCount,
            lastVisit: new Date().toISOString()
        };
        localStorage.setItem('messageState', JSON.stringify(state));
    } catch (e) {
        console.error('保存消息状态失败:', e);
    }
}

// 从本地存储恢复消息状态
function loadMessageState() {
    try {
        const state = localStorage.getItem('messageState');
        if (state) {
            const parsed = JSON.parse(state);
            MESSAGE_STATE.unreadCount = { ...MESSAGE_STATE.unreadCount, ...parsed.unreadCount };
        }
    } catch (e) {
        console.error('加载消息状态失败:', e);
    }
}

// 页面卸载时保存状态
window.addEventListener('beforeunload', function() {
    saveMessageState();
});

console.log('消息中心页面脚本加载完成'); 