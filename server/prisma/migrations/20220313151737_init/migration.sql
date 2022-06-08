/*
  Warnings:

  - The values [MORNING,EVENING] on the enum `shift` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "shift_new" AS ENUM ('M', 'E');
ALTER TABLE "User" ALTER COLUMN "shift" TYPE "shift_new" USING ("shift"::text::"shift_new");
ALTER TYPE "shift" RENAME TO "shift_old";
ALTER TYPE "shift_new" RENAME TO "shift";
DROP TYPE "shift_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" VARCHAR(255) NOT NULL;
