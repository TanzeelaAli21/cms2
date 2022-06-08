/*
  Warnings:

  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "course" DROP CONSTRAINT "course_pkey",
ADD COLUMN     "course" SERIAL NOT NULL,
ADD CONSTRAINT "course_pkey" PRIMARY KEY ("course");
