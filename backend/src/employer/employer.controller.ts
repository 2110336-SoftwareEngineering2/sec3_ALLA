import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Employer } from 'src/entities/employer.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  @UseGuards(AuthGuard)
  @Get(':eid')
  findById(@Param('eid', new ParseIntPipe()) eid: number): Promise<Employer> {
    return this.service.findById(eid);
  }
  /*
    @Post()
    create(@Body() dto: Omit<Employer,'eid'> ): Promise<Employer>{
        return this.service.create(dto);
    }

    @Delete(':eid')
    delete(@Param('eid', new ParseIntPipe()) eid: number): Promise<Employer>{
        return this.service.delete(eid);
    }

    @Patch(':eid')
    update(@Param('eid', new ParseIntPipe()) eid: number,
        @Body() dto: Partial<Omit<Employer, 'eid'>> ): Promise<Employer>{
            return this.service.update(eid, dto);
    }
    */
}
