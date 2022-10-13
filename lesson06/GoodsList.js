Vue.component('goods-list', {
    props: ['goods'],
    template: `
        <div v-if="goods.length > 0" class="goods-list">
            <goods-item v-for="good in goods" :key="good.id_product" :good="good"></goods-item>
        </div>
        <div v-else class="goods-list goods-empty">
            <h2>Список товаров пуст</h2>
        </div>`
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item">
            <h3>{{ good.product_name }}</h3>
            <img class="good-img" alt="Product img">
            <p>{{ good.price }} руб </p>
            <div class="add-button" @click="$parent.$emit('add-product', good)">В корзину</div>
        </div>`
});
