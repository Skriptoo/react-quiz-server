-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "roomCode" TEXT NOT NULL,
    CONSTRAINT "User_roomCode_fkey" FOREIGN KEY ("roomCode") REFERENCES "Room" ("roomCode") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Room" (
    "roomCode" TEXT NOT NULL PRIMARY KEY
);
