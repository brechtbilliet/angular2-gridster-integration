import {Component, Input, ChangeDetectorRef} from "@angular/core";
import {HasProportions} from "../../common/components/widget.types";
import {Observable} from "rxjs/Rx";
@Component({
    template: `keyperformance-indexes2 proportions: {{width$|async}} {{height$|async}}`,
    selector: "keyperformance-indexes2-widget",
})
export class KeyperformanceIndexes2Widget implements HasProportions{
    @Input() width$: Observable<number>;
    @Input() height$: Observable<number>;

    constructor(private ref: ChangeDetectorRef){

    }
}