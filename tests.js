const getPopularTimes = require('./index');

testFunction = async () => {
    
    // testing scraperapi
    console.log('Testing scraperAPI')
    await getPopularTimes('ChIJc5KGoHXDyIARjRvuzlguft8', {
        scraperSettings: {
            debug: true,
            engine: "scraperapi",
            config: {
                apikey: "your-api-key",
                render: true,
                google_places_api_key: "your-google-maps-api-key"
            }
        }
    })

    // testing puppeteer
    console.log('Testing puppeteer');
    await getPopularTimes('ChIJc5KGoHXDyIARjRvuzlguft8', {
        debug: true,
        scraperSettings: {
            engine: "puppeteer",
            config: {
                google_places_api_key: "your-google-maps-api-key"
            },
        }
    })
}

testFunction();