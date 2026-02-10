// ========== 生日祝福页面 JavaScript ==========

// 状态变量
let candleBlown = false;

// ========== 背景动画效果 ==========

/**
 * 创建飘落的花瓣
 */
function createPetals() {
    const container = document.getElementById('petals-container');
    const petals = ['🌸', '🌺', '🌷', '💮', '🏵️', '🌹'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.opacity = Math.random() * 0.5 + 0.3;
        petal.style.fontSize = (Math.random() * 20 + 15) + 'px';
        container.appendChild(petal);
        
        setTimeout(() => petal.remove(), 10000);
    }, 800);
}

/**
 * 创建闪烁的星星
 */
function createStars() {
    const container = document.getElementById('stars-container');
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        container.appendChild(star);
    }
}

/**
 * 创建上升的气球
 */
function createBalloons() {
    const container = document.getElementById('balloons-container');
    const balloons = ['🎈', '🎊', '🎉', '✨'];
    
    setInterval(() => {
        const balloon = document.createElement('div');
        balloon.className = 'balloons';
        balloon.textContent = balloons[Math.floor(Math.random() * balloons.length)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.animationDuration = (Math.random() * 10 + 15) + 's';
        balloon.style.fontSize = (Math.random() * 30 + 30) + 'px';
        container.appendChild(balloon);
        
        setTimeout(() => balloon.remove(), 25000);
    }, 3000);
}

// ========== 烟花效果 ==========

/**
 * 创建烟花效果
 */
function createFireworks() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'];
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6 + 100;
            
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = x + 'px';
            firework.style.top = y + 'px';
            
            for (let j = 0; j < 20; j++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                const angle = (j / 20) * Math.PI * 2;
                const velocity = 100 + Math.random() * 50;
                particle.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
                
                firework.appendChild(particle);
            }
            
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1000);
        }, i * 200);
    }
}

// ========== 交互功能 ==========

/**
 * 礼物盒烟花特效 - 从底部向上发射后爆开
 */
function openGiftWithFireworks(element) {
    // 礼物盒弹跳动画
    element.style.animation = 'giftBounce 0.5s ease';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
    
    // 发射多组烟花，从底部不同位置
    const launchPositions = [20, 35, 50, 65, 80]; // 屏幕宽度百分比
    
    launchPositions.forEach((pos, index) => {
        setTimeout(() => {
            const x = window.innerWidth * (pos / 100);
            launchFirework(x);
        }, index * 300);
    });
    
    // 额外再发射几组
    setTimeout(() => {
        launchFirework(window.innerWidth * 0.3);
        setTimeout(() => launchFirework(window.innerWidth * 0.7), 200);
    }, 1500);
}

/**
 * 发射单个烟花 - 从底部上升到空中爆开
 */
function launchFirework(launchX) {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ffd700', '#ff4757', '#a29bfe'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    // 目标爆炸高度 - 飞得更高 (60%-85% 屏幕高度，即接近顶部)
    const targetY = window.innerHeight * (0.6 + Math.random() * 0.25);

    // 创建上升的小球（弹头）
    const rocket = document.createElement('div');
    rocket.className = 'firework-rocket';
    rocket.style.left = (launchX - 3) + 'px';
    rocket.style.backgroundColor = color;
    rocket.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`;
    document.body.appendChild(rocket);

    // 创建尾迹粒子数组
    const trailParticles = [];
    const trailInterval = setInterval(() => {
        const particle = document.createElement('div');
        particle.className = 'trail-particle';
        particle.style.left = launchX + 'px';
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px ${color}`;
        document.body.appendChild(particle);
        trailParticles.push(particle);

        // 尾迹粒子渐隐消失
        particle.animate([
            { opacity: 0.8, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.5)' }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    }, 30);

    // 弹头上升动画
    const duration = 1000 + Math.random() * 400;
    rocket.animate([
        { bottom: '0', transform: 'scale(1)' },
        { bottom: targetY + 'px', transform: 'scale(0.8)' }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => {
        clearInterval(trailInterval);
        rocket.remove();
        // 到达顶点后爆炸
        explodeFirework(launchX, window.innerHeight - targetY, color);
    };
}

/**
 * 烟花爆炸效果
 */
function explodeFirework(x, y, color) {
    const explosion = document.createElement('div');
    explosion.className = 'firework-explosion';
    explosion.style.left = x + 'px';
    explosion.style.top = y + 'px';

    // 检测是否为移动设备
    const isMobile = window.innerWidth <= 600;

    // 创建爆炸粒子 - 移动端减少数量
    const particleCount = isMobile ? 20 : 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.backgroundColor = color;

        // 随机角度和速度
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = isMobile ? 60 + Math.random() * 80 : 80 + Math.random() * 100;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        explosion.appendChild(particle);
    }

    // 添加闪光效果
    const flash = document.createElement('div');
    flash.className = 'explosion-flash';
    flash.style.backgroundColor = color;
    explosion.appendChild(flash);

    document.body.appendChild(explosion);

    // 清理
    setTimeout(() => explosion.remove(), 1200);
}

// 烟花定时器
let fireworkInterval = null;

/**
 * 吹灭蜡烛
 */
function blowCandle() {
    if (candleBlown) return;
    
    const cake = document.getElementById('cake');
    const flame = document.getElementById('flame');
    const wishText = document.getElementById('wishText');
    const blowHint = document.getElementById('blowHint');
    
    candleBlown = true;
    
    // 添加吹灭动画
    flame.classList.add('blown');
    cake.classList.add('blown');
    
    // 改变文字
    wishText.textContent = '🎉 愿望已许下，生日快乐！🎉';
    wishText.style.color = '#ffd700';
    wishText.style.fontWeight = 'bold';
    
    // 隐藏提示
    blowHint.classList.remove('show');
    
    // 立即放一组烟花
    launchMultipleFireworks();
    
    // 创建额外的爱心效果
    createFloatingHearts();
    
    // 开始持续放烟花
    startContinuousFireworks();
}

/**
 * 开始持续放烟花
 */
function startContinuousFireworks() {
    const isMobile = window.innerWidth <= 600;
    // 移动端间隔更长，减少性能压力
    const interval = isMobile ? 2500 : 2000;

    fireworkInterval = setInterval(() => {
        launchMultipleFireworks();
    }, interval);
}

/**
 * 发射多组烟花
 */
function launchMultipleFireworks() {
    const positions = [15, 35, 50, 65, 85];

    positions.forEach((pos, index) => {
        setTimeout(() => {
            const x = window.innerWidth * (pos / 100);
            launchFirework(x);
        }, index * 300);
    });
}

/**
 * 创建飘浮的爱心效果
 */
function createFloatingHearts() {
    const heartTypes = ['💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
            heart.style.position = 'fixed';
            heart.style.left = (Math.random() * window.innerWidth) + 'px';
            heart.style.top = (Math.random() * window.innerHeight * 0.5 + 200) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '100';
            heart.style.animation = 'floatUp 3s ease-out forwards';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

/**
 * 显示吹蜡烛提示
 */
function showBlowHint() {
    setTimeout(() => {
        if (!candleBlown) {
            const blowHint = document.getElementById('blowHint');
            if (blowHint) {
                blowHint.classList.add('show');
            }
        }
    }, 3000);
}

// ========== 事件监听 ==========

/**
 * 点击页面产生爱心效果
 */
document.addEventListener('click', function(e) {
    // 排除蛋糕的点击
    if (e.target.closest('.cake')) return;
    
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    heart.style.fontSize = '24px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '100';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
});

// ========== 音乐控制 ==========
let isMusicPlaying = false;

/**
 * 切换音乐播放/暂停
 */
function toggleMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    const icon = document.getElementById('musicIcon');
    const text = document.getElementById('musicText');

    // 设置音量为 30%
    music.volume = 0.3;

    if (isMusicPlaying) {
        music.pause();
        btn.classList.remove('playing');
        icon.textContent = '🎵';
        text.textContent = '播放音乐';
        isMusicPlaying = false;
    } else {
        music.play().then(() => {
            btn.classList.add('playing');
            icon.textContent = '🎶';
            text.textContent = '暂停音乐';
            isMusicPlaying = true;
        }).catch(err => {
            console.log('音乐播放失败:', err);
            alert('请先添加音乐文件（background-music.mp3）到文件夹中');
        });
    }
}

/**
 * 页面加载完成后初始化
 */
window.addEventListener('load', () => {
    createPetals();
    createStars();
    createBalloons();
    showBlowHint();

    // 尝试自动播放音乐（浏览器可能阻止）
    const music = document.getElementById('bgMusic');
    music.volume = 0.3;
    music.play().then(() => {
        // 自动播放成功
        const btn = document.getElementById('musicBtn');
        const icon = document.getElementById('musicIcon');
        const text = document.getElementById('musicText');
        btn.classList.add('playing');
        icon.textContent = '🎶';
        text.textContent = '暂停音乐';
        isMusicPlaying = true;
    }).catch(() => {
        // 浏览器阻止自动播放，等待用户交互
        console.log('自动播放被阻止，等待用户点击');
    });
});
