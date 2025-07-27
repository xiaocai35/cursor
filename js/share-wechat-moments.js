// 聚贤人力 - 朋友圈分享页面交互脚本

// 全局变量
let currentJobInfo = null;
let isGenerating = false;

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取岗位信息
    loadJobInfo();
    
    // 初始化页面内容
    initializePage();
});

// ==================== 数据加载 ====================

// 加载岗位信息
function loadJobInfo() {
    try {
        const jobInfoStr = sessionStorage.getItem('currentJobInfo');
        if (jobInfoStr) {
            currentJobInfo = JSON.parse(jobInfoStr);
        } else {
            // 如果没有岗位信息，使用默认数据
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
    // 更新文案内容
    updateContentDisplay();
    
    // 添加动画效果
    addAnimationEffects();
}

// 更新内容显示
function updateContentDisplay() {
    const contentArea = document.getElementById('contentArea');
    if (currentJobInfo) {
        const content = generateWechatMomentsContent(currentJobInfo);
        contentArea.innerHTML = `<div class="text-sm text-gray-700 leading-relaxed">${content}</div>`;
    }
}

// ==================== 文案生成 ====================

// 生成朋友圈文案
function generateWechatMomentsContent(jobInfo, style = 'casual') {
    const templates = {
        casual: generateCasualContent,
        professional: generateProfessionalContent,
        enthusiastic: generateEnthusiasticContent,
        detailed: generateDetailedContent
    };
    
    const generator = templates[style] || templates.casual;
    return generator(jobInfo);
}

// 生成活泼有趣风格文案
function generateCasualContent(jobInfo) {
    const salaryNum = jobInfo.salary.replace(/[^\d]/g, '');
    return `🔥【高薪招聘】${jobInfo.title}来啦！<br><br>
    
📍 地点：${jobInfo.location.replace('广东省·', '')}<br>
💰 薪资：${jobInfo.salary}<br>
⏰ 时间：白班8小时<br>
🏭 公司：知名电子制造企业<br><br>

✅ 免费体检 ✅ 包住宿<br>
✅ 空调宿舍 ✅ 报销车票<br>
✅ 可借支 ✅ 管吃住<br><br>

💬 感兴趣的朋友私信我详聊~<br>
🚀 好工作不等人，抓紧时间报名！<br><br>

#招聘 #高薪工作 #${jobInfo.location.replace('广东省·', '').replace('市', '')}招聘 #包住宿 #免费体检`;
}

// 生成专业正式风格文案
function generateProfessionalContent(jobInfo) {
    return `【招聘信息】${jobInfo.title}<br><br>

📋 岗位详情：<br>
• 企业：${jobInfo.company}<br>
• 地点：${jobInfo.location}<br>
• 薪资：${jobInfo.salary}<br>
• 工时：8小时工作制<br><br>

📋 福利待遇：<br>
• 五险一金保障<br>
• 免费员工宿舍<br>
• 免费入职体检<br>
• 车票报销补贴<br><br>

📞 有意向者请私信咨询，我们将提供详细的岗位信息和入职指导。<br><br>

#${jobInfo.location.replace('广东省·', '').replace('市', '')}招聘 #${jobInfo.company} #${jobInfo.title}`;
}

// 生成热情风格文案
function generateEnthusiasticContent(jobInfo) {
    return `🎉🎉 超级好消息！！！<br><br>

🔥 ${jobInfo.company}又开始招人啦！<br>
💎 这次的岗位真的超级棒！<br><br>

✨ 为什么推荐这个工作？<br>
💰 薪资高：${jobInfo.salary}<br>
🏠 包住宿：省钱又方便<br>
🩺 免体检：直接省几百块<br>
🎫 报车票：路费全报销<br><br>

👥 身边好几个朋友都在这里上班，<br>
📈 工资按时发，福利也很好！<br><br>

❤️ 有需要的朋友赶紧联系我，<br>
🚀 名额有限，先到先得！<br><br>

#好工作推荐 #${jobInfo.location.replace('广东省·', '').replace('市', '')}招聘 #包住宿工作`;
}

// 生成详细风格文案
function generateDetailedContent(jobInfo) {
    return `📢【招聘详情】${jobInfo.title}<br><br>

🏢 企业介绍：<br>
${jobInfo.company}，规模企业，管理规范，发展稳定。<br><br>

💼 岗位信息：<br>
• 职位：${jobInfo.title}<br>
• 薪资：${jobInfo.salary}<br>
• 地点：${jobInfo.location}<br>
• 班次：白班制，8小时工作<br><br>

🎁 福利待遇：<br>
• 完善的五险一金<br>
• 免费员工宿舍（空调、热水）<br>
• 免费入职体检<br>
• 车票报销补贴<br>
• 可申请预支工资<br><br>

👤 适合人群：<br>
• 18-45岁，身体健康<br>
• 有无经验均可，提供培训<br>
• 能适应工厂工作环境<br><br>

📞 应聘方式：<br>
私信我获取详细信息，安排面试。<br><br>

#认真招聘 #${jobInfo.location.replace('广东省·', '').replace('市', '')}工作 #正规企业`;
}

// ==================== 重新生成功能 ====================

// 重新生成内容
function regenerateContent() {
    if (isGenerating) return;
    
    showRegenerateModal();
}

// 重新生成图片
function regenerateImages() {
    if (isGenerating) return;
    
    showImageRegenerateOptions();
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
    const style = document.querySelector('input[name="contentStyle"]:checked')?.value || 'casual';
    const highlights = Array.from(document.querySelectorAll('input[name="highlights"]:checked'))
                           .map(cb => cb.value);
    
    // 开始生成
    startGeneration('content', { style, highlights });
}

// 显示图片重新生成选项
function showImageRegenerateOptions() {
    showToast('正在准备图片生成选项...');
    
    // 模拟显示图片生成选项
    setTimeout(() => {
        startGeneration('images', {
            style: 'modern',
            types: ['poster', 'environment', 'benefits']
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
    let time = 15;
    
    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2; // 每次增加2-10%
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
        if (type === 'content') {
            // 重新生成文案
            const newContent = generateWechatMomentsContent(currentJobInfo, options.style);
            const contentArea = document.getElementById('contentArea');
            contentArea.innerHTML = `<div class="text-sm text-gray-700 leading-relaxed">${newContent}</div>`;
            
            // 添加生成完成动画
            contentArea.classList.add('fade-in');
        } else if (type === 'images') {
            // 重新生成图片（模拟）
            const imagesArea = document.getElementById('imagesArea');
            imagesArea.classList.add('fade-in');
        }
        
        // 恢复按钮状态
        updateButtonState(type, 'completed');
        
        isGenerating = false;
    }, 15000);
}

// 完成生成
function completeGeneration() {
    showToast('✅ 内容生成完成！');
}

// 更新按钮状态
function updateButtonState(type, state) {
    let button;
    
    if (type === 'content') {
        button = document.getElementById('regenerateContentBtn');
    } else if (type === 'images') {
        button = document.getElementById('regenerateImagesBtn');
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
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重新生成
            `;
            break;
    }
}

// ==================== 复制和保存功能 ====================

// 复制文案内容
function copyContent() {
    const contentArea = document.getElementById('contentArea');
    const textContent = contentArea.textContent || contentArea.innerText;
    
    // 使用现代剪贴板API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textContent).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopy(textContent);
        });
    } else {
        fallbackCopy(textContent);
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
    showToast('✅ 文案复制成功！');
    
    // 显示成功引导
    setTimeout(() => {
        showSuccessModal('copy');
    }, 1000);
}

// 保存全部图片
function saveAllImages() {
    showToast('正在保存图片到相册...');
    
    // 模拟保存过程
    setTimeout(() => {
        showToast('✅ 图片保存成功！');
        
        setTimeout(() => {
            showSuccessModal('save');
        }, 1000);
    }, 2000);
}

// 显示成功引导弹窗
function showSuccessModal(type) {
    let title, content, actionText;
    
    if (type === 'copy') {
        title = '✅ 文案复制成功！';
        content = `
            <p class="mb-4">💡 接下来：</p>
            <ol class="text-left space-y-1">
                <li>1. 保存下方配图到相册</li>
                <li>2. 打开微信朋友圈</li>
                <li>3. 粘贴刚复制的文案</li>
                <li>4. 选择配图发布</li>
            </ol>
        `;
        actionText = '📱 前往微信朋友圈';
    } else {
        title = '✅ 图片保存成功！';
        content = `
            <p class="mb-4">📱 快速发布流程：</p>
            <ol class="text-left space-y-1">
                <li>1. 打开微信朋友圈</li>
                <li>2. 选择刚保存的图片</li>
                <li>3. 粘贴已复制的文案</li>
                <li>4. 发布朋友圈</li>
            </ol>
        `;
        actionText = '📱 立即前往微信';
    }
    
    showCustomModal(title, content, actionText, openWechat);
}

// 打开微信
function openWechat() {
    showToast('正在尝试打开微信...');
    
    // 尝试打开微信应用
    try {
        // 在实际应用中，这里可以使用微信的URL Scheme
        window.location.href = 'weixin://';
    } catch (error) {
        showToast('请手动打开微信应用');
    }
}

// ==================== 工具函数 ====================

// 显示提示消息
function showToast(message) {
    // 移除现有的toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建新的toast
    const toast = document.createElement('div');
    toast.className = 'toast-message fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm z-50 fade-in';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒后自动移除
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
    // 创建弹窗
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
                    <button class="flex-1 bg-wechatGreen text-white rounded-lg py-2" onclick="this.closest('.fixed').remove(); (${actionCallback.toString()})()">
                        ${actionText}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 5秒后自动关闭
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 8000);
}

// 添加动画效果
function addAnimationEffects() {
    // 为卡片添加延迟动画
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // 为按钮添加点击动画
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