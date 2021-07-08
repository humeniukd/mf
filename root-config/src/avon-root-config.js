import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@avon/navbar",
  app: () => System.import("@avon/navbar"),
  activeWhen: "/",
  customProps: {
    avonLink: "https://www.shopwithmyrep.co.uk/",
  },
});

registerApplication({
  name: "@avon/cart",
  app: () => System.import("@avon/cart"),
  activeWhen: "/cart",
});

registerApplication({
  name: "@avon/category",
  app: () => System.import("@avon/category"),
  activeWhen: "/category",
});

start();
