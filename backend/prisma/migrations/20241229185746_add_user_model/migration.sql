-- CreateTable
CREATE TABLE "Database" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Database_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Database" ADD CONSTRAINT "Database_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
