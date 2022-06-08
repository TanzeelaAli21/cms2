/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userToken" DROP CONSTRAINT "userToken_userId_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ALTER COLUMN "RollNo" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("RollNo");

-- AlterTable
ALTER TABLE "userToken" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "userToken" ADD CONSTRAINT "userToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("RollNo") ON DELETE RESTRICT ON UPDATE CASCADE;
