-- AlterTable
ALTER TABLE "Books" ADD COLUMN     "borrowedAt" TIMESTAMP(3),
ADD COLUMN     "returnedAt" TIMESTAMP(3);
