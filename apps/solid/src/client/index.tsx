/* @refresh reload */
import App from "@/app/App";
import { hydrate } from "solid-js/web";

hydrate(() => <App />, document.querySelector("#root")!);
