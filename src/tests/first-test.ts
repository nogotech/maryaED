import { IMREDEvent } from "lib/types";
import { MaryaED } from "../lib";

class TemplateUpdateRequested implements IMREDEvent {
  constructor(public readonly name: string) {}
  when() {
    return Promise.resolve();
  }
}

class Event {
  static get TemplateUpdateRequested() {
    return new TemplateUpdateRequested("TemplateUpdateRequested");
  }
}

function init() {
  const instance = MaryaED.init({ name: "my-app" });

  instance.defineScenario("scenario-1", (scenario) => {
    scenario.when(Event.TemplateUpdateRequested);
  });
}

export { init };
