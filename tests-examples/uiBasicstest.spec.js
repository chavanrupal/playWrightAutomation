//const  { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
test('first test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com");

});
test('login test for RahulAcademy', async ({page})=>
    {
        
        // go to page rahul academy and login
        await page.goto("https://rahulshettyacademy.com/client/");
        const username = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const login = page.locator('#login');
        await username.fill("crups123@gmail.com");
        await password.fill("Swami@123");
        await login.click();
        // after login take title of first product and assert it
        console.log(await page.locator(".card-body").first().textContent());
        await expect(page.locator(".card-body").first()).toContainText('ZARA COAT 3');
        // take all product names
        //await page.waitForLoadState('networkidle');
        await page.locator(".card-body b").first().waitFor();
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles); 
      

       
       
    });
    test('UI checks', async ({page})=>
        {
            
            // go to page rahul academy practice page and login and select dropdowna nd radio button
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            const username = page.locator('#username');
            const password = page.locator('#password');
            await username.fill("rahulshettyacademy");
            await password.fill("learning");
            const dropdown = page.locator("select.form-control");
            await dropdown.selectOption("consult");
            await page.locator(".radiotextsty").last().click();
            await page.locator("#okayBtn").click();
            await expect(page.locator(".radiotextsty").last()).toBeChecked();
            await page.locator("#terms").uncheck(); //every method in java asynchronous so we put await, means it wont until that step is completed, it moves to next step
            expect (await page.locator("#terms").isChecked()).toBeFalsy();
           
         // await page.pause();
           
           
        }
    );
    test.only('@Child windows handle from parent window', async ({browser})=>
        {
           const context = await browser.newContext();
           const page =  await context.newPage();
           const userName = page.locator('#username');
           await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
           const documentLink = page.locator("[href*='documents-request']");
        //when you want to run 2 steps at same time, we need to wrap them under promise.all() array - means we are instructing those 2 steps to run at same time
           const [childpage]=await Promise.all(
          [
             context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
             documentLink.click(),
          
          ])//child page is opened and whenevr we put those steps under promise.all([ steps]) it ll not come out of array until that steps are executed successfully
          
        
          const  text = await childpage.locator(".red").textContent();
           const arrayText = text.split("@") //split message into 2 parts separated by @ 
           const domain =  arrayText[1].split(" ")[0] // take first part of splited second part hence [1]
           console.log(domain);
           await page.locator("#username").fill(domain);// will go to parent window & enter that domain name
           console.log(await page.locator("#username").textContent()); //return entered domain name 
        
        })