-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "collectionId" BIGINT NOT NULL,
    "artistName" TEXT NOT NULL,
    "collectionName" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
