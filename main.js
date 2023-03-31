


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

let cash = 00050

let fgi = [
    {
        product: "coasterset",
        qoh: 0,
        price: 20,
    },
    {
        product: "coffeetable",
        qoh: 0,
        price: 120,
    },

]

let materials = [
    {
        name: "wood",
        quantity: 000,
        price: 6,
        uom: "piece",
    },
    {
        name: "nail",
        quantity: 000,
        price: 1,
        uom: "piece",
    },
    {
        name: "bracket",
        quantity: 000,
        price: 2,
        uom: "piece",
    },
    {
        name: "screw",
        quantity: 000,
        price: 1,
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
                qty: 8,
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
        document.querySelector('.messageZone').textContent = `not enough cash`
        // console.log(`not enough cash to buy ${num} ${material.uom} of ${material.name}. You only have ${cash} and you need ${material.price * num}`)
        //fade out message
        setTimeout(() => {
            document.querySelector('.messageZone').classList.add('fadeOut');
            setTimeout(() => {
              document.querySelector('.messageZone').textContent = '';
              document.querySelector('.messageZone').classList.remove('fadeOut');
            }, 500);
          }, 500);
        return
    }
    //console.log(`previous ${material.name} qty: ${material.quantity}`)
    cash = cash - material.price * num;
    material.quantity = material.quantity + num
    document.querySelector('.messageZone').textContent = `Added ${num} ${material.name} to inventory`
    // console.log(`new ${material.name} qty: ${material.quantity}`)
    //fade out message
    setTimeout(() => {
        document.querySelector('.messageZone').classList.add('fadeOut');
        setTimeout(() => {
          document.querySelector('.messageZone').textContent = '';
          document.querySelector('.messageZone').classList.remove('fadeOut');
        }, 500);
      }, 500);
    //update the material qty on index page
    cashElement.textContent = ` ${cash.toString().padStart(6, '0')}`;
    let qtyElement = document.querySelector(`#${material.name}`);
    qtyElement.textContent = ` ${material.quantity.toString().padStart(3, '0')}`;
    qtyElement.classList.add('textFlash')
            setTimeout(() => {
                qtyElement.classList.remove('textFlash')
            }, 200)
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
            document.querySelector('.messageZone').textContent = `Not enough ${material.name}(s) to build a ${bomToBuild.name}`
            //fade out message
            setTimeout(() => {
                document.querySelector('.messageZone').classList.add('fadeOut');
                setTimeout(() => {
                  document.querySelector('.messageZone').textContent = '';
                  document.querySelector('.messageZone').classList.remove('fadeOut');
                }, 500);
              }, 500);
            // console.log(`Not enough ${material.name} to build ${bomToBuild.name} x${num}`)
            break;
        }

    }
    //if all materials are available, update the inventory and materials
    if (allMaterialsAvailable) {
        document.querySelector('.messageZone').textContent = `Successfully built ${num} ${bomToBuild.name}(s)`
        //fade out message
        setTimeout(() => {
            document.querySelector('.messageZone').classList.add('fadeOut');
            setTimeout(() => {
              document.querySelector('.messageZone').textContent = '';
              document.querySelector('.messageZone').classList.remove('fadeOut');
            }, 500);
          }, 500);
        // console.log(`Successfully built ${num} ${bomToBuild.name}(s)`)

        //update fgi array with the successfully built items
        for (let i = 0; i < reqMaterials.length; i++) {
            let material = reqMaterials[i];
            let availableMaterial = materials.find(m => m.name == material.name);
            availableMaterial.quantity -= material.qty * num;
            //update the material qty on index page
            let qtyElement = document.querySelector(`#${material.name}`);
            qtyElement.textContent = ` ${availableMaterial.quantity.toString().padStart(3, '0')}`
        }
        //update fgi array with the successfully built items
        let productToUpdate = fgi.find((item) => item.product == bomToBuild.name);
        if (productToUpdate) {
            productToUpdate.qoh += num
            //update the finished product qty in inventory on index page
            let qtyProductElement = document.querySelector(`#${productToUpdate.product}`);
            qtyProductElement.textContent = ` ${productToUpdate.qoh.toString().padStart(3, '0')}`
            //text glow
            qtyProductElement.classList.add('textFlash')
            setTimeout(() => {
                qtyProductElement.classList.remove('textFlash')
            }, 200)
        }
    }
}

function sell(fgiIndex, num) {
    //find product to sell in fgi array
    let productToSell = fgi.find((item) => item.product == fgi[fgiIndex].product)
    //if product doesnt exist or qty is less than or equal to 0
    if (!productToSell || productToSell.qoh < num) {
        //exit function with error message
        document.querySelector('.messageZone').textContent = `Quantity on hand of ${productToSell.product} is insufficient`
        //fade out message
        setTimeout(() => {
            document.querySelector('.messageZone').classList.add('fadeOut');
            setTimeout(() => {
              document.querySelector('.messageZone').textContent = '';
              document.querySelector('.messageZone').classList.remove('fadeOut');
            }, 500);
          }, 500);
        // console.log(`Quantity on hand of ${productToSell.product} is insufficient for this order`)

        //if it exists and qty is greater than 0
    } else {

        //subtract qty from fgi array qty
        fgi[fgiIndex].qoh -= num
        //add price from product in fgi to cash variable
        cash += productToSell.price * num
        document.querySelector('.messageZone').textContent = `x${num} ${productToSell.product} successfully sold`
        // console.log(`x${num} ${productToSell.product} successfully removed from finished goods inventory (sold)`)
        //fade out message
        setTimeout(() => {
            document.querySelector('.messageZone').classList.add('fadeOut');
            setTimeout(() => {
              document.querySelector('.messageZone').textContent = '';
              document.querySelector('.messageZone').classList.remove('fadeOut');
            }, 500);
          }, 500);
        //update the product inventory qty on index page
        let qtyProductElement = document.querySelector(`#${productToSell.product}`);
        qtyProductElement.textContent = ` ${productToSell.qoh.toString().padStart(3, '0')}`
        cashElement.textContent = ` ${cash.toString().padStart(6, '0')}`;
        //text glow
        cashElement.classList.add('textFlash')
        setTimeout(() => {
            cashElement.classList.remove('textFlash')
        }, 200)

    }
}


//modify html for resources, materials and inventory
cashElement.textContent = ` ${cash.toString().padStart(6, '0')}`
woodElement.textContent = ` ${materials[0].quantity.toString().padStart(3, '0')}`
nailElement.textContent = ` ${materials[1].quantity.toString().padStart(3, '0')}`
bracketElement.textContent = ` ${materials[2].quantity.toString().padStart(3, '0')}`
screwElement.textContent = ` ${materials[3].quantity.toString().padStart(3, '0')}`

//inventory counts
coastersetElement.textContent = ` ${fgi[0].qoh.toString().padStart(3, '0')}`
coffeetableElement.textContent = ` ${fgi[1].qoh.toString().padStart(3, '0')}`

//buy material button listeners
document.getElementById("actionBuy").addEventListener("click", function () {

    //create secondary menu div
    let secondaryMenuDiv = document.createElement("div");
    secondaryMenuDiv.classList.add("secondaryMenu");

    //loop through materials
    for (let i = 0; i < materials.length; i++) {
        let material = materials[i];

        //create div to hold each material's info
        let materialDiv = document.createElement("div");
        materialDiv.classList.add("materialDiv");

        //create a div to hold name and price
        let nameAndPriceDiv = document.createElement("div");
        nameAndPriceDiv.classList.add("nameAndPriceDiv");

        //create a div to hold the input and button
        let inputAndButtonDiv = document.createElement("div");
        inputAndButtonDiv.classList.add("nameAndPriceDiv");

        //create label for material name
        let nameLabel = document.createElement("label");
        nameLabel.textContent = material.name;
        nameLabel.classList.add("materialLabel");

        //create span for material price
        let priceSpan = document.createElement("span");
        priceSpan.textContent = ` - $${material.price} per ${material.uom}`;
        priceSpan.classList.add("materialPrice");

        //append name and price to nameAndPriceDiv
        nameAndPriceDiv.appendChild(nameLabel);
        nameAndPriceDiv.appendChild(priceSpan);

        //create an input field for quantity
        let qtyInput = document.createElement("input");
        qtyInput.setAttribute("type", "number");
        qtyInput.setAttribute("value", "1")
        qtyInput.classList.add("qtyInput");

        //create button for each material
        let buyButton = document.createElement("button");
        buyButton.classList.add("buyButton")
        buyButton.textContent = "Buy";

        //eventlistener to the material button to call buy() function
        buyButton.addEventListener("click", function () {
            buy(i, parseInt(qtyInput.value));
        });

        //append input and button to inputAndButtonDiv
        inputAndButtonDiv.appendChild(qtyInput);
        inputAndButtonDiv.appendChild(buyButton);

        //append nameAndPriceDiv and inputAndButtonDiv to materialDiv
        materialDiv.appendChild(nameAndPriceDiv);
        materialDiv.appendChild(inputAndButtonDiv);

        //add the material div to the secondary menu div
        secondaryMenuDiv.appendChild(materialDiv);
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
    secondaryMenuDiv.classList.add("secondaryMenu");
    
    //loop through materials
    for (let i = 0; i < bom.length; i++) {
        let product = bom[i];

        //create a container div for each product
        let productContainer = document.createElement("div");
        productContainer.classList.add("secondaryMenuContainer");

        //display product name and required materials
        let productName = document.createElement("h4");
        productName.textContent = `${product.name}`;
        productContainer.appendChild(productName);
        //material list
        let materialsList = document.createElement("ul");
        for(let j = 0; j < product.materials.length; j++) {
            let material = product.materials[j];
            let materialItem = document.createElement("li");
            materialItem.textContent = material.name + " x" + material.quantity;
            materialsList.appendChild(materialItem);
        }
        productContainer.appendChild(materialsList);
        
        //create input field and build button
        let quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.min = "1";
        quantityInput.value = "1";
        productContainer.appendChild(quantityInput);
        //build button
        let buildButton = document.createElement("button");
        buildButton.textContent = "Build"
        //build button listener
        buildButton.addEventListener("click", function () {
            build(i, parseInt(quantityInput.value));
        });
        productContainer.appendChild(buildButton);

        //add product container to the secondary menu div
        secondaryMenuDiv.appendChild(productContainer);
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