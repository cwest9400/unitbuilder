let cash = 2

let materials = [
    wood = {
        name: "wood",
        quantity: 10,
        price: 2.00,
    },
    nail = {
        name: "nail",
        quantity: 75,
        price: .20,
    },

];


function buy(materialIndex, num) {
    let material = materials[materialIndex];
    if(!material) {
        console.log("unknown material")
        return
    } else if(material.price * num >= 0) {
        console.log("not enough cash")
        return
    }
    console.log(`previous ${material.name} qty: ${material.quantity}`)
    cash = cash - material.price * num;
    material.quantity = material.quantity + num
    console.log(`new ${material.name} qty: ${material.quantity}`)
}
// console.log(`cash: $${cash}`)
// buy(0,10)
// console.log(`cash: $${cash}`)

