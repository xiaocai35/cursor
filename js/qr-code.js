// 推广二维码页面 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initTime();
    generateQRCode();
    loadRecentRecords();
    loadStatistics();
});

// 模拟推荐记录数据
const MOCK_RECORDS = [
    {
        id: 1,
        name: '张**',
        phone: '138****5678',
        status: 'success',
        position: '生产线操作工',
        company: '福建华威塑料工业有限公司',
        registerTime: '2024-01-15',
        reward: 200
    },
    {
        id: 2,
        name: '李**',
        phone: '139****9876',
        status: 'pending',
        position: '包装工',
        company: '泉州市金威包装材料有限公司',
        registerTime: '2024-01-18',
        reward: 0
    },
    {
        id: 3,
        name: '王**',
        phone: '137****1234',
        status: 'success',
        position: '质检员',
        company: '福建恒安集团有限公司',
        registerTime: '2024-01-10',
        reward: 300
    }
];

// 初始化时间显示
function initTime() {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                   now.getMinutes().toString().padStart(2, '0');
    document.getElementById('currentTime').textContent = timeStr;
}

// 生成二维码
function generateQRCode() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // 生成用户ID或使用现有ID
    let userId = userInfo.userId;
    if (!userId) {
        userId = generateUserId();
        userInfo.userId = userId;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
    
    const qrData = `https://m.juxianhr.com/register?ref=${userId}`;
    
    // 创建简单的二维码模拟图
    const qrContainer = document.getElementById('qrCodeContainer');
    qrContainer.innerHTML = createMockQRCode();
    
    // 保存二维码数据
    userInfo.qrCodeData = qrData;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

// 生成用户ID
function generateUserId() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return timestamp + randomStr;
}

// 创建模拟二维码
function createMockQRCode() {
    return `
        <div class="w-full h-full grid grid-cols-8 gap-1 p-2">
            ${Array.from({length: 64}, () => 
                Math.random() > 0.5 ? 
                '<div class="w-full h-full bg-black rounded-sm"></div>' : 
                '<div class="w-full h-full bg-white"></div>'
            ).join('')}
        </div>
    `;
}

// 加载推广统计
function loadStatistics() {
    // 模拟统计数据
    const stats = {
        totalInvites: 12,
        successfulInvites: 8,
        totalEarnings: 1200,
        monthlyInvites: 3
    };
    
    // 从本地存储获取或使用模拟数据
    const savedStats = JSON.parse(localStorage.getItem('inviteStats') || JSON.stringify(stats));
    
    // 更新页面显示
    document.getElementById('totalInvites').textContent = savedStats.totalInvites;
    document.getElementById('successfulInvites').textContent = savedStats.successfulInvites;
    document.getElementById('totalEarnings').textContent = `¥${savedStats.totalEarnings.toLocaleString()}`;
    document.getElementById('monthlyInvites').textContent = savedStats.monthlyInvites;
}

// 加载最近推荐记录
function loadRecentRecords() {
    const recordsContainer = document.getElementById('recentRecords');
    const recentRecords = MOCK_RECORDS.slice(0, 3); // 只显示最近3条
    
    if (recentRecords.length === 0) {
        recordsContainer.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <p class="text-sm">暂无推荐记录</p>
                <p class="text-xs text-gray-400 mt-1">快去分享给好友吧！</p>
            </div>
        `;
        return;
    }
    
    recordsContainer.innerHTML = recentRecords.map(record => createRecordCard(record)).join('');
}

// 创建推荐记录卡片
function createRecordCard(record) {
    const statusConfig = {
        'success': { text: '已入职', color: 'text-green-600', bg: 'bg-green-100' },
        'pending': { text: '待入职', color: 'text-orange-600', bg: 'bg-orange-100' },
        'failed': { text: '未通过', color: 'text-red-600', bg: 'bg-red-100' }
    };
    
    const status = statusConfig[record.status];
    
    return `
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex-1">
                <div class="flex items-center mb-1">
                    <span class="font-medium text-gray-900">${record.name}</span>
                    <span class="ml-2 text-xs text-gray-500">${record.phone}</span>
                </div>
                <div class="text-sm text-gray-600">${record.position} · ${record.company.length > 15 ? record.company.substring(0, 15) + '...' : record.company}</div>
                <div class="text-xs text-gray-400 mt-1">${formatDate(record.registerTime)}</div>
            </div>
            <div class="text-right">
                <div class="inline-flex items-center px-2 py-1 rounded-full text-xs ${status.bg} ${status.color} mb-1">
                    ${status.text}
                </div>
                ${record.reward > 0 ? `<div class="text-sm font-medium text-green-600">+¥${record.reward}</div>` : ''}
            </div>
        </div>
    `;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '昨天';
    if (diffDays <= 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
}

// 分享二维码
function shareQrCode() {
    showShareModal();
}

// 显示分享模态框
function showShareModal() {
    document.getElementById('shareModal').style.display = 'flex';
}

// 关闭分享模态框
function closeShareModal() {
    document.getElementById('shareModal').style.display = 'none';
}

// 分享到微信
function shareToWechat() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const shareLink = userInfo.qrCodeData || 'https://m.juxianhr.com/register';
    const shareText = `聚贤人力平台邀请您加入！\n扫码注册有惊喜：${shareLink}`;
    
    if (navigator.share) {
        navigator.share({
            title: '聚贤人力推广',
            text: shareText,
            url: shareLink
        }).then(() => {
            showToast('分享成功', 'success');
            closeShareModal();
        }).catch(() => {
            copyShareText(shareText);
        });
    } else {
        copyShareText(shareText);
    }
}

// 分享到朋友圈
function shareToMoments() {
    const shareText = `发现一个不错的求职平台 - 聚贤人力！\n扫码注册有惊喜 🎉`;
    copyShareText(shareText);
}

// 复制分享链接
function copyShareLink() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const shareLink = userInfo.qrCodeData || 'https://m.juxianhr.com/register';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareLink).then(() => {
            showToast('分享链接已复制', 'success');
            closeShareModal();
        }).catch(() => {
            fallbackCopyText(shareLink);
        });
    } else {
        fallbackCopyText(shareLink);
    }
}

// 复制分享文本
function copyShareText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('分享内容已复制', 'success');
            closeShareModal();
        }).catch(() => {
            fallbackCopyText(text);
        });
    } else {
        fallbackCopyText(text);
    }
}

// 备用复制方法
function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast('内容已复制', 'success');
        closeShareModal();
    } catch (err) {
        showToast('复制失败，请手动复制', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 查看全部记录
function viewAllRecords() {
    showToast('跳转到推荐记录页面', 'info');
    // 这里可以跳转到详细的推荐记录页面
}

// 显示提示信息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 transition-opacity duration-300`;
    
    if (type === 'error') {
        toast.className += ' bg-red-500';
    } else if (type === 'success') {
        toast.className += ' bg-green-500';
    } else {
        toast.className += ' bg-blue-500';
    }
    
    toast.textContent = message;
    toast.style.opacity = '0';
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 页面导航函数
function goBack() {
    window.history.back();
}

// 模拟数据更新（用于测试）
function updateStatistics(newStats) {
    localStorage.setItem('inviteStats', JSON.stringify(newStats));
    loadStatistics();
}

// 添加新的推荐记录（用于测试）
function addNewRecord(record) {
    MOCK_RECORDS.unshift(record);
    loadRecentRecords();
    
    // 更新统计数据
    const stats = JSON.parse(localStorage.getItem('inviteStats') || '{}');
    stats.totalInvites = (stats.totalInvites || 0) + 1;
    stats.monthlyInvites = (stats.monthlyInvites || 0) + 1;
    
    if (record.status === 'success') {
        stats.successfulInvites = (stats.successfulInvites || 0) + 1;
        stats.totalEarnings = (stats.totalEarnings || 0) + record.reward;
    }
    
    updateStatistics(stats);
} 