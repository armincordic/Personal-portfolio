let randomTimeMax = 5;
let randomTimeMin = 3;
let randomMoveMax = 30;
let randomMoveMin = -30;
let blur = 100;
let zIndex = -5;

const setDynamicObject = (top, left, color, width) => {
    let newDynamicObject = document.createElement("div");
    newDynamicObject.style.position = "fixed";
    if (window.innerWidth > window.innerHeight) {
        newDynamicObject.style.width = width + "%";
        newDynamicObject.style.height = (window.innerWidth / window.innerHeight * width) + "%";
        newDynamicObject.style.top = top + "%";
        newDynamicObject.style.left = left + "%";
    } else {
        newDynamicObject.style.height = width + 20 + "%";
        newDynamicObject.style.width = (window.innerHeight / window.innerWidth * width) + "%";
        newDynamicObject.style.top = top / 2 + "%";
        newDynamicObject.style.left = left + "%";
    }
    newDynamicObject.style.borderRadius = "50%";
    newDynamicObject.style.zIndex = "" + (zIndex + 1);
    newDynamicObject.style.backgroundColor = color;
    newDynamicObject.style.transition = "transform 10s ease-in-out";
    newDynamicObject.style.WebKitTransform = "center";
    newDynamicObject.style.MSTransform = "center";
    newDynamicObject.style.transform = "center";
    newDynamicObject.style.WebKitFilter = "blur(" + blur + "px)";
    newDynamicObject.style.filter = "blur(" + blur + "px)";
    return newDynamicObject;
}

let dynamicBackground = document.createElement("div");
dynamicBackground.style.position = "fixed";
dynamicBackground.style.width = "140%";
dynamicBackground.style.height = "140%";
dynamicBackground.style.top = "-20%";
dynamicBackground.style.left = "-20%";
dynamicBackground.style.zIndex = "" + zIndex;
dynamicBackground.style.backgroundColor = "#808080";

let dynamicObjects = [];
dynamicObjects.push(setDynamicObject(-45, 45, "#A9A9A9", 100));
dynamicObjects.push(setDynamicObject(23, -30, "#D3D3D3", 90));
dynamicObjects.push(setDynamicObject(50, 45, "#C0C0C0", 90));
dynamicObjects.push(setDynamicObject(-100, -25, "#696969", 85));

let dynamicBackgroundDIV = document.getElementById("dynamic_background");
dynamicBackgroundDIV.appendChild(dynamicBackground);
for (let i = 0; i < dynamicObjects.length; i++) {
    dynamicBackgroundDIV.appendChild(dynamicObjects[i]);
}

const moveDynamicObject = (dynamicObject) => {
    let newPosX;
    let newPosY;
    if (dynamicObject.getBoundingClientRect().left + dynamicObject.getBoundingClientRect().width / 2 < window.innerWidth / 2)
        newPosX = Math.random() * (randomMoveMax - randomMoveMin / 4) + randomMoveMin / 4;
    else
        newPosX = Math.random() * (randomMoveMax / 4 - randomMoveMin) + randomMoveMin;
    if (dynamicObject.getBoundingClientRect().top + dynamicObject.getBoundingClientRect().height / 2 < window.innerHeight / 2)
        newPosY = Math.random() * (randomMoveMax - randomMoveMin / 4) + randomMoveMin / 4;
    else
        newPosY = Math.random() * (randomMoveMax / 4 - randomMoveMin) + randomMoveMin;
    let randTime = Math.random() * (randomTimeMax - randomTimeMin) + randomTimeMin;
    dynamicObject.style.transition = "transform " + randTime + "s ease-in-out";
    dynamicObject.style.WebKitTransform = "translate3d(" + newPosX + "%, " + newPosY + "%, 0)";
    dynamicObject.style.MSTransform = "translate3d(" + newPosX + "%, " + newPosY + "%, 0)";
    dynamicObject.style.transform = "translate3d(" + newPosX + "%, " + newPosY + "%, 0)";
    setTimeout(moveDynamicObject.bind(null, dynamicObject), randTime * 1000);
}

for (let i = 0; i < dynamicObjects.length; i++) {
    moveDynamicObject(dynamicObjects[i]);
}

const updateCircleHeight = () => {
    for (let i = 0; i < dynamicObjects.length; i++) {
        if (window.innerWidth > window.innerHeight)
            dynamicObjects[i].style.height = (window.innerWidth / window.innerHeight * parseFloat(dynamicObjects[i].style.width)) + "%";
        else
            dynamicObjects[i].style.width = (window.innerHeight / window.innerWidth * parseFloat(dynamicObjects[i].style.height)) + "%";
    }
}
window.addEventListener("resize", updateCircleHeight);
