Vue.component('goods-search', {
    template: `
        <div class="search-bar">
            <input type="text" class="goods-search" v-model="$root.searchLine">
            <div class="search-button" @click="$emit('filter-goods')">Найти</div>
        </div>`
});
