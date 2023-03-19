import { buy, cash } from './buy.js';
import materials from './materials.js';




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

