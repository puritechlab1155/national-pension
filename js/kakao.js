  // 초기화
  Kakao.init('YOUR_APP_KEY'); // 🔑 여기에 본인의 JavaScript 키 입력

  // 공유 함수 정의
  function shareKakaoTalk() {
    const pageTitle = document.title;
    const pageDescription = document.querySelector('meta[name="description"]')
      ? document.querySelector('meta[name="description"]').getAttribute('content')
      : pageTitle;
    const pageUrl = window.location.href;
    const imageUrl = 'https://example.com/share-thumbnail.jpg'; // ✅ 공유 이미지 URL (절대경로)

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: pageTitle,
        description: pageDescription,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: pageUrl,
          webUrl: pageUrl
        }
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl
          }
        }
      ]
    });
  }

    // YOUR_APP_KEY : 카카오 개발자 콘솔에서 받은 JavaScript 키로 교체
    // imageUrl	: 공유할 이미지 주소 (카카오 요구 사항: 500x500px 이상 권장)

    // <meta name="description" content="이 페이지는 AI로 만든 숏폼 분석 서비스입니다.">
    // 위 코드 head에 추가 : SEO에도 좋은 설명 메타 태그, 없으면 <title> 사용됨