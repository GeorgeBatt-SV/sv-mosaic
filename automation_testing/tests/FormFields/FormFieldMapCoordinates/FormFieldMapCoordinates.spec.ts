import { test, expect, Page } from "@playwright/test";
import { FormFieldMapCoordinatesPage } from "../../../pages/FormFields/FormFieldMapCoordinates/FormFieldMapCoordinatesPage";
import theme from "../../../../src/theme";
import { commonKnobs as knob } from "../../../utils/data/knobs";

test.describe.parallel("FormFields - FormFieldMapCoordinates - Kitchen Sink", () => {
	let page: Page;
	let ffMapCoordinatesPage: FormFieldMapCoordinatesPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		ffMapCoordinatesPage = new FormFieldMapCoordinatesPage(page);
	});

	test.beforeEach(async() => {
		await ffMapCoordinatesPage.visit(ffMapCoordinatesPage.page_path);
		await page.reload();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate that the map without address fields are empty.", async () => {
		await ffMapCoordinatesPage.mapWithoutAddressAndAutocoordinatesDisabledButton.click();
		expect(await ffMapCoordinatesPage.latitude.inputValue()).toBe("");
		expect(await ffMapCoordinatesPage.longitude.inputValue()).toBe("");
	});

	test("Validate that an error message appears for invalid Latitude values.", async () => {
		await ffMapCoordinatesPage.mapWithoutAddressAndAutocoordinatesDisabledButton.click();
		await ffMapCoordinatesPage.longitude.type("10");
		await ffMapCoordinatesPage.latitude.type("91");

		expect(await ffMapCoordinatesPage.errorMessage.textContent()).toBe("Latitude should be between -90 and 90");
		await expect(ffMapCoordinatesPage.saveCoordinatesButton).toBeDisabled();

		await ffMapCoordinatesPage.latitude.type("");
		await ffMapCoordinatesPage.latitude.type("-91");
		expect(await ffMapCoordinatesPage.errorMessage.textContent()).toBe("Latitude should be between -90 and 90");
		await expect(ffMapCoordinatesPage.saveCoordinatesButton).toBeDisabled();
	});

	test("Validate that an error message appears for invalid Longitude values.", async () => {
		await ffMapCoordinatesPage.mapWithoutAddressAndAutocoordinatesDisabledButton.click();
		await ffMapCoordinatesPage.latitude.type("10");
		await ffMapCoordinatesPage.longitude.type("181");

		expect(await ffMapCoordinatesPage.errorMessage.textContent()).toBe("Longitude should be between -180 and 180");
		await expect(ffMapCoordinatesPage.saveCoordinatesButton).toBeDisabled();

		await ffMapCoordinatesPage.longitude.type("");
		await ffMapCoordinatesPage.longitude.type("-181");
		expect(await ffMapCoordinatesPage.errorMessage.textContent()).toBe("Longitude should be between -180 and 180");
		await expect(ffMapCoordinatesPage.saveCoordinatesButton).toBeDisabled();
	});

	test("Validate border color in Map Card is grey2", async () => {
		const expectedColor = theme.newColors.grey2["100"];
		expect(await ffMapCoordinatesPage.getSpecificBorderFromElement(ffMapCoordinatesPage.mapWithAddressDiv, "all")).toContain(expectedColor);
	});

	test("Validate drawer title location is fixed.", async () => {
		await page.setViewportSize({ width: 1280, height: 400 });
		await ffMapCoordinatesPage.mapWithoutAddressAndAutocoordinatesDisabledButton.click();
		await expect(ffMapCoordinatesPage.formTestIDLocator.last()).toBeVisible();
		await ffMapCoordinatesPage.longitude.scrollIntoViewIfNeeded();
		await expect(ffMapCoordinatesPage.formTestIDLocator.last().locator("form div").first()).toBeVisible();
	});

	test("Validate that button is disabled.", async () => {
		await ffMapCoordinatesPage.visit(ffMapCoordinatesPage.playground_page_path, [knob.knobDisabled + true]);
		await expect(ffMapCoordinatesPage.mapWithoutAddressAndAutocoordinatesDisabledButton).not.toBeVisible();
	});
});
