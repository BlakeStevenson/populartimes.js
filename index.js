const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
//https://www.google.com/maps/place/?q=place_id:ChIJEVBPhRQtTIYR9Qn5LawiZIs

function getHtmlUrl(placeId) {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
}

function getDayName(index) {
    const days = {
        0: "sunday",
        1: "monday",
        2: "tuesday",
        3: "wednesday",
        4: "thursday",
        5: "friday",
        6: "saturday",
    }
    return days[index];
}

async function sendRequest(htmlUrl, params) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(htmlUrl, {waitUntil: 'networkidle2'});
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    return data;
}

module.exports = async function getPopularTimes(placeId) {
    // get raw html
    const rawData = await sendRequest(getHtmlUrl(placeId));
    // parse html
    const body = new JSDOM(rawData);
    // get days of the week
    const days = body.window.document.getElementsByClassName("section-popular-times-graph");
    // loop through the days
    const out = {};
    let i = 0;
    for(let day of days) {
        // get hours in a day
        const hours = day.getElementsByClassName("section-popular-times-bar");
        // loop through the hours
        let hoursInDay = [];
        let j = 0;
        for(let hour of hours) {
            let hr = hour.getAttribute("aria-label");
            let parts = hr.split(" ");
            if(parts[0] === "Currently") {
                out.now = {
                    percent: parts[4],
                }
            } else {
                let percent = parts[0];
                let hour = parts[3];
                let meridiem = parts[4].replace(".", "");

                hoursInDay[j] = {percent, hour, meridiem};
                j++;
            }
        }
        out[getDayName(i)] = hoursInDay;
        i++;
    }
    return out;
}
