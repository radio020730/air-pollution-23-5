window.onload = initMap;

let map;
let marker = null;
let health_Code = null;
let forecast_Code = null;
let sidoName;

function initMap() {
    var mapContainer = document.getElementById('map');

    var mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 14
    };

    map = new kakao.maps.Map(mapContainer, mapOption);

    map.setZoomable(false);

    initControl();
    myLocation();
}

function initControl() {
    var mapTypeControl = new kakao.maps.MapTypeControl();

    map.addControl(
        mapTypeControl,
        kakao.maps.ControlPosition.TOPRIGHT
    );
}

function moveTomyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var locPosition = new kakao.maps.LatLng(lat, lon);
            var message = '<div>현위치</div>';

            displayMarker(locPosition, message);
            getmyLocationAddr();
        });
    }
}

function MoveTo(a, b) {
    var moveLatLon = new kakao.maps.LatLng(a, b);

    map.panTo(moveLatLon);
}

function myLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            var locPosition = new kakao.maps.LatLng(lat, lon);
            var message = '<div>현위치</div>';

            displayMarker(locPosition, message);
            getmyLocationAddr();
        });

    } else {
        var locPosition = new kakao.maps.LatLng(
            33.450701,
            126.570667
        );

        var message = 'geolocation을 사용할 수 없어요.';

        displayMarker(locPosition, message);
    }
}

function displayMarker(locPosition, message) {
    if (marker) {
        marker.setMap(null);
    }

    var imageSrc = 'here.png';

    var imageSize = new kakao.maps.Size(64, 69);

    var imageOption = {
        offset: new kakao.maps.Point(27, 69)
    };

    var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
    );

    marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage
    });

    marker.setMap(map);
    map.setCenter(locPosition);
}

function getmyLocationAddr() {
    var geocoder = new kakao.maps.services.Geocoder();

    searchAddrFromCoords(
        map.getCenter(),
        displayCenterInfo
    );

    function searchAddrFromCoords(coords, callback) {
        geocoder.coord2RegionCode(
            coords.getLng(),
            coords.getLat(),
            callback
        );
    }

    function displayCenterInfo(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            for (var i = 0; i < result.length; i++) {
                if (result[i].region_type === 'H') {
                    document.getElementById('myloctext').textContent =
                        result[i].address_name;

                    selectMYLoc(result[i].region_1depth_name);

                    break;
                }
            }
        }
    }
}

function selectLoc(value) {
    var a, b;

    health_Code = null;
    forecast_Code = null;
    sidoName = value;

    switch (value) {
        case '서울특별시':
            health_Code = 1100000000;
            sidoName = '서울';
            a = 37.5636;
            b = 126.98;
            break;

        case '부산광역시':
            health_Code = 2600000000;
            sidoName = '부산';
            a = 35.177;
            b = 129.077;
            break;

        case '대구광역시':
            health_Code = 2700000000;
            sidoName = '대구';
            a = 35.8685;
            b = 128.6036;
            break;

        case '인천광역시':
            health_Code = 2800000000;
            sidoName = '인천';
            a = 37.4532;
            b = 126.7074;
            break;

        case '광주광역시':
            health_Code = 2900000000;
            sidoName = '광주';
            a = 35.157;
            b = 126.8534;
            break;

        case '대전광역시':
            health_Code = 3000000000;
            sidoName = '대전';
            a = 36.3471;
            b = 127.3866;
            break;

        case '울산광역시':
            health_Code = 3100000000;
            sidoName = '울산';
            a = 35.5354;
            b = 129.3137;
            break;

        case '경기도':
            health_Code = 4111000000;
            sidoName = '경기';
            a = 37.2606;
            b = 127.0307;
            break;

        case '강원도':
            health_Code = 4211000000;
            sidoName = '강원';
            a = 37.8785;
            b = 127.7323;
            break;

        case '충청북도':
            health_Code = 4311000000;
            sidoName = '충북';
            a = 36.6396;
            b = 127.4912;
            break;

        case '충청남도':
            health_Code = 4413000000;
            sidoName = '충남';
            a = 36.8121;
            b = 127.1162;
            break;

        case '전라북도':
            health_Code = 4511000000;
            sidoName = '전북';
            a = 35.8215;
            b = 127.15;
            break;

        case '전라남도':
            health_Code = 4611000000;
            sidoName = '전남';
            a = 34.8088;
            b = 126.3944;
            break;

        case '경상북도':
            health_Code = 4812100000;
            sidoName = '경북';
            a = 36.016;
            b = 129.3456;
            break;

        case '경상남도':
            health_Code = 4812000000;
            sidoName = '경남';
            a = 35.2248;
            b = 128.6841;
            break;

        case '제주특별자치도':
            health_Code = 5011000000;
            sidoName = '제주';
            a = 33.4963;
            b = 126.5332;
            break;

        default:
            return;
    }

    var locPosition = new kakao.maps.LatLng(a, b);

    displayMarker(locPosition, sidoName);

    parsing();
}

function selectMYLoc(value) {
    health_Code = null;
    forecast_Code = null;

    const regions = {
        '서울특별시': '서울',
        '부산광역시': '부산',
        '대구광역시': '대구',
        '인천광역시': '인천',
        '광주광역시': '광주',
        '대전광역시': '대전',
        '울산광역시': '울산',
        '경기도': '경기',
        '강원도': '강원',
        '강원특별자치도': '강원',
        '충청북도': '충북',
        '충청남도': '충남',
        '전라북도': '전북',
        '전북특별자치도': '전북',
        '전라남도': '전남',
        '경상북도': '경북',
        '경상남도': '경남',
        '제주특별자치도': '제주',
        '세종특별자치시': '세종'
    };

    sidoName = regions[value] || value;

    parsing();
}

const apiKey = "c9a2ea5478dadddbe75e1355e1fab0200ee93dfb15fbc1bf70022c8c4289f245";

function normalizeKey(key) {
    let raw = String(key || "").trim();

    if (/%[0-9A-Fa-f]{2}/.test(raw)) {
        try {
            raw = decodeURIComponent(raw);
        } catch (e) {
        }
    }

    return encodeURIComponent(raw);
}

function getCurrentDate(offset = 0) {
    const date = new Date();

    date.setDate(date.getDate() + offset);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const baseUrl =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

const ctprvnUrl =
    `${baseUrl}/getCtprvnRltmMesureDnsty?pageNo=1&numOfRows=100&returnType=xml&ver=1.0&sidoName=`;

const currentDate = getCurrentDate();

const minuDustUrl =
    `${baseUrl}/getMinuDustFrcstDspth?searchDate=${currentDate}&returnType=xml&numOfRows=100&pageNo=1`;

async function fetchData(url, withSido = true) {
    try {
        const target = url
            + (withSido ? encodeURIComponent(sidoName) : '')
            + `&serviceKey=${normalizeKey(apiKey)}`;

        const response = await fetch(target);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.text();

    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

function parseXml(xmlString) {
    return new DOMParser().parseFromString(
        xmlString,
        "text/xml"
    );
}

function setElementContentById(elementId, content) {
    document.getElementById(elementId).textContent = content;
}

async function parsing() {
    const ctprvnData = await fetchData(ctprvnUrl);

    if (ctprvnData) {
        const ctprvnXml = parseXml(ctprvnData);

        const ctprvnItems = ctprvnXml.querySelectorAll('item');

        console.log(ctprvnItems);

        if (ctprvnItems.length > 0) {
            const item = ctprvnItems[0];

            setElementContentById(
                'd_1',
                item.querySelector('dataTime').textContent
            );

            setElementContentById(
                'd_2',
                item.querySelector('stationName').textContent
            );

            document.getElementById('d_3').innerHTML =
                setTotalContent(
                    item.querySelector('khaiGrade').textContent
                );

            document.getElementById('d_4').innerHTML =
                setContentforDust(
                    item.querySelector('pm10Grade').textContent
                );

            document.getElementById('d_5').innerHTML =
                setContentforDust(
                    item.querySelector('o3Grade').textContent
                );

            document.getElementById('d_6').innerHTML =
                setContentforDust(
                    item.querySelector('coGrade').textContent
                );
        }
    }

    await parsingForecast();
}

async function parsingForecast() {
    let forecastData = await fetchData(minuDustUrl, false);

    let items = [];

    if (forecastData) {
        const forecastXml = parseXml(forecastData);

        items = Array.from(
            forecastXml.querySelectorAll('item')
        );
    }

    let item = items.find(function(item) {
        return item.querySelector('informCode')?.textContent === 'PM10'
            && item.querySelector('informData')?.textContent === currentDate;
    });

    if (!item) {
        const yesterday = getCurrentDate(-1);

        const yesterdayUrl =
            `${baseUrl}/getMinuDustFrcstDspth?searchDate=${yesterday}&returnType=xml&numOfRows=100&pageNo=1`;

        forecastData = await fetchData(yesterdayUrl, false);

        if (forecastData) {
            const forecastXml = parseXml(forecastData);

            items = Array.from(
                forecastXml.querySelectorAll('item')
            );

            item = items.find(function(item) {
                return item.querySelector('informCode')?.textContent === 'PM10'
                    && item.querySelector('informData')?.textContent === currentDate;
            });
        }
    }

    if (item) {
        setElementContentById(
            'f_1',
            item.querySelector('dataTime')?.textContent || '정보없음'
        );

        setElementContentById(
            'f_2',
            item.querySelector('informGrade')?.textContent || '정보없음'
        );

        setElementContentById(
            'f_3',
            item.querySelector('informCause')?.textContent || '정보없음'
        );

    } else {
        setElementContentById('f_1', '정보없음');
        setElementContentById('f_2', '정보없음');
        setElementContentById('f_3', '정보없음');
    }
}

function setTotalContent(text) {
    var result = '';

    switch (text) {
        case '0':
            result = '좋음';
            break;

        case '1':
            result = '좋음';
            break;

        case '2':
            result = '보통';
            break;

        case '3':
            result = '나쁨';
            break;

        case '4':
            result = '매우나쁨';
            break;

        default:
            result = '정보없음';
            break;
    }

    return result;
}

function setContentforDust(text) {
    var result = '';

    switch (text) {
        case '0':
            result = '좋음';
            break;

        case '1':
            result = '좋음';
            break;

        case '2':
            result = '보통';
            break;

        case '3':
            result = '나쁨';
            break;

        case '4':
            result = '매우나쁨';
            break;

        default:
            result = '정보없음';
            break;
    }

    return result;
}