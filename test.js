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
