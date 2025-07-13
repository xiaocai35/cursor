// 蓝诚人力 - 添加支付宝页面交互脚本

let selectedAccountType = 'phone'; // 默认选择手机号

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

// 初始化页面
function initPage() {
    // 绑定表单验证事件
    bindFormValidation();
    
    // 账户信息验证
    document.getElementById('alipayAccount').addEventListener('input', function(e) {
        validateAlipayAccount(e.target.value);
    });
    
    // 身份证号验证
    document.getElementById('idNumber').addEventListener('input', function(e) {
        validateIdNumber(e.target.value);
    });
    
    // 姓名验证
    document.getElementById('realName').addEventListener('input', function(e) {
        validateRealName(e.target.value);
    });
    
    // 协议勾选
    document.getElementById('agreeTerms').addEventListener('change', function(e) {
        updateSubmitButton();
    });
}

// 绑定表单验证
function bindFormValidation() {
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
            updateSubmitButton();
        });
    });
}

// 选择账户类型
function selectAccountType(type) {
    // 移除之前的选中状态
    const allCards = document.querySelectorAll('.account-type-option');
    allCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // 添加新的选中状态
    const selectedCard = document.querySelector(`[data-type="${type}"]`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedAccountType = type;
        
        // 更新表单标签和提示
        updateAccountForm(type);
    }
}

// 更新账户表单
function updateAccountForm(type) {
    const accountLabel = document.getElementById('accountLabel');
    const accountInput = document.getElementById('alipayAccount');
    
    if (type === 'phone') {
        accountLabel.textContent = '支付宝账户（手机号）';
        accountInput.placeholder = '请输入支付宝绑定的手机号';
        accountInput.type = 'tel';
        accountInput.maxLength = 11;
    } else if (type === 'email') {
        accountLabel.textContent = '支付宝账户（邮箱）';
        accountInput.placeholder = '请输入支付宝绑定的邮箱';
        accountInput.type = 'email';
        accountInput.maxLength = 50;
    }
    
    // 清除之前的验证错误
    clearFieldError(accountInput);
    updateSubmitButton();
}

// 验证支付宝账户
function validateAlipayAccount(account) {
    if (selectedAccountType === 'phone') {
        return validatePhoneNumber(account);
    } else if (selectedAccountType === 'email') {
        return validateEmail(account);
    }
    return false;
}

// 验证手机号
function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showFieldError('alipayAccount', '请输入正确的手机号');
        return false;
    }
    
    hideFieldError('alipayAccount');
    return true;
}

// 验证邮箱
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFieldError('alipayAccount', '请输入正确的邮箱地址');
        return false;
    }
    
    hideFieldError('alipayAccount');
    return true;
}

// 验证身份证号
function validateIdNumber(idNumber) {
    const idRegex = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
    if (!idRegex.test(idNumber)) {
        showFieldError('idNumber', '请输入正确的身份证号');
        return false;
    }
    
    hideFieldError('idNumber');
    return true;
}

// 验证真实姓名
function validateRealName(name) {
    const nameRegex = /^[\u4e00-\u9fa5]{2,20}$/;
    if (!nameRegex.test(name)) {
        showFieldError('realName', '请输入正确的中文姓名');
        return false;
    }
    
    hideFieldError('realName');
    return true;
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch (fieldId) {
        case 'realName':
            return validateRealName(value);
        case 'alipayAccount':
            return validateAlipayAccount(value);
        case 'idNumber':
            return validateIdNumber(value);
        default:
            return true;
    }
}

// 显示字段错误
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// 隐藏字段错误
function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('error');
    errorElement.style.display = 'none';
}

// 清除字段错误
function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + 'Error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// 更新提交按钮状态
function updateSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    const realName = document.getElementById('realName').value.trim();
    const alipayAccount = document.getElementById('alipayAccount').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    
    const isValid = realName && alipayAccount && idNumber && agreeTerms;
    
    if (isValid) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
        submitBtn.classList.add('bg-primary', 'hover:bg-purple-700');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
        submitBtn.classList.remove('bg-primary', 'hover:bg-purple-700');
    }
}

// 提交支付宝信息
function submitAlipay() {
    // 验证所有字段
    const realName = document.getElementById('realName').value.trim();
    const alipayAccount = document.getElementById('alipayAccount').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!validateRealName(realName) ||
        !validateAlipayAccount(alipayAccount) ||
        !validateIdNumber(idNumber) ||
        !agreeTerms) {
        showToast('请检查表单信息');
        return;
    }
    
    // 显示加载状态
    showLoading('正在提交...');
    
    // 模拟提交
    setTimeout(() => {
        hideLoading();
        
        // 保存支付宝信息
        const alipayInfo = {
            type: 'alipay',
            realName: realName,
            account: alipayAccount,
            accountType: selectedAccountType,
            idNumber: idNumber,
            createTime: new Date().toISOString()
        };
        
        // 存储到本地
        let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
        paymentMethods.push(alipayInfo);
        localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
        
        showToast('支付宝添加成功');
        
        // 延迟跳转
        setTimeout(() => {
            window.history.back();
        }, 1500);
    }, 2000);
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm z-50';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 显示加载状态
function showLoading(message = '加载中...') {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-4 flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <div class="text-gray-700">${message}</div>
        </div>
    `;
    
    document.body.appendChild(loading);
}

// 隐藏加载状态
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.remove();
    }
} 