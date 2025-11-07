//const  { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
test('Calendar validations', async ({page})=>
{
    const monthnum = 5;
    const date = 15;
    const year = 2027;
    const expectedList = [monthnum,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").first().click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthnum)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index <inputs.length; index++)
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
 

});
