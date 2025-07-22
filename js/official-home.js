// 聚贤人力官方主页增强功能
class OfficialHomePage {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupTypeWriter();
    }

    init() {
        // 设置移动端菜单状态
        this.mobileMenuOpen = false;
        
        // 检测设备类型
        this.isMobile = window.innerWidth <= 768;
        
        // 初始化页面数据
        this.pageData = {
            stats: {
                users: 50000,
                companies: 3000,
                satisfaction: 98,
                responseTime: 24
            },
            news: []
        };

        // 初始化滚动位置
        this.currentSection = 'home';
        
        console.log('聚贤人力官方主页初始化完成');
    }

    setupEventListeners() {
        // 移动端菜单切换
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        // 平滑滚动导航
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
        });

        // 窗口调整大小
        window.addEventListener('resize', () => this.handleResize());
        
        // 滚动事件
        window.addEventListener('scroll', () => this.handleScroll());

        // 表单提交
        const contactForm = document.querySelector('#contact form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // 服务卡片悬停效果
        this.setupServiceCards();

        // CTA按钮点击
        this.setupCTAButtons();
    }

    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        if (this.mobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.animation = 'slideDown 0.3s ease-out';
            // 更改菜单图标为关闭图标
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            `;
        } else {
            mobileMenu.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            // 恢复菜单图标
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            `;
        }
    }

    handleSmoothScroll(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // 考虑固定导航栏高度
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // 关闭移动端菜单
            if (this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }

            // 更新当前section
            this.currentSection = targetId.replace('#', '');
            this.updateActiveNavItem();
        }
    }

    updateActiveNavItem() {
        // 移除所有active状态
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('text-primary', 'font-semibold');
            link.classList.add('text-gray-700');
        });

        // 添加当前section的active状态
        const activeLink = document.querySelector(`nav a[href="#${this.currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('text-primary', 'font-semibold');
            activeLink.classList.remove('text-gray-700');
        }
    }

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;
        
        // 如果从移动端切换到桌面端，关闭移动菜单
        if (wasMobile && !this.isMobile && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    handleScroll() {
        const nav = document.querySelector('nav');
        const scrollY = window.scrollY;
        
        // 导航栏背景透明度调整
        if (scrollY > 50) {
            nav.classList.add('bg-white/95', 'shadow-md');
            nav.classList.remove('bg-white/90');
        } else {
            nav.classList.add('bg-white/90');
            nav.classList.remove('bg-white/95', 'shadow-md');
        }

        // 自动更新当前section
        this.updateCurrentSection();
    }

    updateCurrentSection() {
        const sections = ['home', 'services', 'advantage', 'news', 'contact'];
        const scrollY = window.scrollY + 100;

        for (let section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const offsetTop = element.offsetTop;
                const offsetHeight = element.offsetHeight;
                
                if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
                    if (this.currentSection !== section) {
                        this.currentSection = section;
                        this.updateActiveNavItem();
                    }
                    break;
                }
            }
        }
    }

    setupIntersectionObserver() {
        // 创建观察器用于动画效果
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    
                    // 如果是数据统计区域，启动数字动画
                    if (entry.target.classList.contains('stats-section')) {
                        this.animateStats();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察需要动画的元素
        document.querySelectorAll('.feature-card, .stats-section, article').forEach(el => {
            observer.observe(el);
        });
    }

    animateStats() {
        const statElements = document.querySelectorAll('[data-stat]');
        
        statElements.forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-stat'));
            const duration = 2000; // 2秒动画
            const increment = targetValue / (duration / 16); // 60fps
            let currentValue = 0;
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(counter);
                }
                
                // 格式化数字显示
                if (element.textContent.includes('+')) {
                    element.textContent = Math.floor(currentValue).toLocaleString() + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = Math.floor(currentValue) + '%';
                } else if (element.textContent.includes('H')) {
                    element.textContent = Math.floor(currentValue) + 'H';
                } else {
                    element.textContent = Math.floor(currentValue).toLocaleString();
                }
            }, 16);
        });
    }

    setupTypeWriter() {
        const typewriterElement = document.querySelector('.typewriter-text');
        if (!typewriterElement) return;

        const texts = [
            '专业人力资源服务平台',
            '企业与人才的桥梁',
            '您身边的HR专家',
            '成就每一个职业梦想'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // 暂停时间
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        };

        typeWriter();
    }

    setupServiceCards() {
        const serviceCards = document.querySelectorAll('.feature-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
            });
        });
    }

    setupCTAButtons() {
        // 立即注册按钮
        const registerBtn = document.querySelector('button:contains("立即注册")');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                this.showNotification('功能开发中，敬请期待！', 'info');
                // 这里可以跳转到注册页面
                // window.location.href = '/register.html';
            });
        }

        // 了解更多按钮
        const learnMoreBtn = document.querySelector('button:contains("了解更多")');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', () => {
                document.getElementById('services').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name') || e.target.querySelector('input[placeholder*="姓名"]')?.value,
            phone: formData.get('phone') || e.target.querySelector('input[placeholder*="电话"]')?.value,
            email: formData.get('email') || e.target.querySelector('input[placeholder*="邮箱"]')?.value,
            type: formData.get('type') || e.target.querySelector('select')?.value,
            message: formData.get('message') || e.target.querySelector('textarea')?.value
        };

        // 简单验证
        if (!data.name || !data.phone || !data.message) {
            this.showNotification('请填写必要信息！', 'error');
            return;
        }

        // 模拟提交
        this.showLoading('正在提交...');
        
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('感谢您的咨询！我们将在24小时内与您联系。', 'success');
            e.target.reset();
            
            // 保存到本地存储（实际项目中应发送到服务器）
            this.saveContactData(data);
        }, 2000);
    }

    saveContactData(data) {
        const contacts = JSON.parse(localStorage.getItem('official_contacts') || '[]');
        contacts.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now().toString()
        });
        localStorage.setItem('official_contacts', JSON.stringify(contacts));
    }

    showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
        
        // 根据类型设置样式
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-blue-500', 'text-white');
        }

        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 hover:opacity-75">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // 显示动画
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    showLoading(message = '加载中...') {
        const loading = document.createElement('div');
        loading.id = 'loading-overlay';
        loading.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        loading.innerHTML = `
            <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.getElementById('loading-overlay');
        if (loading) {
            loading.remove();
        }
    }

    // 添加实用工具方法
    static getInstance() {
        if (!window.officialHomePage) {
            window.officialHomePage = new OfficialHomePage();
        }
        return window.officialHomePage;
    }
}

// 添加自定义CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { transform: translateY(-10px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-10px); opacity: 0; }
    }
    
    @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
    }
    
    /* 移动端优化 */
    @media (max-width: 768px) {
        .hero-gradient {
            min-height: 100vh;
        }
        
        .feature-card {
            transform: none !important;
        }
        
        .floating-animation {
            animation-duration: 4s;
        }
    }
    
    /* 鼠标悬停效果增强 */
    .feature-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 8px;
    }
    
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
        background: #8A33D1;
        border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #6B21A8;
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    OfficialHomePage.getInstance();
});

// 导出到全局作用域
window.OfficialHomePage = OfficialHomePage; 