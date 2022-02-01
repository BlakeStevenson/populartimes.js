# populartimes.js
Find the popular times of a location by scraping Google Maps.

## Usage

### Install
```
npm install populartimes.js
```

### Example
```
const populartimes = require('populartimes.js');
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs").then(out => console.log(out));
```
(where ChIJEVBPhRQtTIYR9Qn5LawiZIs is a Google Maps place ID).

### Output
```
{
  sunday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '45%', hour: '11', meridiem: 'AM' },
    { percent: '67%', hour: '12', meridiem: 'PM' },
    { percent: '85%', hour: '1', meridiem: 'PM' },
    { percent: '94%', hour: '2', meridiem: 'PM' },
    { percent: '94%', hour: '3', meridiem: 'PM' },
    { percent: '86%', hour: '4', meridiem: 'PM' },
    { percent: '69%', hour: '5', meridiem: 'PM' },
    { percent: '50%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  monday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '49%', hour: '11', meridiem: 'AM' },
    { percent: '51%', hour: '12', meridiem: 'PM' },
    { percent: '50%', hour: '1', meridiem: 'PM' },
    { percent: '53%', hour: '2', meridiem: 'PM' },
    { percent: '55%', hour: '3', meridiem: 'PM' },
    { percent: '54%', hour: '4', meridiem: 'PM' },
    { percent: '51%', hour: '5', meridiem: 'PM' },
    { percent: '46%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  now: { percent: '46%' },
  tuesday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '43%', hour: '11', meridiem: 'AM' },
    { percent: '51%', hour: '12', meridiem: 'PM' },
    { percent: '52%', hour: '1', meridiem: 'PM' },
    { percent: '50%', hour: '2', meridiem: 'PM' },
    { percent: '49%', hour: '3', meridiem: 'PM' },
    { percent: '49%', hour: '4', meridiem: 'PM' },
    { percent: '36%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  wednesday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '28%', hour: '11', meridiem: 'AM' },
    { percent: '34%', hour: '12', meridiem: 'PM' },
    { percent: '44%', hour: '1', meridiem: 'PM' },
    { percent: '46%', hour: '2', meridiem: 'PM' },
    { percent: '39%', hour: '3', meridiem: 'PM' },
    { percent: '32%', hour: '4', meridiem: 'PM' },
    { percent: '31%', hour: '5', meridiem: 'PM' },
    { percent: '31%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  thursday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '45%', hour: '11', meridiem: 'AM' },
    { percent: '55%', hour: '12', meridiem: 'PM' },
    { percent: '56%', hour: '1', meridiem: 'PM' },
    { percent: '50%', hour: '2', meridiem: 'PM' },
    { percent: '43%', hour: '3', meridiem: 'PM' },
    { percent: '43%', hour: '4', meridiem: 'PM' },
    { percent: '49%', hour: '5', meridiem: 'PM' },
    { percent: '50%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  friday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '45%', hour: '11', meridiem: 'AM' },
    { percent: '58%', hour: '12', meridiem: 'PM' },
    { percent: '61%', hour: '1', meridiem: 'PM' },
    { percent: '60%', hour: '2', meridiem: 'PM' },
    { percent: '61%', hour: '3', meridiem: 'PM' },
    { percent: '58%', hour: '4', meridiem: 'PM' },
    { percent: '50%', hour: '5', meridiem: 'PM' },
    { percent: '43%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ],
  saturday: [
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '0%', hour: '8', meridiem: 'AM' },
    { percent: '0%', hour: '9', meridiem: 'AM' },
    { percent: '0%', hour: '10', meridiem: 'AM' },
    { percent: '73%', hour: '11', meridiem: 'AM' },
    { percent: '85%', hour: '12', meridiem: 'PM' },
    { percent: '96%', hour: '1', meridiem: 'PM' },
    { percent: '100%', hour: '2', meridiem: 'PM' },
    { percent: '92%', hour: '3', meridiem: 'PM' },
    { percent: '79%', hour: '4', meridiem: 'PM' },
    { percent: '68%', hour: '5', meridiem: 'PM' },
    { percent: '57%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ]
}

```

### Options

`populartimes` accepts an options object argument for modifying the data output.

#### Example

```
let options = {
  fillMissing: true
};
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{fillMissing: true}).then(out => console.log(out));
```

####

#### Scraper options (default: `{engine: "puppeteer", config: {} }`)

Expects an `object`.

Passes configuration to the scraper. You can specify either of the following engines:

- `puppeteer`
- `ScraperAPI` (Note: To render Javascript, you must be on the [Business or Enterprise](https://www.scraperapi.com/pricing/) plan)

You may have to provide an API key depending on the engine.

All engines require a `google_places_api_key` in a `config` object. See the examples below.

##### puppeteer configuration

To use puppeteer, you will need to include your Google Maps API key with places permissions.

```
{
  engine: "puppeteer",
  config: {
    google_places_api_key: "google_places_api_key",   // required. Google API key requires places permissions
  }
}
```

##### ScraperAPI configuration

ScraperAPI documentation:
https://www.scraperapi.com/documentation/

```
{
  engine: "scraperapi",
  config: {
    apikey: "your_scraper_api_key",   // required. Sign up at ScraperAPI.io
    google_places_api_key: "google_places_api_key",   // required. Google API key requires places permissions
    render: true  // optional, defaults to true
  }
}
```

##### Example

```
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{puppeteerOptions: { headless: true, args:['--no-sandbox', '--disable-setuid-sandbox'] }})
```

#### fillMissing (default: `false`)

Expects `boolean`.

Fills in missing hours in the array. 

##### Example

```
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{fillMissing: true}).then(out => console.log(out));
```

```
  saturday: [
    { percent: '0%', hour: '0', meridiem: 'AM' },
    { percent: '0%', hour: '1', meridiem: 'AM' },
    { percent: '0%', hour: '2', meridiem: 'AM' },
    { percent: '0%', hour: '3', meridiem: 'AM' },
    { percent: '0%', hour: '4', meridiem: 'AM' },
    { percent: '0%', hour: '5', meridiem: 'AM' },
    { percent: '0%', hour: '6', meridiem: 'AM' },
    { percent: '0%', hour: '7', meridiem: 'AM' },
    { percent: '23%', hour: '8', meridiem: 'AM' },
    { percent: '39%', hour: '9', meridiem: 'AM' },
    { percent: '55%', hour: '10', meridiem: 'AM' },
    { percent: '68%', hour: '11', meridiem: 'AM' },
    { percent: '76%', hour: '12', meridiem: 'PM' },
    { percent: '80%', hour: '1', meridiem: 'PM' },
    { percent: '81%', hour: '2', meridiem: 'PM' },
    { percent: '77%', hour: '3', meridiem: 'PM' },
    { percent: '65%', hour: '4', meridiem: 'PM' },
    { percent: '48%', hour: '5', meridiem: 'PM' },
    { percent: '0%', hour: '6', meridiem: 'PM' },
    { percent: '0%', hour: '7', meridiem: 'PM' },
    { percent: '0%', hour: '8', meridiem: 'PM' },
    { percent: '0%', hour: '9', meridiem: 'PM' },
    { percent: '0%', hour: '10', meridiem: 'PM' },
    { percent: '0%', hour: '11', meridiem: 'PM' }
  ]
```

#### militaryTime (default: `false`)

Expects `boolean`.

Converts times to military time (24hr) format. 

##### Example

```
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{fillMissing: true, militaryTime: true}).then(out => console.log(out));
```

```
  saturday: [
    { percent: '0%', hour: '0' },
    { percent: '0%', hour: '1' },
    ....
    { percent: '23%', hour: '8' },
    { percent: '39%', hour: '9' },
    { percent: '55%', hour: '10' },
    { percent: '68%', hour: '11' },
    { percent: '76%', hour: '12' },
    { percent: '80%', hour: '13' },
    { percent: '81%', hour: '14' },
    { percent: '77%', hour: '15' },
    { percent: '65%', hour: '16' },
    { percent: '48%', hour: '17' },
    ....
  ]
```

#### integer (default: `false`)

Expects `boolean`.

Converts string values into integers. The percentage value will be converted to a value between `0` and `100`.

##### Example

```
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{militaryTime: true, integer: true}).then(out => console.log(out));
```

```
  saturday: [
    ....
    { percent: 23, hour: 8 },
    { percent: 39, hour: 9 },
    { percent: 55, hour: 10 },
    { percent: 68, hour: 11 },
    { percent: 76, hour: 12 },
    { percent: 80, hour: 13 },
    { percent: 81, hour: 14 },
    { percent: 77, hour: 15 },
    { percent: 65, hour: 16 },
    { percent: 48, hour: 17 },
    ....
  ]
```

#### debug (default: `false`)

Outputs debugging information.

##### Example

```
populartimes("ChIJEVBPhRQtTIYR9Qn5LawiZIs",{debug: true}).then(out => console.log(out));
```

```
output is:
{}
```

## Development

When developing in this package, you can run tests using the `/tests.js` file. Use either `node tests` or `npm run tests`.