import {MigrationInterface, QueryRunner} from "typeorm";

export class ListingTable21639654234459 implements MigrationInterface {
    name = 'ListingTable21639654234459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professors" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_6b249c6363a154820c909c45e27" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" SERIAL NOT NULL, "name" text NOT NULL, "professor_id" integer, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exams_category_enum" AS ENUM('P1', 'P2', 'P3', 'REP', 'OTHERS')`);
        await queryRunner.query(`CREATE TABLE "exams" ("id" SERIAL NOT NULL, "name" text NOT NULL, "link" text NOT NULL, "category" "public"."exams_category_enum" NOT NULL, "professor_id" integer, "course_id" integer, CONSTRAINT "REL_6aab0eb77a69ea44b4217d8c96" UNIQUE ("professor_id"), CONSTRAINT "REL_490a686c682fdb6b506bd924bb" UNIQUE ("course_id"), CONSTRAINT "PK_b43159ee3efa440952794b4f53e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "courses" ADD CONSTRAINT "FK_7722a465aa381126eb553158c73" FOREIGN KEY ("professor_id") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_6aab0eb77a69ea44b4217d8c969" FOREIGN KEY ("professor_id") REFERENCES "professors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_490a686c682fdb6b506bd924bb8" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_490a686c682fdb6b506bd924bb8"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_6aab0eb77a69ea44b4217d8c969"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP CONSTRAINT "FK_7722a465aa381126eb553158c73"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TYPE "public"."exams_category_enum"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "professors"`);
    }

}
