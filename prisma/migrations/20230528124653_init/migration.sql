-- CreateTable
CREATE TABLE "CSE" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "CSE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chemistry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "Chemistry_pkey" PRIMARY KEY ("id")
);
