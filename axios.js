const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const xlsx = require("xlsx");


const getHTML = async(keyword) =>{
    try {
        return await axios.get("http://addon.jinhakapply.com/RatioV1/RatioH/Ratio10190351.html")
    } catch(err) {
        console.log(err)

    }

}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data); // 제이쿼리
    const $List = $(".Ratio1019035");

    let courses = [];
    $List.each((idx,node) => {
        const title = $(node).find(".unit").text();
        courses.push({
            major: $(node).find(".unit").text(),
            competitiveRate: $(node).find(".rate4").text().css("width") // 제이쿼리 문법과 동일함
        })
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(courses);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Gachon");
    const excelFileName = "gachon.xlsx";
    xlsx.writeFile(workbook, excelFileName);
    console.log("Data extracted to", excelFileName);
};

parsing("가천대학교 경쟁률");