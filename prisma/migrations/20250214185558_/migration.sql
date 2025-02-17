-- CreateEnum
CREATE TYPE "Direccion" AS ENUM ('VERTICAL', 'HORIZONTAL');

-- CreateEnum
CREATE TYPE "CMSLinkType" AS ENUM ('INSTAGRAM', 'YOUTUBE');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" UUID NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "nombre" VARCHAR(120) NOT NULL,
    "validado" BOOLEAN NOT NULL DEFAULT false,
    "idRol" INTEGER NOT NULL,
    "fechaQuitado" TIMESTAMP(3),

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clave" (
    "idUsuario" UUID NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Clave_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "homeUrl" TEXT NOT NULL DEFAULT '/',
    "idMenu" INTEGER,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" "Direccion" NOT NULL DEFAULT 'VERTICAL',

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "valor" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CMSLink" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipo" "CMSLinkType" NOT NULL,
    "url" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "CMSLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MenuToMenuItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_MenuToMenuItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Menu_nombre_key" ON "Menu"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_nombre_key" ON "MenuItem"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Config_id_key" ON "Config"("id");

-- CreateIndex
CREATE INDEX "_MenuToMenuItem_B_index" ON "_MenuToMenuItem"("B");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idRol_fkey" FOREIGN KEY ("idRol") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clave" ADD CONSTRAINT "Clave_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rol" ADD CONSTRAINT "Rol_idMenu_fkey" FOREIGN KEY ("idMenu") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToMenuItem" ADD CONSTRAINT "_MenuToMenuItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToMenuItem" ADD CONSTRAINT "_MenuToMenuItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
