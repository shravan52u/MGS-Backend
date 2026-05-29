import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/auth.guard';
import { InventoryService } from './inventory.service';

@UseGuards(AuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private service: InventoryService) {}

  @Get()
  getAll(@Query() query: any) {
    return this.service.getAll(query);
  }
}
