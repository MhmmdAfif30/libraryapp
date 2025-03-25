-- CreateTable
CREATE TABLE "Members" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "penalty" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "borrowed" BOOLEAN NOT NULL DEFAULT false,
    "membersId" INTEGER,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_membersId_fkey" FOREIGN KEY ("membersId") REFERENCES "Members"("id") ON DELETE SET NULL ON UPDATE CASCADE;
