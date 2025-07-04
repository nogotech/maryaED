import { MaryaEDEvent } from "lib/event";
import { MaryaED } from "../lib";

class Event {
  static get TemplateUpdateRequested() {
    return new MaryaEDEvent<{ he: number }>("TemplateUpdateRequested", { he: 32 });
  }
}

function init() {
  const instance = MaryaED.init({ name: "my-app" });
  const event = Event.TemplateUpdateRequested;
  const eventTwo = Event.TemplateUpdateRequested;

  instance.defineScenario("scenario-1", (scenario) => {
    scenario
      .when(event)
      .emit(eventTwo)
      .if((ctx) => {
        console.log("hi");
        return ctx.he == 32;
      });

    // setTimeout(event.emit, 5000);
    event.emit();
  });

  instance.defineScenario("scenario-2", (scenario) => {
    scenario.when(eventTwo).if((ctx) => {
      console.log(ctx, 2);
      return true;
    });
  });
}

export { init };
