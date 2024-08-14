/*
  Warnings:

  - You are about to drop the column `oauthId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `oauthProvider` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_oauthId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "oauthId",
DROP COLUMN "oauthProvider";

-- CreateTable
CREATE TABLE "OAuthAccount" (
    "id" TEXT NOT NULL,
    "oauthProvider" "OAuthProvider" NOT NULL,
    "oauthProviderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OAuthAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_oauthProviderId_key" ON "OAuthAccount"("oauthProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_oauthProvider_oauthProviderId_key" ON "OAuthAccount"("oauthProvider", "oauthProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthAccount_oauthProvider_userId_key" ON "OAuthAccount"("oauthProvider", "userId");

-- AddForeignKey
ALTER TABLE "OAuthAccount" ADD CONSTRAINT "OAuthAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
