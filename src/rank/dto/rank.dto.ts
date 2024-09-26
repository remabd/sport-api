import { SportDto } from 'src/sport/dto/sport.dto';

export class RankDto {
    id: string;
    name: string;
    position: number;
    sport: SportDto;
}
