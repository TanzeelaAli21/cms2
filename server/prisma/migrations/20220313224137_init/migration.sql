/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserToken" DROP CONSTRAINT "UserToken_userId_fkey";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserToken";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "RollNo" VARCHAR(100) NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "role" "UserRole" NOT NULL,
    "shift" "shift" NOT NULL,
    "batch" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "courseId" VARCHAR(50) NOT NULL,
    "courseName" VARCHAR(50) NOT NULL,
    "creditHours" SMALLINT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("courseId","courseName")
);

-- CreateTable
CREATE TABLE "userToken" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_RollNo_key" ON "user"("RollNo");

-- CreateIndex
CREATE UNIQUE INDEX "course_courseId_key" ON "course"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "userToken_token_key" ON "userToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "userToken_userId_key" ON "userToken"("userId");

-- AddForeignKey
ALTER TABLE "userToken" ADD CONSTRAINT "userToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
