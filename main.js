let cash = 100

let materials = [
    wood = {
        quantity: 10,
        price: 2.00,
    },
    nail = {
        quantity: 75,
        price: .20,
    },

];


function buy(material, num) {
    console.log(`previous ${material} quantity: ${material.num}`)
    if(!material) {
        console.log("unknown material")
    }
    cash = cash - material.price
    material = material.quantity + num
    console.log(`new ${material} quantity: ${material.num}`)
}

buy("nail",10)