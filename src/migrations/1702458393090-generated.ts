import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1702458393090 implements MigrationInterface {
    name = 'Generated1702458393090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "country"`);
        await queryRunner.query(`CREATE TYPE "public"."brand_entity_country_enum" AS ENUM('TH', 'INT')`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "country" "public"."brand_entity_country_enum" `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_entity" DROP COLUMN "country"`);
        await queryRunner.query(`DROP TYPE "public"."brand_entity_country_enum"`);
        await queryRunner.query(`ALTER TABLE "brand_entity" ADD "country" character varying NOT NULL`);
    }

}
