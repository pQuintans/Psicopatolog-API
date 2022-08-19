/*
  Warnings:

  - You are about to drop the column `AI_answer` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_answer_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `qtd_positive_answers` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "AI_answer",
DROP COLUMN "last_answer_date",
DROP COLUMN "qtd_positive_answers";

-- CreateTable
CREATE TABLE "FormAnswer" (
    "id" TEXT NOT NULL,
    "FK_user_id" TEXT NOT NULL,
    "qtd_positive_answers" INTEGER NOT NULL,
    "AI_answer" BOOLEAN NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "FormAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormAnswer" ADD CONSTRAINT "FormAnswer_FK_user_id_fkey" FOREIGN KEY ("FK_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
