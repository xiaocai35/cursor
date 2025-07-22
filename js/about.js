// 聚贤人力 - 关于我们页面交互脚本

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

// 初始化关于我们页面
function initAboutPage() {
    // 初始化动画效果
    initAnimations();
    
    // 初始化交互效果
    initInteractions();
    
    console.log('关于我们页面初始化完成');
}

// 拨打电话
function callPhone(phoneNumber) {
    try {
        // 尝试直接拨打电话
        window.location.href = `tel:${phoneNumber}`;
        showToast(`正在拨打 ${phoneNumber}`);
    } catch (error) {
        // 如果无法直接拨打，复制到剪贴板
        copyToClipboard(phoneNumber);
        showToast(`电话号码已复制: ${phoneNumber}`);
    }
}

// 打开地图导航
function openMap() {
    const address = '福建省泉州市丰泽区东海街道东海大街888号聚贤大厦16楼';
    const encodedAddress = encodeURIComponent(address);
    
    // 检测设备类型并使用对应的地图应用
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (/iphone|ipad|ipod/.test(userAgent)) {
        // iOS 设备 - 使用苹果地图
        window.location.href = `maps://maps.apple.com/?q=${encodedAddress}`;
    } else if (/android/.test(userAgent)) {
        // Android 设备 - 使用高德地图或百度地图
        window.location.href = `androidamap://viewMap?sourceApplication=聚贤人力&poiname=聚贤人力&lat=&lon=&dev=0&style=2`;
    } else {
        // 其他设备 - 使用网页版地图
        window.open(`https://uri.amap.com/marker?position=118.675,24.908&name=聚贤人力&src=聚贤人力&coordinate=gaode&callnative=0`);
    }
    
    showToast('正在打开地图导航...');
}

// 发送邮件
function sendEmail() {
    const email = 'hr@juxianhr.com';
    const subject = '咨询聚贤人力服务';
    const body = '您好，我想了解聚贤人力的相关服务，请联系我。';
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    try {
        window.location.href = mailtoLink;
        showToast('正在打开邮件应用...');
    } catch (error) {
        // 如果无法打开邮件应用，复制邮箱地址
        copyToClipboard(email);
        showToast(`邮箱地址已复制: ${email}`);
    }
}

// 复制到剪贴板
function copyToClipboard(text) {
    // 创建临时文本区域
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
        textarea.select();
        document.execCommand('copy');
        console.log(`已复制到剪贴板: ${text}`);
    } catch (error) {
        console.error('复制失败:', error);
    } finally {
        document.body.removeChild(textarea);
    }
}

// 初始化动画效果
function initAnimations() {
    // 观察元素进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有信息卡片
    document.querySelectorAll('.info-card').forEach(card => {
        observer.observe(card);
    });
    
    // 数字统计动画
    animateNumbers();
}

// 数字统计动画
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(element => {
        const finalText = element.textContent;
        const hasPlus = finalText.includes('+');
        const number = parseInt(finalText.replace(/\D/g, ''));
        
        if (!isNaN(number)) {
            let current = 0;
            const increment = Math.max(1, Math.ceil(number / 30));
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                element.textContent = current + (hasPlus ? '+' : '') + (finalText.includes('年') ? '年' : '');
            }, 50);
        }
    });
}

// 初始化交互效果
function initInteractions() {
    // 添加卡片悬停效果
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 8px 25px rgba(138, 51, 209, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // 添加联系项目点击反馈
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.style.backgroundColor = '#f3f4f6';
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('touchend', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
        
        item.addEventListener('touchcancel', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
        
        // 鼠标事件
        item.addEventListener('mousedown', function() {
            this.style.backgroundColor = '#f3f4f6';
            this.style.transform = 'scale(0.98)';
        });
        
        item.addEventListener('mouseup', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });
    
    // 添加时间轴项目动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        timelineObserver.observe(item);
    });
}

// 显示公司详细信息弹窗
function showCompanyDetails() {
    const modalContent = `
        <div class="text-left">
            <h4 class="font-bold mb-3 text-center">福建聚贤人力资源服务有限公司</h4>
            <div class="space-y-3 text-sm">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-600">统一社会信用代码:</span>
                    </div>
                    <div>
                        <span class="text-gray-800">91350503MA123456XX</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-600">法定代表人:</span>
                    </div>
                    <div>
                        <span class="text-gray-800">张总</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-600">经营状态:</span>
                    </div>
                    <div>
                        <span class="text-green-600">存续</span>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-gray-600">成立日期:</span>
                    </div>
                    <div>
                        <span class="text-gray-800">2004年3月15日</span>
                    </div>
                </div>
            </div>
            <div class="mt-4 p-3 bg-blue-50 rounded text-xs">
                💼 专业从事劳务派遣、人才中介、人力资源外包等服务，具备完整的人力资源服务资质。
            </div>
        </div>
    `;
    
    showModal('企业工商信息', modalContent);
}

// 显示服务范围
function showServiceScope() {
    const serviceContent = `
        <div class="text-left">
            <h4 class="font-bold mb-3">我们的服务范围</h4>
            
            <div class="space-y-4">
                <div>
                    <h5 class="font-semibold text-sm mb-2 text-primary">🏭 劳务派遣</h5>
                    <ul class="text-xs text-gray-600 space-y-1 pl-3">
                        <li>• 制造业生产工人派遣</li>
                        <li>• 物流仓储人员派遣</li>
                        <li>• 服务业临时用工</li>
                        <li>• 季节性用工安排</li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-sm mb-2 text-primary">👥 人才招聘</h5>
                    <ul class="text-xs text-gray-600 space-y-1 pl-3">
                        <li>• 蓝领技术工人招聘</li>
                        <li>• 批量招工服务</li>
                        <li>• 定向人才培养</li>
                        <li>• 急招岗位快速响应</li>
                    </ul>
                </div>
                
                <div>
                    <h5 class="font-semibold text-sm mb-2 text-primary">🎯 增值服务</h5>
                    <ul class="text-xs text-gray-600 space-y-1 pl-3">
                        <li>• 员工技能培训</li>
                        <li>• 薪资代发服务</li>
                        <li>• 五险一金代办</li>
                        <li>• 员工关怀服务</li>
                    </ul>
                </div>
            </div>
            
            <div class="mt-4 p-3 bg-purple-50 rounded text-xs">
                📞 咨询热线：400-8866-520<br/>
                🕒 服务时间：周一至周日 8:00-20:00
            </div>
        </div>
    `;
    
    showModal('服务范围', serviceContent);
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

// 显示模态框
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-sm w-full max-h-96 overflow-y-auto">
            <div class="p-4 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h3 class="font-medium text-gray-800">${title}</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="p-4">
                ${content}
            </div>
            <div class="p-4 border-t border-gray-200">
                <button onclick="this.closest('.fixed').remove()" class="w-full bg-primary text-white py-2 rounded-lg">
                    确定
                </button>
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

// 获取设备信息
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
        isIOS: /iPad|iPhone|iPod/.test(userAgent),
        isAndroid: /Android/i.test(userAgent),
        isWeChat: /MicroMessenger/i.test(userAgent),
        platform: platform
    };
}

// 页面数据持久化
function savePageData() {
    const pageData = {
        visitTime: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    try {
        localStorage.setItem('aboutPageData', JSON.stringify(pageData));
    } catch (e) {
        console.log('保存页面数据失败:', e);
    }
}

// 页面卸载时保存数据
window.addEventListener('beforeunload', function() {
    savePageData();
});

console.log('关于我们页面脚本加载完成'); 