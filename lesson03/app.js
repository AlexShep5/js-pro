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
        return `<div class="goods-item"><h3>${this.product_name}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        // this.goods = [
        //     { id_product: 14778, product_name: 'Shirt', price: 150 },
        //     { id_product: 178, product_name: 'Socks', price: 50 },
        //     { id_product: 2588, product_name: 'Jacket', price: 350 },
        //     { id_product: 152, product_name: 'Shoes', price: 250 },
        // ];
        return new Promise((resolve) => {
            makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
                this.goods = JSON.parse(goods);
                resolve();
            }, (error) => {
                console.log(error);
            });
        });
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }

    getTotalPrice() {
        return this.goods.reduce((result, item) => result + item.price, 0);
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
        return `<div class="cart-item"><p class="cartItemTitle">Наименование: ${this.product_name}</p><p>Цена: ${this.price} руб</p><p>Кол-во: ${this.amount}</p></div>`;
    }
}

class CartList {
    constructor() {
        this.cartItems = [];
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
        cartWrap.insertAdjacentHTML(`beforeend`, `<div class="cart-total">В корзине ${totalCount} товара(-ов) на сумму ${totalPrice} руб</div>`);
    }
}

const list = new GoodsList();
list.fetchGoods().then(() => {
    list.render();
});

const cart = new CartList();


cart.addCartItem({ id_product: 123, product_name: 'Shirt', price: 150 });
cart.addCartItem({ id_product: 178, product_name: 'Socks', price: 50 });
cart.addCartItem({ id_product: 2588, product_name: 'Jacket', price: 350 });
cart.addCartItem({ id_product: 152, product_name: 'Shoes', price: 250 });

cart.removeCartItem({id_product: 178, product_name: 'Socks', price: 50 });
