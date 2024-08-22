/* eslint-disable no-unused-vars */

declare type Applet = {
    id: number;
    name: string;
    active: boolean;
    trigger: string;
    action: string;
    condition?: string;
};

declare type HeaderProps = {
    children: React.ReactNode;
    className?: string;
};
