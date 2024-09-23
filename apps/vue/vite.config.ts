import vue from "@vitejs/plugin-vue";
import { domco } from "domco";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vue(), domco()],
});
