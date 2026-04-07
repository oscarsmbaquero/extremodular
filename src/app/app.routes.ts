import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./features/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "models",
    loadComponent: () =>
      import("./features/catalog/catalog.component").then(
        (m) => m.CatalogComponent,
      ),
  },
  {
    path: "configurator",
    loadComponent: () =>
      import("./features/configurator/configurator.component").then(
        (m) => m.ConfiguratorComponent,
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./features/about/about.component").then((m) => m.AboutComponent),
  },
  {
    path: "custom",
    loadComponent: () =>
      import("./features/custom/custom.component").then(
        (m) => m.CustomComponent,
      ),
  },
  {
    path: "process",
    loadComponent: () =>
      import("./features/process/process.component").then(
        (m) => m.ProcessComponent,
      ),
  },
  {
    path: "contact",
    loadComponent: () =>
      import("./features/contact/contact.component").then(
        (m) => m.ContactComponent,
      ),
  },
  {
    path: "cookies",
    loadComponent: () =>
      import("./shared/cookies/cookies").then(
        (m) => m.Cookies,
      ),
  },
  {
    path: "privacy",
    loadComponent: () =>
      import("./shared/privacy/privacy").then(
        (m) => m.PrivacyComponent,
      ),
  },
  {
    path: "legal",
    loadComponent: () =>
      import("./shared/legal/legal").then(
        (m) => m.Legal,
      ),
  },
  { path: "**", redirectTo: "" },
];
