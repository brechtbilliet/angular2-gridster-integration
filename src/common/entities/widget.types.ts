export interface Widget {
    id: string;
    title: string,
    component: any,
    config: WidgetConfig,
}
export interface WidgetConfig {
    sizex: number,
    sizey: number
}