export interface Applet {
    id: string;
    name: string;
    description: string;
    trigger(event: any): void;
    action(payload: any): void;
}