// Function to create a customizable button
function createButton({ text, top, left, onClick }) {
  const button = document.createElement("button");
  button.textContent = text;
  Object.assign(button.style, {
    position: "fixed",
    top: `${top}`,
    left: `${left}`,
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: "2000",
  });
  if (typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }
  document.body.appendChild(button);
  return button;
}

function clickElementByXPath({ xpath, name, alertOnMissing = false }) {
  var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (result.singleNodeValue) {
    var element = result.singleNodeValue;
    if (element.hasAttribute("disabled") || element.disabled) {
      if (alertOnMissing) {
        alert(name + " element is disabled");
      }
      throw new Error(name + " element is disabled");
    }
    element.click();
    console.log(name + " element clicked");
  } else {
    if (alertOnMissing) {
      alert(name + " element not found");
    }
    // Throwing the error is optional, depending on your use case
    // throw new Error(name + " element not found");
  }
}

function waitFor(ms) {
  console.log("waiting for " + ms);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function focusAndTypeByElement({ element, name, text, alertOnMissing = false }) {
  if (element) {
    element.focus();

    for (const char of text) {
      const eventOptions = { key: char, code: `Key${char.toUpperCase()}`, bubbles: true };

      element.dispatchEvent(new KeyboardEvent("keydown", eventOptions));
      element.dispatchEvent(new KeyboardEvent("keypress", eventOptions));
      element.value += char; // Append the character to the input's value
      element.dispatchEvent(new Event("input", { bubbles: true })); // Trigger input event
      element.dispatchEvent(new KeyboardEvent("keyup", eventOptions));
    }
  } else {
    if (alertOnMissing) {
      alert(`${name} is missing`);
    }
  }
}

function focusAndTypeUsingLabel({ labelText, text, alertOnMissing = false }) {
  const name = labelText;
  const labels = document.querySelectorAll("label");

  for (const label of labels) {
    if (label.textContent.trim().includes(labelText)) {
      const parent = label.closest("div, form, section"); // Adjust the selector based on the structure
      if (parent) {
        const inputElement = parent.querySelector("input, textarea, select");
        if (inputElement) {
          focusAndTypeByElement({ element: inputElement, name, text, alertOnMissing });
          return;
        }
      }
    }
  }

  if (alertOnMissing) {
    alert(`${name} input element is missing`);
  }
}
