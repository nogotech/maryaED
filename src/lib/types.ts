import type { NSMaryaEDScenario } from "./scenario";

interface InitializationOptions {
  name: string;
}

type TDefineScenarioOptions<Context> = [
  name: string,
  callback: (scenario: NSMaryaEDScenario.IMREDScenario<Context>) => void,
];

export type { InitializationOptions, TDefineScenarioOptions };
