import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class MusicGenreEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    genreName: string

}