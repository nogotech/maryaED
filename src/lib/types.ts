interface InitializationOptions {
  name: string;
}

interface IMREDEvent {
  name: string;
}

interface IMREDScenario {
  when(event: IMREDEvent): Promise<void>;
}

type TDefineScenarioOptions = [
  name: string,
  callback: (scenario: IMREDScenario) => void
];

export type { InitializationOptions, TDefineScenarioOptions, IMREDEvent };
