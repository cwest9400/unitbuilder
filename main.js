let cash = 100
let wood = {
    quantity: 10,
    price: 2.00,
}

let nail = {
    quantity: 75,
    price: .20,
}

function buy(material, qty) {
    console.log(`previous ${material} quantity: ${material.quantiy}`)
    if(!material) {
        console.log("unknown material")
    }
    cash = cash - material.price
    material = material.quantity + qty
    console.log
}
