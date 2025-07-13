// 蓝诚人力 - 添加银行卡页面交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

// 初始化页面
function initPage() {
    // 绑定表单验证事件
    bindFormValidation();
    
    // 银行卡号输入格式化
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        formatCardNumber(e.target);
        validateCardNumber(e.target.value);
    });
    
    // 手机号验证
    document.getElementById('phoneNumber').addEventListener('input', function(e) {
        validatePhoneNumber(e.target.value);
    });
    
    // 身份证号验证
    document.getElementById('idNumber').addEventListener('input', function(e) {
        validateIdNumber(e.target.value);
    });
    
    // 姓名验证
    document.getElementById('cardholderName').addEventListener('input', function(e) {
        validateCardholderName(e.target.value);
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

// 格式化银行卡号
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// 验证银行卡号
function validateCardNumber(cardNumber) {
    const cleanCardNumber = cardNumber.replace(/\s+/g, '');
    const errorElement = document.getElementById('cardNumberError');
    const bankInfoElement = document.getElementById('bankInfo');
    
    if (cleanCardNumber.length < 16) {
        return false;
    }
    
    // 简单的银行卡号验证（Luhn算法）
    if (!luhnCheck(cleanCardNumber)) {
        showFieldError('cardNumber', '银行卡号格式不正确');
        return false;
    }
    
    // 识别银行信息
    const bankInfo = identifyBank(cleanCardNumber);
    if (bankInfo) {
        bankInfoElement.textContent = `识别为：${bankInfo.name}`;
        bankInfoElement.style.display = 'block';
        hideFieldError('cardNumber');
        return true;
    }
    
    return false;
}

// Luhn算法验证银行卡号
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
}

// 识别银行信息
function identifyBank(cardNumber) {
    const bankMap = {
        '622848': { name: '工商银行', code: 'ICBC' },
        '436742': { name: '工商银行', code: 'ICBC' },
        '622700': { name: '建设银行', code: 'CCB' },
        '436745': { name: '建设银行', code: 'CCB' },
        '622588': { name: '招商银行', code: 'CMB' },
        '621286': { name: '招商银行', code: 'CMB' },
        '622908': { name: '中国银行', code: 'BOC' },
        '621661': { name: '中国银行', code: 'BOC' },
        '622518': { name: '农业银行', code: 'ABC' },
        '622845': { name: '农业银行', code: 'ABC' },
        '622155': { name: '交通银行', code: 'BOCOM' },
        '622622': { name: '交通银行', code: 'BOCOM' }
    };
    
    for (let prefix in bankMap) {
        if (cardNumber.startsWith(prefix)) {
            return bankMap[prefix];
        }
    }
    
    return null;
}

// 验证手机号
function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showFieldError('phoneNumber', '请输入正确的手机号');
        return false;
    }
    
    hideFieldError('phoneNumber');
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

// 验证持卡人姓名
function validateCardholderName(name) {
    const nameRegex = /^[\u4e00-\u9fa5]{2,20}$/;
    if (!nameRegex.test(name)) {
        showFieldError('cardholderName', '请输入正确的中文姓名');
        return false;
    }
    
    hideFieldError('cardholderName');
    return true;
}

// 验证单个字段
function validateField(field) {
    const value = field.value.trim();
    const fieldId = field.id;
    
    switch (fieldId) {
        case 'cardholderName':
            return validateCardholderName(value);
        case 'cardNumber':
            return validateCardNumber(value);
        case 'phoneNumber':
            return validatePhoneNumber(value);
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
    
    const cardholderName = document.getElementById('cardholderName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    
    const isValid = cardholderName && cardNumber && phoneNumber && idNumber && agreeTerms;
    
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

// 提交银行卡信息
function submitBankCard() {
    // 验证所有字段
    const cardholderName = document.getElementById('cardholderName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!validateCardholderName(cardholderName) ||
        !validateCardNumber(cardNumber) ||
        !validatePhoneNumber(phoneNumber) ||
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
        
        // 保存银行卡信息
        const bankCardInfo = {
            type: 'bank',
            cardholderName: cardholderName,
            cardNumber: cardNumber,
            phoneNumber: phoneNumber,
            idNumber: idNumber,
            bankInfo: identifyBank(cardNumber.replace(/\s+/g, '')),
            createTime: new Date().toISOString()
        };
        
        // 存储到本地
        let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
        paymentMethods.push(bankCardInfo);
        localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
        
        showToast('银行卡添加成功');
        
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