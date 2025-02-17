import bcrypt from "bcryptjs";
import range from "lodash/range";
import { faker } from "@faker-js/faker";

import Seeder from "../Seeder";
import { Prisma } from "@prisma/client";

class UsuarioSeed extends Seeder {
    email: undefined | string = undefined;
    idRol = 2;

    constructor(
        count: number = 10,
        email: undefined | string = undefined,
        idRol = 2,
    ) {
        super(count);
        this.count = count;
        this.email = email;
        this.idRol = idRol;
        this.createData();
    }

    createData() {
        range(this.count).forEach(() => {
            this._data.push({
                email: this.email ? this.email : faker.internet.email(),
                nombre: faker.person.firstName(),
                validado: true,
                rol: {
                    connect: {
                        id: this.idRol,
                    },
                },
                clave: {
                    create: {
                        hash: bcrypt.hashSync("123456", 10),
                    },
                },
            } satisfies Prisma.UsuarioCreateArgs["data"]);
        });
    }
}

export default UsuarioSeed;
