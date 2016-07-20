import {Component} from "@angular/core";
import {HasProportions} from "../../common/components/widget.types";
import {Observable} from "rxjs/Rx";
@Component({
    template: `this is a test with proportions: {{width$|async}} {{height$|async}}`,
    selector: "keyperformance-indexes-widget",
})
export class KeyperformanceIndexesWidget implements HasProportions{
    width$: Observable<number>;
    height$: Observable<number>;

}