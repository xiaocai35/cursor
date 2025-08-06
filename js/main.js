// 蓝诚人力微信小程序交互脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查用户状态，决定显示哪个首页
    checkUserStatusAndRedirect();
    
    // 初始化UI交互效果
    initUIInteractions();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化筛选功能
    initFilter();
});

// 检查用户状态并重定向
function checkUserStatusAndRedirect() {
    // 只在index.html页面执行此检查
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const employmentInfo = JSON.parse(localStorage.getItem('employmentInfo') || '{}');
        
        // 检查用户是否为在职员工
        if (userInfo.employmentStatus === 'submitted' && employmentInfo.employeeName) {
            // 在职员工跳转到员工专用首页
            window.location.href = 'employee-home.html';
            return;
        }
    }
}

// 初始化UI交互效果
function initUIInteractions() {
    // 获取所有按钮元素
    const buttons = document.querySelectorAll('button');
    
    // 为每个按钮添加点击效果
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('opacity-70');
            setTimeout(() => {
                this.classList.remove('opacity-70');
            }, 150);
            
            // 如果是报名按钮，则触发报名流程
            if (this.textContent.trim() === '报名') {
                handleJobApplication(this);
            }
        });
    });

    // 获取所有职位卡片元素
    const jobCards = document.querySelectorAll('.card-hover');
    
    // 为每个职位卡片添加点击效果
    jobCards.forEach(card => {
        card.addEventListener('click', function() {
            // 获取职位信息
            const jobTitle = this.querySelector('.font-medium').textContent;
            const company = this.querySelector('.text-gray-500').textContent;
            
            // 这里可以跳转到职位详情页
            console.log(`查看职位: ${jobTitle} - ${company}`);
            // window.location.href = `job-detail.html?job=${encodeURIComponent(jobTitle)}`;
        });
    });
    
    // 为底部导航添加点击效果
    const navItems = document.querySelectorAll('.flex.flex-col.items-center');
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // 根据索引跳转到不同页面
            const pages = ['index.html', 'messages.html', 'account.html'];
            if (window.location.pathname.includes(pages[index])) return;
            // window.location.href = pages[index];
            console.log(`导航到: ${pages[index]}`);
        });
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.querySelector('input[placeholder="搜索职位名称、公司"]');
    
    searchInput.addEventListener('focus', function() {
        // 添加搜索框获得焦点效果
        this.parentElement.classList.add('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    
    searchInput.addEventListener('blur', function() {
        // 移除搜索框失去焦点效果
        this.parentElement.classList.remove('ring-2', 'ring-primary', 'ring-opacity-50');
    });
    
    searchInput.addEventListener('input', function() {
        // 可以在这里实现实时搜索功能
        console.log(`搜索: ${this.value}`);
    });
    
    // 添加回车搜索功能
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch(this.value.trim());
        }
    });
    
    // 点击搜索框也跳转到搜索页面
    searchInput.addEventListener('click', function() {
        if (this.value.trim()) {
            performSearch(this.value.trim());
        } else {
            // 没有输入内容时，跳转到空搜索页面
            window.location.href = 'search-results.html';
        }
    });
}

// 执行搜索
function performSearch(keyword) {
    if (keyword) {
        window.location.href = `search-results.html?q=${encodeURIComponent(keyword)}`;
    } else {
        window.location.href = 'search-results.html';
    }
}

// 初始化筛选功能
function initFilter() {
    const locationTags = document.querySelectorAll('.text-gray-700.px-2.py-1.bg-gray-100.rounded-full');
    
    // 为地区标签添加点击事件
    locationTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const location = this.textContent.trim();
            if (location && location !== '筛选') {
                // 跳转到搜索结果页面，并传递地区参数
                window.location.href = `search-results.html?location=${encodeURIComponent(location)}`;
            } else if (location === '筛选') {
                // 如果是筛选按钮，跳转到搜索页面
                window.location.href = 'search-results.html';
            }
            console.log(`筛选地区: ${location}`);
        });
    });
}

// 处理工作报名流程
function handleJobApplication(button) {
    const jobCard = button.closest('.card-hover');
    const jobTitle = jobCard.querySelector('.font-medium').textContent;
    const company = jobCard.querySelector('.text-gray-500').textContent;
    
    console.log(`申请职位: ${jobTitle} - ${company}`);
    
    // 显示报名成功提示
    showToast('报名成功，请留意消息通知');
}

// 切换到员工模式（测试功能）
function switchToEmployeeMode() {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 mx-4 w-full max-w-sm">
            <div class="text-center mb-4">
                <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">模拟员工模式</h3>
                <p class="text-gray-600 mb-4">这将模拟您已提交在职信息，切换到员工工作台</p>
            </div>
            
            <div class="flex space-x-3">
                <button onclick="closeTestModal(this)" class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium">
                    取消
                </button>
                <button onclick="confirmEmployeeMode()" class="flex-1 bg-primary text-white py-3 rounded-lg font-medium">
                    确认切换
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 确认切换到员工模式
function confirmEmployeeMode() {
    // 设置用户为在职状态
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    userInfo.employmentStatus = 'submitted';
    userInfo.name = '张三';
    userInfo.phone = '138****5678';
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    
    // 创建模拟在职信息
    const employmentInfo = {
        employeeName: '张三',
        phoneNumber: '13812345678',
        factory: {
            value: 'factory1',
            text: '福建华威塑料工业有限公司'
        },
        position: {
            value: 'operator1',
            text: '生产线操作工'
        },
        hireDate: '2024-01-01',
        submitTime: new Date().toISOString(),
        status: 'approved'
    };
    localStorage.setItem('employmentInfo', JSON.stringify(employmentInfo));
    
    showToast('已切换到员工模式', 'success');
    
    // 关闭模态框
    const modal = document.querySelector('.fixed');
    if (modal) {
        document.body.removeChild(modal);
    }
    
    // 1秒后跳转到员工首页
    setTimeout(() => {
        window.location.href = 'employee-home.html';
    }, 1000);
}

// 关闭测试模态框
function closeTestModal(button) {
    const modal = button.closest('.fixed');
    document.body.removeChild(modal);
}

// 显示提示信息
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg text-white text-sm z-50 transition-opacity duration-300`;
    
    if (type === 'error') {
        toast.className += ' bg-red-500';
    } else if (type === 'success') {
        toast.className += ' bg-green-500';
    } else {
        toast.className += ' bg-blue-500';
    }
    
    toast.textContent = message;
    toast.style.opacity = '0';
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => toast.style.opacity = '1', 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 跳转到登录页面
function goToLogin() {
    window.location.href = 'login.html';
}