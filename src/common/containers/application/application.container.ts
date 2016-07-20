import {Title} from "@angular/platform-browser";
import {Component, ViewEncapsulation} from "@angular/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import {NgGridItem, NgGrid} from "angular2-grid/dist/main";
@Component({
    selector: "application",
    providers: [Title],
    directives: [NgGrid, NgGridItem],
    styles: [require("./application.container.scss")],
    encapsulation: ViewEncapsulation.None,
    template: `
<div [ngGrid]="{'resizeable': false, 'margins': [5, 10]}">
    <div *ngFor="let box of boxes" [(ngGridItem)]="box.config">
        <div class="title">{{box.title}}</div>
        <p>{{box.text}}</p>
    </div>
</div>
    `
})
export class Application {
    boxes = [
        {
            title: "Hi there",
            text: "just some text",
            config: {
                sizex: 2,
                sizey: 1
            }
        },
        {
            title: "Hi there",
            text: "just some text",
            config: {
                sizex: 2,
                sizey: 2
            }
        },
        {
            title: "Hi there",
            text: "just some text",
            config: {
                sizex: 1,
                sizey: 1
            }
        },
        {
            title: "Hi there",
            text: "just some text",
            config: {
                sizex: 2,
                sizey: 1
            }
        }
    ];
    constructor(private title: Title) {
        this.title.setTitle("Angular 2 poc application");
    }
}
