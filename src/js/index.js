const navBtn = document.querySelector('.nav__btn');
const navList = document.querySelector('.nav__list')
console.log(navBtn)
navBtn.addEventListener('click',e=>{
    const target = e.target
    target.classList.toggle('open');
    navList.classList.toggle('show');
})
