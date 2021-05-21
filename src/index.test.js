const URL = "https://sirfy.de/sirfy-de-corona-impfung-muenchen/";

/**
 * Documentation:
 * @see https://pptr.dev/#?product=Puppeteer&version=v9.1.1&show=api-class-page
 * @see https://jestjs.io/docs/using-matchers
 */

describe("COVID vacciness availability", () => {
  beforeAll(async () => {
    await page.goto(URL);
  }, 10000);

  it("should have an available appointment", async () => {
    jest.setTimeout(1000 * 10 * 60);
    await expect(page).toClick(`span[id="tarteaucitronPersonalize"]`);
    await expect(page).toMatchElement(`div#mainwrapper-div-e1 .accordion`);

    const accordion = await page.$(`div#mainwrapper-div-e1 .accordion`);

    await expect(accordion).toMatchElement("#accordion__body-0");
    await expect(accordion).toMatchElement("#accordion__body-1");
    await expect(accordion).toMatchElement("#accordion__body-2");

    const appointments1 = await accordion.$eval(
      `#accordion__body-0 tbody`,
      (node) => node.childElementCount
    );
    const appointments2 = await accordion.$eval(
      `#accordion__body-1 tbody`,
      (node) => node.childElementCount
    );
    const appointments3 = await accordion.$eval(
      `#accordion__body-2 tbody`,
      (node) => node.childElementCount
    );

    const total = appointments1 + appointments2 + appointments3;

    expect(total).toBeGreaterThan(0);

    // await page.screenshot({
    //   path: "screenshot.png",
    //   fullPage: true,
    //   type: "png",
    // });
  });
});
