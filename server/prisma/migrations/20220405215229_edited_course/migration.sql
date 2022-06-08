/*
  Warnings:

  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `course` on the `course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "course" DROP CONSTRAINT "course_pkey",
DROP COLUMN "course",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "course_pkey" PRIMARY KEY ("id");
