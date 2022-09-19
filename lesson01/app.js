'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];

  const renderGoodsItem = (title = '---', price = '-') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
  };

  // Упростить можно так
  // const renderGoodsItem = (title = '---', price = '-') => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

  const renderGoodsList = (list = []) => {
    // let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    // Запятые получаются из-за записи в массив

    // Можно вернуть сразу целевую строку медодом reduce
    let goodsList = list.reduce((result, item) => result += renderGoodsItem(item.title, item.price), '');

    // Упростить можно так
    // let goodsList = list.reduce((result, item) => result += `<div class="goods-item"><h3>${item.title}</h3><p>${item.price}</p></div>`, '');

    document.querySelector('.goods-list').innerHTML = goodsList;
  }

  renderGoodsList(goods);
