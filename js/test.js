console.log('test')

fetch('json/productos.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach(producto => {
            console.log(producto)
        });
    })
    .catch((error) => error)