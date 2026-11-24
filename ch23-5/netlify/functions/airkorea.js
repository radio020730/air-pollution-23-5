const BASE_URL =
    "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

exports.handler = async function (event) {
    const params = event.queryStringParameters;

    const serviceKey =
        encodeURIComponent(process.env.AIRKOREA_API_KEY);

    let apiUrl;

    if (params.type === "fcst") {
        apiUrl = BASE_URL
            + "/getMinuDustFrcstDspth?searchDate="
            + params.searchDate
            + "&pageNo=1&numOfRows=100&returnType=xml";

    } else {
        apiUrl = BASE_URL
            + "/getCtprvnRltmMesureDnsty?pageNo=1"
            + "&numOfRows=100&returnType=xml&ver=1.0"
            + "&sidoName="
            + encodeURIComponent(params.sidoName);
    }

    apiUrl += "&serviceKey=" + serviceKey;

    const response = await fetch(apiUrl);

    const xml = await response.text();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8"
        },
        body: xml
    };
};