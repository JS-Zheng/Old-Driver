import OldDriverHandler from "./OldDriverHandler";

let NODE_ENV = process.env.NODE_ENV
let dev = NODE_ENV !== 'production';
if (dev) console.log(`==== ${APP_NAME} ${NODE_ENV} v${APP_VERSION} ====`);

let odHandler = new OldDriverHandler();

// Save native setInterval(), clearInterval()
let timer = null;
let odSetInterval = window["__fbNativeSetInterval"] ? window["__fbNativeSetInterval"] : window.setInterval;
let odClearInterval = window["__fbNativeClearInterval"] ? window["__fbNativeClearInterval"] : window.clearInterval;
window.st = odSetInterval
window.ct = odClearInterval

registerHistoryListener()
observe()

function registerHistoryListener() {
  let pS = window.history.pushState;
  let rS = window.history.replaceState;

  window.history.pushState = function () {
    if (dev) console.log("pushState")
    observe()
    pS.apply(this, arguments);
  }

  window.history.replaceState = function () {
    if (dev) console.log("replaceState")
    observe()
    rS.apply(this, arguments);
  }

  window.addEventListener("popstate", function () {
    if (dev) console.log("popstate")
    observe()
  });
}

function observe() {
  if (timer) odClearInterval(timer)
  timer = odSetInterval(() => {
    odHandler.observe();
  }, 1000)
}
