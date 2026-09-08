declare module "multiple-cucumber-html-reporter" {
  export function generate(options: {
    jsonDir: string;
    reportPath: string;
    metadata: {
      browser: { name: string; version: string };
      device: string;
      platform: { name: string; version: string };
    };
    customData: {
      title: string;
      data: Array<{ label: string; value: string }>;
    };
  }): void;
}