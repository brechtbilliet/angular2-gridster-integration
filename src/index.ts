import {Application} from "./common/containers/application/application.container.ts";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HashLocationStrategy, LocationStrategy, APP_BASE_HREF} from "@angular/common";
import {HTTP_PROVIDERS} from "@angular/http";

bootstrap(Application, [
    HTTP_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
]);