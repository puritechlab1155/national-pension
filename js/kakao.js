  // 초기화
  Kakao.init('YOUR_APP_KEY'); // 여기에는 본인의 JavaScript 키를 넣어야 함

  // 공유 함수
  function shareKakaoTalk() {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '공유 제목',
        description: '공유 설명입니다.',
        imageUrl: 'https://example.com/image.jpg',
        link: {
          mobileWebUrl: 'https://example.com',
          webUrl: 'https://example.com'
        }
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: 'https://example.com',
            webUrl: 'https://example.com'
          }
        }
      ]
    });
  }