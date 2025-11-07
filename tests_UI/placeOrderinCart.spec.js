import { test, expect } from '@playwright/test';
test('login test for RahulAcademy', async ({page})=>
    {
        
        // go to page rahul academy and login with rupal email id
    
         await page.goto("https://rahulshettyacademy.com/client/");
         const username = page.locator('#userEmail');
         const password = page.locator('#userPassword');
         const login = page.locator('#login');
         await username.fill("crups123@gmail.com");
         await password.fill("Swami@123");
         await login.click();
         //await page.waitForLoadState('networkidle');
         await page.locator(".card-body b").first().waitFor();
         const titles = await page.locator(".card-body b").allTextContents();
         console.log(titles); 

         //add item to the cart for zara coat 3
         const products = page.locator(".card-body");
         const productAdd = 'ZARA COAT 3';
         const count = await products.count();
        for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productAdd) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
    }
      await page.locator("[routerlink*='/dashboard/cart']").click();
      await page.locator("div li").first().waitFor();
      const coatpresentcheck = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
      expect(coatpresentcheck).toBeTruthy();
      await page.locator("text=Checkout").click();
      //place order and payment page by adding coupon and payment info - personal info
      await page.locator("input[class='input txt']").nth(0).fill("123");
      await page.locator("input[class='input txt']").nth(1).fill("Rupal");
      await page.locator("input[name='coupon']").fill("TAKE10");
      await page.locator("button[type='submit']").click();
      // add shipping info and place order
      await page.locator("[placeholder*='Country']").click();  // Focus the input
      await page.locator("[placeholder*='Country']").pressSequentially("ind");// Wait for dropdown option to appear
      const dropdown = page.locator(".ta-results");
      await dropdown.waitFor({ state: 'visible' });
      const optionsCount = await dropdown.locator("button").count();
      for (let i = 0; i < optionsCount; ++i) {
         const text = await dropdown.locator("button").nth(i).textContent();
         if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
         }
      }
      expect(page.locator(".user__name [type='text']").first()).toHaveText("crups123@gmail.com");
      //await page.pause();
      const submitButton = await page.locator(".action__submit");
      await submitButton.scrollIntoViewIfNeeded();
      await submitButton.waitFor({ state: 'attached' });
      await submitButton.click();
      await expect (page.locator("h1[class='hero-primary']")).toHaveText(" Thankyou for the order. ");
      const orderid = await page.locator("label[class='ng-star-inserted']").textContent();
      console.log(orderid);
      // goto orders page and check your order is displayed with order id
     await page.locator("button[routerlink='/dashboard/myorders']").click();
     await page.locator("table[class*='table-bordered']").waitFor();
     const rowCount = await page.locator("tr[class*='ng-star']").count();
   //   await page.pause();
     for (let i = 0; i < await rowCount; ++i) {
    const headerorderid = await page.locator("tr[class*='ng-star']").nth(i).locator("th").textContent();
      if (orderid.includes(headerorderid)) {
        await page.locator("tr[class*='ng-star']").nth(i).locator("button").first().click();
        break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderid.includes(orderIdDetails)).toBeTruthy();
 }
);