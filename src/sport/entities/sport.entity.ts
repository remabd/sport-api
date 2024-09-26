import { Rank } from 'src/rank/entitites/rank.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: '100',
    })
    name: string;

    @OneToMany(() => Rank, (rank) => rank.sport)
    ranks: Rank[];
}
