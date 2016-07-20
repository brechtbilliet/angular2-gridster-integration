import {ApplicationContainer} from "./common/containers/application/application.container.ts";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HashLocationStrategy, LocationStrategy, APP_BASE_HREF} from "@angular/common";
import {HTTP_PROVIDERS} from "@angular/http";
import {provideStore} from "@ngrx/store";
import { useLogMonitor } from "@ngrx/store-log-monitor";
import {instrumentStore} from "@ngrx/store-devtools";
import {rootReducer} from "./common/state/rootReducer";

bootstrap(ApplicationContainer, [
    HTTP_PROVIDERS,
    {provide: APP_BASE_HREF, useValue: "/"},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideStore(rootReducer),
    instrumentStore({
        monitor: useLogMonitor({
            visible: false,
            position: "right"
        })
    }),
]);