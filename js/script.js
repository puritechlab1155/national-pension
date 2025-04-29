document.addEventListener('DOMContentLoaded', function () {
    // ✅  편하게보기 체크표시
    const toggle = document.getElementById('checkView');
    toggle?.addEventListener('click', () => {
        toggle.classList.toggle('active');
    });

    // ✅  모바일 서브메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    menuToggle?.addEventListener('click', () => {
        mobileMenu.classList.add('open');
        overlay.classList.add('active');
        body.classList.add('menu-open');
    });

    closeMenu?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    overlay?.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // ✅ PC해더 서브메뉴 토글
    document.querySelectorAll('.submenu-toggle').forEach(button => {
        button.addEventListener('click', (event) => {
            const parentItem = button.closest('.menu-item');
            const submenu = parentItem?.nextElementSibling;

            parentItem?.classList.toggle('open');

            const mainLink = parentItem?.querySelector('a');
            if (mainLink) {
                mainLink.focus();
            }

            if (submenu && submenu.classList.contains('submenu')) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }

            event.stopPropagation();
        });
    });

    // ✅ 서브메뉴 선택 시 포커스 유지
    document.querySelectorAll('.submenu-item').forEach(item => {
        item.setAttribute('tabindex', '0');

        item.addEventListener('click', (event) => {
            event.stopPropagation();

            document.querySelectorAll('.submenu-item').forEach(subItem => {
                subItem.classList.remove('focused');
            });

            item.classList.add('focused');

            const submenu = item.closest('.submenu');
            const previousItem = submenu?.previousElementSibling;

            if (previousItem?.classList.contains('menu-item')) {
                previousItem.classList.add('active');

                const mainLink = previousItem.querySelector('a');
                if (mainLink) {
                    mainLink.focus();
                }
            }
        });
    });

    // ✅  서브메뉴 transition 후 포커스 유지
    document.querySelectorAll('.submenu').forEach(submenu => {
        submenu.addEventListener('transitionend', () => {
            const previousItem = submenu.previousElementSibling;
            if (previousItem?.classList.contains('menu-item') && previousItem.classList.contains('open')) {
                const mainLink = previousItem.querySelector('a');
                if (mainLink) {
                    mainLink.focus();
                }
            }
        });
    });

    //  ✅ 검색창 등장
    const searchContainer = document.getElementById('searchContainer');
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
        }
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    moreButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            const isShowing = popup?.classList.toggle('show');
            overlay?.classList.toggle('active'); 
            if (isShowing) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        }
    });

    document.addEventListener('click', (e) => {
        if (!popup?.contains(e.target) && !moreButton?.contains(e.target)) {
            popup?.classList.remove('show');
            overlay?.classList.remove('active');
            document.body.classList.remove('no-scroll');
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