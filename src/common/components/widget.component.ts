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
    Output, ChangeDetectionStrategy, ElementRef
} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import {NgGridItem, NgGridItemEvent} from "angular2-grid/dist/main";
import {WidgetConfig} from "../entities/widget.types";
import {Subject} from "rxjs/Rx";
@Component({
    selector: "widget",
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [NgGridItem],
    template: `
<div [(ngGridItem)]="config" (onChange)="ngGridItemChange$.next($event)" (onChangeStop)="ngGridItemChange$.next($event)" (onItemChange)="ngGridItemChange$.next($event)">
    <div class="title">{{title}}</div>
    <button class="btn btn-danger" (click)="onRemove()"><i class="fa fa-trash-o"></i></button>
    <button class="btn btn-default"><i class="fa fa-cog"></i></button>
    width: {{width$|async}}, height: {{height$|async}}
    <div #target></div>
</div>

`
})
export class WidgetComponent implements AfterViewInit, OnDestroy {
    @ViewChild('target', {read: ViewContainerRef}) target;
    @Input() title: string;
    @Input() config: WidgetConfig;
    @Input() component: any;
    @Output() remove = new EventEmitter<any>();

    ngGridItemChange$ = new Subject();
    width$ = this.ngGridItemChange$.map((event: NgGridItemEvent) => event.width);
    height$ = this.ngGridItemChange$.map((event: NgGridItemEvent) => event.height);

    cmpRef: ComponentRef<any>;

    constructor(private resolver: ComponentResolver, private elementRef: ElementRef) {
    }

    onRemove(): void {
        this.remove.emit(null);
    }

    ngAfterViewInit(): void {
        this.resolver.resolveComponent(this.component).then((factory: ComponentFactory<any>) => {
            this.cmpRef = this.target.createComponent(factory);
            console.log(this.elementRef.nativeElement.clientWidth);
        });
    }

    ngOnDestroy(): void {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
