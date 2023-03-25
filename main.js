//resources and material selectors
const cashElement = document.querySelector('#cash')
const woodElement = document.querySelector('#wood')
const nailElement = document.querySelector('#nail')
const screwElement = document.querySelector('#screw')
const bracketElement = document.querySelector('#bracket')
//inventory selectors
const coastersetElement = document.querySelector('#coasterset')
const coffeetableElement = document.querySelector('#coffeetable')
//buy button selector

let cash = 000100

let fgi = [
    {
        product: "coasterset",
        qoh: 1,
        price: 20,
    },
    {
        product: "coffeetable",
        qoh: 2,
        price: 100,
    },

]

let materials = [
    {
        name: "wood",
        quantity: 050,
        price: 10.00,
        uom: "piece",
    },
    {
        name: "nail",
        quantity: 050,
        price: 1.00,
        uom: "piece",
    },
    {
        name: "bracket",
        quantity: 050,
        price: 2.00,
        uom: "piece",
    },
    {
        name: "screw",
        quantity: 050,
        price: 1.00,
        uom: "piece",
    },
];

let bom = [
    {
        name: "coasterset",
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
        name: "coffeetable",
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
    //update the material qty on index page
    let qtyElement = document.querySelector(`#${material.name}`);
    qtyElement.textContent = `${material.name}: ${material.quantity.toString().padStart(3, '0')}`;
    cashElement.textContent = `cash: ${cash.toString().padStart(6, '0')}`;
}

function build(bomIndex, num) {
    let bomToBuild = bom[bomIndex]
    let reqMaterials = bomToBuild.materials
    let allMaterialsAvailable = true

    for (let i = 0; i < reqMaterials.length; i++) {
        let material = reqMaterials[i];
        let availableMaterial = materials.find(m => m.name == material.name);

        //check if there is enough qty of each required material
        if (!availableMaterial || availableMaterial.quantity < material.qty * num) {
            allMaterialsAvailable = false;
            console.log(`Not enough ${material.name} to build ${bomToBuild.name} x${num}`)
            break;
        } 
        // else {
        //     //if there is enough material, update the materials array with the used materials
        //     availableMaterial.quantity -= material.qty * num;
        //     //update the material qty on index page
        //     let qtyElement = document.querySelector(`#${material.name}`);
        //     qtyElement.textContent = `${material.name}: ${availableMaterial.quantity.toString().padStart(3, '0')}`

        // }
    }
    //if all materials are available, update the inventory and materials
    if (allMaterialsAvailable) {
        console.log(`Successfully built ${num} ${bomToBuild.name}(s)`)

        //update fgi array with the successfully built items
        for(let i = 0; i < reqMaterials.length; i++) {
            let material = reqMaterials[i];
            let availableMaterial = materials.find(m => m.name == material.name);
            availableMaterial.quantity -= material.qty * num;
            //update the material qty on index page
            let qtyElement = document.querySelector(`#${material.name}`);
            qtyElement.textContent = `${material.name}: ${availableMaterial.quantity.toString().padStart(3, '0')}`
        }
        //update fgi array with the successfully built items
        let productToUpdate = fgi.find((item) => item.product == bomToBuild.name);
        if (productToUpdate) {
            productToUpdate.qoh += num
            //update the finished product qty in inventory on index page
            let qtyProductElement = document.querySelector(`#${productToUpdate.product}`);
            qtyProductElement.textContent = ` ${productToUpdate.qoh.toString().padStart(3,'0')}`
        }
    }
}

function sell(fgiIndex, num) {
    //find product to sell in fgi array
    let productToSell = fgi.find((item) => item.product == fgi[fgiIndex].product)
    //if product doesnt exist or qty is less than or equal to 0
    if (!productToSell || productToSell.qoh < num) {
        //exit function with error message
        console.log(`Quantity on hand of ${productToSell.product} is insufficient for this order`)

        //if it exists and qty is greater than 0
    } else {

        //subtract qty from fgi array qty
        fgi[fgiIndex].qoh -= num
        //add price from product in fgi to cash variable
        cash += productToSell.price * num
        console.log(`x${num} ${productToSell.product} successfully removed from finished goods inventory (sold)`)
        //update the product inventory qty on index page
        let qtyProductElement = document.querySelector(`#${productToSell.product}`);
        qtyProductElement.textContent = ` ${productToSell.qoh.toString().padStart(3,'0')}`
        cashElement.textContent = `cash: ${cash.toString().padStart(6, '0')}`;
    }
}


//modify html for resources, materials and inventory
cashElement.textContent = `cash: ${cash.toString().padStart(6, '0')}`
woodElement.textContent = `wood: ${materials[0].quantity.toString().padStart(3, '0')}`
nailElement.textContent = `nail: ${materials[1].quantity.toString().padStart(3, '0')}`
bracketElement.textContent = `bracket: ${materials[2].quantity.toString().padStart(3, '0')}`
screwElement.textContent = `screw: ${materials[3].quantity.toString().padStart(3, '0')}`

//inventory counts
coastersetElement.textContent = ` ${fgi[0].qoh.toString().padStart(3, '0')}`
coffeetableElement.textContent = ` ${fgi[1].qoh.toString().padStart(3, '0')}`

//buy material button listeners
document.getElementById("actionBuy").addEventListener("click", function () {

    //create secondary menu div
    let secondaryMenuDiv = document.createElement("div");
    //loop through materials
    secondaryMenuDiv.classList.add("secondaryMenu");
    for (let i = 0; i < materials.length; i++) {
        let material = materials[i];

        //create button for each material
        let materialButton = document.createElement("button");
        materialButton.classList.add("secondaryMenuButton")
        materialButton.textContent = `${material.name} ($${material.price} per ${material.uom})`;

        //eventlistener to the material button to call buy() function
        materialButton.addEventListener("click", function () {
            buy(i, 1);
        });
        //add the material button to the secondary menu div
        secondaryMenuDiv.appendChild(materialButton);
    }
    //add the secondary menu div to the dashboard div
    let dashboardDiv = document.querySelector(".dashboard");
    dashboardDiv.appendChild(secondaryMenuDiv);

    //add event listener to the main menu buttons to clear the secondary menu div if another main menu button is clicked
    let mainMenuButtons = document.querySelectorAll(".actions");
    for (let i = 0; i < mainMenuButtons.length; i++) {
        mainMenuButtons[i].addEventListener("click", function () {
            if (secondaryMenuDiv.parentNode === dashboardDiv) {
                dashboardDiv.removeChild(secondaryMenuDiv);
            }
        })
    }
})

//Build Product button listeners
document.getElementById("actionBuild").addEventListener("click", function () {
    //create secondary menu div
    let secondaryMenuDiv = document.createElement("div");
    //loop through materials
    secondaryMenuDiv.classList.add("secondaryMenu");
    for (let i = 0; i < bom.length; i++) {
        let product = bom[i];

        //create button for each material
        let productBuildButton = document.createElement("button");
        productBuildButton.classList.add("secondaryMenuButton")
        productBuildButton.textContent = `${product.name}`;

        //eventlistener to the material button to call buy() function
        productBuildButton.addEventListener("click", function () {
            build(i, 1);
        });
        //add the material button to the secondary menu div
        secondaryMenuDiv.appendChild(productBuildButton);
    }
    //add the secondary menu div to the dashboard div
    let dashboardDiv = document.querySelector(".dashboard");
    dashboardDiv.appendChild(secondaryMenuDiv);

    //add event listener to the main menu buttons to clear the secondary menu div if another main menu button is clicked
    let mainMenuButtons = document.querySelectorAll(".actions");
    for (let i = 0; i < mainMenuButtons.length; i++) {
        mainMenuButtons[i].addEventListener("click", function () {
            if (secondaryMenuDiv.parentNode === dashboardDiv) {
                dashboardDiv.removeChild(secondaryMenuDiv);
            }
        })
    }




})

//Sell Product button listeners
document.getElementById("actionSell").addEventListener("click", function () {
    //create secondary menu div
    let secondaryMenuDiv = document.createElement("div");
    //loop through materials
    secondaryMenuDiv.classList.add("secondaryMenu");
    for (let i = 0; i < fgi.length; i++) {
        let product = fgi[i];

        //create button for each material
        let productSellButton = document.createElement("button");
        productSellButton.classList.add("secondaryMenuButton")
        productSellButton.textContent = `${product.product}`;

        //eventlistener to the material button to call buy() function
        productSellButton.addEventListener("click", function () {
            sell(i, 1);
        });
        //add the material button to the secondary menu div
        secondaryMenuDiv.appendChild(productSellButton);
    }
    //add the secondary menu div to the dashboard div
    let dashboardDiv = document.querySelector(".dashboard");
    dashboardDiv.appendChild(secondaryMenuDiv);

    //add event listener to the main menu buttons to clear the secondary menu div if another main menu button is clicked
    let mainMenuButtons = document.querySelectorAll(".actions");
    for (let i = 0; i < mainMenuButtons.length; i++) {
        mainMenuButtons[i].addEventListener("click", function () {
            if (secondaryMenuDiv.parentNode === dashboardDiv) {
                dashboardDiv.removeChild(secondaryMenuDiv);
            }
        })
    }




})