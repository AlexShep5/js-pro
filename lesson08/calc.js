const pow = (a, n) => {
    if (a == null || n == null) {
        return null;
    }
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= a;
    }
        return result;
}

const add = (a, b) => {
    if (a == null || b == null) {
        return null;
    }

    return a + b;
}

const sub = (a, b) => {
    if (a == null || b == null) {
        return null;
    }

    return a - b;
}

const mult = (a, b) => {
    if (a == null || b == null) {
        return null;
    }

    return a * b;
}

const div = (a, b) => {
    if (a == null || b == null) {
        return null;
    }

    return a / b;
}

module.exports = {
    pow: pow,
    add: add,
    sub: sub,
    mult: mult,
    div: div
}
