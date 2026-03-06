let project = {
    name: '123',
    price: 100,
    number: 2
}

let total = 0

const effect = () => {
    total = project.price * project.number
    console.log('total', total);
}

const projectProxy = new Proxy(project, {
    get(target, key) {
        console.log('get', key);
        return target[key]
    },
    set(target, key, value) {
        console.log('set', key, value);
        target[key] = value
        effect()
        return true
    }
})

projectProxy.number = 1

projectProxy.number = 2

projectProxy.number = 3

console.log(project);



