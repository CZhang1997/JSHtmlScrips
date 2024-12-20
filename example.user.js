// ==UserScript==
// @name         Example Script
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a fixed button to the webpage with customizable properties
// @author       czhang1997
// @match        https://*/*
// @require      https://raw.githubusercontent.com/CZhang1997/JSHtmlScrips/refs/heads/main/src/helper.js
// @grant        none
// ==/UserScript==

// Example usage
(function () {
  "use strict";

  createButton({
    text: "Hello",
    top: "50%",
    left: "50%",
    onClick: () => {
      alert("Hello World!!");
    },
  });
})();
