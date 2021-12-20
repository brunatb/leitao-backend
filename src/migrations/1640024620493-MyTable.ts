import {MigrationInterface, QueryRunner} from "typeorm";

export class MyTable1640024620493 implements MigrationInterface {
    name = 'MyTable1640024620493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "professors" ("professor_id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_4b46e545be961e5a1849129f2e3" PRIMARY KEY ("professor_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exams_category_enum" AS ENUM('P1', 'P2', 'P3', 'REP', 'OTHERS')`);
        await queryRunner.query(`CREATE TABLE "exams" ("exam_id" SERIAL NOT NULL, "name" text NOT NULL, "pdf_link" text NOT NULL, "category" "public"."exams_category_enum" NOT NULL, "professor_id" integer, "course_id" integer, CONSTRAINT "PK_7fa41a3a161c719dbb3bbd67eef" PRIMARY KEY ("exam_id"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("course_id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_42dc69837b2e7bc603686ddaf53" PRIMARY KEY ("course_id"))`);
        await queryRunner.query(`CREATE TABLE "professors_courses" ("professor_id" integer NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_207b0a75ac254997c748056c6d9" PRIMARY KEY ("professor_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc8ce8dd917495c3a57368bd5f" ON "professors_courses" ("professor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_957dc65c87d52f29f01e8ee177" ON "professors_courses" ("course_id") `);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_6aab0eb77a69ea44b4217d8c969" FOREIGN KEY ("professor_id") REFERENCES "professors"("professor_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exams" ADD CONSTRAINT "FK_490a686c682fdb6b506bd924bb8" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "professors_courses" ADD CONSTRAINT "FK_dc8ce8dd917495c3a57368bd5f6" FOREIGN KEY ("professor_id") REFERENCES "professors"("professor_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "professors_courses" ADD CONSTRAINT "FK_957dc65c87d52f29f01e8ee1770" FOREIGN KEY ("course_id") REFERENCES "courses"("course_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "professors_courses" DROP CONSTRAINT "FK_957dc65c87d52f29f01e8ee1770"`);
        await queryRunner.query(`ALTER TABLE "professors_courses" DROP CONSTRAINT "FK_dc8ce8dd917495c3a57368bd5f6"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_490a686c682fdb6b506bd924bb8"`);
        await queryRunner.query(`ALTER TABLE "exams" DROP CONSTRAINT "FK_6aab0eb77a69ea44b4217d8c969"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_957dc65c87d52f29f01e8ee177"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc8ce8dd917495c3a57368bd5f"`);
        await queryRunner.query(`DROP TABLE "professors_courses"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "exams"`);
        await queryRunner.query(`DROP TYPE "public"."exams_category_enum"`);
        await queryRunner.query(`DROP TABLE "professors"`);
    }

}
