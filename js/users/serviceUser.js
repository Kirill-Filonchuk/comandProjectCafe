import Render from '../classRender.js';

const render = new Render();

const checkInBtn = render.createElementWithOptions("button", {
    textContent: "Отметиться о присутствии",
    type: "button",
})

render.refs.body.append(render.refs.servicePanel);
render.refs.servicePanel.append(checkInBtn);

function handleCheck() {
    if (this.dataset.flag !== "true") {
        this.style = "background-color: green";
        this.dataset.flag = "true";
        return;
    }
    this.dataset.flag = "false";
    this.style = "";
}

checkInBtn.addEventListener("click", handleCheck);

