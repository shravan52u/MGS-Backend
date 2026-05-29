import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';
import { CreateRawMaterialDto } from './raw-material.dto';
import { RawMaterialService } from './raw-material.service';

@UseGuards(AuthGuard)
@Controller('raw-material')
export class RawMaterialController {
  constructor(private service: RawMaterialService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.service.getAll(query);
  }

  @Get('grade-size-map')
  getGradeSizeMap() {
    return this.service.getGradeSizeMap();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(Number(id));
  }

  @Post()
  create(@Body() body: CreateRawMaterialDto) {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(Number(id), body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
