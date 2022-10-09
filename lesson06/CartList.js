Vue.component('cart-list', {
    props: ['items', 'visible', 'price', 'count'],
    template: `
        <div v-if="visible" class="cart-list">
            <cart-item v-for="cartItem in items" :key="cartItem.id_product" :item="cartItem"></cart-item>
            <div class="cart-total">
                <div>В корзине {{ count }} товара(-ов) на сумму {{ price }} руб</div>
                <div class="clear-button" @click="$emit('clear-cart')">Очистить</div>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['item'],
    template: `
        <div class="cart-item">
            <p class="cartItemTitle">Наименование: {{ item.product_name }}</p>
            <p>Цена: {{ item.price }} руб</p>
            <p>Кол-во: {{ item.quantity }}</p>
            <div class="remove-btn" @click="$parent.$emit('remove-item', item)">Удалить</div>
        </div>`
});
