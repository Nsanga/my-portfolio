/*
  Warnings:

  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "public".education_id_seq;
ALTER TABLE "public"."Education" ALTER COLUMN "id" SET DEFAULT nextval('"public".education_id_seq');
ALTER SEQUENCE "public".education_id_seq OWNED BY "public"."Education"."id";

-- AlterTable
CREATE SEQUENCE "public".experience_id_seq;
ALTER TABLE "public"."Experience" ALTER COLUMN "id" SET DEFAULT nextval('"public".experience_id_seq');
ALTER SEQUENCE "public".experience_id_seq OWNED BY "public"."Experience"."id";

-- AlterTable
CREATE SEQUENCE "public".project_id_seq;
ALTER TABLE "public"."Project" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('"public".project_id_seq');
ALTER SEQUENCE "public".project_id_seq OWNED BY "public"."Project"."id";

-- AlterTable
CREATE SEQUENCE "public".skill_id_seq;
ALTER TABLE "public"."Skill" ALTER COLUMN "id" SET DEFAULT nextval('"public".skill_id_seq');
ALTER SEQUENCE "public".skill_id_seq OWNED BY "public"."Skill"."id";

-- AlterTable
CREATE SEQUENCE "public".statistic_id_seq;
ALTER TABLE "public"."Statistic" ALTER COLUMN "id" SET DEFAULT nextval('"public".statistic_id_seq');
ALTER SEQUENCE "public".statistic_id_seq OWNED BY "public"."Statistic"."id";
