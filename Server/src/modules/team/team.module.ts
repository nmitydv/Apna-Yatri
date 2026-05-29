import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';

@Module({
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
    imports: [],
})
export class TeamModule {}
