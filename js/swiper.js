// 스와이퍼 조작
window.addEventListener("load", function () {
    new Swiper(".mySwiper", {
        loop: true,                  // 무한 루프
        navigation: {
            nextEl: ".swiper-button-next",  // 다음 버튼
            prevEl: ".swiper-button-prev",  // 이전 버튼
        },
        autoplay: {
            delay: 3000,                   // 자동 재생
            disableOnInteraction: false,  // 유저 조작 후에도 계속
        },
        touchRatio: 1,                  // 터치 감도
        grabCursor: true,               // 마우스 커서가 손모양으로
    });
});