// 聚贤人力 - 投诉建议页面交互脚本

// 页面状态管理
const FEEDBACK_STATE = {
    currentTab: 'feedback',
    selectedCategory: '',
    selectedType: 'complaint',
    uploadedImages: [],
    maxImages: 3
};

// 模拟反馈记录数据
const FEEDBACK_RECORDS = [
    {
        id: 'FB20241201001',
        type: '投诉',
        category: '工资问题',
        title: '12月工资发放延迟',
        description: '原定15号发放的工资到现在还没有到账，之前都是准时发放的，希望能尽快处理。',
        status: 'processing',
        createTime: '2024-12-01 10:30',
        replyTime: '',
        reply: '',
        images: ['https://example.com/image1.jpg']
    },
    {
        id: 'FB20241128002',
        type: '建议',
        category: '宿舍环境',
        title: '宿舍热水供应建议',
        description: '建议延长热水供应时间到晚上11点，现在9点就停止供应，下班晚的同事没法洗澡。',
        status: 'replied',
        createTime: '2024-11-28 16:45',
        replyTime: '2024-11-29 09:20',
        reply: '您好，感谢您的建议。我们已经与宿舍管理方沟通，从下周开始热水供应时间将延长至晚上10:30。',
        images: []
    },
    {
        id: 'FB20241125003',
        type: '投诉',
        category: '宿管服务',
        title: '宿管态度恶劣',
        description: '宿管对员工态度很差，经常无故训斥，希望能够改善服务态度。',
        status: 'closed',
        createTime: '2024-11-25 14:20',
        replyTime: '2024-11-26 11:30',
        reply: '感谢您的反馈，我们已经对相关宿管进行了培训和提醒，如后续还有类似问题请及时联系我们。',
        images: []
    },
    {
        id: 'FB20241120004',
        type: '投诉',
        category: '住宿费用',
        title: '住宿费扣除有误',
        description: '11月份我请假了5天，但住宿费还是按全月扣除，应该按实际入住天数计算。',
        status: 'replied',
        createTime: '2024-11-20 09:15',
        replyTime: '2024-11-21 15:45',
        reply: '经核实确实存在计算错误，多扣的费用将在下月工资中返还给您，给您带来的不便深表歉意。',
        images: []
    }
];

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initFeedbackPage();
});

// 初始化反馈页面
function initFeedbackPage() {
    // 检查表单状态
    checkFormValidation();
    
    // 初始化反馈记录
    loadFeedbackRecords();
    
    // 初始化交互效果
    initInteractions();
    
    console.log('投诉建议页面初始化完成');
}

// 标签页切换
function switchTab(tab) {
    FEEDBACK_STATE.currentTab = tab;
    
    const feedbackTab = document.getElementById('feedbackTab');
    const recordsTab = document.getElementById('recordsTab');
    const feedbackContent = document.getElementById('feedbackContent');
    const recordsContent = document.getElementById('recordsContent');
    
    if (tab === 'feedback') {
        feedbackTab.classList.add('tab-active');
        feedbackTab.classList.remove('text-gray-500');
        recordsTab.classList.remove('tab-active');
        recordsTab.classList.add('text-gray-500');
        
        feedbackContent.style.display = 'block';
        recordsContent.style.display = 'none';
        
        // 更新页面标题
        document.querySelector('.text-center.font-medium.text-gray-800').textContent = '投诉建议';
    } else {
        recordsTab.classList.add('tab-active');
        recordsTab.classList.remove('text-gray-500');
        feedbackTab.classList.remove('tab-active');
        feedbackTab.classList.add('text-gray-500');
        
        recordsContent.style.display = 'block';
        feedbackContent.style.display = 'none';
        
        // 更新页面标题
        document.querySelector('.text-center.font-medium.text-gray-800').textContent = '反馈记录';
        
        // 加载反馈记录
        loadFeedbackRecords();
    }
}

// 更新反馈类型
function updateFeedbackType() {
    const selectedRadio = document.querySelector('input[name="feedbackType"]:checked');
    FEEDBACK_STATE.selectedType = selectedRadio.value;
    checkFormValidation();
}

// 选择问题类型
function selectCategory(element, category) {
    // 清除之前的选择
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    
    // 选中当前分类
    element.classList.add('selected');
    FEEDBACK_STATE.selectedCategory = category;
    
    checkFormValidation();
}

// 更新字符计数
function updateCharCount() {
    const textarea = document.getElementById('descriptionText');
    const charCount = document.getElementById('charCount');
    const currentLength = textarea.value.length;
    
    charCount.textContent = currentLength;
    
    // 检查表单验证
    checkFormValidation();
}

// 选择图片
function selectImages() {
    if (FEEDBACK_STATE.uploadedImages.length >= FEEDBACK_STATE.maxImages) {
        showToast(`最多只能上传${FEEDBACK_STATE.maxImages}张图片`);
        return;
    }
    
    document.getElementById('imageInput').click();
}

// 处理图片上传
function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    const remainingSlots = FEEDBACK_STATE.maxImages - FEEDBACK_STATE.uploadedImages.length;
    
    if (files.length > remainingSlots) {
        showToast(`只能再上传${remainingSlots}张图片`);
        return;
    }
    
    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = {
                    id: Date.now() + Math.random(),
                    file: file,
                    url: e.target.result,
                    name: file.name
                };
                
                FEEDBACK_STATE.uploadedImages.push(imageData);
                renderImagePreview();
                updateUploadArea();
            };
            reader.readAsDataURL(file);
        } else {
            showToast('请选择图片文件');
        }
    });
    
    // 清空input值，允许重复选择同一文件
    event.target.value = '';
}

// 渲染图片预览
function renderImagePreview() {
    const container = document.getElementById('imagePreview');
    container.innerHTML = '';
    
    FEEDBACK_STATE.uploadedImages.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'upload-preview';
        
        imageDiv.innerHTML = `
            <img src="${image.url}" class="w-20 h-20 object-cover rounded-lg border border-gray-300">
            <div class="remove-image" onclick="removeImage('${image.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
        `;
        
        container.appendChild(imageDiv);
    });
}

// 删除图片
function removeImage(imageId) {
    FEEDBACK_STATE.uploadedImages = FEEDBACK_STATE.uploadedImages.filter(img => img.id !== imageId);
    renderImagePreview();
    updateUploadArea();
}

// 更新上传区域状态
function updateUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const isMaxReached = FEEDBACK_STATE.uploadedImages.length >= FEEDBACK_STATE.maxImages;
    
    if (isMaxReached) {
        uploadArea.style.display = 'none';
    } else {
        uploadArea.style.display = 'block';
    }
}

// 检查表单验证
function checkFormValidation() {
    const category = FEEDBACK_STATE.selectedCategory;
    const description = document.getElementById('descriptionText').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    
    const isValid = category && description.length > 0;
    
    submitBtn.disabled = !isValid;
    
    if (isValid) {
        submitBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    } else {
        submitBtn.classList.add('opacity-60', 'cursor-not-allowed');
    }
}

// 提交反馈
function submitFeedback() {
    const description = document.getElementById('descriptionText').value.trim();
    
    if (!FEEDBACK_STATE.selectedCategory) {
        showToast('请选择问题类型');
        return;
    }
    
    if (!description) {
        showToast('请填写问题描述');
        return;
    }
    
    // 显示提交中状态
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '提交中...';
    submitBtn.disabled = true;
    
    // 模拟提交过程
    setTimeout(() => {
        // 生成反馈记录
        const newRecord = {
            id: 'FB' + new Date().getTime(),
            type: FEEDBACK_STATE.selectedType === 'complaint' ? '投诉' : '建议',
            category: FEEDBACK_STATE.selectedCategory,
            title: generateTitle(FEEDBACK_STATE.selectedCategory, description),
            description: description,
            status: 'processing',
            createTime: new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }).replace(/\//g, '-'),
            replyTime: '',
            reply: '',
            images: FEEDBACK_STATE.uploadedImages.map(img => img.url)
        };
        
        // 保存到本地存储
        saveFeedbackRecord(newRecord);
        
        // 显示成功消息
        showToast('反馈提交成功，我们会尽快处理');
        
        // 重置表单
        resetForm();
        
        // 切换到反馈记录页
        setTimeout(() => {
            switchTab('records');
        }, 1500);
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// 生成标题
function generateTitle(category, description) {
    const maxLength = 20;
    const shortDesc = description.length > maxLength ? 
        description.substring(0, maxLength) + '...' : description;
    return `${category} - ${shortDesc}`;
}

// 重置表单
function resetForm() {
    // 重置反馈类型
    document.querySelector('input[name="feedbackType"][value="complaint"]').checked = true;
    FEEDBACK_STATE.selectedType = 'complaint';
    
    // 重置问题类型
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('selected');
    });
    FEEDBACK_STATE.selectedCategory = '';
    
    // 重置描述
    document.getElementById('descriptionText').value = '';
    document.getElementById('charCount').textContent = '0';
    
    // 重置图片
    FEEDBACK_STATE.uploadedImages = [];
    renderImagePreview();
    updateUploadArea();
    
    // 重置表单验证
    checkFormValidation();
}

// 加载反馈记录
function loadFeedbackRecords() {
    const container = document.getElementById('recordsContent');
    
    // 获取本地存储的记录
    const localRecords = getLocalFeedbackRecords();
    const allRecords = [...localRecords, ...FEEDBACK_RECORDS].sort((a, b) => 
        new Date(b.createTime) - new Date(a.createTime)
    );
    
    if (allRecords.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-gray-500">暂无反馈记录</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    allRecords.forEach(record => {
        const recordCard = createRecordCard(record);
        container.appendChild(recordCard);
    });
}

// 创建反馈记录卡片
function createRecordCard(record) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'bg-white rounded-lg p-4 mb-4 border border-gray-200';
    
    const statusInfo = getStatusInfo(record.status);
    
    cardDiv.innerHTML = `
        <div class="flex justify-between items-start mb-3">
            <div class="flex items-center space-x-2">
                <span class="px-2 py-1 text-xs rounded ${record.type === '投诉' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}">${record.type}</span>
                <span class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">${record.category}</span>
            </div>
            <span class="px-2 py-1 text-xs rounded ${statusInfo.class}">${statusInfo.text}</span>
        </div>
        
        <h4 class="font-medium text-gray-800 mb-2">${record.title}</h4>
        <p class="text-sm text-gray-600 mb-3 line-clamp-2">${record.description}</p>
        
        <div class="flex justify-between items-center text-xs text-gray-500">
            <span>提交时间：${record.createTime}</span>
            <span>编号：${record.id}</span>
        </div>
        
        ${record.reply ? `
            <div class="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-blue-800">官方回复</span>
                    <span class="text-xs text-blue-600">${record.replyTime}</span>
                </div>
                <p class="text-sm text-blue-700">${record.reply}</p>
            </div>
        ` : ''}
    `;
    
    return cardDiv;
}

// 获取状态信息
function getStatusInfo(status) {
    const statusMap = {
        'processing': {
            text: '处理中',
            class: 'bg-yellow-100 text-yellow-600'
        },
        'replied': {
            text: '已回复',
            class: 'bg-green-100 text-green-600'
        },
        'closed': {
            text: '已关闭',
            class: 'bg-gray-100 text-gray-600'
        }
    };
    
    return statusMap[status] || statusMap.processing;
}

// 保存反馈记录到本地存储
function saveFeedbackRecord(record) {
    try {
        const existingRecords = getLocalFeedbackRecords();
        existingRecords.unshift(record);
        localStorage.setItem('feedbackRecords', JSON.stringify(existingRecords));
    } catch (e) {
        console.error('保存反馈记录失败:', e);
    }
}

// 获取本地存储的反馈记录
function getLocalFeedbackRecords() {
    try {
        const records = localStorage.getItem('feedbackRecords');
        return records ? JSON.parse(records) : [];
    } catch (e) {
        console.error('获取反馈记录失败:', e);
        return [];
    }
}

// 初始化交互效果
function initInteractions() {
    // 添加按钮点击反馈
    const buttons = document.querySelectorAll('button, .category-tag');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        button.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
    
    // 添加textarea自动调整高度
    const textarea = document.getElementById('descriptionText');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 200) + 'px';
    });
}

// 工具函数

// 显示提示消息
function showToast(message, duration = 3000) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 显示动画
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 10);
    
    // 自动隐藏
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

console.log('投诉建议页面脚本加载完成'); 