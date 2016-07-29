import {
    Component,
    Input,
    ViewContainerRef,
    ViewChild,
    ComponentResolver,
    ComponentFactory,
    ComponentRef,
    AfterViewInit,
    OnDestroy,
    EventEmitter,
    Output,
    ChangeDetectionStrategy, ChangeDetectorRef
} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import {NgGridItem, NgGridItemEvent} from "angular2-grid/dist/main";
import {WidgetConfig} from "../entities/widget.types";
import {Subject} from "rxjs/Rx";
import {HasProportions} from "./widget.types";
@Component({
    selector: "widget",
    directives: [NgGridItem],
    changeDetection: ChangeDetectionStrategy.Default,
    template: `
<div class="box" [(ngGridItem)]="config" (onChange)="ngGridItemChange$.next($event)" 
    (onChangeStop)="ngGridItemChange$.next($event)" (onItemChange)="ngGridItemChange$.next($event)">
    <div class="box-header">
        <h3>{{title}}</h3>
        <div class="box-header-btns pull-right">
            <a href="javascript:void(0)" ><i class="fa fa-question"></i></a>
            <a href="javascript:void(0)"><i class="fa fa-cog"></i></a>
            <a href="javascript:void(0)" (click)="onRemove()"><i class="fa fa-trash-o"></i></a>
        </div>
    </div>
    <div class="box-content">
        <div #target></div>
    </div>
    
</div>

`
})
export class WidgetComponent implements AfterViewInit, OnDestroy {
    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() title: string;
    @Input() config: WidgetConfig;
    @Input() component: any;
    @Output() remove = new EventEmitter<any>();

    headerHeight = 40;
    ngGridItemChange$ = new Subject();
    width$ = this.ngGridItemChange$.map((event: NgGridItemEvent) => event.width).startWith(0);
    height$ = this.ngGridItemChange$.map((event: NgGridItemEvent) => event.height - this.headerHeight).startWith(0);

    cmpRef: ComponentRef<any>;

    constructor(private resolver: ComponentResolver, private ref: ChangeDetectorRef) {
        this.ref.detach();
    }

    onRemove(): void {
        this.remove.emit(null);
    }

    ngAfterViewInit(): void {
        this.resolver.resolveComponent(this.component).then((factory: ComponentFactory<HasProportions>) => {
            this.cmpRef = this.target.createComponent(factory);
            this.cmpRef.instance.width$ = this.width$;
            this.cmpRef.instance.height$ = this.height$;
            this.ref.reattach();
            this.ref.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
