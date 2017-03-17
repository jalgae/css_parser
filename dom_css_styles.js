
"use strict"


/**
 * @description Handle the ID to target element
 */
const handleIdsInDOM = (obj) => {
    let keys = Object.keys(obj.value);
    for (let i = 0; i < keys.length; i++) {
        let element = document.getElementById(obj.name.name);
        if ( element ) {
            element.style[keys[i]] = obj.value[keys[i]];
        }
    }
} 


/**
 * @description Handle the classes to target element
 */
const handleClassesDOM = (obj) => {
    let keys = Object.keys(obj.value);
    for (let i = 0; i < keys.length; i++) {
        let element = document.getElementsByClassName(obj.name.name);
        if (element.length > 0) {
            for (let j = 0; j < element.length; j++) {
                element[j].style[keys[i]] = obj.value[keys[i]];
            }
        }
    }
}

/**
 * @description This will handle and execute the css code to the target element
 */
export const cssStyleDom = (data) => {
    data.forEach((dat)=>{
        // Do something here to execute the style to target element
        console.log('cssStyleDom', dat);
        if (dat.name.type == 'id') {
            handleIdsInDOM(dat);
        }
        else if (dat.name.type == 'class') {
            handleClassesDOM(dat);
        }   
    })
}