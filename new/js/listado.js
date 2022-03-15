const test = () => {
    fetch('json/productos.json')
    .then( (res) => res.json() )
    .then( (data) => {
        data.forEach(element => {
            console.log(element)
        });
    })
    .catch(alert('error'))
}

const segundoTest = (res) => {
    return new Promise( (resolve, reject) => {

        setTimeout(() => {
            res ? resolve('Exito') : reject('Fail')
        }, 2000);

    })
}

console.log(segundoTest(true).then(console.log('exito')))