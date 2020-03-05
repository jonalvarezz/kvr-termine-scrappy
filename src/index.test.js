const blueCardSelectName = "CASETYPES[Aufenthaltserlaubnis Blaue Karte EU]";
const submitButtonClassName = "WEB_APPOINT_FORWARDBUTTON";
const navigationTabs = {
  confirm: "NAV_CONFIRM",
  contact: "NAV_CONTACT",
  time: "NAV_TIME",
  date: "NAV_DATE",
  location: "NAV_LOCATION",
  casetypes: "NAV_CASETYPES"
};
const navigationTabActiveClassName = "statusleiste_aktiv";
const calendarClassName = "nat_calendar";
const bookableWeekdayClassName = "nat_calendar_weekday_bookable";

describe("Munich International Office", () => {
  beforeAll(async () => {
    await page.goto("https://www46.muenchen.de/view-abh/termin/");
  }, 10000);

  it("should have an available date", async () => {
    jest.setTimeout(1000 * 5 * 60);
    await expect(page).toSelect(`select[name="${blueCardSelectName}"]`, "1");
    await expect(page).toClick(`input[class="${submitButtonClassName}"]`);
    await page.waitForNavigation();
    await expect(page).toMatchElement(
      `li#${navigationTabs.location}.${navigationTabActiveClassName}`
    );

    const availableDateSelector = `table.${calendarClassName} a.${bookableWeekdayClassName}`;
    await expect(page).toMatchElement(availableDateSelector);
    await page.screenshot({
      path: "screenshot.png",
      fullPage: true,
      type: "png"
    });
    const date = page.$(availableDateSelector);
    console.log(date.textContent);
  });
});
