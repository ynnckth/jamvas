import { Controller, Get } from '@nestjs/common';
import { applicationVersion, AppVersion } from './appVersion';

@Controller()
export class AppController {
  @Get('version')
  getApplicationVersion(): AppVersion {
    return applicationVersion;
  }
}
