document.addEventListener('DOMContentLoaded', function () {
    // ✅  index,event 편하게보기 체크표시
    const toggle = document.getElementById('checkView');

    if (toggle) {
        const currentPath = window.location.pathname;
        const isEasyVersion = currentPath.includes('-easy');
    
        // 현재 페이지가 -easy 버전이면 체크박스를 활성화
        if (isEasyVersion) {
            toggle.classList.add('active');
        }
    
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const currentFile = currentPath.split('/').pop(); // ex) main.html or main-easy.html
            let baseName = currentFile.replace('-easy', '').replace('.html', '');
    
            if (toggle.classList.contains('active')) {
                // -easy 버전으로 이동
                window.location.href = `${baseName}-easy.html`;
            } else {
                // 일반 버전으로 이동
                window.location.href = `${baseName}.html`;
            }
        });
    }
    // ✅  sub-page 편하게보기 체크표시
    document.addEventListener("click", function (e) {
        const target = e.target.closest("#checkView2");
    
        // ✅ 클릭 대상이 checkView2이고, 현재 페이지가 easy-page가 아닐 경우
        if (target && !window.location.href.includes("easy-page.html")) {
            localStorage.setItem("previousPage", window.location.href);
    
            const mainContent = document.querySelector("main.content");
            if (!mainContent) return;
    
            const sections = mainContent.querySelectorAll("section:not(.sec01)");
    
            let contentToCopy = "";
            sections.forEach(section => {
                contentToCopy += section.outerHTML;
            });
    
            localStorage.setItem("easyPageContent", contentToCopy);
    
            window.location.href = "easy-page.html";
        }
    
        // ✅ easy-page에서 클릭했을 때
        else if (target && window.location.href.includes("easy-page.html")) {
            const previousPage = localStorage.getItem("previousPage");
    
            if (previousPage) {
                // 🔥 체크되어 있으면 → 해제 후 바로 이동
                if (target.classList.contains("active")) {
                    // 체크 해제되자마자 이동
                    target.classList.remove("active");
                    localStorage.removeItem("easyPageContent");
                    window.location.href = previousPage;
                }
            }
        }
    });

    // ✅  해더메뉴 서브메뉴 등장
    const dropdowns = document.querySelectorAll('.dropdown');

        let closeTimeout;

        dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout); // 닫는 타임아웃 취소
            closeAllDropdowns();
            dropdown.classList.add('open');
            dropdown.querySelector('.submenu').style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
            dropdown.classList.remove('open');
            dropdown.querySelector('.submenu').style.display = 'none';
            }, 300); // 300ms 후 닫힘 (필요시 조절)
        });

        const submenu = dropdown.querySelector('.submenu');
        submenu.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout); // 마우스가 서브메뉴에 있으면 닫기 취소
        });
        submenu.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
            dropdown.classList.remove('open');
            submenu.style.display = 'none';
            }, 300);
        });
        });

        function closeAllDropdowns() {
        dropdowns.forEach(dd => {
            dd.classList.remove('open');
            const submenu = dd.querySelector('.submenu');
            if (submenu) submenu.style.display = 'none';
        });
        }


    // ✅  모바일 서브메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        mobileMenuOverlay.classList.add('active');
        body.classList.add('menu-open');
    });

    closeMenu?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    mobileMenuOverlay?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

// ✅ 모바일 서브메뉴 토글
document.querySelectorAll('.submenu-toggle').forEach(listItem => {
    listItem.addEventListener('click', (event) => {
        const menuItem = listItem.querySelector('.menu-item');
        const submenu = listItem.querySelector('.submenu');
        const toggleIcon = listItem.querySelector('.submenu-toggle-svg');
        const isSubmenuOpen = listItem.classList.contains('open');
        
        // 열려있는 다른 서브메뉴 닫기
        document.querySelectorAll('.submenu-toggle.open').forEach(openItem => {
            if (openItem !== listItem) {
                openItem.classList.remove('open');
                const openSubmenu = openItem.querySelector('.submenu');
                const openIcon = openItem.querySelector('.submenu-toggle-svg');
                if (openSubmenu) {
                    openSubmenu.style.display = 'none';
                }
                if (openIcon) {
                    openIcon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // 현재 메뉴 상태 토글
        listItem.classList.toggle('open');
        
        // 메인 링크에 포커스
        const mainLink = menuItem?.querySelector('a');
        if (mainLink) {
            mainLink.focus();
        }
        
        // 서브메뉴 표시/숨김
        if (submenu) {
            submenu.style.display = isSubmenuOpen ? 'none' : 'block';
        }
        
        // 아이콘 회전
        if (toggleIcon) {
            toggleIcon.style.transform = isSubmenuOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        
        event.stopPropagation();
    });
});


// ✅ 모바일 지난호보기 고정
    const mPrevIssues = document.querySelector('.mobile-menu .m-prev-issues');
    const mobileMenu2 = document.querySelector('.mobile-menu');
    
    if (mPrevIssues && mobileMenu) {
        const initialBottom = 60; // 초기 bottom 값
        const threshold = 100; // 스크롤 얼마나 내려갔을 때 변경할지 (조절 가능)
    
        mobileMenu2.addEventListener('scroll', () => {
            if (mobileMenu2.scrollTop > threshold) {
                mPrevIssues.style.position = 'static';
                mPrevIssues.style.bottom = '';
                mPrevIssues.style.right = '';
            } else {
                mPrevIssues.style.position = 'absolute';
                mPrevIssues.style.bottom = `${initialBottom}px`;
                mPrevIssues.style.right = '15px';
            }
        });
    }
    


    //  ✅ 검색창 등장
    const searchBar = document.getElementById('searchBar');
    const searchIcon = document.querySelector('.search-icon');
    let isActive = false;

    if (searchBar && searchIcon) {
        searchBar.innerHTML = '<input type="text" class="search-input">';
        const searchInput = document.querySelector('.search-input');

        searchIcon.addEventListener('click', function (e) {
            e.stopPropagation();

            if (!isActive) {
                searchBar.classList.add('active');
                isActive = true;
                setTimeout(() => {
                    searchInput?.focus();
                }, 100);
            } else {
                searchBar.classList.remove('active');
                isActive = false;
            }
        });

        searchBar.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        document.addEventListener('click', function () {
            if (isActive) {
                searchBar.classList.remove('active');
                isActive = false;
            }
        });
    }

    //  ✅ 하단바: 공유 클릭 시 팝업 등장, 뒤로가기
    const popup = document.getElementById('popup');
    const backButton = document.getElementById('backButton');
    const homeButton = document.getElementById('homeButton');
    const forwardButton = document.getElementById('forwardButton');
    const moreButton = document.getElementById('share-button');
    const floatingButtons = document.querySelector('.floating-buttons');
    const sharePopupOverlay = document.querySelector('.share-popup-overlay');

    function toggleOverlay(show) {
        if (sharePopupOverlay) {
            sharePopupOverlay.classList.toggle('active', show);
        }
    }

    if (homeButton) {
        homeButton.addEventListener('click', function () {
            window.location.href = 'index.html';
        });
    }

    if (forwardButton) {
        forwardButton.addEventListener('click', function () {
            window.history.forward();
        });
    }

    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }

    function checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            popup?.classList.remove('show');
            toggleOverlay(false);
        }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    moreButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const shouldShow = !popup?.classList.contains('show');
            popup?.classList.toggle('show', shouldShow);
            toggleOverlay(shouldShow, sharePopupOverlay);
        }
    });

    document.addEventListener('click', (e) => {
        if (!popup?.contains(e.target) && !moreButton?.contains(e.target)) {
            popup?.classList.remove('show');
            toggleOverlay(false, sharePopupOverlay);
        }
    });

    function adjustFloatingButtons() {
        if (floatingButtons && popup) {
            if (popup.classList.contains('show')) {
                // 팝업이 활성화되어 있으면 floating-buttons을 위로 올림
                const popupHeight = popup.offsetHeight; // 팝업의 실제 높이
                floatingButtons.style.bottom = `calc(10% + ${popupHeight}px)`;
            } else {
                // 팝업이 비활성화되어 있으면 원래 위치로 되돌림
                floatingButtons.style.bottom = '10%';
            }
        }
    }
    if (popup) {
        const observer = new MutationObserver(function(mutationsList, observer) {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    adjustFloatingButtons();
                }
            }
        });

        observer.observe(popup, { attributes: true });
    }

});


// ✅ 떠있는 아이콘: 공유 클릭시 아이콘 등장, Top버튼
document.addEventListener('DOMContentLoaded', function () {
    const shareToggle = document.querySelector('.share-toggle');
    const sharePanel = document.querySelector('.share-panel');
    const shareWrap = document.querySelector('.share-wrap');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const subscribeButton = document.getElementById('subscribe-button');

    shareToggle.addEventListener('click', () => {
        sharePanel.classList.toggle('active');
        shareWrap.classList.toggle('open');
    });

    function checkFloatingButtonsVisibility() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            // 모바일 환경: 맨 위로 버튼만 보이도록 하고 공유 관련 요소 숨김
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = 'flex';
            }

            if (shareWrap) {
                shareWrap.style.display = 'none';
            }
            if (subscribeButton) {
                subscribeButton.style.display = 'none';
            }
        } else {
            // 데스크톱 환경: 모든 버튼 보이도록 설정
            if (scrollToTopBtn) {
                scrollToTopBtn.style.display = 'flex'; // 또는 'block' 등 원래 보이도록 설정했던 display 값
            }
            if (shareWrap) {
                shareWrap.style.display = 'block';
            }
            if (subscribeButton) {
                subscribeButton.style.display = 'block'; // 구독 버튼 보임
            }
            if (sharePanel) {
                sharePanel.classList.remove('active'); // 공유 패널이 열려있을 경우 닫음
            }
            if (shareWrap) {
                shareWrap.classList.remove('open'); // shareWrap 열려있을 경우 닫음
            }
        }
    }
    // 공유 버튼 외부 클릭 시 닫기
    document.addEventListener('click', (e) => {
        if (sharePanel && shareWrap && shareToggle &&
            !sharePanel.contains(e.target) &&
            !shareWrap.contains(e.target) &&
            !shareToggle.contains(e.target)) {
            sharePanel.classList.remove('active');
            shareWrap.classList.remove('open');
        }
    });
    // 초기 로드 시와 창 크기 변경 시 visibility 체크
    checkFloatingButtonsVisibility();
    window.addEventListener('resize', checkFloatingButtonsVisibility);

    // 페이지가 일정 높이 이상 스크롤되면 버튼을 보이게 함
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    // 버튼 클릭 시 부드럽게 최상단으로 스크롤
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드러운 스크롤 효과 적용
        });
    });
});


// ✅ 카카오톡 공유하기 (작동 X )
function shareKakaoTalk() {
    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: document.title,
            description: document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').getAttribute('content') : document.title,
            imageUrl: '',
            link: {
                mobileWebUrl: document.URL,
                webUrl: document.URL,
            },
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: document.URL,
                    webUrl: document.URL,
                },
            },
        ],
    }).then(() => {
        // 공유 성공 후 (Promise 기반)
        alert("카카오톡으로 공유되었습니다. 공유 창을 닫아주세요.");
    }).catch(error => {
        console.error("카카오톡 공유 실패:", error);
    });
}

// ✅ URL 복사하기
function copy(url) {
    // URL 복사 로직 (예시)
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = url;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("URL이 복사되었습니다.");
}