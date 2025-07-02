# 🧠 MaryaED — декларативный фреймворк для событийно-ориентированных сценариев

**MaryaED** — это TypeScript-фреймворк, вдохновлённый Event-Driven архитектурой, который позволяет описывать бизнес-логику вашего приложения декларативно, семантично и модульно.

---

## 🚀 Миссия

Современные приложения становятся всё более сложными, а сценарии — всё более запутанными. MaryaED стремится упростить реализацию бизнес-логики, позволяя разработчикам описывать поведение системы как цепочку событий и действий, без лишнего "клеевого" кода.

---

## ✨ Пример: как выглядит сценарий

```ts
defineScenario("Актуализация шаблона", scenario => {
  scenario
    .when(Event.TemplateUpdateRequested)
    .if(ctx => ctx.template.hasChanges || ctx.template.hasRequiredParams)
    .then(callApi("updateTemplate", ctx => ({
      id: ctx.template.id,
      params: ctx.template.params
    })))
    .then(storeResult("updatedTemplate"))
    .then(callApi("fetchTemplateVersion", ctx => ({
      id: ctx.updatedTemplate.id
    })))
    .then(storeResult("newVersion"))
    .emit(Event.TemplateUpdated);
});
