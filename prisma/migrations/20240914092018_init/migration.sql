/*
  Warnings:

  - Added the required column `stock` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "stock" INTEGER NOT NULL;
