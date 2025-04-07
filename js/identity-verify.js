// 蓝诚人力微信小程序 - 身份信息验证交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化UI交互效果
    initUIInteractions();
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化底部按钮
    initNextButton();
    
    // 初始化复选框
    initCheckboxes();
});

// 初始化UI交互效果
function initUIInteractions() {
    // 返回按钮点击事件
    const backButton = document.querySelector('.bg-white.px-4.py-3 a');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('返回上一页');
            // 这里可以添加实际的返回逻辑
            window.history.back();
        });
    }
    
    // 查看详情点击事件
    const detailLink = document.querySelector('.text-gray-400.text-sm');
    if (detailLink) {
        detailLink.addEventListener('click', function(e) {
            e.preventDefault();
            // 跳转到岗位详情页
            window.location.href = 'job-detail.html';
        });
    }
    
    // 输入框聚焦效果
    const inputFields = document.querySelectorAll('.form-input');
    inputFields.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderBottom = '1px solid #8A33D1';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderBottom = '1px solid #e5e7eb';
        });
    });
}

// 初始化表单验证
function initFormValidation() {
    const phoneInput = document.querySelector('input[type="tel"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // 限制只能输入数字
            this.value = this.value.replace(/\D/g, '');
            
            // 限制长度为11位
            if (this.value.length > 11) {
                this.value = this.value.slice(0, 11);
            }
        });
        
        phoneInput.addEventListener('blur', function() {
            // 简单的手机号验证
            if (this.value && (this.value.length !== 11 || !/^1[3-9]\d{9}$/.test(this.value))) {
                showToast('请输入正确的手机号码');
                this.focus();
            }
        });
    }
}

// 初始化复选框
function initCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-custom');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            updateNextButtonState();
        });
    });
}

// 更新下一步按钮状态
function updateNextButtonState() {
    const checkboxes = document.querySelectorAll('.checkbox-custom');
    const nextButton = document.querySelector('.primary-gradient');
    
    let allChecked = true;
    checkboxes.forEach(checkbox => {
        if (!checkbox.classList.contains('checked')) {
            allChecked = false;
        }
    });
    
    if (allChecked) {
        nextButton.classList.remove('opacity-50');
        nextButton.disabled = false;
    } else {
        nextButton.classList.add('opacity-50');
        nextButton.disabled = true;
    }
}

// 初始化下一步按钮
function initNextButton() {
    const nextButton = document.querySelector('.primary-gradient');
    
    if (nextButton) {
        // 检查初始状态
        updateNextButtonState();
        
        nextButton.addEventListener('click', function() {
            if (this.disabled) {
                showToast('请先同意相关协议');
                return;
            }
            
            const phoneInput = document.querySelector('input[type="tel"]');
            if (!phoneInput.value || phoneInput.value.length !== 11 || !/^1[3-9]\d{9}$/.test(phoneInput.value)) {
                showToast('请输入正确的手机号码');
                phoneInput.focus();
                return;
            }
            
            // 模拟提交过程
            showToast('正在验证信息...');
            setTimeout(() => {
                // 跳转到下一步页面
                window.location.href = 'factory-select.html';
            }, 1000);
        });
    }
}

// 显示Toast提示
function showToast(message) {
    // 检查是否已存在Toast
    let toast = document.querySelector('.toast-message');
    
    if (toast) {
        // 如果已存在，则更新消息并重置消失计时器
        clearTimeout(toast.timeoutId);
        toast.textContent = message;
    } else {
        // 创建新的Toast
        toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px 16px;
            border-radius: 4px;
            font-size: 14px;
            z-index: 9999;
            max-width: 80%;
            text-align: center;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
    }
    
    // 设置消失计时器
    toast.timeoutId = setTimeout(() => {
        toast.remove();
    }, 2000);
} 