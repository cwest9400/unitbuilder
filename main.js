const cashElement = document.querySelector('#cash')
const woodElement = document.querySelector('#wood')
const nailElement = document.querySelector('#nail')
const screwElement = document.querySelector('#screw')
const bracketElement = document.querySelector('#bracket')



let cash = 000100
cashElement.textContent = `cash: ${cash.toString().padStart(6, '0')}`

let fgi = [
    {
        product: "coaster set",
        qoh: 0,
        price: 20,
    },
    {
        product: "coffee table",
        qoh: 0,
        price: 100,
    },
    
]


let materials = [
    {
        name: "wood",
        quantity: 999,
        price: 10.00,
        uom: "pieces",
    },
    {
        name: "nail",
        quantity: 999,
        price: 1.00,
        uom: "pieces",
    },
    {
        name: "bracket",
        quantity: 999,
        price: 2.00,
        uom: "pieces",
    },
    {
        name: "screw",
        quantity: 999,
        price: 1.00,
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

        //update fgi array with the successfully built items
        let productToUpdate = fgi.find((item) => item.product == bomToBuild.name);
        if (productToUpdate) {
            productToUpdate.qoh += num
        }
    }
}

build(1,1)
console.table(fgi)
console.log(cash)
function sell(fgiIndex, num) {
    //find product to sell in fgi array
    let productToSell = fgi.find((item) => item.product == fgi[fgiIndex].product)
    //if product doesnt exist or qty is less than or equal to 0
    if(!productToSell || productToSell.qoh < num) {
        //exit function with error message
        console.log(`Quantity on hand of ${productToSell.product} is insufficient for this order`)
        
        //if it exists and qty is greater than 0
    } else {

            //subtract qty from fgi array qty
        fgi[fgiIndex].qoh -= num
            //add price from product in fgi to cash variable
        cash += productToSell.price * num
        console.log(`x${num} ${productToSell.product} successfully removed from finished goods inventory (sold)`)
    }
}

sell(1,2)
console.table(fgi)
console.log(cash)