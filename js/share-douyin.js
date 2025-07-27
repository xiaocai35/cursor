// 聚贤人力 - 抖音分享页面交互脚本

// 全局变量
let currentJobInfo = null;
let isGenerating = false;
let isPlaying = false;
let isMuted = false;
let currentGenerationType = '';

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取岗位信息
    loadJobInfo();
    
    // 初始化页面内容
    initializePage();
    
    // 初始化视频播放器
    initializeVideoPlayer();
});

// ==================== 数据加载 ====================

// 加载岗位信息
function loadJobInfo() {
    try {
        const jobInfoStr = sessionStorage.getItem('currentJobInfo');
        if (jobInfoStr) {
            currentJobInfo = JSON.parse(jobInfoStr);
        } else {
            currentJobInfo = getDefaultJobInfo();
        }
    } catch (error) {
        console.error('加载岗位信息失败:', error);
        currentJobInfo = getDefaultJobInfo();
    }
}

// 获取默认岗位信息
function getDefaultJobInfo() {
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

// ==================== 页面初始化 ====================

// 初始化页面
function initializePage() {
    // 更新标题和内容显示
    updateTitleDisplay();
    updateContentDisplay();
    
    // 添加动画效果
    addAnimationEffects();
}

// 更新标题显示
function updateTitleDisplay() {
    const titleArea = document.getElementById('titleArea');
    if (currentJobInfo) {
        const title = generateDouyinTitle(currentJobInfo);
        titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${title}</div>`;
    }
}

// 更新内容显示
function updateContentDisplay() {
    const contentArea = document.getElementById('contentArea');
    if (currentJobInfo) {
        const content = generateDouyinContent(currentJobInfo);
        contentArea.innerHTML = `<div class="text-sm text-gray-700 leading-relaxed">${content}</div>`;
    }
}

// ==================== 内容生成 ====================

// 生成抖音标题
function generateDouyinTitle(jobInfo, style = 'trendy') {
    const templates = {
        trendy: generateTrendyTitle,
        humorous: generateHumorousTitle,
        urgent: generateUrgentTitle,
        inspiring: generateInspiringTitle
    };
    
    const generator = templates[style] || templates.trendy;
    return generator(jobInfo);
}

// 生成时尚潮流标题
function generateTrendyTitle(jobInfo) {
    const titles = [
        `💼 月薪过万的工作机会来啦！${jobInfo.location.replace('广东省·', '')}这个岗位让我心动了...✨`,
        `🔥 ${jobInfo.location.replace('广东省·', '')}高薪工作爆料！${jobInfo.salary}的神仙工作真的存在！`,
        `✨ 发现宝藏工作！${jobInfo.company}招聘，福利待遇让人羡慕到哭😭`,
        `🎯 ${jobInfo.location.replace('广东省·', '')}打工人必看！这个工作薪资${jobInfo.salary}还包住宿！`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成幽默风趣标题
function generateHumorousTitle(jobInfo) {
    const titles = [
        `😂 听说${jobInfo.location.replace('广东省·', '')}有个工作${jobInfo.salary}？我不信，直到我去了...`,
        `🤣 朋友们，我找到了传说中包住宿还给钱的工作！在${jobInfo.location.replace('广东省·', '')}！`,
        `😄 ${jobInfo.salary}的工作真的存在吗？我亲自去验证了一下...`,
        `🎪 ${jobInfo.location.replace('广东省·', '')}这个工作，让我从月光族变成了小富婆！`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成紧急招聘标题
function generateUrgentTitle(jobInfo) {
    const titles = [
        `⚡ 紧急！${jobInfo.location.replace('广东省·', '')}急招${jobInfo.title}，${jobInfo.salary}包住宿！`,
        `🚨 ${jobInfo.company}急招人！${jobInfo.salary}+五险一金+包住宿，名额有限！`,
        `⏰ 最后3天！${jobInfo.location.replace('广东省·', '')}这个${jobInfo.salary}的工作不要错过！`,
        `🔥 限时招聘！${jobInfo.title}岗位${jobInfo.salary}，福利超好！`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成励志标题
function generateInspiringTitle(jobInfo) {
    const titles = [
        `💪 相信自己！${jobInfo.location.replace('广东省·', '')}这个${jobInfo.salary}的工作等你来挑战！`,
        `🌟 梦想从这里开始！${jobInfo.company}给你展示才华的平台！`,
        `🎯 努力的人运气不会太差！${jobInfo.location.replace('广东省·', '')}好工作在等你！`,
        `✨ 每一份努力都值得被看见！${jobInfo.salary}+好福利，成就更好的自己！`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成抖音文案
function generateDouyinContent(jobInfo, style = 'trendy') {
    const templates = {
        trendy: generateTrendyContent,
        humorous: generateHumorousContent,
        detailed: generateDetailedContent,
        story: generateStoryContent
    };
    
    const generator = templates[style] || templates.trendy;
    return generator(jobInfo);
}

// 生成时尚潮流文案
function generateTrendyContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `🔥 ${location}高薪招聘来啦！<br><br>

📍 地点：${location}<br>
💰 薪资：${jobInfo.salary}<br>
🏭 岗位：${jobInfo.title}<br><br>

✨ 五险一金+包住宿<br>
✨ 免费体检+报销车票<br>
✨ 无经验可培训<br><br>

💬 评论区留言或私信详聊~<br>
🚀 好工作不等人，快来报名！<br><br>

#招聘 #高薪工作 #${location.replace('市', '')} #工厂招聘<br>
#包住宿 #五险一金 #无经验可做`;
}

// 生成幽默风趣文案
function generateHumorousContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `😂 朋友们，我发现了一个秘密！<br><br>

${location}有个工作：<br>
💰 工资：${jobInfo.salary}（比我想象的高）<br>
🏠 住宿：免费！（省下租房钱）<br>
🩺 体检：免费！（省下体检费）<br>
🎫 车票：报销！（连路费都不用出）<br><br>

我：这不是做梦吧？ 🤔<br>
HR：真的，赶紧来！<br><br>

还有什么理由不心动？<br>
评论区说说你的想法！<br><br>

#搞笑招聘 #${location.replace('市', '')}工作 #免费住宿<br>
#省钱攻略 #工厂生活`;
}

// 生成详细文案
function generateDetailedContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📢 【正规招聘】${jobInfo.title}<br><br>

🏢 企业：${jobInfo.company}<br>
📍 地址：${location}<br>
💼 岗位：${jobInfo.title}<br>
💰 薪资：${jobInfo.salary}<br>
⏰ 班次：8小时工作制<br><br>

🎁 福利待遇：<br>
✅ 完善的五险一金保障<br>
✅ 免费员工宿舍<br>
✅ 免费入职体检<br>
✅ 车票报销补贴<br>
✅ 提供岗前培训<br><br>

👥 招聘要求：<br>
• 18-45岁，身体健康<br>
• 无需相关工作经验<br>
• 能适应工厂工作环境<br><br>

📞 联系方式：<br>
私信或评论留联系方式<br><br>

#认真招聘 #${location.replace('市', '')}工作 #正规企业`;
}

// 生成故事文案
function generateStoryContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📖 分享一个真实故事<br><br>

朋友小张，去年在家没工作，<br>
天天为找工作发愁... 😟<br><br>

后来我介绍他来${location}这边，<br>
${jobInfo.company}，${jobInfo.title}岗位：<br><br>

💰 工资：${jobInfo.salary}<br>
🏠 住宿：公司免费提供<br>
🍚 吃饭：食堂便宜又好吃<br>
💊 体检：公司承担费用<br><br>

现在小张每个月都能寄钱回家，<br>
还说要在这里好好干下去！<br><br>

有时候机会就在身边，<br>
关键是要敢于尝试！💪<br><br>

#真实故事 #${location.replace('市', '')}招聘 #改变生活<br>
#工厂工作 #稳定收入`;
}

// ==================== 重新生成功能 ====================

// 重新生成标题
function regenerateTitle() {
    if (isGenerating) return;
    currentGenerationType = 'title';
    showRegenerateModal();
}

// 重新生成内容
function regenerateContent() {
    if (isGenerating) return;
    currentGenerationType = 'content';
    showRegenerateModal();
}

// 重新生成视频
function regenerateVideo() {
    if (isGenerating) return;
    currentGenerationType = 'video';
    showVideoRegenerateOptions();
}

// 显示重新生成选项弹窗
function showRegenerateModal() {
    const modal = document.getElementById('regenerateModal');
    modal.classList.remove('hidden');
}

// 隐藏重新生成选项弹窗
function hideRegenerateModal() {
    const modal = document.getElementById('regenerateModal');
    modal.classList.add('hidden');
}

// 确认重新生成
function confirmRegenerate() {
    hideRegenerateModal();
    
    // 获取用户选择的选项
    const style = document.querySelector('input[name="contentStyle"]:checked')?.value || 'trendy';
    const highlights = Array.from(document.querySelectorAll('input[name="highlights"]:checked'))
                           .map(cb => cb.value);
    const videoType = document.querySelector('input[name="videoType"]:checked')?.value || 'promotional';
    
    // 开始生成
    startGeneration(currentGenerationType, { style, highlights, videoType });
}

// 显示视频重新生成选项
function showVideoRegenerateOptions() {
    showToast('正在准备视频生成选项...');
    
    setTimeout(() => {
        startGeneration('video', {
            type: 'promotional',
            duration: 30,
            style: 'modern'
        });
    }, 1000);
}

// 开始生成过程
function startGeneration(type, options) {
    isGenerating = true;
    showGeneratingModal();
    
    // 更新按钮状态
    updateButtonState(type, 'generating');
    
    // 模拟生成过程
    simulateGeneration(type, options);
}

// 显示生成中弹窗
function showGeneratingModal() {
    const modal = document.getElementById('generatingModal');
    modal.classList.remove('hidden');
    
    // 开始进度条动画
    startProgressAnimation();
}

// 隐藏生成中弹窗
function hideGeneratingModal() {
    const modal = document.getElementById('generatingModal');
    modal.classList.add('hidden');
}

// 开始进度条动画
function startProgressAnimation() {
    const progressBar = document.getElementById('progressBar');
    const timeLeft = document.getElementById('timeLeft');
    let progress = 0;
    let time = 20;
    
    const interval = setInterval(() => {
        progress += Math.random() * 6 + 2;
        time -= 1;
        
        if (progress >= 100) {
            progress = 100;
            time = 0;
            clearInterval(interval);
        }
        
        progressBar.style.width = `${progress}%`;
        timeLeft.textContent = Math.max(0, time);
        
        if (progress >= 100) {
            setTimeout(() => {
                hideGeneratingModal();
                completeGeneration();
            }, 500);
        }
    }, 1000);
}

// 模拟生成过程
function simulateGeneration(type, options) {
    setTimeout(() => {
        if (type === 'title') {
            const newTitle = generateDouyinTitle(currentJobInfo, options.style);
            const titleArea = document.getElementById('titleArea');
            titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${newTitle}</div>`;
            titleArea.classList.add('fade-in');
        } else if (type === 'content') {
            const newContent = generateDouyinContent(currentJobInfo, options.style);
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = `<div class="text-sm text-gray-700 leading-relaxed">${newContent}</div>`;
            contentArea.classList.add('fade-in');
        } else if (type === 'video') {
            const videoArea = document.getElementById('videoArea');
            videoArea.classList.add('fade-in');
        }
        
        // 恢复按钮状态
        updateButtonState(type, 'completed');
        
        isGenerating = false;
    }, 20000);
}

// 完成生成
function completeGeneration() {
    showToast('✅ 内容生成完成！');
}

// 更新按钮状态
function updateButtonState(type, state) {
    let button;
    
    if (type === 'title') {
        button = document.getElementById('regenerateTitleBtn');
    } else if (type === 'content') {
        button = document.getElementById('regenerateContentBtn');
    } else if (type === 'video') {
        button = document.getElementById('regenerateVideoBtn');
    }
    
    if (!button) return;
    
    switch (state) {
        case 'generating':
            button.disabled = true;
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 generating" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                生成中...
            `;
            break;
        case 'completed':
            button.disabled = false;
            const iconMap = {
                'title': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
                'content': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
                'video': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
            };
            
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconMap[type]}" />
                </svg>
                重新生成
            `;
            break;
    }
}

// ==================== 复制和保存功能 ====================

// 复制标题和文案
function copyTitleAndContent() {
    const titleArea = document.getElementById('titleArea');
    const contentArea = document.getElementById('contentArea');
    
    const title = titleArea.textContent || titleArea.innerText;
    const content = contentArea.textContent || contentArea.innerText;
    
    const fullText = `${title}\n\n${content}`;
    
    // 使用现代剪贴板API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(fullText).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(fullText);
        });
    } else {
        fallbackCopy(fullText);
    }
}

// 备用复制方法
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess();
    } catch (err) {
        showToast('复制失败，请手动复制内容');
    } finally {
        document.body.removeChild(textArea);
    }
}

// 显示复制成功
function showCopySuccess() {
    showToast('✅ 标题和文案复制成功！');
    
    setTimeout(() => {
        showSuccessModal('copy');
    }, 1000);
}

// 保存视频
function saveVideo() {
    showToast('正在保存视频到相册...');
    
    setTimeout(() => {
        showToast('✅ 视频保存成功！');
        
        setTimeout(() => {
            showSuccessModal('save');
        }, 1000);
    }, 2000);
}

// 显示成功引导弹窗
function showSuccessModal(type) {
    let title, content, actionText;
    
    if (type === 'copy') {
        title = '✅ 标题和文案复制成功！';
        content = `
            <p class="mb-4">💡 接下来：</p>
            <ol class="text-left space-y-1">
                <li>1. 保存下方视频到相册</li>
                <li>2. 打开抖音APP</li>
                <li>3. 点击"+"发布视频</li>
                <li>4. 粘贴刚复制的文案</li>
            </ol>
        `;
        actionText = '🎵 前往抖音发布';
    } else {
        title = '✅ 视频保存成功！';
        content = `
            <p class="mb-4">📱 抖音发布流程：</p>
            <ol class="text-left space-y-1">
                <li>1. 打开抖音APP</li>
                <li>2. 点击底部"+"号</li>
                <li>3. 选择刚保存的视频</li>
                <li>4. 粘贴已复制的标题和文案</li>
            </ol>
        `;
        actionText = '🎵 立即前往抖音';
    }
    
    showCustomModal(title, content, actionText, openDouyin);
}

// 打开抖音
function openDouyin() {
    showToast('正在尝试打开抖音...');
    
    try {
        // 尝试打开抖音应用
        window.location.href = 'snssdk1128://';
    } catch (error) {
        showToast('请手动打开抖音应用');
    }
}

// ==================== 视频播放器功能 ====================

// 初始化视频播放器
function initializeVideoPlayer() {
    // 模拟视频播放状态
    isPlaying = false;
    isMuted = false;
    
    // 添加播放器事件监听
    updatePlayIcon();
    updateSoundIcon();
}

// 播放视频
function playVideo() {
    if (!isPlaying) {
        togglePlay();
    }
}

// 切换播放状态
function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayIcon();
    
    if (isPlaying) {
        showToast('开始播放');
        startVideoProgress();
    } else {
        showToast('暂停播放');
    }
}

// 切换静音状态
function toggleMute() {
    isMuted = !isMuted;
    updateSoundIcon();
    showToast(isMuted ? '已静音' : '取消静音');
}

// 切换全屏
function toggleFullscreen() {
    showToast('全屏播放');
    // 这里可以添加全屏播放的逻辑
}

// 更新播放图标
function updatePlayIcon() {
    const playIcon = document.getElementById('playIcon');
    if (isPlaying) {
        playIcon.innerHTML = `
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        `;
    } else {
        playIcon.innerHTML = `
            <path d="M8 5v14l11-7z"/>
        `;
    }
}

// 更新声音图标
function updateSoundIcon() {
    const soundIcon = document.getElementById('soundIcon');
    if (isMuted) {
        soundIcon.innerHTML = `
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        `;
    } else {
        soundIcon.innerHTML = `
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
        `;
    }
}

// 开始视频进度
function startVideoProgress() {
    const progressFill = document.getElementById('progressFill');
    const currentTimeEl = document.getElementById('currentTime');
    let progress = 0;
    let seconds = 0;
    
    const interval = setInterval(() => {
        if (!isPlaying) {
            clearInterval(interval);
            return;
        }
        
        progress += 100 / 30; // 30秒总时长
        seconds += 1;
        
        if (progress >= 100) {
            progress = 100;
            seconds = 30;
            isPlaying = false;
            updatePlayIcon();
            clearInterval(interval);
            showToast('播放完成');
        }
        
        progressFill.style.width = `${progress}%`;
        currentTimeEl.textContent = formatTime(seconds);
    }, 1000);
}

// 格式化时间
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// ==================== 工具函数 ====================

// 显示提示消息
function showToast(message) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-message fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 fade-in';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('opacity-0');
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500);
    }, 3000);
}

// 显示自定义弹窗
function showCustomModal(title, content, actionText, actionCallback) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
    modal.innerHTML = `
        <div class="flex items-center justify-center h-full px-4">
            <div class="bg-white rounded-lg w-full max-w-sm p-6 text-center">
                <h3 class="text-lg font-medium text-gray-800 mb-4">${title}</h3>
                <div class="text-sm text-gray-600 mb-6">${content}</div>
                <div class="flex space-x-3">
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700">
                        取消
                    </button>
                    <button class="flex-1 bg-douyinBlack text-white rounded-lg py-2" onclick="this.closest('.fixed').remove(); (${actionCallback.toString()})()">
                        ${actionText}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 8000);
}

// 添加动画效果
function addAnimationEffects() {
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
} 