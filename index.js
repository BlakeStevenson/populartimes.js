const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const puppeteer = require('puppeteer');
const axios = require('axios')
const { Client } = require("@googlemaps/google-maps-services-js");

// URL you can test:
// https://www.google.com/maps/place/?q=place_id:ChIJc5KGoHXDyIARjRvuzlguft8

function getHtmlUrl(place_id) {
    return `https://www.google.com/maps/place/?q=place_id:${place_id}`;
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
            return error
        }

        // continue
        axiosOptions = {
            method: 'get',
            url: `http://api.scraperapi.com?api_key=${config.apikey}&render=${config.render}&country_code=us&url=${encodeURIComponent(htmlUrl + "&region=us&language=us&hl=en")}`
        }

        return axios(axiosOptions).then(data => {
            if (!!data.data) {
                return data.data
            } else {
                return data
            }
        }).catch(err => {
            console.error(err.status)
            console.error(err.statusText)
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

        debugMessage(`Running ${scraperSettings.engine}`)
        await page.goto(htmlUrl, { waitUntil: 'networkidle2' });
        const data = await page.evaluate(() => document.querySelector('body').outerHTML);
        await browser.close();


        return data;
    }
}

function convertTo24(hoursObject) {
    let { percent, hour, meridiem } = hoursObject;
    meridiem = meridiem.toLowerCase()

    if ((hour == '12' && meridiem == 'am')) {
        return { percent, hour: '0' }
    } else if ((hour == '12' || meridiem != 'pm')) {
        return { percent, hour }
    } else if (hour !== '12') {
        hour = (parseInt(hour) + 12).toString();
        return { percent, hour }
    }
}

module.exports = async function getPopularTimes(place_id, functionOptions) {
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

    debugMessage = (message) => {
        if(options.debug) {
            console.debug(message)
        }
    }
    
    // get raw html
    const rawData = await sendRequest(getHtmlUrl(place_id), options.scraperSettings);
    // parse html
    console.debug('getting the body')
    // const virtualConsole = new jsdom.VirtualConsole();
    // virtualConsole.on("error", () => {
    //     // No-op to skip console errors.
    // });
    // body = new JSDOM("<html><div>test</div><div>what</div>")
    body = new JSDOM("<html>" + rawData)
    // const body = new JSDOM(rawData, {virtualConsole});
    console.debug('got the body')
    console.debug(getHtmlUrl(place_id))
    // get days of the week

    let days;

    const placeName = await getPlaceName(place_id, options.scraperSettings.config.google_places_api_key);

    if (!placeName) {
        console.error(`Did not find a place name using place_id: ${place_id}`)
        return {}
    } else {
            debugMessage('place name is:')
            debugMessage(placeName)
        }

        let selector = `div[aria-label="Popular times at ${placeName}"] > div:last-of-type > div`

        debugMessage(selector);
        days = body.window.document.querySelectorAll(selector);
        debugMessage(days)
    }

    // loop through the days
    const out = {};
    let i = 0;
    for (let day of days) {
        // get hours in a day
        // gets the bar for the array

        let hours;
        hours = day.querySelectorAll('div[aria-label]');
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
                        hoursInDay.push({ percent: '0%', hour: d.toString(), meridiem: 'am' })
                    } else if (d === 12) {
                        hoursInDay.push({ percent: '0%', hour: d.toString(), meridiem: 'pm' })
                    } else if (d > 12) {
                        hoursInDay.push({ percent: '0%', hour: (d - 12).toString(), meridiem: 'pm' })
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

            debugMessage('hr is:', hr)
                // if no hours, do nothing
                if(!!options.debug) {
                    debugMessage('No times detected: ', hr)
                } else {
                    console.log('No times detected')
                }

                if (hour !== 'usually') {
                    hoursTracker = hour;
                    meridiemTracker = meridiem;
                } else {
                    debugMessage('Debugging: Percent is: ', parts[4])
                    percent = parts[4];
                    hour = (parseInt(hoursTracker) + 1).toString();
                    if (hoursTracker === '11' && meridiemTracker === 'am') {
                        meridiem = 'pm'
                    } else if (hoursTracker === '11' && meridiemTracker === 'pm') {
                        meridiem = 'am'
                    } else {
                        meridiem = meridiemTracker
                    }
                }

                let hoursEndObject = { percent, hour, meridiem };
                debugMessage(hoursEndObject)
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

    if (!!options.debug) {
        console.log('PlaceID: ', place_id)
        console.log('Options selected:')
        console.log(options)
        if (options.scraperSettings.engine.toLowerCase() === 'scraperapi') {
            console.log("ScraperAPI URL:")
            console.log(`http://api.scraperapi.com?api_key=${options.scraperSettings.config.apikey}&render=${options.scraperSettings.config.render}&country_code=us&url=${encodeURIComponent(`https://www.google.com/maps/place/?q=place_id:${place_id}` + "&region=us&language=us&hl=en")}`)
        }
        console.log('output: ')
        console.log(out)
    }
    if (!out) {
        console.error('Problem running populartimes.js')
        return null
    }
    return out;
}