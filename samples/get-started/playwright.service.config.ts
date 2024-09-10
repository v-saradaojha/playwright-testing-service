import { defineConfig } from '@playwright/test';
import { getServiceConfig, ServiceOS } from '@azure/microsoft-playwright-testing';
import config from './playwright.config';
import dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
dotenv.config();
/* Learn more about service configuration at https://aka.ms/mpt/config */

process.env.PLAYWRIGHT_SERVICE_ACCESS_TOKEN = ${ { secrets.PLAYWRIGHT_SERVICE_ACCESS_TOKEN } };
process.env.PLAYWRIGHT_SERVICE_URL = ${ { secrets.PLAYWRIGHT_SERVICE_URL } };
process.env.PLAYWRIGHT_SERVICE_RUN_ID = ${ { github.run_id } } -${ { github.run_attempt } } -${ { github.sha } };
export default defineConfig(
  config,
  getServiceConfig(config, {
    serviceAuthType: 'ACCESS_TOKEN',
    runId: uuid(),
    exposeNetwork: '<loopback>',
    timeout: 30000,
    os: ServiceOS.LINUX,
  }),
  {
    /* 
    Playwright Testing service reporter is added by default.
    This will override any reporter options specified in the base playwright config.
    If you are using more reporters, please update your configuration accordingly.
    */
    reporter: [['list'], ['@azure/microsoft-playwright-testing/reporter']],
  }
);
