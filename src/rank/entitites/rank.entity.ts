import { Sport } from 'src/sport/entities/sport.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rank {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: '100',
    })
    name: string;

    @Column({
        type: 'int',
    })
    position: number;

    @ManyToOne(() => Sport, (sport) => sport.ranks)
    sport: Sport;
}
