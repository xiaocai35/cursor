// 聚贤人力 - 小红书分享页面交互脚本

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
        const title = generateXiaohongshuTitle(currentJobInfo);
        titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${title}</div>`;
    }
}

// 更新内容显示
function updateContentDisplay() {
    const contentArea = document.getElementById('contentArea');
    if (currentJobInfo) {
        const content = generateXiaohongshuContent(currentJobInfo);
        contentArea.innerHTML = `<div class="text-sm text-gray-700 leading-relaxed">${content}</div>`;
    }
}

// ==================== 内容生成 ====================

// 生成小红书标题
function generateXiaohongshuTitle(jobInfo, style = 'sharing') {
    const templates = {
        sharing: generateSharingTitle,
        experience: generateExperienceTitle,
        discovery: generateDiscoveryTitle,
        guide: generateGuideTitle
    };
    
    const generator = templates[style] || templates.sharing;
    return generator(jobInfo);
}

// 生成种草分享标题
function generateSharingTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `💰 月薪过万的工作真的存在！${location}这个岗位让我心动了...✨（姐妹们冲！）`,
        `🔥 ${location}宝藏工作分享！${jobInfo.salary}还包住宿，我酸了😭`,
        `✨ 发现神仙工作！${jobInfo.company}的福利让我羡慕到哭💫`,
        `💎 ${location}打工姐妹必看！这个${jobInfo.salary}的工作太香了！`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成经验干货标题
function generateExperienceTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `📚 ${location}求职攻略！${jobInfo.salary}工作这样找最靠谱💯`,
        `🎯 ${location}工厂工作避雷指南！选对公司很重要⚡`,
        `💡 ${location}高薪工作经验分享！从月薪3K到${jobInfo.salary}的秘密`,
        `🔍 ${location}找工作必看！${jobInfo.company}面试经验大公开`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成发现类标题
function generateDiscoveryTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `🎉 ${location}又有新工作机会啦！${jobInfo.salary}+五险一金等你来`,
        `⚡ 紧急！${location}这个${jobInfo.salary}的工作快被抢光了！`,
        `🌟 ${location}最新招聘！${jobInfo.company}开出${jobInfo.salary}诚聘英才`,
        `🚀 ${location}工作新选择！${jobInfo.salary}包住宿，条件超好`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成指南类标题
function generateGuideTitle(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    const titles = [
        `📖 ${location}工厂工作完整指南！从投简历到拿offer`,
        `💼 ${location}求职者必看！${jobInfo.salary}工作申请全流程`,
        `🎯 ${location}工厂招聘解密！如何拿到${jobInfo.salary}的好工作`,
        `📝 ${location}求职攻略！${jobInfo.company}面试技巧大揭秘`
    ];
    
    return titles[Math.floor(Math.random() * titles.length)];
}

// 生成小红书正文
function generateXiaohongshuContent(jobInfo, style = 'sharing') {
    const templates = {
        sharing: generateSharingContent,
        experience: generateExperienceContent,
        detailed: generateDetailedContent,
        story: generateStoryContent
    };
    
    const generator = templates[style] || templates.sharing;
    return generator(jobInfo);
}

// 生成种草分享正文
function generateSharingContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `🔥 姐妹们！又发现宝藏工作啦！<br><br>

最近朋友介绍了个超棒的工作机会，在${location}，薪资真的很香！我帮大家整理了详细信息～<br><br>

💼 【岗位详情】<br>
🏢 公司：${jobInfo.company}<br>
📍 位置：${location}<br>
💰 薪资：${jobInfo.salary}<br>
👷 职位：${jobInfo.title}<br>
⏰ 班次：白班，8小时工作制<br><br>

🎁 【福利超棒】<br>
✅ 五险一金（这个真的很重要！）<br>
✅ 免费宿舍（在${location}省房租太香了）<br>
✅ 餐补+交通补贴（贴心～）<br>
✅ 免费体检（省了好几百）<br>
✅ 带薪培训（小白也能快速上手）<br><br>

💭 【我的想法】<br>
说实话，在${location}能找到这样的工作真的不容易！薪资给得很实在，福利也到位。特别是包住宿这点，对外地来的小伙伴太友好了！<br><br>

而且公司规模挺大的，发展机会也不错。如果你正在找工作，真的可以考虑一下～<br><br>

🤝 想了解更多可以私信我哦！我们一起在大城市努力打拼💪<br><br>

#${location.replace('市', '')}招聘 #高薪工作 #求职攻略 #工厂招聘 #包住宿工作 #五险一金 #职场小白 #工作分享`;
}

// 生成经验干货正文
function generateExperienceContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📚 ${location}求职经验分享！<br><br>

作为一个在${location}工作了2年的过来人，今天来分享一下找到好工作的经验～<br><br>

🎯 【选择公司的标准】<br>
1️⃣ 五险一金是基础（没有的直接pass）<br>
2️⃣ 包住宿很重要（能省一大笔钱）<br>
3️⃣ 工资按时发（拖欠工资的公司别去）<br>
4️⃣ 有培训机会（对新人很友好）<br><br>

💡 【推荐这个岗位的原因】<br>
最近发现${jobInfo.company}的${jobInfo.title}岗位：<br>
💰 薪资：${jobInfo.salary}（在${location}算不错的）<br>
🏠 住宿：免费提供（省钱大头）<br>
🩺 体检：公司承担（又省几百块）<br>
🎫 车票：可以报销（连路费都省了）<br><br>

📋 【面试小贴士】<br>
• 提前了解公司背景<br>
• 准备好身份证和学历证明<br>
• 体检报告要是近期的<br>
• 面试时态度要诚恳<br><br>

🌟 【工作感受】<br>
其实工厂工作没有想象中那么累，关键是要选对公司！好的公司管理规范，同事关系也不错。<br><br>

有问题可以评论区问我，知无不言～<br><br>

#${location.replace('市', '')}求职 #工厂工作经验 #求职攻略 #职场干货 #新人必看`;
}

// 生成详细介绍正文
function generateDetailedContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📢 【详细招聘信息】${jobInfo.title}<br><br>

🏢 企业介绍：<br>
${jobInfo.company}是一家知名的电子制造企业，在${location}有多年的经营历史，管理规范，员工福利完善。<br><br>

💼 岗位信息：<br>
• 职位名称：${jobInfo.title}<br>
• 工作地点：${location}<br>
• 薪资待遇：${jobInfo.salary}<br>
• 工作时间：8小时工作制，白班<br>
• 招聘人数：多名<br><br>

🎁 福利待遇：<br>
✅ 基本工资+绩效奖金<br>
✅ 完善的五险一金<br>
✅ 免费员工宿舍（4人间，独立卫浴）<br>
✅ 餐补200元/月<br>
✅ 交通补贴100元/月<br>
✅ 免费入职体检<br>
✅ 车票报销（异地员工）<br>
✅ 带薪年假及法定节假日<br>
✅ 完善的培训体系<br><br>

👥 招聘要求：<br>
• 年龄18-45岁，男女不限<br>
• 身体健康，无传染性疾病<br>
• 能够适应工厂工作环境<br>
• 有无工作经验均可<br>
• 工作认真负责，有团队合作精神<br><br>

🏭 工作环境：<br>
现代化生产车间，环境整洁，设备先进。严格按照安全生产标准操作，为员工提供安全舒适的工作环境。<br><br>

📞 应聘方式：<br>
感兴趣的朋友可以私信我，我会详细介绍具体情况，并协助安排面试。<br><br>

#认真招聘 #${location.replace('市', '')}工作 #正规企业 #五险一金 #包住宿`;
}

// 生成故事类正文
function generateStoryContent(jobInfo) {
    const location = jobInfo.location.replace('广东省·', '');
    return `📖 分享一个真实的故事<br><br>

我表妹小雨，去年刚毕业，在家待了半年都没找到合适的工作，每天都很焦虑...<br><br>

后来我介绍她来${location}这边，进了${jobInfo.company}：<br><br>

🌟 第一个月：<br>
刚开始有点不适应，但公司的培训很全面，师傅也很耐心教。工资${jobInfo.salary}，除去生活费还能存下不少。<br><br>

🌟 第三个月：<br>
已经完全适应了工作节奏，同事关系很好，下班后还会一起逛街看电影。住在公司宿舍，环境不错，还省了房租。<br><br>

🌟 现在：<br>
小雨已经工作快一年了，不仅自己生活质量提高了，还能每个月给家里寄钱。最重要的是，她变得自信了很多！<br><br>

💭 感想：<br>
其实工厂工作没有大家想象的那么累或者枯燥，关键是要选对地方。像${jobInfo.company}这样的正规企业，工作环境好，福利待遇也不错。<br><br>

对于刚毕业或者想换工作的朋友，这真的是一个不错的选择。<br><br>

🤝 如果你也在找工作，可以私信我了解详情～<br><br>

#真实经历 #${location.replace('市', '')}工作 #职场成长 #工厂生活 #求职分享`;
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
    const style = document.querySelector('input[name="contentStyle"]:checked')?.value || 'sharing';
    const highlights = Array.from(document.querySelectorAll('input[name="highlights"]:checked'))
                           .map(cb => cb.value);
    const videoStyle = document.querySelector('input[name="videoStyle"]:checked')?.value || 'real';
    
    // 开始生成
    startGeneration(currentGenerationType, { style, highlights, videoStyle });
}

// 显示视频重新生成选项
function showVideoRegenerateOptions() {
    showToast('正在准备视频生成选项...');
    
    setTimeout(() => {
        startGeneration('video', {
            style: 'real',
            duration: 60,
            format: '4:5'
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
    let time = 25;
    
    const interval = setInterval(() => {
        progress += Math.random() * 5 + 2;
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
            const newTitle = generateXiaohongshuTitle(currentJobInfo, options.style);
            const titleArea = document.getElementById('titleArea');
            titleArea.innerHTML = `<div class="text-base font-medium text-gray-800">${newTitle}</div>`;
            titleArea.classList.add('fade-in');
        } else if (type === 'content') {
            const newContent = generateXiaohongshuContent(currentJobInfo, options.style);
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
    }, 25000);
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

// 复制标题和正文
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
    showToast('✅ 标题和正文复制成功！');
    
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
        title = '✅ 标题和正文复制成功！';
        content = `
            <p class="mb-4">💡 接下来：</p>
            <ol class="text-left space-y-1">
                <li>1. 保存下方视频到相册</li>
                <li>2. 打开小红书APP</li>
                <li>3. 选择"视频"发布模式</li>
                <li>4. 粘贴刚复制的内容</li>
            </ol>
        `;
        actionText = '📸 前往小红书发布';
    } else {
        title = '✅ 视频保存成功！';
        content = `
            <p class="mb-4">📱 小红书发布流程：</p>
            <ol class="text-left space-y-1">
                <li>1. 打开小红书APP</li>
                <li>2. 点击底部"+"号</li>
                <li>3. 选择"视频"发布视频笔记</li>
                <li>4. 上传刚保存的视频</li>
                <li>5. 粘贴已复制的标题和正文</li>
            </ol>
        `;
        actionText = '📸 立即前往小红书';
    }
    
    showCustomModal(title, content, actionText, openXiaohongshu);
}

// 打开小红书
function openXiaohongshu() {
    showToast('正在尝试打开小红书...');
    
    try {
        // 尝试打开小红书应用
        window.location.href = 'xhsdiscover://';
    } catch (error) {
        showToast('请手动打开小红书应用');
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
        
        progress += 100 / 60; // 60秒总时长
        seconds += 1;
        
        if (progress >= 100) {
            progress = 100;
            seconds = 60;
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
                    <button class="flex-1 bg-xiaohongshuRed text-white rounded-lg py-2" onclick="this.closest('.fixed').remove(); (${actionCallback.toString()})()">
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