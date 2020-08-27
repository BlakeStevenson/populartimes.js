const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
//https://www.google.com/maps/place/?q=place_id:ChIJqRNf_2qVwoAR8LxgjIId7Qw

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

async function sendRequest(htmlUrl) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() === 'image' || req.resourceType() === 'stylesheet' || req.resourceType() === 'font') {
            req.abort();
        }
        else {
            req.continue();
        }
    });

    await page.goto(htmlUrl, { waitUntil: 'networkidle2' });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    return data;
}

function convertTo24(hoursObject) {
    let { percent, hour, meridiem } = hoursObject;
    if (hour == '12' || meridiem != 'PM') {
        return { percent, hour }
    } else if (hour !== '12') {
        hour = (parseInt(hour) + 12).toString();
        return { percent, hour }
    }
}

// module.exports = async 
async function getPopularTimes(placeId, options) {
    // set options
    let defaultOptions = {
        fillMissing: false,
        militaryTime: false,
        integer: true
    };
    options = { ...defaultOptions, ...options };
    // get raw html
    const rawData = await sendRequest(getHtmlUrl(placeId));
    // parse html
    const body = new JSDOM(rawData);
    // get days of the week
    const days = body.window.document.getElementsByClassName("section-popular-times-graph");
    // loop through the days
    const out = {};
    let i = 0;
    for (let day of days) {
        // get hours in a day
        const hours = day.getElementsByClassName("section-popular-times-bar");
        // loop through the hours
        let hoursInDay = [];
        if (options.fillMissing === true) {
            if (options.militaryTime) {
                for (let d = 0; d < 24; d++) {
                    hoursInDay.push({ percent: '0%', hour: d.toString() })
                }
            } else {
                // if not 24hour format, use 12hr format by default
                for (let d = 0; d < 24; d++) {
                    if (d < 12) {
                        hoursInDay.push({ percent: '0%', hour: d.toString(), meridiem: 'AM' })
                    } else if (d === 12) {
                        hoursInDay.push({ percent: '0%', hour: d.toString(), meridiem: 'PM' })
                    } else if (d > 12) {
                        hoursInDay.push({ percent: '0%', hour: (d - 12).toString(), meridiem: 'PM' })
                    }
                }
            }
        };

        let j = 0;
        for (let hour of hours) {
            let hr = hour.getAttribute("aria-label");
            let parts = hr.split(" ");
            if (parts[0] === "Currently") {
                out.now = {
                    currently: parts[1],
                    usually: parts[4]
                }
            } else {
                let percent = parts[0];
                let hour = parts[3];
                let meridiem = parts[4].replace(".", "");
                let hoursEndObject = { percent, hour, meridiem };
                // if 24 hour format, convert it to 24 hour format
                if (options.militaryTime) {
                    hoursEndObject = convertTo24(hoursEndObject);
                    hour = hoursEndObject.hour
                }
                if (options.fillMissing === true) {
                    let index = hoursInDay.findIndex(hoursObject => {
                        if (options.militaryTime) {
                            return (hoursObject.hour === hour)
                        } else {
                            return (hoursObject.hour === hour && hoursObject.meridiem === meridiem)
                        }
                    })
                    hoursInDay[index] = hoursEndObject;
                } else {
                    hoursInDay[j] = hoursEndObject;
                }
                j++;
            }
        }
        // handles integer option
        if(options.integer) {
            for(let hoursObject of hoursInDay) {
                hoursObject.hour = parseInt(hoursObject.hour);
                hoursObject.percent = parseInt(hoursObject.percent.replace('%'))
            }
        };
        out[getDayName(i)] = hoursInDay;
        i++;
    }
    return out;
}

getPopularTimes('ChIJaSv_6gaZ4jARnbiUVn6Z_YY', { fillMissing: true, militaryTime: true, integer: true }).then(out => console.log(out));
