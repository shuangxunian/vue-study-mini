const p1 = {
    lastName: 'shuang',
    firstName: 'xunian',
    get fullName() {
        return `${this.lastName} ${this.firstName}`
    }
}

const nameProxy = new Proxy(p1, {
    get(target, key, receiver) {
        console.log('get', key);
        // return target[key]
        return Reflect.get(target, key, receiver)
    },
    set(target, key, value) {
        console.log('set', key, value);
        target[key] = value
        return true
    }
})

console.log(nameProxy.fullName);