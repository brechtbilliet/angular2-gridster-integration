import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import {NgGridItem, NgGrid} from "angular2-grid/dist/main";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../../state/ApplicationState";
import {ADD_WIDGET, REMOVE_WIDGET} from "../../state/actions";
import {KeyperformanceIndexesWidget} from "../../../widgets/containers/keyperformance-indexes-widget.container";
import {WidgetComponent} from "../../components/widget.component";
import {Widget} from "../../entities/widget.types";
import {StoreLogMonitorComponent} from "@ngrx/store-log-monitor";
import "rxjs/add/operator/map";
import any = jasmine.any;
@Component({
    selector: "application",
    providers: [Title],
    directives: [StoreLogMonitorComponent, NgGrid, NgGridItem, WidgetComponent],
    styles: [require("./application.container.scss")],
    encapsulation: ViewEncapsulation.None,
    template: `
<button class="btn btn-primary" (click)="onAdd()"><i class="fa fa-plus-circle"></i></button>
<div [ngGrid]="{'resizeable': true, 'auto-resize': true, 'margins': [5, 10]}">
    <div *ngFor="let widget of widgets$|async; trackBy tracker">
        <widget [title]="widget.title" [config]="widget.config" [component]="widget.component" (remove)="onRemove(widget)"></widget>
    </div>
</div>
<ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>

    `
})
export class ApplicationContainer {
    widgets$ = this.store.select(state => state.widgets);

    constructor(private title: Title, private store: Store<ApplicationState>) {
        this.title.setTitle("Angular 2 poc application");
    }

    tracker(index: number, widget: Widget): any {
        return widget.id;
    }

    onAdd(): void {
        this.store.dispatch({
            type: ADD_WIDGET, payload: {
                widget: {
                    title: "new widget",
                    component: KeyperformanceIndexesWidget,
                    config: {
                        sizex: 1,
                        sizey: 1
                    }
                }
            }
        })
    }

    onRemove(widget: Widget): void {
        this.store.dispatch({
            type: REMOVE_WIDGET,
            payload: {id: widget.id}
        })
    }

}
