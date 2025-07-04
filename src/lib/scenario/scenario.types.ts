import type { MaryaEDEvent } from "lib/event";

export namespace NSMaryaEDScenario {
  export type TIfCondition<Context> = (ctx: Context) => boolean;
  export type TThenAction<Context> = (ctx: Context) => Promise<void> | void;
  export type TCatchAction<Context> = (ctx: Context) => Promise<void> | void;

  export interface IMREDScenario<Context> {
    when<C>(event: MaryaEDEvent<C>): IMREDScenario<C>;
    if(condition: TIfCondition<Context>): IMREDScenario<Context>;
    emit(event: MaryaEDEvent<Context>): IMREDScenario<Context>;
    // TODO: сделать возможным передачу целиком объекта сценария для изменения контекста и т.п., а также подумать над тем, что можно работать с ассинхронными колбэками
    then: (cb: TThenAction<Context>) => IMREDScenario<Context>;
    // TODO: сделать возможным передачу целиком объекта сценария для изменения контекста и т.п., а также подумать над тем, что можно работать с ассинхронными колбэками
    catch: (cb: TCatchAction<Context>) => IMREDScenario<Context>;
  }
}
