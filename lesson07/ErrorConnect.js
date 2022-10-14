Vue.component('error-connect', {
    props: ['visible'],
    template: `
        <div v-show="visible" class="errorConnect">
            Ошибка соединения с сервером
        </div>`
});
