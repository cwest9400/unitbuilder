



let cash = 100

let materials = [
    {
      name: "wood",
      quantity: 10,
      price: 2.00,
      uom: "pieces",
    },
    {
      name: "nail",
      quantity: 75,
      price: 0.20,
      uom: "pieces",
    }
  ];

function buy(materialIndex, num) {
    let material = materials[materialIndex];
    if(!material) {
        console.log("unknown material")
        return
    } else if(material.price * num >= cash) {
        console.log(`not enough cash to buy ${num} ${material.name}s. You only have ${cash} and you need ${material.price * num}`)
        return
    }
    console.log(`previous ${material.name} qty: ${material.quantity}`)
    cash = cash - material.price * num;
    material.quantity = material.quantity + num
    console.log(`new ${material.name} qty: ${material.quantity}`)
}
console.log(`cash: $${cash}`)
buy(0,100)
console.log(`cash: $${cash}`)

