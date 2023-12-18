const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const json2xls = require('json2xls');

const API = 'http://addon.jinhakapply.com/RatioV1/RatioH/Ratio10190351.html';

const scrapperScript = async () => {
    try {
        const { data } = await axios.get(API);
        const $ = cheerio.load(data);

        const scrapedData = [];

        // 선택자 '.unit'에 해당하는 요소들을 추출하여 데이터 저장
        $('.unit').each((index, el) => {
            const major = $(el).text();
            scrapedData.push({ major });
        });

        // 선택자 '.rate4'에 해당하는 요소들을 추출하여 데이터 저장
        $('.rate4').each((index, el) => {
            const rate4 = $(el).text();
            scrapedData[index].ratio= rate4;
        });

        console.dir(scrapedData); // console.dir 경우엔 JSON과 같은 트리 구조로 출력

        const xls = json2xls(scrapedData); // json2xls로 JSON 데이터를 엑셀 파일 변환

        fs.writeFileSync('scrapedData.xlsx', xls, 'binary'); // 변환된 데이터를 'scrapedData.xlsx'라는 엑셀 파일 저장
        console.log('데이터가 엑셀 파일로 저장되었습니다.');
    } catch (error) {
        console.error(error);
    }
};

scrapperScript();