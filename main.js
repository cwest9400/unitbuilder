let cash = 100
let fgi = [
    {
        Product: "coaster set",
        qoh: 0,
        price: 19.99,
    },
    {
        Product: "coffee table",
        qoh: 0,
        price: 99.99,
    },
    
]


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
        fgi: true,
        subComponent: false,
        isMaterial: false,
        materials: [
            {
                name: "wood",
                qty: 1,
            },
        ]
    },
    {
        name: "coffee table",
        fgi: true,
        subComponent: false,
        isMaterial: false,
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
// console.log(`cash: $${cash}`)
// buy(0, 50)
// console.log(`cash: $${cash}`)

// console.table(bom)
// console.table(bom[1].materials)
// console.table(bom[1].materials[0])

function build(bomIndex, num) {
    let bomToBuild = bom[bomIndex]
    let reqMaterials = bomToBuild.materials
    let hasEnoughMaterials = true
    
    for (let i = 0; i < reqMaterials.length; i++) {
        let material = reqMaterials[i];
        let availableMaterial = materials.find(m => m.name == material.name);
        
        //check if there is enough qty of each required material
        if(!availableMaterial || availableMaterial.quantity < material.qty * num) {
            hasEnoughMaterials = false;
            console.log(`Not enough ${material.name} to build ${bomToBuild.name} x${num}`)
            break
        } else {
            //if there is enough material, update the materials array with the used materials
            availableMaterial.quantity -= material.qty * num;
        }
    }

    if (hasEnoughMaterials) {
        console.log(`Successfully built ${num} ${bomToBuild.name}(s)`)
    }
}

build(1,2)

