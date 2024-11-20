import { it, describe, beforeAll, afterAll } from '@jest/globals';
import { Browser, Page, chromium, expect } from '@playwright/test';
import { PlaywrightSuite } from '../types';
import { KubeClient } from '../../API/kube';

export class RAGSuite implements PlaywrightSuite {
  appTest(name: string, namespace: string) {
    describe('Chatbot UI tests', () => {
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
        await page.getByTestId('baseButton-headerNoPadding').click();
        const menu = page.getByTestId('main-menu-list');

        await expect(menu).toBeVisible();
        await expect(menu.getByText('Rerun')).toBeVisible();
        await expect(menu.getByText('Settings')).toBeVisible();
        await expect(menu.getByText('About')).toBeVisible();
      });

      it('text prompt works', async () => {
        const textbox = page.getByTestId('stChatInputTextArea');
        const message = page.getByTestId('stChatMessage');
        await expect(message).toHaveCount(1);

        await textbox.fill('hello world python, do not provide any explanation');
        await page.getByTestId('stChatInputSubmitButton').click();

        await expect(message).toHaveCount(3, { timeout: 90000 });
      }, 100000);
    });
  }
}