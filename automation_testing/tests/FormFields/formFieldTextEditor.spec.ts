import { test, expect, Page } from "@playwright/test";
import { FormFieldTextEditorPage } from "../../pages/FormFields/FormFieldTextEditorPage";

test.describe.parallel("FormFields - FormFieldTextEditor - Kitchen Sink", () => {
	let page: Page;
	let ffTextEditorPage: FormFieldTextEditorPage;

	test.beforeAll(async ({ browser }) => {
		page = await browser.newPage();
		ffTextEditorPage = new FormFieldTextEditorPage(page);
		await ffTextEditorPage.visitPage();
	});

	test.afterAll(async ({ browser }) => {
		browser.close;
	});

	test("Validate the Text editor with spellcheck active.", async () => {
		expect(await ffTextEditorPage.textEditorWithSpellcheckActive.getAttribute("spellcheck")).toBe("true");
	});

	test("Validate the Text editor with left to right direction.", async () => {
		expect(await ffTextEditorPage.textEditorWithLeftToRightDirection.getAttribute("dir")).toBe("ltr");
	});

	test("Validate the Text editor with right to left direction.", async () => {
		expect(await ffTextEditorPage.textEditorWithRightToLeftDirection.getAttribute("dir")).toBe("rtl");
	});

	test("Validate the Text editor in German Language.", async () => {
		expect(await ffTextEditorPage.textEditorInGermanLanguage.locator("[data-ref='placeholder']").textContent()).toBe("Bitte geben Sie einen Text ein");
	});

	test("Validate the Text editor with max character limit.", async () => {
		const stringEqualToMax = await ffTextEditorPage.getAutogeneratedText(20);
		const stringGreaterThanMax = await ffTextEditorPage.getAutogeneratedText(25);
		await ffTextEditorPage.textEditorWithMaxCharacterLimit.type(stringEqualToMax);
		expect((await ffTextEditorPage.textEditorWithMaxCharacterLimit.textContent()).length).toBeLessThanOrEqual(20);

		await ffTextEditorPage.textEditorWithMaxCharacterLimit.fill("");
		await ffTextEditorPage.textEditorWithMaxCharacterLimit.type(stringGreaterThanMax);
		expect((await ffTextEditorPage.textEditorWithMaxCharacterLimit.locator("p").textContent()).length).toBeLessThanOrEqual(20);
	});

	test("Validate the Disabled Text editor.", async () => {
		expect(await ffTextEditorPage.disabledTextEditor.locator(".jodit-workplace div[tabindex='-1']").getAttribute("aria-disabled")).toBe("true");
	});

	test("Validate that the provided number is saved when submitted.", async ({ page }) => {
		page.on("dialog", async dialog => {
			expect(dialog.message()).toContain('"spellCheck": "<p>' + rndSpellCheckString + '</p>"');
			expect(dialog.message()).toContain('"ltr": "<p>' + rndLTRString + '</p>"');
			expect(dialog.message()).toContain('"rtl": "<p>' + rndRTLString + '</p>"');
			expect(dialog.message()).toContain('"german": "<p>' + rndGermanString + '</p>"');
			expect(dialog.message()).toContain('"maxChars": "<p>' + rndMaxCharString + '</p>"');
			await dialog.accept();
		});
		const rndSpellCheckString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndLTRString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndRTLString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndGermanString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndMaxCharString = await ffTextEditorPage.getAutogeneratedText(20);
		await ffTextEditorPage.textEditorWithSpellcheckActive.type(rndSpellCheckString);
		await ffTextEditorPage.textEditorWithLeftToRightDirection.type(rndLTRString);
		await ffTextEditorPage.textEditorWithRightToLeftDirection.type(rndRTLString);
		await ffTextEditorPage.textEditorInGermanLanguage.locator("[contenteditable='true']").type(rndGermanString);
		await ffTextEditorPage.textEditorWithMaxCharacterLimit.type(rndMaxCharString);
		await ffTextEditorPage.saveBtn.dblclick();
	});

	test("Validate that the empty value is saved correctly.", async ({ page }) => {
		page.on("dialog", async dialog => {
			expect(dialog.message()).toContain("Form submitted with the following data: {}");
			await dialog.accept();
		});
		const rndSpellCheckString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndLTRString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndRTLString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndGermanString = await ffTextEditorPage.getAutogeneratedText(20);
		const rndMaxCharString = await ffTextEditorPage.getAutogeneratedText(20);
		await ffTextEditorPage.textEditorWithSpellcheckActive.type(rndSpellCheckString);
		await ffTextEditorPage.textEditorWithLeftToRightDirection.type(rndLTRString);
		await ffTextEditorPage.textEditorWithRightToLeftDirection.type(rndRTLString);
		await ffTextEditorPage.textEditorInGermanLanguage.locator("[contenteditable='true']").type(rndGermanString);
		await ffTextEditorPage.textEditorWithMaxCharacterLimit.type(rndMaxCharString);
		await ffTextEditorPage.saveBtn.click();
		await ffTextEditorPage.clearAllValuesFromTextEditors();
		await ffTextEditorPage.saveBtn.click();
	});
});