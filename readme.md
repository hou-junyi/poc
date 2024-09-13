# PoC of DeGate Transfer Vulnerability

Insufficient Signature Details in Degate Internal Transfers (and Withdrawals, etc)

During internal transfers(or any other sign process), Degate's signature payload only contains the generic phrase "Sign to send" without including critical transaction details such as the **recipient address**, **token type**, or **amount**. This omission creates a potential security risk where users may unknowingly authorize transfers to unauthorized addresses if the frontend interface is compromised.

https://github.com/user-attachments/assets/119e899d-1640-4009-9ae0-086c88b6872d


## Load an unpacked extension
To load an unpacked extension in developer mode:

1. Go to the Extensions page by entering `chrome://extensions` in a new tab.
    - Alternatively, click the Extensions menu puzzle button and select **Manage Extensions** at the bottom of the menu.
    - Or, click the Chrome menu, hover over **More Tools**, then select **Extensions**.
2. Enable Developer Mode by clicking the toggle switch next to **Developer mode**.
3. Click the **Load unpacked** button and select the extension directory.

![](https://developer.chrome.com/static/docs/extensions/get-started/tutorial/hello-world/image/extensions-page-e0d64d89a6acf_1920.png)

