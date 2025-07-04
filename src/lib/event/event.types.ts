enum MaryaEDEventStateEnum {
  PENDING = "PENDING",
  EMITTED = "EMITTED",
  SUBSCRIBED = "SUBSCRIBED",
  UNSUBSCRIBED = "UNSUBSCRIBED",
}

interface IMREDEvent {
  name: string;
  emit(): void;
  subscribe(cb: VoidFunction): void;
}

export { type IMREDEvent, MaryaEDEventStateEnum };
