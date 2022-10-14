
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.static('.'));
app.use(bodyParser.json());

// список товаров
app.get('/catalog', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

// товары в корзине
app.get('/cart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

// добавить товар в корзину
app.post('/addToCart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const product = req.body;

            const existItem = cart.find(item => item.id_product == product.id_product);

            if (existItem) {
                existItem.quantity++;
            } else {
                cart.push({...product, quantity: 1});
            }

            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    let time = new Date();
                    logStats('add_cart', product.id_product, product.product_name, time.toLocaleString());
                    res.send('{"result": 1}');
                }
            });
        }
    });
});

// удалить товар из корзины
app.delete('/removeCart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const product = req.body;

            const existItem = cart.find(item => item.id_product == product.id_product);

            if (!existItem) {
                return;

            } else if (existItem.quantity > 1) {
                existItem.quantity--;
            } else {
                const indexItem = cart.indexOf(existItem);
               cart.splice(indexItem, 1);
            }

            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    let time = new Date();
                    logStats('remove_cart', existItem.id_product, existItem.product_name, time.toLocaleString());
                    res.send('{"result": 1}');
                }
            });
        }
    })
});

// очистить корзину
app.delete('/clearCart', (req, res) => {
    fs.readFile('./cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            let cart = JSON.parse(data);

            if (req.body.clear === 1) {
                cart = [];
            }

            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    let time = new Date();
                    logStats('clear_cart', '', '', time.toLocaleString());
                    res.send('{"result": 1}');
                }
            });
        }
    })
});

app.listen(3000, () => {
    console.log('server running on localhost:3000');
});

function logStats (action, id, name, time) {
    fs.readFile('./stats.json', 'utf-8', (err, data) => {
        const stats = JSON.parse(data);
        stats.push({action: action, id: id, name: name, time: time});

        fs.writeFile('./stats.json', JSON.stringify(stats), (err) => {
                if (err) {
                    console.log(console.log(err));
                }
            });
    });
}
