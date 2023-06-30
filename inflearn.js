const axios = require("axios");
const cheerio = require("cheerio");

const getHTML = async(keyword) =>{
    try {
        return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword))
    } catch(err) {
        console.log(err)
    }
}

const parsing = async (keyword) => {
    const html = await getHTML(keyword);
    const $ = cheerio.load(html.data);
    const $courseList = $(".course_card_item");

    let course = [];
    $courseList.each((idx,node) => {
        const title = $(node).find(".course_title").text();
        console.log(title);
    });
}

parsing("자바스크립트");