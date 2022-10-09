const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        isVisibleCart: true,
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
            const existItem = this.cartList.find(item => item.id_product == product.id_product);

            if (existItem) {
                existItem.quantity++;
            } else {
                this.cartList.push({...product, quantity: 1});
            }
        },

        removeCartItem(product) {
            const existItem = this.cartList.find(item => item.id_product == product.id_product);

            if (!existItem) {
                return;

            } else if (existItem.quantity > 1) {
                existItem.quantity--;
            } else {
                const indexItem = this.cartList.indexOf(existItem);
                this.cartList.splice(indexItem, 1);
            }
        },

        cartVisible() {
            this.isVisibleCart = !this.isVisibleCart;
            document.querySelector('.cart-button').classList.toggle('pushed-btn');
        },

        clearCartList() {
            this.cartList = [];
        },
    },

    computed: {
        totalPrice() {
            return this.cartList.reduce((result, item) => result + item.price * item.quantity, 0);
        },

        totalCount() {
            return this.cartList.reduce((result, item) => result + item.quantity, 0);
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
        this.makeGETRequest(`${API_URL}/getBasket.json`).then(data => {
            this.cartList = JSON.parse(data).contents;
        }).catch(error => {
            console.log(error);
            this.isError = true;
        });
    },
});
