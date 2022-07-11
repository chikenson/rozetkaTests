import { MainPage, CatalogPage } from '../../pageObjects/index';
import * as data from '../../data/search.data';

let mainPage;

describe('Search test', function() {
    beforeEach(async function() {
        mainPage = await MainPage.visit();
    });

    it('With empty field.', async function() {

        const catalogPage: CatalogPage = await mainPage.header.search(data.emptySearchValue);

        expect(await catalogPage.list.getEmpyContentText()).toBe(data.productNotFoundText);
    });

    it('With valid name of product.', async function() {

        const catalogPage: CatalogPage = await mainPage.header.search(data.validSearchValue);

        expect(await catalogPage.getTitleText()).toBe(data.validSearchValue);
    });

    // eslint-disable-next-line mocha/no-skipped-tests
    it.skip('With invalid symbols.', async function() {

        const catalogPage: CatalogPage = await mainPage.header.search(data.invalidSearchValue);

        expect(await catalogPage.list.getEmpyContentText()).toBe(data.invalidSearchValue);
    });
    // Find the bug, infinity loading
});