/*
~~~~~~~~CODE PERTINENT TO FADE IN ANIMATION HERE
*/
projectItems = Array.from(document.querySelectorAll('.project-item'));
windowCenter = window.innerWidth/2;

//code for the initial separation of the two halves
projectItems.forEach(projectItem =>{

    //grab the two halves
    let imageSide = projectItem.querySelector('.image-side');
    let textSide = projectItem.querySelector('.text-side');
    

    let imageDim = imageSide.getBoundingClientRect();
    let textDim = textSide.getBoundingClientRect();

    //check to see where their horizontal midpoints are
    let imgCenter = imageDim.left + imageDim.width/2;
    let textCenter = textDim.left + textDim.width/2;

    if(imgCenter - windowCenter < 0){
        imageSide.style.transform = 'translateX(-50%)';
        textSide.style.transform = 'translateX(50%)';
    }
    else{
        imageSide.style.transform = 'translateX(50%)';
        textSide.style.transform = 'translateX(-50%)';
    }
});


/*
~~~~CHECK FOR FADE IN BEFORE ANY SCROLLING HAS TAKEN PLACE
*/
projectItems.forEach(projectItem => {
    shiftItem(projectItem);
})

/*
~~~~CODE FOR FADING IN WHEN THE SCROLL HAS REACHED FAR ENOUGH BELOW
*/
document.addEventListener('scroll', e => {
    projectItems.forEach(projectItem => {
        shiftItem(projectItem);
    })
});


/*
~~~~FUNCTION PROCESSES WHAT MUST BE DONE IN ORDER TO FADE IN A PROJECT ITEM
*/
function shiftItem(projectItem){
    let projectItemDim = projectItem.getBoundingClientRect();
    let detectionThreshold = window.pageYOffset + window.innerHeight * 0.9;
    if(detectionThreshold > projectItemDim.top + window.pageYOffset){
        
         //grab the two halves
        let imageSide = projectItem.querySelector('.image-side');
        let textSide = projectItem.querySelector('.text-side');
        

        let imageDim = imageSide.getBoundingClientRect();
        let textDim = textSide.getBoundingClientRect();

        //check to see where their horizontal midpoints are
        let imgCenter = imageDim.left + imageDim.width/2;
        let textCenter = textDim.left + textDim.width/2;

        if(imgCenter - windowCenter < 0){
            imageSide.style.transform = 'translateX(0%)';
            imageSide.style.opacity = '1';
            textSide.style.opacity = '1';
            textSide.style.transform = 'translateX(0%)';
        }
        else{
            imageSide.style.transform = 'translateX(0%)';
            textSide.style.transform = 'translateX(0%)';
            imageSide.style.opacity = '1';
            textSide.style.opacity = '1';
        }
    }
}
