
/*
~~~~~~~~~~CODE PERTINENT TO GETTING THE INTRO BACKGROUND IMAGE TO AUTO SCROLL IF IT HAS ROOM TO SCROLL~~~~~~~~
*/
let openingImage = document.getElementById('opening');

function checkScroll(targetElem){
    let currPos = window.pageYOffset + window.innerHeight;
    let scrollMax = openingImage.getBoundingClientRect().height;
    let percentScroll = currPos/scrollMax * 100;
    if(percentScroll > 100){
        percentScroll = 100;
    }
    let cssClass;
    for(let i = 0; i < document.styleSheets[1].cssRules.length; i++){
        if(document.styleSheets[1].cssRules[i].selectorText == targetElem){
            cssClass = document.styleSheets[1].cssRules[i];
        }
    }
    cssClass.style.backgroundPosition = `0% ${percentScroll}%`;
}

window.addEventListener('scroll', e => {
    //at zero scrolling 0%
    checkScroll('#opening::before');
})

checkScroll('#opening::before');


