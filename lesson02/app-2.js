'use strict';

class Hamburger {
    constructor(size = 'small', stuffing = 'cheese') {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = [];
    }

    addTopping(topping) {
        if (!this.toppings.includes(topping)) {
            this.toppings.push(topping);
        }
    }

    removeTopping(topping) {
        if (this.toppings.includes(topping)) {
            const existIndex = this.toppings.indexOf(topping);
            this.toppings.splice(existIndex, 1);
        }
    }

    calculatePrice() {
        let price = 0;

        if (this.size == 'big') {
            price += 100;
        } else {
            price += 50;
        }

        switch (this.stuffing) {
            case 'cheese':
                price += 10;
                break;
            case 'salad':
                price += 20;
                break;
            case 'potato':
                price += 15;
                break;
        }

        this.toppings.forEach(item => {
            if (item == 'spice') {
                price += 15;
            } else {
                price += 20;
            }
        })

        return price;
    }

    calculateCalories() {
        let calories = 0;

        if (this.size == 'big') {
            calories += 40;
        } else {
            calories += 20;
        }

        switch (this.stuffing) {
            case 'cheese':
                calories += 20;
                break;
            case 'salad':
                calories += 5;
                break;
            case 'potato':
                calories += 10;
                break;
        }

        this.toppings.forEach(item => {
            if (item == 'mayo') {
                calories += 5;
            }
        })

        return calories;
    }

    getToppings() {
        return this.toppings;
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.stuffing;
    }
}

const product = new Hamburger('big', 'cheese');
product.addTopping('spice');
product.addTopping('mayo');

console.log(product.calculatePrice());
console.log(product.calculateCalories());

product.removeTopping('spice');
product.removeTopping('mayo');

console.log(product.calculatePrice());
console.log(product.calculateCalories());
