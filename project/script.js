// 날씨 API 설정
const API_KEY = 'd0f1c7fd5d06f5fb0c1000088fea7eb8'; // OpenWeatherMap API 키
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM 요소들 - 성능을 위해 한 번만 쿼리
const DOM = {
    currentTime: document.getElementById('currentTime'),
    currentDate: document.getElementById('currentDate'),
    cityInput: document.getElementById('cityInput'),
    searchBtn: document.getElementById('searchBtn'),
    locationBtn: document.getElementById('locationBtn'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    currentWeather: document.getElementById('currentWeather'),
    forecastContainer: document.getElementById('forecastContainer'),
    citiesGrid: document.getElementById('citiesGrid'),
    // 현재 날씨 요소들
    currentTemp: document.getElementById('currentTemp'),
    weatherIcon: document.getElementById('weatherIcon'),
    weatherDesc: document.getElementById('weatherDesc'),
    visibility: document.getElementById('visibility'),
    humidity: document.getElementById('humidity'),
    windSpeed: document.getElementById('windSpeed'),
    feelsLike: document.getElementById('feelsLike')
};

// 기존 변수들을 DOM 객체로 대체
const currentTimeEl = DOM.currentTime;
const currentDateEl = DOM.currentDate;
const cityInputEl = DOM.cityInput;
const searchBtnEl = DOM.searchBtn;
const locationBtnEl = DOM.locationBtn;
const loadingEl = DOM.loading;
const errorMessageEl = DOM.errorMessage;
const currentWeatherEl = DOM.currentWeather;
const forecastContainerEl = DOM.forecastContainer;
const citiesGridEl = DOM.citiesGrid;
const currentTempEl = DOM.currentTemp;
const weatherIconEl = DOM.weatherIcon;
const weatherDescEl = DOM.weatherDesc;
const visibilityEl = DOM.visibility;
const humidityEl = DOM.humidity;
const windSpeedEl = DOM.windSpeed;
const feelsLikeEl = DOM.feelsLike;

// 한국 주요 도시 목록
const koreanCities = [
    { name: '서울', english: 'Seoul' },
    { name: '부산', english: 'Busan' },
    { name: '대구', english: 'Daegu' },
    { name: '인천', english: 'Incheon' },
    { name: '광주', english: 'Gwangju' },
    { name: '대전', english: 'Daejeon' },
    { name: '울산', english: 'Ulsan' },
    { name: '세종', english: 'Sejong' },
    { name: '수원', english: 'Suwon' },
    { name: '고양', english: 'Goyang' },
    { name: '용인', english: 'Yongin' },
    { name: '성남', english: 'Seongnam' },
    { name: '부천', english: 'Bucheon' },
    { name: '화성', english: 'Hwaseong' },
    { name: '안산', english: 'Ansan' },
    { name: '안양', english: 'Anyang' },
    { name: '평택', english: 'Pyeongtaek' },
    { name: '시흥', english: 'Siheung' },
    { name: '김포', english: 'Gimpo' },
    { name: '의정부', english: 'Uijeongbu' },
    { name: '광명', english: 'Gwangmyeong' },
    { name: '군포', english: 'Gunpo' },
    { name: '오산', english: 'Osan' },
    { name: '하남', english: 'Hanam' },
    { name: '이천', english: 'Icheon' },
    { name: '안성', english: 'Anseong' },
    { name: '의왕', english: 'Uiwang' },
    { name: '양평', english: 'Yangpyeong' },
    { name: '과천', english: 'Gwacheon' },
    { name: '구리', english: 'Guri' },
    { name: '남양주', english: 'Namyangju' },
    { name: '파주', english: 'Paju' },
    { name: '양주', english: 'Yangju' },
    { name: '포천', english: 'Pocheon' },
    { name: '연천', english: 'Yeoncheon' },
    { name: '가평', english: 'Gapyeong' },
    { name: '춘천', english: 'Chuncheon' },
    { name: '원주', english: 'Wonju' },
    { name: '강릉', english: 'Gangneung' },
    { name: '동해', english: 'Donghae' },
    { name: '태백', english: 'Taebaek' },
    { name: '속초', english: 'Sokcho' },
    { name: '삼척', english: 'Samcheok' },
    { name: '홍천', english: 'Hongcheon' },
    { name: '횡성', english: 'Hoengseong' },
    { name: '영월', english: 'Yeongwol' },
    { name: '평창', english: 'Pyeongchang' },
    { name: '정선', english: 'Jeongseon' },
    { name: '철원', english: 'Cheorwon' },
    { name: '화천', english: 'Hwacheon' },
    { name: '양구', english: 'Yanggu' },
    { name: '인제', english: 'Inje' },
    { name: '고성', english: 'Goseong' },
    { name: '양양', english: 'Yangyang' },
    { name: '천안', english: 'Cheonan' },
    { name: '공주', english: 'Gongju' },
    { name: '보령', english: 'Boryeong' },
    { name: '아산', english: 'Asan' },
    { name: '서산', english: 'Seosan' },
    { name: '논산', english: 'Nonsan' },
    { name: '계룡', english: 'Gyeryong' },
    { name: '당진', english: 'Dangjin' },
    { name: '금산', english: 'Geumsan' },
    { name: '부여', english: 'Buyeo' },
    { name: '서천', english: 'Seocheon' },
    { name: '청양', english: 'Cheongyang' },
    { name: '홍성', english: 'Hongseong' },
    { name: '예산', english: 'Yesan' },
    { name: '태안', english: 'Taean' },
    { name: '청주', english: 'Cheongju' },
    { name: '충주', english: 'Chungju' },
    { name: '제천', english: 'Jecheon' },
    { name: '보은', english: 'Boeun' },
    { name: '옥천', english: 'Okcheon' },
    { name: '영동', english: 'Yeongdong' },
    { name: '증평', english: 'Jeungpyeong' },
    { name: '진천', english: 'Jincheon' },
    { name: '괴산', english: 'Goesan' },
    { name: '음성', english: 'Eumseong' },
    { name: '단양', english: 'Danyang' },
    { name: '전주', english: 'Jeonju' },
    { name: '군산', english: 'Gunsan' },
    { name: '익산', english: 'Iksan' },
    { name: '정읍', english: 'Jeongeup' },
    { name: '남원', english: 'Namwon' },
    { name: '김제', english: 'Gimje' },
    { name: '완주', english: 'Wanju' },
    { name: '진안', english: 'Jinan' },
    { name: '무주', english: 'Muju' },
    { name: '장수', english: 'Jangsu' },
    { name: '임실', english: 'Imsil' },
    { name: '순창', english: 'Sunchang' },
    { name: '고창', english: 'Gochang' },
    { name: '부안', english: 'Buan' },
    { name: '목포', english: 'Mokpo' },
    { name: '여수', english: 'Yeosu' },
    { name: '순천', english: 'Suncheon' },
    { name: '나주', english: 'Naju' },
    { name: '광양', english: 'Gwangyang' },
    { name: '담양', english: 'Damyang' },
    { name: '곡성', english: 'Gokseong' },
    { name: '구례', english: 'Gurye' },
    { name: '고흥', english: 'Goheung' },
    { name: '보성', english: 'Boseong' },
    { name: '화순', english: 'Hwasun' },
    { name: '장흥', english: 'Jangheung' },
    { name: '강진', english: 'Gangjin' },
    { name: '해남', english: 'Haenam' },
    { name: '영암', english: 'Yeongam' },
    { name: '무안', english: 'Muan' },
    { name: '함평', english: 'Hampyeong' },
    { name: '영광', english: 'Yeonggwang' },
    { name: '장성', english: 'Jangseong' },
    { name: '완도', english: 'Wando' },
    { name: '진도', english: 'Jindo' },
    { name: '신안', english: 'Sinan' },
    { name: '제주', english: 'Jeju' },
    { name: '서귀포', english: 'Seogwipo' }
];

// 날씨 아이콘 매핑 - 성능을 위해 객체로 미리 정의
const WEATHER_ICONS = {
    '01d': 'fas fa-sun',           // 맑음 (낮)
    '01n': 'fas fa-moon',          // 맑음 (밤)
    '02d': 'fas fa-cloud-sun',     // 약간 흐림 (낮)
    '02n': 'fas fa-cloud-moon',    // 약간 흐림 (밤)
    '03d': 'fas fa-cloud',         // 흐림
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud',         // 매우 흐림
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain',   // 소나기
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain', // 비 (낮)
    '10n': 'fas fa-cloud-moon-rain', // 비 (밤)
    '11d': 'fas fa-bolt',          // 뇌우
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake',     // 눈
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog',          // 안개
    '50n': 'fas fa-smog'
};

// 시간 포맷팅 옵션 - 재사용을 위해 상수로 정의
const TIME_FORMAT_OPTIONS = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
};

const DATE_FORMAT_OPTIONS = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
};

// 실시간 시계 업데이트 - 최적화된 버전
function updateTime() {
    const now = new Date();
    
    // DOM 조작 최소화
    currentTimeEl.textContent = now.toLocaleTimeString('ko-KR', TIME_FORMAT_OPTIONS);
    currentDateEl.textContent = now.toLocaleDateString('ko-KR', DATE_FORMAT_OPTIONS);
}

// 시계 시작
setInterval(updateTime, 1000);
updateTime(); // 즉시 실행

// 로딩 상태 관리 - 최적화된 버전
function showLoading() {
    loadingEl.classList.add('show');
    errorMessageEl.classList.remove('show');
    currentWeatherEl.style.display = 'none';
    forecastContainerEl.style.display = 'none';
}

function hideLoading() {
    loadingEl.classList.remove('show');
    currentWeatherEl.style.display = 'block';
    forecastContainerEl.style.display = 'grid';
}

function showError(message) {
    const errorText = errorMessageEl.querySelector('p');
    if (errorText) {
        errorText.textContent = message;
    }
    errorMessageEl.classList.add('show');
    loadingEl.classList.remove('show');
    currentWeatherEl.style.display = 'none';
    forecastContainerEl.style.display = 'none';
}

// 날씨 아이콘 매핑 - 최적화된 버전
function getWeatherIcon(weatherCode) {
    return WEATHER_ICONS[weatherCode] || 'fas fa-question';
}

// 현재 날씨 데이터 표시 - 최적화된 버전
function displayCurrentWeather(data) {
    const { main, wind, visibility, weather } = data;
    const weatherInfo = weather[0];
    
    // 데이터 계산
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const visibilityKm = visibility ? (visibility / 1000).toFixed(1) : 'N/A';
    
    // DOM 업데이트 - 배치로 처리
    const updates = [
        [currentTempEl, temp],
        [feelsLikeEl, feelsLike],
        [humidityEl, main.humidity],
        [windSpeedEl, wind.speed],
        [visibilityEl, visibilityKm],
        [weatherDescEl, weatherInfo.description]
    ];
    
    updates.forEach(([element, value]) => {
        if (element) element.textContent = value;
    });
    
    // 아이콘 업데이트
    if (weatherIconEl) {
        weatherIconEl.innerHTML = `<i class="${getWeatherIcon(weatherInfo.icon)}"></i>`;
    }
}

// 5일 예보 데이터 표시 - 최적화된 버전
function displayForecast(data) {
    if (!forecastContainerEl) return;
    
    // 내일부터 5일간의 예보만 표시 - 정오 데이터 필터링
    const dailyForecasts = data.list
        .filter(item => new Date(item.dt * 1000).getHours() === 12)
        .slice(0, 5);
    
    // DocumentFragment 사용으로 DOM 조작 최적화
    const fragment = document.createDocumentFragment();
    
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('ko-KR', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
        const temp = Math.round(forecast.main.temp);
        const weather = forecast.weather[0];
        
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-date">
                <div>${dayName}</div>
                <div>${monthDay}</div>
            </div>
            <div class="forecast-icon">
                <i class="${getWeatherIcon(weather.icon)}"></i>
            </div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-desc">${weather.description}</div>
        `;
        
        fragment.appendChild(forecastCard);
    });
    
    // 한 번에 DOM 업데이트
    forecastContainerEl.innerHTML = '';
    forecastContainerEl.appendChild(fragment);
}

// API 호출 함수 - 최적화된 버전
async function fetchWeatherData(city) {
    if (!city || !city.trim()) {
        showError('도시명을 입력해주세요.');
        return;
    }
    
    try {
        showLoading();
        
        // 병렬 API 호출로 성능 향상
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`),
            fetch(`${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
        ]);
        
        // 응답 상태 확인
        if (!currentWeatherResponse.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }
        
        if (!forecastResponse.ok) {
            throw new Error('예보 데이터를 불러올 수 없습니다.');
        }
        
        // JSON 파싱도 병렬로 처리
        const [currentWeatherData, forecastData] = await Promise.all([
            currentWeatherResponse.json(),
            forecastResponse.json()
        ]);
        
        // 데이터 표시
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        hideLoading();
        
    } catch (error) {
        console.error('날씨 데이터 로딩 오류:', error);
        showError(error.message);
    }
}

// 현재 위치 기반 날씨 조회 - 최적화된 버전
async function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        showError('위치 서비스가 지원되지 않습니다.');
        return;
    }
    
    try {
        showLoading();
        
        // 위치 정보 가져오기
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 10000,
                enableHighAccuracy: true
            });
        });
        
        const { latitude, longitude } = position.coords;
        
        // 병렬 API 호출
        const [currentWeatherResponse, forecastResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`),
            fetch(`${API_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`)
        ]);
        
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
            throw new Error('현재 위치의 날씨 정보를 불러올 수 없습니다.');
        }
        
        // JSON 파싱 병렬 처리
        const [currentWeatherData, forecastData] = await Promise.all([
            currentWeatherResponse.json(),
            forecastResponse.json()
        ]);
        
        // 데이터 표시
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        hideLoading();
        
    } catch (error) {
        console.error('위치 기반 날씨 데이터 로딩 오류:', error);
        
        let errorMessage = '위치 기반 날씨 정보를 불러올 수 없습니다.';
        if (error.code === 1) {
            errorMessage = '위치 접근이 거부되었습니다.';
        } else if (error.code === 2) {
            errorMessage = '위치 정보를 찾을 수 없습니다.';
        } else if (error.code === 3) {
            errorMessage = '위치 요청 시간이 초과되었습니다.';
        }
        
        showError(errorMessage);
    }
}

// 이벤트 리스너 - 최적화된 버전
function handleSearch() {
    const city = cityInputEl.value.trim();
    if (city) {
        fetchWeatherData(city);
        cityInputEl.value = '';
    }
}

// 이벤트 리스너 등록
searchBtnEl?.addEventListener('click', handleSearch);
locationBtnEl?.addEventListener('click', getCurrentLocationWeather);

cityInputEl?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
    }
});

// 한국 도시 버튼 생성 - 최적화된 버전
function createKoreanCityButtons() {
    if (!citiesGridEl) return;
    
    // DocumentFragment 사용으로 DOM 조작 최적화
    const fragment = document.createDocumentFragment();
    
    koreanCities.forEach(city => {
        const cityBtn = document.createElement('button');
        cityBtn.className = 'city-btn';
        cityBtn.textContent = city.name;
        cityBtn.setAttribute('data-city', city.english);
        cityBtn.setAttribute('aria-label', `${city.name} 날씨 조회`);
        fragment.appendChild(cityBtn);
    });
    
    // 이벤트 위임 사용으로 성능 향상
    citiesGridEl.addEventListener('click', (e) => {
        const cityBtn = e.target.closest('.city-btn');
        if (cityBtn) {
            const cityName = cityBtn.getAttribute('data-city');
            if (cityName) {
                fetchWeatherData(cityName);
            }
        }
    });
    
    // 한 번에 DOM 업데이트
    citiesGridEl.innerHTML = '';
    citiesGridEl.appendChild(fragment);
}

// 페이지 로드 시 초기화 - 최적화된 버전
function initializeApp() {
    try {
        // 도시 버튼 생성
        createKoreanCityButtons();
        
        // 기본 도시로 서울 날씨 표시
        fetchWeatherData('Seoul');
        
        console.log('날씨 대시보드가 성공적으로 초기화되었습니다.');
    } catch (error) {
        console.error('앱 초기화 오류:', error);
        showError('앱을 초기화하는 중 오류가 발생했습니다.');
    }
}

// DOM이 완전히 로드된 후 실행
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

