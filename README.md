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
