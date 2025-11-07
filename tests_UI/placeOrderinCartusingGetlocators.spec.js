import { test, expect } from '@playwright/test';
test('login test for RahulAcademy', async ({page})=>
    {
        
        // go to page rahul academy and login with rupal email id
    
         await page.goto("https://rahulshettyacademy.com/client/");
         await page.getByPlaceholder("email@example.com").fill("crups123@gmail.com");
         await page.getByPlaceholder("enter your passsword").fill("Swami@123");
         await page.getByRole('button',{name:"Login"}).click();
         await page.waitForLoadState('networkidle');
        
         await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:" Add To Cart"}).click();
         await page.getByRole("listitem").getByRole('button',{name:"  Cart "}).click(); //cart button which has li parent tag which is unique
      
      await page.locator("div li").first().waitFor();
      await expect(page.getByText("ZARA COAT 3")).toBeVisible();
     
      //place order and payment page by adding coupon and payment info - personal info
      await page.getByRole("button",{name :"Checkout"}).click();
      // add shipping info and place order
      await page.getByPlaceholder("crups123@gmail.com").fill("crups123@gmail.com");  // Focus the input
      await page.getByPlaceholder("Select Country']").pressSequentially("ind");// Wait for dropdown option to appear
      await page.getByRole("button",{name :"India"}).nth(1).click();
      await page.getByText("PLACE ORDER").click();
      await expect(page.getByText("Thankyou for the order.")).toBeVisible();
     //await page.pause();
      const orderid = await page.locator("label[class='ng-star-inserted']").textContent();
      console.log(orderid);
      // goto orders page and check your order is displayed with order id
     await page.getByLabel(" Orders History Page ").click();
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