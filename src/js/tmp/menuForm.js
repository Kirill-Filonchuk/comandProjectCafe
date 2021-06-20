const getMenuForm = (menu) => `<form>
<ul>
  ${menu.reduce((acc,{id,name,price})=>acc+`<li id="${id}">
  <span>${name}</span>
  <span>${price}</span>
  <input type="text" name="quantity" value="0">
  <button type="button">-</button>
  <button type="button">+</button>
  <button type="button">Reset</button>
</li>`,'')}
</ul>
<button type="submit">Checkout</button>
</form>`

export default getMenuForm;