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
import * as _ from "lodash";
import {KeyperformanceIndexes2Widget} from "../../../widgets/containers/keyperformance-indexes2-widget.container";

export const widgetTypes = {
    keyPerformanceIndexes: KeyperformanceIndexesWidget,
    keyPerformanceIndexes2: KeyperformanceIndexes2Widget
}
@Component({
    selector: "application",
    providers: [Title],
    directives: [StoreLogMonitorComponent, NgGrid, NgGridItem, WidgetComponent],
    styles: [require("./application.container.scss")],
    encapsulation: ViewEncapsulation.None,
    template: `
<button class="btn btn-primary" (click)="onAdd('keyPerformanceIndexes')"><i class="fa fa-plus-circle"></i> Add type 1</button>
<button class="btn btn-primary" (click)="onAdd('keyPerformanceIndexes2')"><i class="fa fa-plus-circle"></i> Add type 2</button>
<div [ngGrid]="gridConfig">
    <div *ngFor="let widget of widgets$|async; trackBy tracker">
        <widget [title]="widget.title" [config]="widget.config" [component]="widget.component" (remove)="onRemove(widget)"></widget>
    </div>
</div>
<ngrx-store-log-monitor toggleCommand="ctrl-t" positionCommand="ctrl-m"></ngrx-store-log-monitor>

    `
})
export class ApplicationContainer {
    widgets$ = this.store.select(state => state.widgets);
    gridConfig = {
    'margins': [5],
    'draggable': true,
    'resizable': true,
    // 'max_cols': 0,
    // 'max_rows': 0,
    // 'visible_cols': 0,
    // 'visible_rows': 0,
    // 'min_cols': 1,
    // 'min_rows': 1,
    // 'col_width': 2,
    // 'row_height': 2,
    'cascade': 'up',
    'min_width': 50,
    'min_height': 50,
    'fix_to_grid': false,
    'auto_style': true,
    'auto_resize': false,
    'maintain_ratio': false,
    'prefer_new': false,
    'zoom_on_drag': false,
    'limit_to_screen': true
};
    constructor(private title: Title, private store: Store<ApplicationState>) {
        this.title.setTitle("Angular 2 poc application");
    }

    tracker(index: number, widget: Widget): any {
        return widget.id;
    }

    onAdd(type: string): void {
        this.store.dispatch({
            type: ADD_WIDGET, payload: {
                widget: {
                    title: type,
                    id: _.uniqueId(),
                    component: widgetTypes[type],
                    config: {
                        col: 1,
                        row: 1,
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
