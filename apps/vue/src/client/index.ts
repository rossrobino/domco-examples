import { createApp } from "@/app/app";

const { app, router } = await createApp();

await router.isReady();

app.mount("#root");

console.log("hydrated");
