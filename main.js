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
    },
    {
        name: "bracket",
        quantity: 4,
        price: 0.45,
        uom: "pieces",
    },
    ,
    {
        name: "screw",
        quantity: 20,
        price: 0.37,
        uom: "pieces",
    },
];

let bom = [
    {
        name: "coaster set",
        materials: [
            {
                name: "wood",
                qty: 1,
            },
        ]
    },
    {
        name: "coffee table",
        materials: [
            {
                name: "wood",
                qty: 5,
            },
            {
                name: "nail",
                qty: 20,
            },
            {
                name: "screw",
                qty: 12,
            },
        ]
    },
]

function buy(materialIndex, num) {
    let material = materials[materialIndex];
    if (!material) {
        console.log("unknown material")
        return
    } else if (material.price * num > cash) {
        console.log(`not enough cash to buy ${num} ${material.uom} of ${material.name}. You only have ${cash} and you need ${material.price * num}`)
        return
    }
    console.log(`previous ${material.name} qty: ${material.quantity}`)
    cash = cash - material.price * num;
    material.quantity = material.quantity + num
    console.log(`new ${material.name} qty: ${material.quantity}`)
}
console.log(`cash: $${cash}`)
buy(0, 50)
console.log(`cash: $${cash}`)



