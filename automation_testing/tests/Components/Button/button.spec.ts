import { test, expect, Page } from "@playwright/test";
import { ButtonPage } from "../../../pages/Components/Button/ButtonPage";
import theme from "../../../../src/theme";

test.describe("Components - Button - Kitchen Sink", () => {
	let page: Page;
	let buttonPage: ButtonPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		buttonPage = new ButtonPage(page);
		await buttonPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		await browser.close();
	});

	test("Validate that each button has the expected font weight", async () => {
		const expectedFontWeight = "700";
		const numberOfButtons = await buttonPage.button.count();
		for (let i = 0; i < numberOfButtons; i++) {
			await buttonPage.validateFontWeightFromElement(buttonPage.button.nth(i), expectedFontWeight);
		}
	});

	test("Validate that the left margin of the buttons are valid.", async () => {
		const expectedMarginValue = "12px";
		const numberOfButtons = await buttonPage.leftIconButton.count();
		for (let i = 0; i < numberOfButtons; i++) {
			await buttonPage.validateMarginValueFromElement(buttonPage.leftIconButton.nth(i), expectedMarginValue, false);
		}
	});

	test("Validate that the right margin of the buttons are valid.", async () => {
		const expectedMarginValue = "12px";
		const numberOfButtons = await buttonPage.rightIconButton.count();
		for (let i = 0; i < numberOfButtons; i++) {
			await buttonPage.validateMarginValueFromElement(buttonPage.rightIconButton.nth(i), expectedMarginValue, true);
		}
	});

	test("Validate Button Popover on Click.", async () => {
		await buttonPage.buttonThatTriggersPopoverOnClick.click();
		await expect(page.locator("text=Popover Content")).toBeVisible();
		await buttonPage.page.keyboard.press("Escape");
	});

	test("Validate Button Popover on Hover.", async () => {
		await buttonPage.buttonThatTriggersPopoverOnHover.hover();
		await expect(page.locator("text=Popover Content")).toBeVisible();
	});

	test("Validate Button has simplyGold background.", async () => {
		const expectBgColor = (theme.newColors.simplyGold["100"]);
		expect(await buttonPage.getBackgroundColorFromElement(buttonPage.button.nth(8))).toBe(expectBgColor);
		expect(await buttonPage.getBackgroundColorFromElement(buttonPage.button.nth(9))).toBe(expectBgColor);
		expect(await buttonPage.getBackgroundColorFromElement(buttonPage.button.nth(18))).toBe(expectBgColor);
		expect(await buttonPage.getBackgroundColorFromElement(buttonPage.button.nth(19))).toBe(expectBgColor);
	});
});
