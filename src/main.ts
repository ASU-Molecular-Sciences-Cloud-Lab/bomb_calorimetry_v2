import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

// Plugins
import { registerPlugins } from "./plugins";

const app = createApp(App);
registerPlugins(app);
app.use(store);
app.mount("#app");
