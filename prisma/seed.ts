import { PrismaClient } from "@prisma/client";
import UsuarioSeed from "./seeds/UsuarioSeed";
import RolSeed from "./seeds/RolSeed";

const prisma = new PrismaClient();

const main = async () => {
    try {
        // Cleanup
        await prisma.usuario.deleteMany();
        await prisma.rol.deleteMany();
        await prisma.menuItem.deleteMany();
        await prisma.menu.deleteMany();

        //ADMIN ---------------------------------------------------

        const adminRol = new RolSeed(1, {
            nombre: "Admin",
            homeUrl: "/eventos",
            menu: {
                create: {
                    nombre: "Admin menu",
                    items: {
                        create: [
                            {
                                nombre: "Eventos",
                                url: "/eventos",
                                orden: 0,
                            },

                            {
                                nombre: "Documentos",
                                url: "/documentos",
                                orden: 0,
                            },
                            {
                                nombre: "Informes",
                                url: "/informes",
                                orden: 0,
                            },
                            {
                                nombre: "Imagenes",
                                url: "/imagenes",
                                orden: 0,
                            },
                            {
                                nombre: "Socios",
                                url: "/socios",
                                orden: 0,
                            },
                            {
                                nombre: "ACL",
                                url: "/superadmin/acl",
                                orden: 1,
                            },
                            {
                                nombre: "CMS",
                                url: "/cms",
                                orden: 0,
                            },
                        ],
                    },
                },
            },
        });

        adminRol.setCreatedMetadata(
            await prisma.rol.create({
                data: {
                    ...(adminRol.rolData as any),
                },
            }),
        );

        // Necesarios para el sistema
        const admins = new UsuarioSeed(
            1,
            "admin@socios.com",
            adminRol.createdData.id,
        )!;

        for (const admin of admins.data) {
            await prisma.usuario.create({
                data: {
                    ...(admin as any),
                },
            });
        }

        // USER -----------------------------------------------------
        const userRol = new RolSeed(1, {
            nombre: "Socio",
            homeUrl: "/eventos",
            recursos: {
                connectOrCreate: [
                    {
                        where: {
                            funcion: "getEventos.ts",
                        },
                        create: {
                            funcion: "getEventos.ts",
                            grupos: ["eventos"],
                        },
                    },
                ],
            },
            menu: {
                create: {
                    nombre: "Socio menu",
                    items: {
                        connectOrCreate: [
                            {
                                where: {
                                    nombre: "Eventos",
                                    url: "/eventos",
                                },
                                create: {
                                    nombre: "Eventos",
                                    url: "/eventos",
                                    orden: 0,
                                },
                            },
                            {
                                where: {
                                    nombre: "Imagenes",
                                },
                                create: {
                                    nombre: "Imagenes",
                                    url: "/imagenes",
                                    orden: 0,
                                },
                            },
                            {
                                where: {
                                    nombre: "Documentos",
                                },
                                create: {
                                    nombre: "Documentos",
                                    url: "/documentos",
                                    orden: 0,
                                },
                            },
                        ],
                    },
                },
            },
        });

        userRol.setCreatedMetadata(
            await prisma.rol.create({
                data: {
                    ...(userRol.rolData as any),
                },
            }),
        );

        // 3 usuarios normales
        const users = new UsuarioSeed(3, undefined, userRol.createdData.id);

        for (const user of users.data) {
            await prisma.usuario.create({
                data: {
                    ...(user as any),
                },
            });
        }

        // un usuario de facil acceso
        const faciluser = new UsuarioSeed(
            1,
            "usr@demo.com",
            userRol.createdData.id,
        );

        for (const user of faciluser.data) {
            await prisma.usuario.create({
                data: {
                    ...(user as any),
                },
            });
        }

        console.log(`Database has been seeded. 🚀`);
    } catch (e) {
        console.log(e);
        throw e;
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
