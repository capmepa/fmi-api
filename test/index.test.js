/**
 * @file
 *
 * This isn't a real test suite - just something to mess around with the module
 * while developing it.
 */

require("dotenv/config");

const _ = require("lodash");
const assert = require("assert");

const fmi = require("../src");

const PLACES_TO_TEST = [
  "alajärvi",
  "brändö",
  "eckerö",
  "helsinki",
  "jyväskylä"
];

function test() {
  PLACES_TO_TEST.forEach(async place => {
    assert(_.has(await fmi.getForecast(place), ["Temperature"]));
  });
}

test();
