import { MaryaEDEvent } from "lib/event";
import type { NSMaryaEDScenario } from "./scenario.types";

class MaryaEDScenario<Context> implements NSMaryaEDScenario.IMREDScenario<Context> {
  private _context: Context = null!;
  private readonly _whens: MaryaEDEvent<Context>[] = [];
  private readonly _emits: MaryaEDEvent<Context>[] = [];
  private readonly _thens: Array<NSMaryaEDScenario.TThenAction<Context>> = [];
  private readonly _catches: Array<NSMaryaEDScenario.TCatchAction<Context>> = [];

  constructor(public readonly name: string) {}

  when<C>(event: MaryaEDEvent<C>): MaryaEDScenario<C> {
    const next = new MaryaEDScenario<C>(this.name);
    next._whens.push(event);

    return Object.assign(this, next);
  }

  if(condition: NSMaryaEDScenario.TIfCondition<Context>) {
    this._whens.forEach((event) => {
      const context = event.getContext();

      const run = () => {
        try {
          const isTrust = condition(context);

          if (isTrust) {
            this._thens.forEach((then) => then(context));
            this._emits.forEach((emit) => emit.emit());
          } else {
            this._catches.forEach((cb) => cb(context));
          }
        } catch (err) {
          this._catches.forEach((cb) => cb(context));
        }
      };

      if (event.isEmited()) {
        run();
      } else {
        event.subscribe(run);
      }
    });

    return this;
  }

  then(cb: NSMaryaEDScenario.TThenAction<Context>) {
    this._thens.push(cb);
    return this;
  }

  catch(cb: NSMaryaEDScenario.TCatchAction<Context>) {
    this._catches.push(cb);
    return this;
  }

  emit(event: MaryaEDEvent<Context>) {
    this._whens.length &&
      this._whens.forEach((whenEvent) => whenEvent.subscribe(() => event.emit()));

    return this;
  }
}

export { MaryaEDScenario };
