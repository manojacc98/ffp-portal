-- CreateTable
CREATE TABLE "CreditCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "archived" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "FrequentFlyerProgram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "assetName" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Ratio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditCardId" INTEGER NOT NULL,
    "ffpId" INTEGER NOT NULL,
    "ratio" REAL NOT NULL,
    CONSTRAINT "Ratio_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "CreditCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Ratio_ffpId_fkey" FOREIGN KEY ("ffpId") REFERENCES "FrequentFlyerProgram" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
