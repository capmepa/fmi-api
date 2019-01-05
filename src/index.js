/**
 * @file
 *
 * This is directly based on the work by Teemu Kontio. The original source code
 * can be found at the link below.
 *
 * @see https://gitlab.labranet.jamk.fi/YTSP0300/meta/snippets/39
 */

const axios = require("axios");

const { chain, get, sortBy } = require("lodash");
const { xml2js } = require("xml-js");

/**
 * Get the forecast for the given location. Returns a map of parameters and
 * their forecasted values sorted by time.
 *
 * @todo How to list available places? How do we validate places?
 */
module.exports.getForecast = async function getForecast(place) {
  return chain(
    await request({
      place,
      storedquery_id: "fmi::forecast::hirlam::surface::point::simple"
    })
  )
    .get(["wfs:FeatureCollection", "wfs:member"])
    .reduce((set, member) => {
      const name = get(member, [
        "BsWfs:BsWfsElement",
        "BsWfs:ParameterName",
        "_text"
      ]);
      return {
        ...set,
        [name]: sortBy(
          (set[name] || []).concat({
            time: get(member, ["BsWfs:BsWfsElement", "BsWfs:Time", "_text"]),
            value: get(member, [
              "BsWfs:BsWfsElement",
              "BsWfs:ParameterValue",
              "_text"
            ])
          }),
          entry => new Date(entry.time)
        )
      };
    }, {})
    .value();
};

/**
 * "Private" utility for fetching and transforming the data from the FMI API.
 *
 * @todo Transform errors into "boom" errors.
 */
async function request(params) {
  const response = await axios({
    params: {
      ...params,
      request: "getFeature"
    },
    url: `http://data.fmi.fi/fmi-apikey/${process.env.FMI_API_KEY}/wfs`
  });
  return xml2js(response.data, { compact: true });
}
