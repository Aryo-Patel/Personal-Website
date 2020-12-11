
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

let chooseNewWord = false;
extension.style.borderRight = '4px solid rgb(179, 179, 179)';
let tickTimer = 0;

let isDeleting = false;

const extensionValues = ['HTML', 'CSS', 'JavaScript', 'NodeJS', 'Python', 'Java', 'C++','Jinja', 'Sass', 'Google APIs', 'Three.js', 'Anime.js', 'React', 'Redux', 'Express', 'Flask', 'Keras', 'TensorFlow', 'Scikit-Learn','PyGame', 'MongoDB', 'AWS', 'CPanel'];

let deleteDelay = 0;
let createNewWordDelay = 0;
let newWord;

newWord = extensionValues[Math.floor(Math.random() * extensionValues.length)];
setInterval(() => {
    tickTimer+= 1;
    if(tickTimer == 9){
        tickTimer = 0;
    }
    //choose new word when necessary
    if(chooseNewWord){
        createNewWordDelay = 0;
        let index = extensionValues.indexOf(newWord);
        if(index + 1 >= extensionValues.length){
            index = 0;
        }
        else{
            index += 1;
        }
        newWord = extensionValues[index];
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



/*
~~~~~~~~~~~~~~~CODE PERTINENT ROTATING CAROUSEL~~~~~~~~~~~
*/

const experienceDict = {
    google: 'Google: CSSI intern during the summer of 2020',
    upwork: 'Upwork: Freelanced for various clients, learning in-demand skills',
    mozilla: 'Mozilla: Founded a startup during the 8 week long "Fix-The-Internet" Incubator',
    sloan: 'Sloan School of Management: Performing ML stock market research under Professor Andrew Lo',
    coursera: 'Coursera: Completed Machine Learning and Algorithm courses to boost my coding proficiency',
    udemy: 'Udemy: Completed 20+ hour MERN stack course to develop mastery in the stack'
}

let experiences = document.querySelectorAll('.carousel-experience');
let carousel = document.getElementById('carousel');
let assocText = document.getElementById('assoc-text');
experiences = Array.from(experiences);

const ANGLE = 360/experiences.length;

const RADIUS = 250/Math.tan(ANGLE *0.5 * Math.PI/180);

experiences.forEach((experience, index) => {
    experience.style.transform = `rotateY(${ANGLE*index}deg) translateZ(${RADIUS}px)`;
    experience.style.margin ='10px';
})

// console.log(experiences[0].getBoundingClientRect().width);
// console.log(experiences[0].style.margin.substring(0,2));

// console.log(carousel);
// carousel.style.left = `-${experiences[0].getBoundingClientRect().width + 2*experiences[0].style.margin.substring(0,2)}px`;

experiences.forEach((experience, index) => {
    let currY = experience.style.transform.substring(experience.style.transform.indexOf('(') + 1, experience.style.transform.indexOf('d'));
})


setInterval(() => {
    experiences.forEach(experience => {
        let currY = experience.style.transform.substring(experience.style.transform.indexOf('(') + 1, experience.style.transform.indexOf('d'));
        currY = Number(currY);
        currY += 0.2
        if(currY >= 360){
            currY = 0;
        }

        if(currY > 270 || currY < 90){
            experience.style.opacity = '1';
        }
        else{
            experience.style.opacity = '0.1';
        }

        if(currY > 330  || currY < 30){
            assocText.innerHTML = experienceDict[experience.id];
        }

        experience.style.transform = `rotateY(${currY}deg) translateZ(${RADIUS}px)`;
    })
}, 30)


/*
~~~~~~~~~~~~~~~~CODE FOR TRANSITIONING BETWEEN THE CONTENT PAGES HERE
*/

let content = document.getElementById('content');
let navItems = Array.from(document.querySelectorAll('.nav-item'));
$(content).load('projects.html');
document.getElementById('projects').style.borderBottom = '1px solid black';

document.getElementById('projects').addEventListener('click', e => {
    $(content).load('projects.html');
    navBorderClear(navItems);
    e.target.style.borderBottom = '1px solid black';
})

document.getElementById('research').addEventListener('click', e => {
    $(content).load('research.html');
    navBorderClear(navItems);
    e.target.style.borderBottom = '1px solid black';
})
document.getElementById('work').addEventListener('click', e => {
    navBorderClear(navItems);
    e.target.style.borderBottom = '1px solid black';
    $(content).load('work.html');
})
document.getElementById('music').addEventListener('click', e => {
    $(content).load('music.html');
    navBorderClear(navItems);
    e.target.style.borderBottom = '1px solid black';
})
document.getElementById('contact').addEventListener('click', e => {
    $(content).load('contact.html');
    navBorderClear(navItems);
    e.target.style.borderBottom = '1px solid black';
})

function navBorderClear(navItems){
    navItems.forEach(item => {
        item.style.borderBottom = '';
    })
}

/*
~~~~~CODE PERTINENT TO 
*/
let contactMeElements = Array.from(document.querySelectorAll('.contact-me-link'));
contactMeElements.forEach(contactMe => {
    contactMe.addEventListener('click', e => {
        $(content).load('contact.html');
        navBorderClear(navItems);
        document.getElementById('contact').style.borderBottom = '1px solid black';
    })
})
//global vars that need to be defined here to execute on page refreshes with animations
let projectItems;
let windowCenter;

