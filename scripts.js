document.addEventListener('DOMContentLoaded', () => {
    // --- Login & Authentication ---
    const startAuthBtn = document.getElementById('start-auth-btn');
    const aiAuthBox = document.getElementById('ai-auth-box');
    const authText = document.getElementById('auth-text');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const faceIcon = document.querySelector('.face-icon');

    if (startAuthBtn) {
        startAuthBtn.addEventListener('click', () => {
            // Hide button, show AI scanner frame
            startAuthBtn.style.display = 'none';
            aiAuthBox.classList.add('show');

            // Simulate AI Face detection steps
            setTimeout(() => {
                authText.textContent = "얼굴을 분석하고 있습니다...";
                authText.style.color = "var(--primary-color)";
            }, 1000);

            setTimeout(() => {
                authText.textContent = "50+ 연령 인증이 완료되었습니다! 🎉";
                authText.style.color = "#4ade80"; // green color
                faceIcon.textContent = "check_circle";
                faceIcon.style.color = "#4ade80";
                document.querySelector('.scanner-line').style.display = 'none';
            }, 2500);

            setTimeout(() => {
                // Transition to main screen
                loginScreen.classList.remove('active');
                loginScreen.classList.add('hidden');

                setTimeout(() => {
                    mainScreen.classList.remove('hidden');
                    mainScreen.classList.add('active');
                }, 300); // Wait for fade out
            }, 4000);
        });
    }

    // --- Navigation & View Switching ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const headerTitle = document.getElementById('header-title');

    const viewTitles = {
        'home': '중년 놀이터',
        'community': '동네 모임 찾기',
        'dating': '근처의 인연',
        'chat': '대화/메시지',
        'my': '마이페이지'
    };

    window.switchTab = function (targetId) {
        // Update Nav Active State
        navItems.forEach(nav => {
            if (nav.dataset.target === targetId) {
                nav.classList.add('active');
            } else {
                nav.classList.remove('active');
            }
        });

        // Update View Active State
        views.forEach(view => {
            view.classList.remove('active');
            view.classList.add('hidden');

            if (view.id === `view-${targetId}`) {
                view.classList.remove('hidden');
                view.classList.add('active');
            }
        });

        // Update Header Title
        if (headerTitle && viewTitles[targetId]) {
            headerTitle.textContent = viewTitles[targetId];
        }

        // Add subtle animation to nav item
        const activeNav = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (activeNav) {
            activeNav.style.transform = 'scale(0.9)';
            setTimeout(() => {
                activeNav.style.transform = 'scale(1)';
            }, 150);
        }
    };

    // Attach click events to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            window.switchTab(target);
        });
    });

    // --- Filter Tabs Interaction ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state of buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Determine content to show based on dataset
                const targetId = btn.dataset.tab;
                if (targetId) {
                    const containers = [document.getElementById('comm-list-container'), document.getElementById('comm-sch-container')];
                    containers.forEach(container => {
                        if (container) {
                            container.classList.add('hidden');
                        }
                    });

                    const activeContainer = document.getElementById(`${targetId}-container`);
                    if (activeContainer) {
                        activeContainer.classList.remove('hidden');
                    }
                }
            });
        });
    }

    // --- Overlay Full Screen Modals ---
    window.openOverlay = function (id) {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.classList.add('open');
        }
    };

    window.closeOverlay = function (id) {
        const overlay = document.getElementById(id);
        if (overlay) {
            overlay.classList.remove('open');
        }
    };
});
