// 蓝诚人力 - 添加微信页面交互脚本

let selectedAccountType = 'phone'; // 默认选择手机号绑定
let uploadedQRCode = null; // 上传的二维码文件

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});

// 初始化页面
function initPage() {
    // 绑定表单验证事件
    bindFormValidation();
    
    // 手机号验证
    document.getElementById('wechatPhone').addEventListener('input', function(e) {
        validateWechatPhone(e.target.value);
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
        
        // 更新表单显示
        updateAccountForm(type);
    }
}

// 更新账户表单
function updateAccountForm(type) {
    const phoneSection = document.getElementById('phoneSection');
    const qrcodeSection = document.getElementById('qrcodeSection');
    
    if (type === 'phone') {
        phoneSection.style.display = 'block';
        qrcodeSection.style.display = 'none';
        uploadedQRCode = null;
    } else if (type === 'qrcode') {
        phoneSection.style.display = 'none';
        qrcodeSection.style.display = 'block';
        // 清除手机号验证
        clearFieldError(document.getElementById('wechatPhone'));
    }
    
    updateSubmitButton();
}

// 上传二维码
function uploadQRCode() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            handleQRCodeUpload(file);
        }
    };
    input.click();
}

// 处理二维码上传
function handleQRCodeUpload(file) {
    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
        showFieldError('qrcode', '请上传JPG或PNG格式的图片');
        return;
    }
    
    // 验证文件大小
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showFieldError('qrcode', '图片大小不能超过5MB');
        return;
    }
    
    // 显示预览
    const reader = new FileReader();
    reader.onload = function(e) {
        const qrCodePreview = document.getElementById('qrCodePreview');
        const qrCodeArea = qrCodePreview.parentElement;
        
        qrCodePreview.innerHTML = `
            <img src="${e.target.result}" alt="微信收款码" class="max-w-full max-h-32 rounded-lg mx-auto mb-2">
            <div class="text-sm text-green-600">收款码上传成功</div>
            <div class="text-xs text-gray-400 mt-1">点击重新上传</div>
        `;
        
        qrCodeArea.classList.add('has-image');
        uploadedQRCode = file;
        hideFieldError('qrcode');
        updateSubmitButton();
    };
    
    reader.readAsDataURL(file);
}

// 验证微信手机号
function validateWechatPhone(phoneNumber) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showFieldError('wechatPhone', '请输入正确的手机号');
        return false;
    }
    
    hideFieldError('wechatPhone');
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
        case 'wechatPhone':
            if (selectedAccountType === 'phone') {
                return validateWechatPhone(value);
            }
            return true;
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
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// 隐藏字段错误
function hideFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    if (field) {
        field.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
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
    const idNumber = document.getElementById('idNumber').value.trim();
    
    let accountValid = false;
    
    if (selectedAccountType === 'phone') {
        const wechatPhone = document.getElementById('wechatPhone').value.trim();
        accountValid = wechatPhone && validateWechatPhone(wechatPhone);
    } else if (selectedAccountType === 'qrcode') {
        accountValid = uploadedQRCode !== null;
    }
    
    const isValid = realName && idNumber && accountValid && agreeTerms;
    
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

// 提交微信信息
function submitWeChat() {
    // 验证所有字段
    const realName = document.getElementById('realName').value.trim();
    const idNumber = document.getElementById('idNumber').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!validateRealName(realName) ||
        !validateIdNumber(idNumber) ||
        !agreeTerms) {
        showToast('请检查表单信息');
        return;
    }
    
    // 验证账户信息
    let accountInfo = {};
    if (selectedAccountType === 'phone') {
        const wechatPhone = document.getElementById('wechatPhone').value.trim();
        if (!validateWechatPhone(wechatPhone)) {
            showToast('请输入正确的微信绑定手机号');
            return;
        }
        accountInfo = {
            type: 'phone',
            account: wechatPhone
        };
    } else if (selectedAccountType === 'qrcode') {
        if (!uploadedQRCode) {
            showToast('请上传微信收款码');
            return;
        }
        accountInfo = {
            type: 'qrcode',
            qrCodeName: uploadedQRCode.name,
            qrCodeSize: uploadedQRCode.size
        };
    }
    
    // 显示加载状态
    showLoading('正在提交...');
    
    // 模拟提交
    setTimeout(() => {
        hideLoading();
        
        // 保存微信信息
        const wechatInfo = {
            type: 'wechat',
            realName: realName,
            idNumber: idNumber,
            accountInfo: accountInfo,
            createTime: new Date().toISOString()
        };
        
        // 存储到本地
        let paymentMethods = JSON.parse(localStorage.getItem('paymentMethods') || '[]');
        paymentMethods.push(wechatInfo);
        localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
        
        showToast('微信添加成功');
        
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