const getPopularTimes = require('./index');

testFunction = async () => {
    
    // testing scraperapi
    console.log('Testing scraperAPI first')
    await getPopularTimes('ChIJc5KGoHXDyIARjRvuzlguft8', {
        scraperSettings: {
            engine: "scraperapi",
            config: {
                apikey: "your_api_key",
                render: true,
                google_places_api_key: "your_places_api_key"
            }
        }
    })

    // testing puppeteer
    console.log('Testing puppeteer next');
    await getPopularTimes('ChIJc5KGoHXDyIARjRvuzlguft8', {
        scraperSettings: {
            engine: "puppeteer",
            config: {
                google_places_api_key: 
            }
        }
    })
}

testFunction();