import { createPinia } from "pinia";
export * from "./modules/router";
export * from "./modules/settings";
export * from "./modules/tagView";
export * from "./modules/user";

export const pinia = createPinia();
