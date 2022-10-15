const script = require('../calc.js');
const pow = script.pow;
const add = script.add;
const sub = script.sub;
const mult = script.mult;
const div = script.div;

// Возведение в степень
describe('Функция pow()', () => {
    it('должна возвращать 9 при аргументах (3, 2)', () => {
        expect(pow(3, 2)).toBe(9);
    }),
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(pow(null, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, null)', () => {
        expect(pow(3, null)).toBe(null);
    }),
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(pow(undefined, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, undefined)', () => {
        expect(pow(undefined, 2)).toBe(null);
    })
});

// сложение
describe('Функция add()', () => {
    it('должна возвращать 5 при аргументах (3, 2)', () => {
        expect(add(3, 2)).toBe(5);
    }),
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(add(null, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, null)', () => {
        expect(add(3, null)).toBe(null);
    }),
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(add(undefined, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, undefined)', () => {
        expect(add(undefined, 2)).toBe(null);
    })
});

// вычитание
describe('Функция sub()', () => {
    it('должна возвращать 1 при аргументах (3, 2)', () => {
        expect(sub(3, 2)).toBe(1);
    }),
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(sub(null, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, null)', () => {
        expect(sub(3, null)).toBe(null);
    }),
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(sub(undefined, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, undefined)', () => {
        expect(sub(undefined, 2)).toBe(null);
    })
});

// умножение
describe('Функция mult()', () => {
    it('должна возвращать 6 при аргументах (3, 2)', () => {
        expect(mult(3, 2)).toBe(6);
    }),
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(mult(null, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, null)', () => {
        expect(mult(3, null)).toBe(null);
    }),
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(mult(undefined, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, undefined)', () => {
        expect(mult(undefined, 2)).toBe(null);
    })
});

// деление
describe('Функция mult()', () => {
    it('должна возвращать 1.5 при аргументах (3, 2)', () => {
        expect(div(3, 2)).toBe(1.5);
    }),
    it('должна возвращать null при аргументах (null, 2)', () => {
        expect(div(null, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, null)', () => {
        expect(div(3, null)).toBe(null);
    }),
    it('должна возвращать null при аргументах (undefined, 2)', () => {
        expect(div(undefined, 2)).toBe(null);
    }),
    it('должна возвращать null при аргументах (3, undefined)', () => {
        expect(div(undefined, 2)).toBe(null);
    })
});
