// ============================================
// Apple Style - 景观设计师个人简历
// 交互脚本
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initNavbarStyle();
    initScrollReveal();
    initSmoothScroll();
    initContentProtection();
});

// 移动端导航
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // 点击链接关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// 导航栏样式切换
function initNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    if (!navbar || !hero) return;

    const updateNavbar = () => {
        const heroBottom = hero.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > heroBottom - 52) {
            navbar.style.background = 'rgba(251, 251, 253, 0.92)';
        } else if (scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
            navbar.querySelectorAll('a').forEach(a => a.style.color = '#fff');
        } else {
            navbar.style.background = 'transparent';
            navbar.querySelectorAll('a').forEach(a => a.style.color = '#fff');
        }

        // 恢复正常颜色
        if (scrollY > heroBottom - 52) {
            navbar.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
            navbar.querySelector('.logo').style.color = '';
        }
    };

    // 初始状态
    navbar.style.background = 'transparent';
    navbar.style.borderBottom = 'none';
    navbar.querySelectorAll('a').forEach(a => a.style.color = '#fff');

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
}

// 滚动显示动画 - 增强版
function initScrollReveal() {
    // 检测用户是否偏好减少动画
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // 1. 通用动画元素（自定义类）
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-title');

    // 2. 项目卡片（错落动画）
    const projectCards = document.querySelectorAll('.project-card');

    // 3. 工作经历（错落动画）
    const experienceItems = document.querySelectorAll('.experience-item');

    // 4. 奖项列表（错落动画）
    const awardItems = document.querySelectorAll('.awards-inline .award-item');

    // 5. 技能列表（错落动画）
    const skillItems = document.querySelectorAll('.skills-list li');

    // 6. 联系方式（错落动画）
    const contactItems = document.querySelectorAll('.contact-item');

    // 7. section标题（单独处理）
    const sectionLabels = document.querySelectorAll('.section-label');
    const sectionTitles = document.querySelectorAll('.section-title');

    // 创建观察器 - 通用元素
    const createObserver = (threshold = 0.1, rootMargin = '0px 0px -50px 0px') => {
        return new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold, rootMargin });
    };

    // 创建带延迟的观察器 - 用于列表项的错落效果
    const createStaggeredObserver = (staggerDelay = 80, threshold = 0.1) => {
        let visibleCount = 0;

        return new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 获取元素在同级中的索引来计算延迟
                    const siblings = entry.target.parentElement.children;
                    let index = Array.from(siblings).indexOf(entry.target);

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * staggerDelay);

                    staggeredObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold,
            rootMargin: '0px 0px -30px 0px'
        });
    };

    const observer = createObserver();
    const staggeredObserver = createStaggeredObserver(80);
    const skillObserver = createStaggeredObserver(60);
    const contactObserver = createStaggeredObserver(100);

    // 为section标题添加动画类并观察
    sectionLabels.forEach(el => {
        el.classList.add('animate-title');
        observer.observe(el);
    });

    sectionTitles.forEach(el => {
        el.classList.add('animate-title', 'delay-1');
        observer.observe(el);
    });

    // 观察通用动画元素
    animatedElements.forEach(el => observer.observe(el));

    // 观察项目卡片（错落效果）
    projectCards.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 2) * 0.15}s`;
        staggeredObserver.observe(el);
    });

    // 观察工作经历
    experienceItems.forEach(el => staggeredObserver.observe(el));

    // 观察奖项
    awardItems.forEach(el => staggeredObserver.observe(el));

    // 观察技能列表
    skillItems.forEach(el => skillObserver.observe(el));

    // 观察联系方式
    contactItems.forEach(el => contactObserver.observe(el));
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offset = 52; // 导航栏高度
                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 汉堡菜单动画样式
const style = document.createElement('style');
style.textContent = `
    .hamburger.active span:first-child {
        transform: rotate(45deg) translate(4px, 4px);
    }
    .hamburger.active span:last-child {
        transform: rotate(-45deg) translate(4px, -4px);
    }
`;
document.head.appendChild(style);

// ============================================
// 内容保护功能
// ============================================
function initContentProtection() {
    // 1. 禁用右键菜单
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // 2. 禁用图片拖拽
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    // 3. 禁用常见截图/复制快捷键
    document.addEventListener('keydown', (e) => {
        // PrintScreen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }

        // Ctrl+P (打印)
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            return false;
        }

        // Ctrl+S (保存)
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+S (另存为)
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            return false;
        }

        // Ctrl+U (查看源代码)
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+I / F12 (开发者工具)
        if ((e.ctrlKey && e.shiftKey && e.key === 'I') || e.key === 'F12') {
            e.preventDefault();
            return false;
        }

        // Ctrl+Shift+C (检查元素)
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    });

    // 4. 禁用文本选择（可选，如果需要允许选择文字可以去掉）
    // document.body.style.userSelect = 'none';
    // document.body.style.webkitUserSelect = 'none';

    // 5. 为所有图片添加保护
    const protectImages = () => {
        document.querySelectorAll('img').forEach(img => {
            // 禁用拖拽
            img.setAttribute('draggable', 'false');
            // 添加保护样式
            img.style.pointerEvents = 'none';
        });
    };

    protectImages();

    // 监听动态添加的图片
    const observer = new MutationObserver(protectImages);
    observer.observe(document.body, { childList: true, subtree: true });

    // 6. 检测开发者工具打开（基础检测）
    let devtoolsOpen = false;
    const threshold = 160;

    const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // 可以选择显示警告或模糊页面
                document.body.style.filter = 'blur(10px)';
            }
        } else {
            if (devtoolsOpen) {
                devtoolsOpen = false;
                document.body.style.filter = 'none';
            }
        }
    };

    window.addEventListener('resize', checkDevTools);
    setInterval(checkDevTools, 1000);
}
