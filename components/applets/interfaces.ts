// interfaces.ts

export interface Event {
    type: string;
    payload: any;
}

export interface Action {
    execute(payload: any): void;
}