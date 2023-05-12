import { Controller, Get } from '@nestjs/common';
import { applicationVersion } from './appVersion';

@Controller()
export class AppController {
  @Get('version')
  getApplicationVersion(): { buildVersion: string; commitHash: string } {
    return applicationVersion;
  }
}
