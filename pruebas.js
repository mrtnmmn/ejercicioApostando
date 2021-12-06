let obj

function comprobar() {
    fetch('http://localhost:4000/saludar')
    .then(res => res.json())
    .then(data => obj = data)
    .then(console.log(obj))
}

