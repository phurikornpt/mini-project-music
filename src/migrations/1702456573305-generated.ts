import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1702456573305 implements MigrationInterface {
    name = 'Generated1702456573305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "brand_entity" ("id" SERIAL NOT NULL, "brandName" character varying NOT NULL, "country" character varying NOT NULL, CONSTRAINT "PK_e1bffaa53eebf883232cb6dfb86" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."single_albums_entity_typesinglealbums_enum" AS ENUM('SINGLE', 'ALBUM')`);
        await queryRunner.query(`CREATE TABLE "single_albums_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "typeSingleAlbums" "public"."single_albums_entity_typesinglealbums_enum" NOT NULL, "brandId" integer, CONSTRAINT "PK_29279a2a44d2b1dd39a2b986325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "music_genre_entity" ("id" SERIAL NOT NULL, "genreName" character varying NOT NULL, CONSTRAINT "PK_93e671f7e4f1819198af5053ea8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "song_entity" ("id" SERIAL NOT NULL, "songName" character varying NOT NULL, "singleAlbumId" integer, CONSTRAINT "PK_271c64877a04cf154bec07e4830" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "single_albums_entity" ADD CONSTRAINT "FK_439963975e86f338b490a43f131" FOREIGN KEY ("brandId") REFERENCES "brand_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "song_entity" ADD CONSTRAINT "FK_b49bb5b7371311bf1bcabe46b1e" FOREIGN KEY ("singleAlbumId") REFERENCES "single_albums_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_entity" DROP CONSTRAINT "FK_b49bb5b7371311bf1bcabe46b1e"`);
        await queryRunner.query(`ALTER TABLE "single_albums_entity" DROP CONSTRAINT "FK_439963975e86f338b490a43f131"`);
        await queryRunner.query(`DROP TABLE "song_entity"`);
        await queryRunner.query(`DROP TABLE "music_genre_entity"`);
        await queryRunner.query(`DROP TABLE "single_albums_entity"`);
        await queryRunner.query(`DROP TYPE "public"."single_albums_entity_typesinglealbums_enum"`);
        await queryRunner.query(`DROP TABLE "brand_entity"`);
    }

}
