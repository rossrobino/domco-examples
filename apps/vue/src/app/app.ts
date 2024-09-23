import App from "./App.vue";
import CounterView from "./views/CounterView.vue";
import HomeView from "./views/HomeView.vue";
import { createSSRApp } from "vue";
import {
	createMemoryHistory,
	createRouter,
	createWebHistory,
} from "vue-router";

export const createApp = async () => {
	const app = createSSRApp(App);

	const router = createRouter({
		history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
		routes: [
			{
				path: "/",
				name: "home",
				component: HomeView,
			},
			{
				path: "/counter",
				name: "counter",
				component: CounterView,
			},
		],
	});

	app.use(router);

	return { app, router };
};
