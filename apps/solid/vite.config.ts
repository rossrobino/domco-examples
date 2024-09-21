import { defineConfig } from "vite";
import { domco } from "domco";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [solid({ ssr: true }), domco()],
});
