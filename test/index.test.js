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

async function test() {
  assert(_.has(await fmi.getForecast("helsinki"), ["Temperature"]));
  assert(_.has(await fmi.getForecast("jyvaskyla"), ["Temperature"]));
}

test();
