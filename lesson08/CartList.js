Vue.component('cart-list', {
    props: ['items', 'visible', 'price', 'count'],
    template: `
        <div v-if="visible" class="cart-list">
            <cart-item v-for="cartItem in items" :key="cartItem.id_product" :item="cartItem"></cart-item>
            <div class="cart-total">
                <div>В корзине {{ totalCount }} товара(-ов) на сумму {{ totalPrice }} руб</div>
            </div>
        </div>`,

    computed: {
        totalPrice() {
            return this.items.reduce((result, item) => result + item.price * item.quantity, 0);
        },

        totalCount() {
            return this.items.reduce((result, item) => result + item.quantity, 0);
        },
    },
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
        <div class="cart-item">
            <div>
                <p class="cartItemTitle">Наименование: {{ item.product_name }}</p>
                <p>Цена: {{ item.price }} руб</p>
                <p>Кол-во: {{ item.quantity }}</p>
            </div>
            <div class="remove-btn" @click="$parent.$emit('remove-item', item)">&ndash;</i></div>
        </div>`
});
