/*
  Warnings:

  - You are about to drop the column `savedListings` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "savedListings";

-- CreateTable
CREATE TABLE "_savedUserListings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_savedUserListings_AB_unique" ON "_savedUserListings"("A", "B");

-- CreateIndex
CREATE INDEX "_savedUserListings_B_index" ON "_savedUserListings"("B");

-- AddForeignKey
ALTER TABLE "_savedUserListings" ADD CONSTRAINT "_savedUserListings_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing"("listingId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_savedUserListings" ADD CONSTRAINT "_savedUserListings_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
