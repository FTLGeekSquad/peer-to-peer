-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "location" TEXT NOT NULL,
    "savedListings" JSONB NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Listing" (
    "listingId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "priceHourly" DOUBLE PRECISION NOT NULL,
    "photo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availability" JSONB NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("listingId")
);

-- CreateTable
CREATE TABLE "Review" (
    "reviewId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "listingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("reviewId")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("listingId") ON DELETE RESTRICT ON UPDATE CASCADE;
