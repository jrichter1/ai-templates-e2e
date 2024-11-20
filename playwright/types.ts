export interface PlaywrightSuite {
  appTest: (name: string, namespace: string) => void;
}