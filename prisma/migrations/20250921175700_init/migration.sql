/*
  Warnings:

  - You are about to drop the column `role` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Experience" DROP COLUMN "role",
ADD COLUMN     "location" TEXT,
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "title" TEXT,
ADD COLUMN     "type" TEXT,
ALTER COLUMN "company" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."Education";

-- DropTable
DROP TABLE "public"."Skill";
