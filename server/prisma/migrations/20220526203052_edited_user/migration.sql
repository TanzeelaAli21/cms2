/*
  Warnings:

  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `userToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cnic]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnic` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userToken" DROP CONSTRAINT "userToken_userId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "cnic" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "father_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "name" VARCHAR(50) NOT NULL,
ALTER COLUMN "shift" DROP NOT NULL,
ALTER COLUMN "batch" DROP NOT NULL;

-- DropTable
DROP TABLE "userToken";

-- CreateIndex
CREATE UNIQUE INDEX "user_cnic_key" ON "user"("cnic");
