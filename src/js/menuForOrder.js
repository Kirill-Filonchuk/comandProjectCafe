import Render from './classRender.js';
import menuFormTmp from '../tmp/menuForm.hbs';
import cafe from './cafeClass.js';

const render = new Render();

const btnMenuOpen=render.createElementWithOptions("button",{
    type:'button',
    textContent:'Open Menu',
})

console.log(btnMenuOpen);
// Обработчик формы

const handlerChangeInput = (e)=>{
    if(e.target.nodeName !== "BUTTON") return;
    const {action}=e.target.dataset;
console.log(action);
const parentNode=e.target.closest("li")
console.dir(parentNode);
const input = parentNode.querySelector("input")
switch (action){
    case "add": input.value=Number(input.value)+1; 
    break;
    case "deduct": input.value= input.value === "0"? input.value:Number(input.value)-1; 
    break;
    case "reset": input.value= "0";
    break;
    default:break;
}

}

const handlerOpenMenu=()=>{
   const menuFormMarkup= menuFormTmp({menu:cafe.menu});
    render.getElementWithMarkup(render.refs.servicePanel, menuFormMarkup);
    btnMenuOpen.style.display="none";
    render.refs={propName:"menuForm", node:document.getElementById("menu-form")}
    console.log(render.refs)
    render.refs.menuForm.addEventListener('click', handlerChangeInput);
}


render.getElementWithNode(render.refs.body, render.refs.servicePanel, 'afterbegin')
render.getElementWithNode(render.refs.servicePanel, btnMenuOpen, 'afterbegin')

btnMenuOpen.addEventListener('click', handlerOpenMenu);

// по форме пробежаться  и собрать объект с инпутами отличными от Нуля
// const obj = {
//     capuchino: 2,
//     late: 5,
//     .....
// }
// submit на forme - нажать на checkout, форму удалить и кнопка Меню появилась



