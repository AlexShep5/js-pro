'use strict';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                console.log(`Ошибка ${xhr.responseText}`)
            }
        }

        xhr.onerror = function () {
            reject(`Не удалось выполнить запрос`);
        }

        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(id, title, price) {
        this.id_product = id;
        this.product_name = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price} руб</p>
            <div class="add-button" data-id="${this.id_product}">В корзину</div></div>`;
    }
}

class GoodsList {
    constructor(cartList) {
        this.goods = [];
        this.filteredGoods = [];
        this.cartList = cartList;

        this.goodsListWrap = document.querySelector('.goods-list');
        this.goodsListWrap.addEventListener('click', (e) => {
            this.productClickHandler(e);
        });
    }

    fetchGoods() {
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                this.filteredGoods = JSON.parse(goods);
                resolve();
            }, (error) => {
                console.log(error);
            });
        });
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }

    render() {
        let listHtml = '';
        this.filteredGoods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalPrice() {
        return this.goods.reduce((result, item) => result + item.price, 0);
    }

    getProduct(e) {
        return this.goods.find(item => item.id_product == e.target.dataset.id);

    }

    addToCart(e) {
        const addItem = {...this.getProduct(e)}
        this.cartList.addCartItem(addItem);
    }

    productClickHandler(e) {
        if (!e.target.classList.contains('add-button')) {
            return;
        }

        this.addToCart(e);
    }
}

class CartItem {
    constructor(id_product, title, price, amount = 1) {
        this.id_product = id_product;
        this.product_name = title;
        this.price = price;
        this.amount = amount;
    }

    render() {
        return `<div class="cart-item"><p class="cartItemTitle">Наименование: ${this.product_name}</p><p>Цена: ${this.price} руб</p><p>Кол-во: ${this.amount}</p><div class="remove-btn" data-id="${this.id_product}">Удалить</div></div>`;
    }
}

class CartList {
    constructor() {
        this.cartItems = [];

        this.cartListWrap = document.querySelector('.cart-list');
        this.cartListWrap.addEventListener('click', (e) => {
            this.clearClickHandler(e);
            this.removeClickHandler(e);
        });

        this.render();
    }

    addCartItem(product) {
        const existItem = this.cartItems.find(item => item.id_product == product.id_product);

        if (existItem) {
            existItem.amount++;
        } else {
            const cartItem = new CartItem(product.id_product, product.product_name, product.price);
            this.cartItems.push(cartItem);
        }

        this.render();
    }

    removeCartItem(product) {
        const existItem = this.cartItems.find(item => item.id_product == product.id_product);

        if (!existItem) {
            return;

        } else if (existItem.amount > 1) {
            existItem.amount--;
        } else {
            const indexItem = this.cartItems.indexOf(existItem);
            this.cartItems.splice(indexItem, 1);
        }

        this.render();
    }

    getTotalPrice() {
        return this.cartItems.reduce((result, item) => result + item.price * item.amount, 0);
    }

    getTotalCount() {
        return this.cartItems.reduce((result, item) => result + item.amount, 0);
    }

    getProduct(e) {
        return this.cartItems.find(item => item.id_product == e.target.dataset.id);
    }

    render() {
        let listHtml = '';

        this.cartItems.forEach(item => {
            const cartItem = new CartItem(item.id_product, item.product_name, item.price, item.amount);
            listHtml += cartItem.render();
        });
        const cartWrap =  document.querySelector('.cart-list');
        cartWrap.innerHTML = listHtml;

        const totalCount = this.getTotalCount();
        const totalPrice = this.getTotalPrice();
        cartWrap.insertAdjacentHTML(`beforeend`, `<div class="cart-total"><div>В корзине ${totalCount} товара(-ов) на сумму ${totalPrice} руб</div><div class="clear-button">Очистить</div></div>`);
    }

    clearCartList() {
        this.cartItems = [];
        this.render();
    }

    clearClickHandler(e) {
        if (!e.target.classList.contains('clear-button')) {
            return;
        }

        this.clearCartList();
    }

    removeClickHandler(e) {
        if (!e.target.classList.contains('remove-btn')) {
            return;
        }

        this.removeCartItem(this.getProduct(e));
    }
}

const cart = new CartList();

const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.goods-search');

const list = new GoodsList(cart);
list.fetchGoods().then(() => {
    list.render();
});

searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterGoods(value);
});

/*
    Задания по регулярным выражениям
*/
// 1, 2

const correctBtn = document.querySelector('.regexp-button');
const regTextArea = document.querySelector('.reg-textarea');
correctBtn.addEventListener('click', (e) => {
    const regExp1 = /'(?!t)/g;
    const str = regTextArea.value;

    regTextArea.value = str.replace(regExp1, '"');
});

// 3

const contactForm = document.querySelector('.contact-form');
const surnameInp = document.querySelector('.surname-inp');
const nameInp = document.querySelector('.name-inp');
const phoneInp = document.querySelector('.phone-inp');
const emailInp = document.querySelector('.email-inp');

function inputValidate (elem, reg, mess) {
    if (reg.test(elem.value)) {
        elem.classList.remove('invalid-inp');
    } else {
        elem.classList.add('invalid-inp');
        alert(mess);
        return false;
    }
    return true;
}

contactForm.addEventListener('submit', (e) => {
    const regName = /^([А-Яа-яA-Za-z]+)$/;
    const regPhone = /^(\+7\((\d{3})\)([0-9]{3})-([0-9]{4}))$/;
    const regEmail = /^([a-z0-9\.-]+)@([a-z0-9-]+)\.([a-z]{2,})$/;

    if (!(inputValidate(surnameInp, regName, 'Данные в поле "Фамилия" введены некорректно') &&
    inputValidate(nameInp, regName, 'Данные в поле "Имя" введены некорректно') &&
    inputValidate(phoneInp, regPhone, 'Данные в поле "Телефон" введены некорректно') &&
    inputValidate(emailInp, regEmail, 'Данные в поле "E-mail" введены некорректно'))) {
        e.preventDefault();
    }
});
