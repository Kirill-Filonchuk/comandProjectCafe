import workers from "./db.workers.js"; // импортируем наших официантов
import tables from "./db.tables.js";
import menu from "./db.menu.js";

class Cafe {
    constructor({ workers, tables, menu }) {
        this.workers = workers;
        this.tables = tables;
        this.menu = menu;
    }

    setPresentWorkersToLS(workers){
        localStorage.setItem('presentWorkers', JSON.stringify(workers));
    }

    getPresentWorkersFromLS(){
       return JSON.parse(localStorage.getItem('presentWorkers'));
    }

    getPresentWorkers() {
        const presentWorkers = this.workers.filter((worker) => worker.isPresent);
        this.setPresentWorkersToLS(presentWorkers);
    }

    setListWorkers() {
        this.getPresentWorkers();
        const presentWorkers = this.getPresentWorkersFromLS();
        const workerLength = presentWorkers.length;
      console.log(presentWorkers)
        this.tables.forEach( (table, idx)=> {
            const workerIdx = ((idx + 1) % workerLength);   
            table.service = presentWorkers[workerIdx].name;   
           presentWorkers[workerIdx].tables.push(table.id);    
        } )
        this.setPresentWorkersToLS(presentWorkers);
    }

    findTable (tableId) {
       return this.tables.find(table => tableId === table.id);
    }

    getOrder(tableId, dishId, num) {

        const table = this.findTable(tableId);

            if (!table.currentOrder) {
                table.currentOrder = {};
            }
            if (!table.currentOrder[dishId]) {
                table.currentOrder[dishId] = num;
                return;
            }
            table.currentOrder[dishId] += num;
            return;
    }

    // Task 4
    getOrderForCook (tableId) {
       
        const currentTable = this.findTable(tableId);

        const orderTable = Object.entries(currentTable.currentOrder);
       
        const preparing = orderTable.map(([id, value]) => {
            const dish = this.menu.find(dish=> dish.id === id)
            return {name : `${dish.name} - ${value}`, id, isCooked: false};
        })
        
        currentTable.preparing = preparing;
    }

    // Task 5
    closeOrder (tableId, dishId, value) {
        const currentTable = this.findTable(tableId);
        const preparing = currentTable.preparing.find((dishPosition) => dishPosition.id === dishId);
        if (preparing.isCooked === true) return;
        const name=  preparing.name.split(' - ');
    
        name[1]=Number(name[1])-value;
        
        if (name[1] === 0) {
            preparing.isCooked = true;
        }
        const nameStr = name.join(' - ');
       
        preparing.name = nameStr
       
    }

    // Task 6
    getCheck (tableId) {
        const table = this.findTable(tableId);
        if (table.preparing.some((dish)=>!dish.isCooked)) {
            return;
        }
        table['currentCheck'] = Object.entries(table.currentOrder).reduce((acc, [id, value]) => {
        
            const dish = this.menu.find((dishMenu) => dishMenu.id === id);
            acc+=dish.price*value;
            return acc;
        },0)
        table.tips =table.currentCheck*0.15;
       table.totalCheck = table.tips +  table['currentCheck'];

       const worker = this.getPresentWorkersFromLS().find(({name})=>name===table.service);
       worker.tips += table.tips; 

       return `официант ${table.service}\n`+Object.entries(table.currentOrder).reduce((acc, [id, value]) => {
       
        const dish = this.menu.find((dishMenu) => dishMenu.id === id);
        const str=`${dish.name} - ${value}*${dish.price} -  ${value*dish.price}грн\n`
        acc+=str;
        return acc;
    },'')+`СТОИМОСТЬ ЗАКАЗА: ${table.currentCheck}грн\nЧАЕВЫЕ: ${table.tips}грн\nИТОГО: ${table.totalCheck}грн`
    }

}

const cafe = new Cafe({ workers, tables, menu });

export default cafe;

cafe.setListWorkers();
cafe.getOrder(1, "marcepan", 2);
cafe.getOrder(1, "water-0.5", 2);
cafe.getOrder(1, "water-0.5", 2);
cafe.getOrderForCook(1);
console.log(cafe.tables[0]);
cafe.closeOrder(1,'marcepan',2)
cafe.closeOrder(1,"water-0.5", 4)
console.log(cafe.tables[0]);
// cafe.getCheck(1)
console.log(cafe.tables[0]);
// console.log(cafe.getCheck(1));
console.log(cafe.getPresentWorkersFromLS());








