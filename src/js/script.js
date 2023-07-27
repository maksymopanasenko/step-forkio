const burgerBody = document.querySelector('#burger-body');
const burgerMenuIcon = document.querySelector('#burger-menu');
const burgerMenuList = document.querySelector('#burger-list');
burgerBody.onclick = function(){
    burgerMenuIcon.classList.contains('active') ? burgerMenuIcon.classList.remove('active') : burgerMenuIcon.classList.add('active');
    burgerMenuList.classList.contains('active') ? burgerMenuList.classList.remove('active') : burgerMenuList.classList.add('active');
};
const listItem = document.querySelectorAll("#burger-list li");
    listItem.forEach(e => e.onclick = function(){
        listItem.forEach(e => e.classList.remove('focus'));
        e.classList.add('focus');
    });
