import workers from "./db.workers.js"; // импортируем наших официантов
import tables from "./db.tables.js";
import menu from "./db.menu.js";

class Cafe {
    constructor({ workers, tables, menu }) {
        this.workers = workers;
        this.tables = tables;
        this.menu = menu;
    }

    getPresentWorkers() {
        // this.presentWorkers = [];
        // for (let worker of this.workers) {
        //     if (worker.isPresent === true) {
        //          this.presentWorkers.push({ ...worker });
        //      }
        //  }

        this.presentWorkers = this.workers.filter((worker) => worker.isPresent)
            .map(worker => {
                return { ...worker };
            });
    }

    setListWorkers() {
        this.getPresentWorkers();
        const workerLength = this.presentWorkers.length;
        // for (let i = 0; i < this.tables.length; i += 1) {
        //     const workerIdx = ((i + 1) % workerLength);
        //     this.tables[i].service = this.presentWorkers[workerIdx].name;
        //     this.presentWorkers[workerIdx].tables.push(this.tables[i].id);
        // }
        this.tables.forEach( (table, idx)=> {
            const workerIdx = ((idx + 1) % workerLength);   
            table.service = this.presentWorkers[workerIdx].name;   
            this.presentWorkers[workerIdx].tables.push(table.id);    
        } )

    }

    findTable (tableId) {
       return this.tables.find(table => tableId === table.id);
    }

    getOrder(tableId, dishId, num) {
        // for (let table of this.tables) {
        //     if (table.id === tableId) {
        //         if (!table.currentOrder) {
        //             table.currentOrder = {};
        //         }
        //         if (!table.currentOrder[dishId]) {
        //             table.currentOrder[dishId] = num;
        //             return;
        //         }
        //         table.currentOrder[dishId] += num;
        //         return;

        //     }
        // }

        // const table = this.tables.find((table) =>table.id === tableId);
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
        // const currentTable = this.tables.find(table => tableId === table.id);

        const currentTable = this.findTable(tableId);

        // console.log(currentOrder);
        const orderTable = Object.entries(currentTable.currentOrder);
        // console.log(orderTable);
        const preparing = orderTable.map(([id, value]) => {
            const dish = this.menu.find(dish=> dish.id === id)
            return {name : `${dish.name} - ${value}`, id, isCooked: false};
        })
        // console.log(preparing);
        currentTable.preparing = preparing;
    }

    // Task 5
    closeOrder (tableId, dishId, value) {
        const currentTable = this.findTable(tableId);
        const preparing = currentTable.preparing.find((dishPosition) => dishPosition.id === dishId);
        if (preparing.isCooked === true) return;
        const name=  preparing.name.split(' - ');
        //  console.log(name);
        name[1]=Number(name[1])-value;
        // console.log(name);
        if (name[1] === 0) {
            preparing.isCooked = true;
        }
        const nameStr = name.join(' - ');
        // console.log(nameStr);
        preparing.name = nameStr
        // console.log(nameStr);
    }

    getCheck (tableId) {
        const table = this.findTable(tableId);
        if (table.preparing.some((dish)=>!dish.isCooked)) {
            return;
        }
        table['currentCheck'] = Object.entries(table.currentOrder).reduce((acc, [id, value]) => {
            // console.log(id);
            const dish = this.menu.find((dishMenu) => dishMenu.id === id);
            acc+=dish.price*value;
            return acc;
        },0)
        table.tips =table.currentCheck*0.15;
       table.totalCheck = table.tips +  table['currentCheck'];

       const worker = this.presentWorkers.find(({name})=>name===table.service);
       worker.tips += table.tips; 

       return `официант ${table.service}\n`+Object.entries(table.currentOrder).reduce((acc, [id, value]) => {
        // console.log(id);
        const dish = this.menu.find((dishMenu) => dishMenu.id === id);
        const str=`${dish.name} - ${value}*${dish.price} -  ${value*dish.price}грн\n`
        acc+=str;
        return acc;
    },'')+`СТОИМОСТЬ ЗАКАЗА: ${table.currentCheck}грн\nЧАЕВЫЕ: ${table.tips}грн\nИТОГО: ${table.totalCheck}грн`
    }



}

//const cafe = new Cafe({ workers: workers, tables: tables });
const cafe = new Cafe({ workers, tables, menu });

cafe.setListWorkers();
cafe.getOrder(1, "marcepan", 2);
cafe.getOrder(1, "water-0.5", 2);
cafe.getOrder(1, "water-0.5", 2);
cafe.getOrderForCook(1);
console.log(cafe.tables[0]);
cafe.closeOrder(1,'marcepan',2)
cafe.closeOrder(1,"water-0.5", 4)
console.log(cafe.tables[0]);
cafe.getCheck(1)
console.log(cafe.tables[0]);
console.log(cafe.getCheck(1));
console.log(cafe.presentWorkers);








