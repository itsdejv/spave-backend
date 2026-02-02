-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'EXPENSE',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,
    "transactionCategoryId" INTEGER,
    "neccessary" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Transaction_transactionCategoryId_fkey" FOREIGN KEY ("transactionCategoryId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "id", "name", "neccessary", "transactionCategoryId", "userId") SELECT "amount", "id", "name", coalesce("neccessary", false) AS "neccessary", "transactionCategoryId", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_TransactionCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" INTEGER,
    "color" TEXT,
    "icon" TEXT,
    CONSTRAINT "TransactionCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "TransactionCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TransactionCategory" ("id", "name", "parentId", "userId") SELECT "id", "name", "parentId", "userId" FROM "TransactionCategory";
DROP TABLE "TransactionCategory";
ALTER TABLE "new_TransactionCategory" RENAME TO "TransactionCategory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
