import {Action} from "@ngrx/store";
import {Widget} from "../entities/widget.types";
import {KeyperformanceIndexesWidget} from "../../widgets/containers/keyperformance-indexes-widget.container";
import {ADD_WIDGET, REMOVE_WIDGET} from "./actions";
import * as _ from "lodash";
export const rootReducer = {
    widgets: widgetsReducer
}

const defaultWidgets = [
    {
        title: "Hi there",
        id: _.uniqueId(),
        component: KeyperformanceIndexesWidget,
        config: {
            col: 1,
            row: 1,
            sizex: 1,
            sizey: 1
        }
    },
    {
        title: "Hi there",
        id: _.uniqueId(),
        component: KeyperformanceIndexesWidget,
        config: {
            col: 1,
            row: 1,
            sizex: 1,
            sizey: 1
        }
    },
    {
        title: "Hi there",
        id: _.uniqueId(),
        component: KeyperformanceIndexesWidget,
        config: {
            col: 1,
            row: 1,
            sizex: 1,
            sizey: 1
        }
    },
    {
        title: "Hi there",
        id: _.uniqueId(),
        component: KeyperformanceIndexesWidget,
        config: {
            col: 1,
            row: 1,
            sizex: 1,
            sizey: 1
        }
    }
];
function widgetsReducer(state: Array<Widget> = defaultWidgets, action: Action): Array<Widget> {
    let width: number, height: number, id: string, widget: Widget;
    switch (action.type) {
        case ADD_WIDGET:
            ({widget} = action.payload);
            return [...state, widget];
        case REMOVE_WIDGET:
            ({id} = action.payload);
            return state.filter(item => item.id !== id);
        default:
            return state;
    }
}