// 聚贤人力 - 设置页面交互脚本

// 设置状态管理
const SETTINGS_STATE = {
    notifications: {
        push: true,
        sms: true,
        night: false
    },
    userInfo: {
        name: '张三',
        phone: '138****8888',
        verified: true,
        avatar: ''
    },
    app: {
        version: 'v2.1.0',
        cacheSize: '12.5MB'
    }
};

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initSettingsPage();
});

// 初始化设置页面
function initSettingsPage() {
    // 加载保存的设置
    loadSavedSettings();
    
    // 初始化开关状态
    updateToggleSwitches();
    
    // 初始化交互
    initInteractions();
    
    console.log('设置页面初始化完成');
}

// 个人资料设置
function openProfileSettings() {
    showModal('个人资料', `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                <input type="text" value="${SETTINGS_STATE.userInfo.name}" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请输入真实姓名">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">电话</label>
                <input type="tel" value="${SETTINGS_STATE.userInfo.phone}" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请输入手机号码">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">头像</label>
                <div class="flex items-center space-x-4">
                    <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm">
                        更换头像
                    </button>
                </div>
            </div>
        </div>
    `, true);
}

// 简历管理设置
function openResumeSettings() {
    showToast('简历管理功能开发中');
}

// 密码设置
function openPasswordSettings() {
    showModal('修改密码', `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
                <input type="password" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请输入当前密码">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">新密码</label>
                <input type="password" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请输入新密码">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
                <input type="password" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请再次输入新密码">
            </div>
            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div class="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div class="text-sm text-yellow-800">
                        <p class="font-medium mb-1">密码安全建议：</p>
                        <ul class="list-disc list-inside space-y-1">
                            <li>包含字母、数字和特殊字符</li>
                            <li>长度不少于8位</li>
                            <li>定期更换密码</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `, true);
}

// 手机绑定设置
function openPhoneSettings() {
    showModal('绑定手机', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">当前绑定手机</h3>
                <p class="text-xl font-mono text-gray-700 mb-4">${SETTINGS_STATE.userInfo.phone}</p>
            </div>
            
            <div class="border-t pt-4">
                <button onclick="changePhone()" class="w-full bg-primary text-white py-3 rounded-lg mb-3">
                    更换手机号
                </button>
                <p class="text-sm text-gray-500 text-center">
                    更换手机号需要验证当前手机号码
                </p>
            </div>
        </div>
    `);
}

// 实名认证设置
function openAuthSettings() {
    showModal('实名认证', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">实名认证已完成</h3>
                <p class="text-sm text-gray-500 mb-4">您的身份信息已通过验证</p>
            </div>
            
            <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div class="text-sm">
                        <p class="font-medium text-green-800">认证信息</p>
                        <p class="text-green-700">姓名：${SETTINGS_STATE.userInfo.name}</p>
                        <p class="text-green-700">身份证：350***********1234</p>
                        <p class="text-green-700">认证时间：2024-12-01</p>
                    </div>
                </div>
            </div>
        </div>
    `);
}

// 通知开关切换
function toggleNotification(type) {
    SETTINGS_STATE.notifications[type] = !SETTINGS_STATE.notifications[type];
    
    const messages = {
        push: SETTINGS_STATE.notifications.push ? '推送通知已开启' : '推送通知已关闭',
        sms: SETTINGS_STATE.notifications.sms ? '短信通知已开启' : '短信通知已关闭',
        night: SETTINGS_STATE.notifications.night ? '夜间免打扰已开启' : '夜间免打扰已关闭'
    };
    
    showToast(messages[type]);
    saveSettings();
}

// 隐私政策
function openPrivacyPolicy() {
    showModal('隐私政策', `
        <div class="space-y-4 text-sm leading-relaxed">
            <div>
                <h4 class="font-medium text-gray-900 mb-2">信息收集</h4>
                <p class="text-gray-700">我们收集您主动提供的信息，包括注册信息、求职信息等，用于为您提供更好的服务。</p>
            </div>
            
            <div>
                <h4 class="font-medium text-gray-900 mb-2">信息使用</h4>
                <p class="text-gray-700">我们使用收集的信息来提供、维护和改进我们的服务，包括职位推荐、面试安排等。</p>
            </div>
            
            <div>
                <h4 class="font-medium text-gray-900 mb-2">信息保护</h4>
                <p class="text-gray-700">我们采用行业标准的安全措施来保护您的个人信息，防止未经授权的访问、使用或披露。</p>
            </div>
            
            <div>
                <h4 class="font-medium text-gray-900 mb-2">联系我们</h4>
                <p class="text-gray-700">如有隐私相关问题，请联系我们：privacy@juxianhr.com</p>
            </div>
        </div>
    `);
}

// 清除缓存
function clearCache() {
    showConfirm('清除缓存', `确定要清除应用缓存吗？\n缓存大小：${SETTINGS_STATE.app.cacheSize}`, () => {
        showLoading('正在清除缓存...');
        
        setTimeout(() => {
            hideLoading();
            SETTINGS_STATE.app.cacheSize = '2.1MB';
            showToast('缓存清除成功');
        }, 2000);
    });
}

// 帮助中心
function openHelp() {
    showModal('帮助中心', `
        <div class="space-y-4">
            <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="showHelpDetail('register')">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-800">如何注册账号？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="showHelpDetail('apply')">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-800">如何申请工作？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="showHelpDetail('salary')">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-800">工资如何发放？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
            
            <div class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50" onclick="showHelpDetail('problem')">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-gray-800">遇到问题怎么办？</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    `);
}

// 在线客服
function contactService() {
    showModal('联系客服', `
        <div class="space-y-4">
            <div class="text-center">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">客服联系方式</h3>
            </div>
            
            <div class="space-y-3">
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="text-gray-800">客服热线</span>
                    </div>
                    <span class="text-primary font-medium">400-8866-520</span>
                </div>
                
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-gray-800">服务时间</span>
                    </div>
                    <span class="text-gray-600">8:00-20:00</span>
                </div>
                
                <div class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span class="text-gray-800">客服邮箱</span>
                    </div>
                    <span class="text-primary font-medium">service@juxianhr.com</span>
                </div>
            </div>
        </div>
    `);
}

// 意见反馈
function openFeedback() {
    window.location.href = 'feedback.html';
}

// 检查更新
function checkUpdate() {
    showLoading('检查更新中...');
    
    setTimeout(() => {
        hideLoading();
        showModal('检查更新', `
            <div class="text-center space-y-4">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-medium text-gray-900 mb-2">已是最新版本</h3>
                    <p class="text-sm text-gray-500">当前版本：${SETTINGS_STATE.app.version}</p>
                    <p class="text-sm text-gray-500">您使用的已是最新版本</p>
                </div>
            </div>
        `);
    }, 1500);
}

// 关于应用
function openAbout() {
    window.location.href = 'about.html';
}

// 更换手机号
function changePhone() {
    hideModal();
    showModal('更换手机号', `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">当前手机号验证</label>
                <div class="flex space-x-2">
                    <input type="text" 
                           class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                           placeholder="请输入验证码">
                    <button class="bg-primary text-white px-4 py-3 rounded-lg text-sm whitespace-nowrap">
                        发送验证码
                    </button>
                </div>
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">新手机号</label>
                <input type="tel" 
                       class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       placeholder="请输入新手机号">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">新手机号验证</label>
                <div class="flex space-x-2">
                    <input type="text" 
                           class="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                           placeholder="请输入验证码">
                    <button class="bg-primary text-white px-4 py-3 rounded-lg text-sm whitespace-nowrap">
                        发送验证码
                    </button>
                </div>
            </div>
        </div>
    `, true);
}

// 显示帮助详情
function showHelpDetail(type) {
    const helpContent = {
        register: '1. 点击注册按钮\n2. 输入手机号获取验证码\n3. 设置登录密码\n4. 完成注册',
        apply: '1. 浏览职位列表\n2. 点击感兴趣的职位\n3. 查看详细信息\n4. 点击报名按钮',
        salary: '1. 工资按月发放\n2. 每月15日准时到账\n3. 可在薪资页面查看详情\n4. 如有疑问联系HR',
        problem: '1. 查看帮助中心\n2. 联系在线客服\n3. 拨打客服热线\n4. 发送邮件反馈'
    };
    
    hideModal();
    showToast(helpContent[type] || '暂无相关帮助信息');
}

// 退出登录确认
function showLogoutConfirm() {
    document.getElementById('logoutModal').classList.remove('hidden');
}

function hideLogoutConfirm() {
    document.getElementById('logoutModal').classList.add('hidden');
}

function confirmLogout() {
    showLoading('正在退出...');
    
    setTimeout(() => {
        hideLoading();
        // 清除本地存储
        localStorage.clear();
        // 跳转到登录页面或首页
        window.location.href = 'index.html';
        showToast('已退出登录');
    }, 1000);
}

// 加载保存的设置
function loadSavedSettings() {
    try {
        const saved = localStorage.getItem('userSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            Object.assign(SETTINGS_STATE, settings);
        }
    } catch (e) {
        console.error('加载设置失败:', e);
    }
}

// 保存设置
function saveSettings() {
    try {
        localStorage.setItem('userSettings', JSON.stringify(SETTINGS_STATE));
    } catch (e) {
        console.error('保存设置失败:', e);
    }
}

// 更新开关状态
function updateToggleSwitches() {
    document.getElementById('pushNotification').checked = SETTINGS_STATE.notifications.push;
    document.getElementById('smsNotification').checked = SETTINGS_STATE.notifications.sms;
    document.getElementById('nightMode').checked = SETTINGS_STATE.notifications.night;
}

// 初始化交互
function initInteractions() {
    // 添加设置项点击反馈
    const settingItems = document.querySelectorAll('.setting-item');
    settingItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.backgroundColor = '#f3f4f6';
        });
        
        item.addEventListener('touchend', function() {
            this.style.backgroundColor = '';
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.backgroundColor = '';
        });
        
        // 鼠标事件
        item.addEventListener('mousedown', function() {
            this.style.backgroundColor = '#f3f4f6';
        });
        
        item.addEventListener('mouseup', function() {
            this.style.backgroundColor = '';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
}

// 工具函数

// 显示模态框
function showModal(title, content, hasConfirm = false) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
    
    const confirmButton = hasConfirm ? `
        <button onclick="this.closest('.fixed').remove()" class="flex-1 bg-primary text-white rounded-lg py-2 mr-2">
            确定
        </button>
    ` : '';
    
    modal.innerHTML = `
        <div class="flex items-center justify-center h-full px-4">
            <div class="bg-white rounded-lg w-full max-w-sm max-h-96 overflow-y-auto">
                <div class="p-4 border-b border-gray-200">
                    <div class="flex justify-between items-center">
                        <h3 class="font-medium text-gray-800">${title}</h3>
                        <button onclick="this.closest('.fixed').remove()" class="text-gray-400">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-4">
                    ${content}
                </div>
                <div class="p-4 border-t border-gray-200 flex">
                    ${confirmButton}
                    <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700">
                        ${hasConfirm ? '取消' : '关闭'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // 显示动画
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

// 隐藏模态框
function hideModal() {
    const modals = document.querySelectorAll('.fixed.inset-0.bg-black.bg-opacity-50');
    modals.forEach(modal => {
        if (!modal.id) { // 不是特定的模态框
            modal.remove();
        }
    });
}

// 显示确认对话框
function showConfirm(title, message, callback) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50';
    
    modal.innerHTML = `
        <div class="flex items-center justify-center h-full px-4">
            <div class="bg-white rounded-lg w-full max-w-sm">
                <div class="p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
                    <p class="text-sm text-gray-500 mb-6" style="white-space: pre-line;">${message}</p>
                    <div class="flex space-x-3">
                        <button onclick="this.closest('.fixed').remove()" class="flex-1 border border-gray-300 rounded-lg py-2 text-gray-700">
                            取消
                        </button>
                        <button onclick="this.closest('.fixed').remove(); (${callback})()" class="flex-1 bg-primary text-white rounded-lg py-2">
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 显示加载状态
function showLoading(message = '加载中...') {
    const loading = document.createElement('div');
    loading.id = 'loadingOverlay';
    loading.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    
    loading.innerHTML = `
        <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span class="text-gray-700">${message}</span>
        </div>
    `;
    
    document.body.appendChild(loading);
}

// 隐藏加载状态
function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

// 显示提示消息
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -20px)';
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '1';
        toast.style.transform = 'translate(-50%, 0)';
    }, 10);
    
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

console.log('设置页面脚本加载完成'); 