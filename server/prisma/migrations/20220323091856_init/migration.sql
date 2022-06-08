/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `userId` on the `userToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "userToken" DROP CONSTRAINT "userToken_userId_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "RollNo" DROP NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "userToken" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "userToken_userId_key" ON "userToken"("userId");

-- AddForeignKey
ALTER TABLE "userToken" ADD CONSTRAINT "userToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
