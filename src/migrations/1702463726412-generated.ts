import { MigrationInterface, QueryRunner } from "typeorm";

export class Generated1702463726412 implements MigrationInterface {
    name = 'Generated1702463726412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_entity" DROP CONSTRAINT "FK_50b12581a6b220504928238d8ff"`);
        await queryRunner.query(`ALTER TABLE "song_entity" DROP CONSTRAINT "UQ_50b12581a6b220504928238d8ff"`);
        await queryRunner.query(`ALTER TABLE "song_entity" ADD CONSTRAINT "FK_50b12581a6b220504928238d8ff" FOREIGN KEY ("musicGenreId") REFERENCES "music_genre_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "song_entity" DROP CONSTRAINT "FK_50b12581a6b220504928238d8ff"`);
        await queryRunner.query(`ALTER TABLE "song_entity" ADD CONSTRAINT "UQ_50b12581a6b220504928238d8ff" UNIQUE ("musicGenreId")`);
        await queryRunner.query(`ALTER TABLE "song_entity" ADD CONSTRAINT "FK_50b12581a6b220504928238d8ff" FOREIGN KEY ("musicGenreId") REFERENCES "music_genre_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
