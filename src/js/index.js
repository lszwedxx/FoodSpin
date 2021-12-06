//nav
const navBtn = document.querySelector('.nav__btn');
const navList = document.querySelector('.nav__list');
//carousel
const carousel = document.querySelector('.carousel');
const circle = document.querySelector('.circle');
const rightBtn = document.querySelector('.change-btn--right');
const leftBtn = document.querySelector('.change-btn--left');
let mainImg = document.querySelectorAll('.main-content__img > img');
const order = document.querySelector('.order')
const vegeArray = [carousel,circle,rightBtn,leftBtn,order]
let rotateVal = 0;
let imgNum=6;
//carousel btn
const checkColor = (color)=>{
    if(color==2){
        vegeArray.forEach(item =>{
            item.classList.add('vege')
        })
    }else{
        vegeArray.forEach(item =>{
            item.classList.remove('vege')
        })
    }
}
const showMainImg = ()=>{
    [...mainImg].forEach(image=>{
        image.classList.remove('show');
    })
    let img = [...mainImg].filter(image=>image.dataset.index==imgNum);
    img[0].classList.add('show');
    checkColor(img[0].dataset.background);
}
const rotate = (direction) =>{
    if(direction=='right'){
        rotateVal++
        carousel.style.transform=`rotate(${rotateVal * 60+"deg"})`;
        imgNum==1?imgNum=6:imgNum--
        showMainImg()
    }if(direction=='left'){
        rotateVal--
        carousel.style.transform=`rotate(${rotateVal * 60+"deg"})`;
        imgNum===6?imgNum=1:imgNum++
        showMainImg()
    }
    else{
        return
    }
}
rightBtn.addEventListener('click',()=>rotate('right'));
leftBtn.addEventListener('click',()=>rotate('left'));

//nav listener
navBtn.addEventListener('click',e=>{
    const target = e.target
    target.classList.toggle('open');
    navList.classList.toggle('show');
})
