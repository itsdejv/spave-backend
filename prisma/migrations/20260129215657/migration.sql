/*
  Warnings:

  - You are about to drop the column `parentI` on the `TransactionCategory` table. All the data in the column will be lost.
  - Added the required column `parentId` to the `TransactionCategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TransactionCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_TransactionCategory" ("id", "name", "userId") SELECT "id", "name", "userId" FROM "TransactionCategory";
DROP TABLE "TransactionCategory";
ALTER TABLE "new_TransactionCategory" RENAME TO "TransactionCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
