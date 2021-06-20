import Render from './classRender.js';
import menuFormTmp from './tmp/menuForm.js';
import cafe from './cafeClass.js';

const render = new Render();

const btnMenuOpen=render.createElementWithOptions("button",{
    type:'button',
    textContent:'Open Menu',
})

console.log(btnMenuOpen);

const handlerOpenMenu=()=>{
   const menuFormMarkup= menuFormTmp(cafe.menu);
    render.getElementWithMarkup(render.refs.servicePanel, menuFormMarkup)
}

render.getElementWithNode(render.refs.body, render.refs.servicePanel, 'afterbegin')
render.getElementWithNode(render.refs.servicePanel, btnMenuOpen, 'afterbegin')

btnMenuOpen.addEventListener('click', handlerOpenMenu);


