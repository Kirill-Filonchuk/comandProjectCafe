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
        for (let i = 0; i < this.tables.length; i += 1) {
            const workerIdx = ((i + 1) % workerLength);
            this.tables[i].service = this.presentWorkers[workerIdx].name;
            this.presentWorkers[workerIdx].tables.push(this.tables[i].id);
        }
    }

    getOrder(tableId, dishId, num) {
        for (let table of this.tables) {
            if (table.id === tableId) {
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
        }
    }

}

//const cafe = new Cafe({ workers: workers, tables: tables });
const cafe = new Cafe({ workers, tables, menu });

cafe.setListWorkers();
cafe.getOrder(1, "marcepan", 2);
cafe.getOrder(1, "water-0.5", 2);
cafe.getOrder(1, "water-0.5", 2);
console.log(cafe.tables[0]);


