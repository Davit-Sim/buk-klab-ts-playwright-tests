# Introduction
This solution is a testing solution for UI-Web developed by @eliskavo.  
Repository: [https://github.com/eliskavo/buk-klab](https://github.com/eliskavo/buk-klab)

---

## Quick Setup Guide - Visual Studio Code

1. Under **Extensions**, search for and install **"Playwright Test for VSCode"** by Microsoft.  
2. Open a terminal and run the following command:  

   ```bash
   npm install
   
(Ensure you are in the correct solution folder).

3. After installation, execute the following command:

    ```bash
    npx playwright test

(Ensure that the buk-klab solution is running on http://localhost:5173/).
If you have any issues with missing browsers, run following "npx playwright install --with-deps"

4. Headed mode:

On the left side, locate the "Testing" module, which appears after completing Step 1.
Click on the module and then click the "Refresh Tests" button.

![alt text](/InstructionImages/textExplorer.png)
![alt text](/InstructionImages/refreshButton.png)

5. You can now run the following tests from the Test Explorer:

Ensure the "Show Browser" option is checked to visualize the test runs.

![alt text](/InstructionImages/ShowBrowser.png)