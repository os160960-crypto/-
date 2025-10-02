# 🌤️ 날씨 대시보드

HTML, CSS, JavaScript만으로 만든 실시간 날씨 정보 대시보드입니다.

## ✨ 주요 기능

- **실시간 날씨 정보**: 현재 온도, 날씨 상태, 습도, 풍속, 가시거리, 체감온도
- **5일간 예보**: 일주일 날씨 예측 정보
- **실시간 시계**: 네이버처럼 실시간으로 업데이트되는 시간 표시
- **위치 기반 검색**: GPS를 통한 현재 위치 날씨 조회
- **도시 검색**: 원하는 도시의 날씨 정보 검색
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **아름다운 UI**: 그라데이션 배경과 카드형 레이아웃

## 🚀 시작하기

### 1. OpenWeatherMap API 키 발급

1. [OpenWeatherMap](https://openweathermap.org/api) 사이트에 가입
2. API 키 발급 (무료)
3. `script.js` 파일의 `API_KEY` 변수에 발급받은 키 입력

```javascript
const API_KEY = 'YOUR_API_KEY_HERE'; // 여기에 실제 API 키 입력
```

### 2. 프로젝트 실행

1. 모든 파일을 같은 폴더에 저장
2. `index.html` 파일을 브라우저에서 열기
3. 즐기기! 🎉

## 📁 파일 구조

```
project/
├── index.html      # 메인 HTML 파일
├── style.css       # 스타일시트
├── script.js       # JavaScript 로직
└── README.md       # 프로젝트 설명서
```

## 🛠️ 사용된 기술

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션, 반응형 디자인
- **JavaScript ES6+**: Fetch API, async/await, DOM 조작
- **OpenWeatherMap API**: 날씨 데이터 제공
- **Font Awesome**: 아이콘

## 📱 반응형 지원

- **데스크톱**: 1200px 이상
- **태블릿**: 768px ~ 1199px
- **모바일**: 767px 이하

## 🎨 주요 특징

- **그라데이션 배경**: 아름다운 보라-파랑 그라데이션
- **글래스모피즘**: 반투명 카드와 블러 효과
- **부드러운 애니메이션**: 호버 효과와 전환 애니메이션
- **직관적인 UI**: 사용하기 쉬운 인터페이스

## 🔧 커스터마이징

### 색상 변경
`style.css`의 CSS 변수를 수정하여 색상을 변경할 수 있습니다:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffa726;
}
```

### 추가 기능
- 시간대별 상세 예보
- 날씨 알림 기능
- 즐겨찾기 도시 목록
- 다크 모드 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**만든이**: 프론트엔드 개발자 포트폴리오 프로젝트
**기술 스택**: HTML, CSS, JavaScript
**API**: OpenWeatherMap

