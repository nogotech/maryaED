import { MaryaEDScenario } from "./scenario";
import type { InitializationOptions, TDefineScenarioOptions } from "./types";

class MaryaED {
  private constructor(private readonly _options: InitializationOptions) {
    Object.assign(this, this._options);
  }

  static init(options: InitializationOptions) {
    return new MaryaED(options);
  }

  public defineScenario<Context>(...args: TDefineScenarioOptions<Context>) {
    const [scenarioName, runScenario] = args;

    runScenario(new MaryaEDScenario<Context>(scenarioName));
  }
}

export { MaryaED };
