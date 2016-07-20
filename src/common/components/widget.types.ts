import {Observable} from "rxjs/Rx";
export interface HasProportions{
    width$: Observable<number>;
    height$: Observable<number>;
}