import range from "lodash/range";
import Seeder from "../Seeder";
import { Prisma } from "@prisma/client";

class MenuItemSeed extends Seeder {
    rolData: Prisma.RolCreateArgs["data"];

    constructor(count: number = 10, data: Prisma.RolCreateArgs["data"]) {
        super(count);
        this.count = count;
        this.rolData = data;
        this.createData();
    }

    createData() {
        range(this.count).forEach(() => {
            this._data.push(this.rolData);
        });
    }
}

export default MenuItemSeed;
