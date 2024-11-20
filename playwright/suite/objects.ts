import { it, describe, beforeAll, afterAll } from '@jest/globals';
import { Browser, Page, chromium, expect } from '@playwright/test';
import { PlaywrightSuite } from '../types';
import { KubeClient } from '../../API/kube';

export class ObjectDetectionTest implements PlaywrightSuite {
  appTest(name: string, namespace: string) {
    describe('Object detection UI tests', () => {
      let page: Page;
      let browser: Browser;

      beforeAll(async () => {
        const url = await new KubeClient().getComponentUrl(name, namespace);
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto(url);
      });

      afterAll(async () => {
        await browser.close();
      });

      it('context menu works', async () => {
        await page.getByTestId('stMainMenu').click();
        const menu = page.getByTestId('main-menu-list');

        await expect(menu).toBeVisible();
        await expect(menu.getByText('Rerun')).toBeVisible();
        await expect(menu.getByText('Settings')).toBeVisible();
        await expect(menu.getByText('About')).toBeVisible();
      });

      it('speech recognition elements are shown', async () => {
        await expect(page.getByText('Object Detection')).toBeVisible();
        await expect(page.getByTestId('stFileUploaderDropzone')).toBeVisible();
        await expect(page.getByTestId('baseButton-secondary')).toBeEnabled();
      });
    })
  }
}