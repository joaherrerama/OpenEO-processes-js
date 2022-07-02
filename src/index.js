import load from "./common/load";
import ndvi from "./vegetation_indices/ndvi";
import max from "./stats/max";
import max from "./stats/max";
import min from "./stats/min";
import mean from "./stats/mean";
import median from "./stats/median";
import mode from "./stats/mode";

const openeojs = {
  load,
  ndvi,
  max,
  min,
  mean,
  median,
  mode
};

export default openeojs;

/* require openeojs in AMD environment */
if (typeof define === "function" && define.amd) {
  // eslint-disable-line no-undef
  define(() => {
    return openeojs;
  }); // eslint-disable-line no-undef
}

/* set window.openeojs in the browser */
if (typeof window !== "undefined") {
  window.openeojs = openeojs;
}

/* set self.openeojs in a web worker */
if (typeof self !== "undefined") {
  // eslint-disable-line no-undef
  self.openeojs = openeojs; // eslint-disable-line no-undef
}

/* set global.openeojs in node */
if (typeof global !== "undefined") {
  global.openeojs = openeojs;
}
