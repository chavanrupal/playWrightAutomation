import { test, expect } from '@playwright/test';
test('Frames and browser multiple validations of Playwright', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
        await page.goto("https://www.google.com");
        await page.goBack();
       // await page.goForward();
        await expect(page.locator("#displayed-text")).toBeVisible();//to check box is visible
        await page.locator("#hide-textbox").click();
        await expect(page.locator("#displayed-text")).toBeHidden();// to check box is hidden after clicking on hidden button
        await page.pause();
        page.on('dialog',dialog => dialog.accept());// this line is to accept pop up - java/javascript popup for cancel - dismiss() method and for ok = accept()
        await page.locator("#confirmbtn").click();
        await page.locator("#mousehover").hover();// to mouse hover to display options
        // below code is to go into new frame embeded within page - check with dev whether they have used iframe tag and have embeded any frames
        const framepage = page.frameLocator("#courses-iframe"); // new framepage to locate and store that frmae locator
        await framepage.locator("li a[href*='lifetime-access']:visible").click();
        const textcheck = await framepage.locator(".text h2").textContent();// have used .classname locator here to locate that textcontent of subscribers numbers
        console.log(textcheck.split(" ")[1]);



       
       

    });
