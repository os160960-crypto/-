// 날씨 API 설정
const API_KEY = 'd0f1c7fd5d06f5fb0c1000088fea7eb8'; // OpenWeatherMap API 키
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM 요소들
const currentTimeEl = document.getElementById('currentTime');
const currentDateEl = document.getElementById('currentDate');
const cityInputEl = document.getElementById('cityInput');
const searchBtnEl = document.getElementById('searchBtn');
const locationBtnEl = document.getElementById('locationBtn');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('errorMessage');
const currentWeatherEl = document.getElementById('currentWeather');
const forecastContainerEl = document.getElementById('forecastContainer');
const citiesGridEl = document.getElementById('citiesGrid');

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

// 현재 날씨 요소들
const currentTempEl = document.getElementById('currentTemp');
const weatherIconEl = document.getElementById('weatherIcon');
const weatherDescEl = document.getElementById('weatherDesc');
const visibilityEl = document.getElementById('visibility');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('windSpeed');
const feelsLikeEl = document.getElementById('feelsLike');

// 실시간 시계 업데이트
function updateTime() {
    const now = new Date();
    
    // 시간 포맷팅
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    currentTimeEl.textContent = now.toLocaleTimeString('ko-KR', timeOptions);
    
    // 날짜 포맷팅
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    currentDateEl.textContent = now.toLocaleDateString('ko-KR', dateOptions);
}

// 시계 시작
setInterval(updateTime, 1000);
updateTime(); // 즉시 실행

// 로딩 상태 관리
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
    errorMessageEl.querySelector('p').textContent = message;
    errorMessageEl.classList.add('show');
    loadingEl.classList.remove('show');
    currentWeatherEl.style.display = 'none';
    forecastContainerEl.style.display = 'none';
}

// 날씨 아이콘 매핑
function getWeatherIcon(weatherCode) {
    const iconMap = {
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
    return iconMap[weatherCode] || 'fas fa-question';
}

// 현재 날씨 데이터 표시
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const visibility = data.visibility ? (data.visibility / 1000).toFixed(1) : 'N/A';
    const weather = data.weather[0];
    
    currentTempEl.textContent = temp;
    feelsLikeEl.textContent = feelsLike;
    humidityEl.textContent = humidity;
    windSpeedEl.textContent = windSpeed;
    visibilityEl.textContent = visibility;
    
    weatherIconEl.innerHTML = `<i class="${getWeatherIcon(weather.icon)}"></i>`;
    weatherDescEl.textContent = weather.description;
}

// 5일 예보 데이터 표시
function displayForecast(data) {
    forecastContainerEl.innerHTML = '';
    
    // 내일부터 5일간의 예보만 표시
    const dailyForecasts = data.list.filter((item, index) => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        return hour === 12; // 정오 데이터만 사용
    }).slice(0, 5);
    
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
        
        forecastContainerEl.appendChild(forecastCard);
    });
}

// API 호출 함수
async function fetchWeatherData(city) {
    try {
        showLoading();
        
        // 현재 날씨 API 호출
        const currentWeatherResponse = await fetch(
            `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!currentWeatherResponse.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }
        
        const currentWeatherData = await currentWeatherResponse.json();
        
        // 5일 예보 API 호출
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
        );
        
        if (!forecastResponse.ok) {
            throw new Error('예보 데이터를 불러올 수 없습니다.');
        }
        
        const forecastData = await forecastResponse.json();
        
        // 데이터 표시
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
        hideLoading();
        
    } catch (error) {
        console.error('날씨 데이터 로딩 오류:', error);
        showError(error.message);
    }
}

// 현재 위치 기반 날씨 조회
async function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        showError('위치 서비스가 지원되지 않습니다.');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                
                // 현재 날씨 API 호출 (좌표 기반)
                const currentWeatherResponse = await fetch(
                    `${API_BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
                );
                
                if (!currentWeatherResponse.ok) {
                    throw new Error('현재 위치의 날씨 정보를 불러올 수 없습니다.');
                }
                
                const currentWeatherData = await currentWeatherResponse.json();
                
                // 5일 예보 API 호출 (좌표 기반)
                const forecastResponse = await fetch(
                    `${API_BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=kr`
                );
                
                if (!forecastResponse.ok) {
                    throw new Error('예보 데이터를 불러올 수 없습니다.');
                }
                
                const forecastData = await forecastResponse.json();
                
                // 데이터 표시
                displayCurrentWeather(currentWeatherData);
                displayForecast(forecastData);
                hideLoading();
                
            } catch (error) {
                console.error('위치 기반 날씨 데이터 로딩 오류:', error);
                showError(error.message);
            }
        },
        (error) => {
            console.error('위치 접근 오류:', error);
            showError('위치 접근이 거부되었습니다.');
        }
    );
}

// 이벤트 리스너
searchBtnEl.addEventListener('click', () => {
    const city = cityInputEl.value.trim();
    if (city) {
        fetchWeatherData(city);
        cityInputEl.value = '';
    }
});

locationBtnEl.addEventListener('click', getCurrentLocationWeather);

cityInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInputEl.value.trim();
        if (city) {
            fetchWeatherData(city);
            cityInputEl.value = '';
        }
    }
});

// 한국 도시 버튼 생성
function createKoreanCityButtons() {
    citiesGridEl.innerHTML = '';
    
    koreanCities.forEach(city => {
        const cityBtn = document.createElement('button');
        cityBtn.className = 'city-btn';
        cityBtn.textContent = city.name;
        cityBtn.addEventListener('click', () => {
            fetchWeatherData(city.english);
        });
        citiesGridEl.appendChild(cityBtn);
    });
}

// 페이지 로드 시 기본 도시로 서울 날씨 표시
window.addEventListener('load', () => {
    fetchWeatherData('Seoul');
    createKoreanCityButtons();
});

// API 키가 설정되었습니다!

