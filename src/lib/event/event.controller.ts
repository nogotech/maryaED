import { MaryaEDEventStateEnum, type IMREDEvent } from "./event.types";

class MaryaEDEvent<Context extends unknown = unknown> implements IMREDEvent {
  public _state: MaryaEDEventStateEnum = MaryaEDEventStateEnum.UNSUBSCRIBED;
  private _context: Context = null!;
  private _subscribers: VoidFunction[] = [];

  constructor(public readonly name: string, public initialContext: Context) {
    this.emit = this.emit.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this._context = initialContext;
  }

  public isEmited() {
    return this._state === MaryaEDEventStateEnum.EMITTED;
  }

  public getContext() {
    return this._context;
  }

  emit() {
    this._state = MaryaEDEventStateEnum.EMITTED;
    this._subscribers.forEach((cb) => cb());
  }
  subscribe(cb: VoidFunction): void {
    this._subscribers.push(cb);
  }
}

export { MaryaEDEvent };
