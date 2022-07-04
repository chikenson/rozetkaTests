import { MainPage, ProductPage, CartPage, CatalogPage } from '../../pageObjects/index';
import { addOneProduct, countOfProducts } from '../../data/cartTestCounters';
import { validSearchValue } from '../../data/searchTestValues';

let mainPage;

describe('Adding product to the cart', function ()  {

    beforeEach(async function () {
        mainPage = await MainPage.visit();
     });

     afterEach(async function () {
         const cartPage = await CartPage.visit();

         await (await cartPage.list.kebabMenuClick()).list.deleteButtonClick();
     });

    it('From product page.', async function () {

        const mainProductTitle: string = await mainPage.getDiscountBlockElementTitle();
        const mainProductPrice: number = await mainPage.getDiscountBlockElementPrice();

        const productPage: ProductPage = await mainPage.discountBlockElementClick();

        await productPage.buyButtonClick();

        const cartPage: CartPage = await CartPage.visit();

        expect(await cartPage.list.getCounterInputValue()).toBe(addOneProduct);
        expect(await cartPage.header.getCartButtonCounterValue()).toBe(addOneProduct);
        expect(await cartPage.list.getProductTitleValue()).toBe(mainProductTitle);
        expect(await cartPage.list.getProductPrice()).toBe(mainProductPrice);
    });

    it('From catalog.', async function () {

        const catalogPage: CatalogPage = await mainPage.header.search(validSearchValue);

        const catalogProductTitle: string = await catalogPage.list.getItemTitle(addOneProduct);
        const catalogProductPrice: number = await catalogPage.list.getItemPrice();

        await catalogPage.list.buyItems(addOneProduct);

        const cartPage: CartPage = await CartPage.visit();

        expect(await cartPage.list.getCounterInputValue()).toBe(addOneProduct);
        expect(await cartPage.header.getCartButtonCounterValue()).toBe(addOneProduct);
        expect(await cartPage.list.getProductTitleValue()).toBe(catalogProductTitle);
        expect(await cartPage.list.getProductPrice()).toBe(catalogProductPrice);
    });

    it('Adding a few products to the cart.', async function () {

        const catalogPage: CatalogPage = await mainPage.header.search(validSearchValue);

        await catalogPage.list.buyItems(countOfProducts);

        const cartPage: CartPage = await CartPage.visit();

        expect(await cartPage.list.getNumberOfProducts()).toBe(countOfProducts);
        expect(await cartPage.list.getProductPricesSum()).toBe(await cartPage.getTotalAmount());
    });

});
