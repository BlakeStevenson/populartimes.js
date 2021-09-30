const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
const axios = require('axios')
const { Client } = require("@googlemaps/google-maps-services-js");

// URL you can test:
// https://www.google.com/maps/place/?q=place_id:ChIJc5KGoHXDyIARjRvuzlguft8

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


function getPlaceName(place_id, google_places_api_key) {

    const googleSearch = new Client({})
    return googleSearch.placeDetails({
        params: {
            place_id: place_id,
            fields: ["name"],
            key: google_places_api_key,
        },
        timeout: 1000, // milliseconds
    })
        .then((r) => {
            return (r.data.result.name)
        })
        .catch((e) => {
            console.error('No place found');
            return null;
        });
}

async function sendRequest(htmlUrl, scraperSettings) {


    // scraperAPI.io
    if (scraperSettings.engine.toLowerCase() === "scraperapi") {
        let config = {
            render: true
        };
        config = { ...config, ...scraperSettings.config };

        // validation
        if (!config.apikey) {
            let error = 'Error: ScraperAPI key is missing. Please check the populartimes.js documentation'
            console.error(error)
            return error
        }

        // continue
        axiosOptions = {
            method: 'get',
            url: `http://api.scraperapi.com?api_key=${config.apikey}&render=${config.render}&country_code=us&url=${encodeURIComponent(htmlUrl + "&region=us&language=us")}`
        }

        return axios(axiosOptions).then(data => {
            if (!!data.data) {
                return data.data
            } else {
                return data
            }
        }).catch(err => {
            console.log(err.status)
            console.log(err.statusText)
            return err
        })
    }

    // puppeteer
    else if (scraperSettings.engine === "puppeteer") {
        let config = {};
        config = { ...config, ...scraperSettings.config }

        const browser = await puppeteer.launch(config);
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
}

function convertTo24(hoursObject) {
    let { percent, hour, meridiem } = hoursObject;
    if ((hour == '12' && meridiem == 'AM')) {
        return { percent, hour: '0' }
    } else if ((hour == '12' || meridiem != 'PM')) {
        return { percent, hour }
    } else if (hour !== '12') {
        hour = (parseInt(hour) + 12).toString();
        return { percent, hour }
    }
}

module.exports = async function getPopularTimes(placeId, functionOptions) {
    // set options

    let options = {
        fillMissing: false,
        militaryTime: false,
        integer: true,
        getCurrentTime: true,
        scraperSettings: {
            engine: "puppeteer",
            config: {}
        }
    };
    options = { ...options, ...functionOptions };

    // get raw html
    const rawData = await sendRequest(getHtmlUrl(placeId), options.scraperSettings);
    // parse html
    const body = new JSDOM(rawData);
    // get days of the week

    let days;
    // puppeteer
    if (options.scraperSettings.engine === "puppeteer") {
        days = body.window.document.getElementsByClassName("section-popular-times-graph");
    } else {
        // scraper API way

        const placeName = await getPlaceName(placeId, options.scraperSettings.config.google_places_api_key);

        if (!placeName) {
            console.error(`Did not find a place name using place_id: ${place_id}`)
            return {}
        } else {
            console.log(placeName)
            days = body.window.document.querySelectorAll(`div[aria-label="Popular times at ${placeName}"] > div:last-of-type > div`);
        }
    }

    // loop through the days
    const out = {};
    let i = 0;
    for (let day of days) {
        // get hours in a day
        // gets the bar for the array

        // scraper API way, might work for puppeteer too
        let hours;
        // puppeteer
        if (options.scraperSettings.engine === "puppeteer") {
            hours = day.getElementsByClassName("section-popular-times-bar");
        } else {
            // scraper API way
            hours = day.querySelectorAll('div[aria-label]');
        }
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

        // needed to fix issue where google doesn't show hour for current times
        let hoursTracker;
        let meridiemTracker;

        for (let hourEle of hours) {
            let hr = hourEle.getAttribute("aria-label");
            let parts = hr.split(" ");

            if (parts[0] === "Currently" && !!options.getCurrentTime) {
                out.now = {
                    currently: parts[1],
                    usually: parts[4]
                }
            }

            if (parts.length < 5) {
                // if no hours, do nothing
            } else {
                let percent = parts[0];
                let hour = parts[3];
                let meridiem = parts[4].replace(".", "");

                if (hour !== 'usually') {
                    hoursTracker = hour;
                    meridiemTracker = meridiem;
                } else {
                    percent = parts[4];
                    hour = (parseInt(hoursTracker) + 1).toString();
                    if (hoursTracker === '11' && meridiemTracker === 'AM') {
                        meridiem = 'PM'
                    } else if (hoursTracker === '11' && meridiemTracker === 'PM') {
                        meridiem = 'AM'
                    } else {
                        meridiem = meridiemTracker
                    }
                }

                let hoursEndObject = { percent, hour, meridiem };
                // if 24 hour format, convert it to 24 hour format
                if (options.militaryTime) {
                    hoursEndObject = convertTo24(hoursEndObject);
                    hour = hoursEndObject.hour
                }
                if (options.fillMissing === true) {
                    let index = hoursInDay.findIndex(hoursObject => {
                        // this is where the index is getting messed up
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
        if (options.integer) {
            for (let hoursObject of hoursInDay) {
                hoursObject.hour = parseInt(hoursObject.hour);
                hoursObject.percent = parseInt(hoursObject.percent.replace('%'))
            }
        };
        out[getDayName(i)] = hoursInDay;
        i++;
    }

    console.log('output is:')
    console.log(out)
    return out;
}