import range from "lodash/range";
import Seeder from "../Seeder";
import { Prisma } from "@prisma/client";

class RolSeed extends Seeder {
    rolData: Prisma.RolCreateArgs["data"];
    createdData: any;

    constructor(count: number = 10, data: Prisma.RolCreateInput) {
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

    setCreatedMetadata(metadata: any) {
        this.createdData = metadata;
    }
}

export default RolSeed;
