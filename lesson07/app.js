const API_URL = 'http://localhost:3000';

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

        makePOSTRequest(url, data) {
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

                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(data);
            });
        },

        makeDELETERequest(url, data) {
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

                xhr.open('DELETE', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(data);
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

            this.makePOSTRequest(`${API_URL}/addToCart`, JSON.stringify(product)).then(data => {

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

            this.makeDELETERequest(`${API_URL}/removeCart`, JSON.stringify(product)).then(data => {

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

        clearCartList() {
            this.makeDELETERequest(`${API_URL}/clearCart`, '{"clear": 1}').then(data => {

                if (JSON.parse(data).result === 1) {
                    this.cartList = [];
                }

            }).catch(error => {
                console.log(error);
                this.isError = true;
            });
        },
    },

    mounted() {
        // товары
        this.makeGETRequest(`${API_URL}/catalog`).then(goods => {
            this.goods = JSON.parse(goods);
            this.filteredGoods = JSON.parse(goods);
        }).catch(error => {
            console.log(error);
            this.isError = true;
        });

        // корзина
        this.makeGETRequest(`${API_URL}/cart`).then(goods => {
            this.cartList = JSON.parse(goods);
        }).catch(error => {
            console.log(error);
            this.isError = true;
        });
    },
});
