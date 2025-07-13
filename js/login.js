// 登录页面JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面
    initializePage();
    
    // 检查已保存的用户信息
    checkSavedUser();
});

// 初始化页面
function initializePage() {
    // 检查条款同意状态
    const agreeCheckbox = document.getElementById('agree');
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', updateLoginButtons);
    }
    
    // 初始化按钮状态
    updateLoginButtons();
}

// 检查已保存的用户信息
function checkSavedUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            updateUserDisplay(user);
        } catch (e) {
            console.error('解析用户信息失败:', e);
        }
    }
}

// 更新用户显示
function updateUserDisplay(user) {
    const userDisplay = document.getElementById('userDisplay');
    if (userDisplay && user) {
        const maskedPhone = user.phone ? user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') : '';
        userDisplay.textContent = `${user.name || '用户'}(${maskedPhone})`;
    }
}

// 更新登录按钮状态
function updateLoginButtons() {
    const agreeCheckbox = document.getElementById('agree');
    const buttons = document.querySelectorAll('button[onclick^="quickLogin"], button[onclick^="wechatLogin"], button[onclick^="phoneLogin"]');
    
    const isAgreed = agreeCheckbox ? agreeCheckbox.checked : false;
    
    buttons.forEach(button => {
        button.disabled = !isAgreed;
        if (!isAgreed) {
            button.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            button.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    });
}

// 返回上一页
function goBack() {
    // 检查是否有历史记录
    if (window.history.length > 1) {
        window.history.back();
    } else {
        // 如果没有历史记录，返回首页
        window.location.href = 'index.html';
    }
}

// 快捷登录
function quickLogin() {
    if (!checkAgreement()) return;
    
    // 模拟快捷登录流程
    showLoadingState('正在快捷登录...');
    
    setTimeout(() => {
        // 模拟登录成功
        const userData = {
            id: generateUserId(),
            name: '张三',
            phone: '13800138000',
            loginType: 'quick',
            loginTime: new Date().toISOString()
        };
        
        // 保存用户信息
        saveUserData(userData);
        
        // 显示登录成功
        showSuccessMessage('登录成功！', () => {
            // 跳转到首页
            window.location.href = 'index.html';
        });
        
    }, 1500);
}

// 微信登录
function wechatLogin() {
    if (!checkAgreement()) return;
    
    // 模拟微信登录流程
    showLoadingState('正在跳转微信登录...');
    
    setTimeout(() => {
        // 模拟微信登录成功
        const userData = {
            id: generateUserId(),
            name: '李四',
            phone: '13900139000',
            loginType: 'wechat',
            wechatId: 'wechat_user_123',
            loginTime: new Date().toISOString()
        };
        
        // 保存用户信息
        saveUserData(userData);
        
        // 显示登录成功
        showSuccessMessage('微信登录成功！', () => {
            // 跳转到首页
            window.location.href = 'index.html';
        });
        
    }, 2000);
}

// 手机号登录
function phoneLogin() {
    if (!checkAgreement()) return;
    
    // 显示手机号登录弹窗
    const modal = document.getElementById('phoneLoginModal');
    if (modal) {
        modal.classList.remove('hidden');
        
        // 清空输入框
        document.getElementById('phoneInput').value = '';
        document.getElementById('codeInput').value = '';
        
        // 焦点到手机号输入框
        document.getElementById('phoneInput').focus();
    }
}

// 关闭手机号登录弹窗
function closePhoneModal() {
    const modal = document.getElementById('phoneLoginModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// 发送验证码
function sendCode() {
    const phoneInput = document.getElementById('phoneInput');
    const phone = phoneInput.value.trim();
    
    // 验证手机号
    if (!validatePhone(phone)) {
        showErrorMessage('请输入正确的手机号');
        return;
    }
    
    // 模拟发送验证码
    const button = event.target;
    button.disabled = true;
    button.textContent = '发送中...';
    
    setTimeout(() => {
        // 模拟发送成功
        showSuccessMessage('验证码已发送');
        
        // 开始倒计时
        startCountdown(button);
        
    }, 1000);
}

// 倒计时功能
function startCountdown(button) {
    let countdown = 60;
    
    const timer = setInterval(() => {
        button.textContent = `${countdown}s后重发`;
        countdown--;
        
        if (countdown < 0) {
            clearInterval(timer);
            button.disabled = false;
            button.textContent = '发送验证码';
        }
    }, 1000);
}

// 提交手机号登录
function submitPhoneLogin() {
    const phoneInput = document.getElementById('phoneInput');
    const codeInput = document.getElementById('codeInput');
    
    const phone = phoneInput.value.trim();
    const code = codeInput.value.trim();
    
    // 验证输入
    if (!validatePhone(phone)) {
        showErrorMessage('请输入正确的手机号');
        return;
    }
    
    if (!code) {
        showErrorMessage('请输入验证码');
        return;
    }
    
    if (code.length !== 4) {
        showErrorMessage('验证码格式错误');
        return;
    }
    
    // 模拟登录验证
    showLoadingState('正在验证登录...');
    
    setTimeout(() => {
        // 模拟登录成功
        const userData = {
            id: generateUserId(),
            name: '王五',
            phone: phone,
            loginType: 'phone',
            loginTime: new Date().toISOString()
        };
        
        // 保存用户信息
        saveUserData(userData);
        
        // 关闭弹窗
        closePhoneModal();
        
        // 显示登录成功
        showSuccessMessage('登录成功！', () => {
            // 跳转到首页
            window.location.href = 'index.html';
        });
        
    }, 1500);
}

// 检查条款同意
function checkAgreement() {
    const agreeCheckbox = document.getElementById('agree');
    if (!agreeCheckbox || !agreeCheckbox.checked) {
        showErrorMessage('请先同意用户协议和隐私政策');
        return false;
    }
    return true;
}

// 验证手机号
function validatePhone(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// 生成用户ID
function generateUserId() {
    return 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// 保存用户数据
function saveUserData(userData) {
    try {
        // 保存当前用户
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // 保存到用户列表
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingIndex = users.findIndex(u => u.phone === userData.phone);
        
        if (existingIndex !== -1) {
            users[existingIndex] = userData;
        } else {
            users.push(userData);
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // 更新页面显示
        updateUserDisplay(userData);
        
    } catch (e) {
        console.error('保存用户数据失败:', e);
    }
}

// 显示加载状态
function showLoadingState(message) {
    // 创建加载遮罩
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    overlay.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span class="text-gray-700">${message}</span>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// 隐藏加载状态
function hideLoadingState() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// 显示成功消息
function showSuccessMessage(message, callback) {
    hideLoadingState();
    
    // 创建成功提示
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    overlay.innerHTML = `
        <div class="bg-white rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <p class="text-gray-800 mb-4">${message}</p>
            <button onclick="this.parentElement.parentElement.remove(); ${callback ? 'callback()' : ''}" 
                    class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                确定
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // 自动关闭
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
            if (callback) callback();
        }
    }, 2000);
}

// 显示错误消息
function showErrorMessage(message) {
    hideLoadingState();
    
    // 创建错误提示
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    
    overlay.innerHTML = `
        <div class="bg-white rounded-lg p-6 text-center">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </div>
            <p class="text-gray-800 mb-4">${message}</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                确定
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // 自动关闭
    setTimeout(() => {
        if (overlay.parentNode) {
            overlay.remove();
        }
    }, 3000);
}

// 点击弹窗外部关闭
document.addEventListener('click', function(e) {
    const modal = document.getElementById('phoneLoginModal');
    if (modal && e.target === modal) {
        closePhoneModal();
    }
});

// 键盘事件处理
document.addEventListener('keydown', function(e) {
    // ESC键关闭弹窗
    if (e.key === 'Escape') {
        closePhoneModal();
    }
    
    // 回车键提交表单
    if (e.key === 'Enter') {
        const modal = document.getElementById('phoneLoginModal');
        if (modal && !modal.classList.contains('hidden')) {
            submitPhoneLogin();
        }
    }
}); 