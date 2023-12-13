import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1702459720200 implements MigrationInterface {
    name = 'Generated1702459720200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_entity" ALTER COLUMN "country" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand_entity" ALTER COLUMN "country" DROP NOT NULL`);
    }

}
