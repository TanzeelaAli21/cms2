-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "enrolled" BOOLEAN NOT NULL,
    "courseId" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "studentIds" INTEGER[],

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ClassToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToUser_AB_unique" ON "_ClassToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToUser_B_index" ON "_ClassToUser"("B");

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToUser" ADD FOREIGN KEY ("A") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClassToUser" ADD FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
