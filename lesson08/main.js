import './CartList.js';
import './ErrorConnect.js';
import './GoodsList.js';
import './GoodsSearch.js';
// import './styles/style.css';

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: false,
        cartList: [],
        isError: false,
    },
    methods: {

       makeGETRequest(url) {
            return new Promise((resolve) => {
                var xhr;

                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        resolve(xhr.responseText);
                    }
                }

                xhr.open('GET', url, true);
                xhr.send();
            });
        },

        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },

        getProduct(e) {
            return this.goods.find(item => item.id_product == e.target.dataset.id);

        },

        addCartItem(product) {

            this.makeGETRequest(`${API_URL}/addToBasket.json`).then(data => {

                if (JSON.parse(data).result === 1) {
                    const existItem = this.cartList.find(item => item.id_product == product.id_product);

                    if (existItem) {
                        existItem.quantity++;
                    } else {
                        this.cartList.push({...product, quantity: 1});
                    }
                }

            }).catch(error => {
                console.log(error);
                this.isError = true;
            });
        },

        removeCartItem(product) {

            this.makeGETRequest(`${API_URL}/deleteFromBasket.json`).then(data => {

                if (JSON.parse(data).result === 1) {
                    const existItem = this.cartList.find(item => item.id_product == product.id_product);

                    if (!existItem) {
                        return;

                    } else if (existItem.quantity > 1) {
                        existItem.quantity--;
                    } else {
                        const indexItem = this.cartList.indexOf(existItem);
                        this.cartList.splice(indexItem, 1);
                    }
                }

            }).catch(error => {
                console.log(error);
                this.isError = true;
            });
        },

        cartVisible() {
            this.isVisibleCart = !this.isVisibleCart;
            document.querySelector('.cart-button').classList.toggle('pushed-btn');
        },
    },

    mounted() {
        // товары
        this.makeGETRequest(`${API_URL}/catalogData.json`).then(goods => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        }).catch(error => {
            console.log(error);
            this.isError = true;
        });

        // корзина
        this.makeGETRequest(`${API_URL}/getBasket.json`).then(goods => {
            this.cartList = JSON.parse(goods).contents;
        }).catch(error => {
            console.log(error);
            this.isError = true;
        });
    },
});
