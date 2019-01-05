# FMI API

## Installation

```bash
npm i --save --save-exact git+ssh://git@gitlab.labranet.jamk.fi:YTSP0200/fmi-api.git
```

## Usage

```javascript
const fmi = require("fmi-api");

const { Temperature, LandSeaMask } = await fmi.getForecast("helsinki");
// ...
```

## Acknowledgements

Based on the work by Teemu Kontio <teemu.kontio@jamk.fi> (https://gitlab.labranet.jamk.fi/YTSP0300/meta/snippets/39). Adapted to NodeJS and the requirements of the backend-development course.
