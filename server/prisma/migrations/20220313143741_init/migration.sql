/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `batch` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shift` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "shift" AS ENUM ('MORNING', 'EVENING');

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("courseId", "courseName");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "batch" INTEGER NOT NULL,
ADD COLUMN     "shift" "shift" NOT NULL;
