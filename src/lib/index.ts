import { InitializationOptions, TDefineScenarioOptions } from "./types";

class MaryaED {
  private constructor(private readonly _options: InitializationOptions) {}

  static init(options: InitializationOptions) {
    return new MaryaED(options);
  }

  public defineScenario(...args: TDefineScenarioOptions) {
    const [scenarioName, runScenario] = args;

    runScenario({
      when(event) {
        console.log(event.name);
        return Promise.resolve();
      },
    });
  }
}

export { MaryaED };
