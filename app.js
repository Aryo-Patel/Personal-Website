
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


/*
~~~~~~~~~~~CODE PERTINENT TO GETTING THE "FLUENT IN" COMPONENT WORKING~~~~~~
*/


/*
    ChooseNewWord = true -> [happens when the length of the word is zero and isDeleting is true] new word is generated, choosenewowrd set to false

    if isDeleting is false && extension.textContent.length < newWord.length: extension's text content += newWord[extension.textContent.length]

*/
let extension = document.getElementById('extension');
extension.textContent = '';
let lock = false;

let chooseNewWord = true;
extension.style.borderRight = '4px solid rgb(179, 179, 179)';
let tickTimer = 0;

let isDeleting = false;

const extensionValues = ['HTML', 'CSS', 'JavaScript', 'NodeJS', 'Python', 'Java', 'C++','Jinja', 'Sass', 'Google APIs', 'Three.js', 'Anime.js', 'React', 'Redux', 'Express', 'Flask', 'Keras', 'TensorFlow', 'Scikit-Learn','PyGame', 'MongoDB', 'AWS', 'CPanel'];

let deleteDelay = 0;
let createNewWordDelay = 0;
let newWord;

setInterval(() => {
    tickTimer+= 1;
    if(tickTimer == 9){
        tickTimer = 0;
    }
    //choose new word when necessary
    if(chooseNewWord){
        createNewWordDelay = 0;
        newWord = extensionValues[Math.floor(Math.random() * extensionValues.length)];
        chooseNewWord = false;
    }

    if(!isDeleting && newWord.length > extension.textContent.length){
        extension.textContent += newWord[extension.textContent.length];
    }
    if(newWord.length == extension.textContent.length){
        isDeleting = true;
    }
    if(isDeleting){
        deleteDelay += 1;
        if(deleteDelay > 15){
            extension.textContent = extension.textContent.substring(0, extension.textContent.length-1);
        }
    }
    if(isDeleting && extension.textContent.length == 0){
        createNewWordDelay += 1;
        if(createNewWordDelay > 10){
            deleteDelay = 0;
            isDeleting = false;
            chooseNewWord = true;
        }
    }
    if(tickTimer%3 == 0 && extension.style.borderRight != ''){
        extension.style.borderRight = '';
    }
    else if(tickTimer%3 == 0){
        extension.style.borderRight = '4px solid rgb(179, 179, 179)';
    }
}, 100)

