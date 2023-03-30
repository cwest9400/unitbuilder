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

