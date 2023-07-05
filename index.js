const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const xlsx = require("xlsx");



const getHTML = async(keyword) =>{
    try {
        return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword))
    } catch(err) {
        console.log(err)

    }

}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data); // 제이쿼리
    const $courseList = $(".course_card_item");

    let courses = [];
    $courseList.each((idx,node) => {
        const title = $(node).find(".course_title").text();
        courses.push({
            title: $(node).find(".course_title").text(),
            instructor: $(node).find(".instructor").text(),
            price: $(node).find(".price").text(),
            rating: $(node).find(".star_solid").css("width") // 제이쿼리 문법과 동일함
        })
    });

    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(courses);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Courses");
    const excelFileName = "courses.xlsx";
    xlsx.writeFile(workbook, excelFileName);
    console.log("Data extracted to", excelFileName);
};

parsing("자바스크립트");