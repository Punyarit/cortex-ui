import { Typography } from './typography';
declare const ELEMENT_NAME = "header-lg";
export declare class HeaderLg extends Typography {
    connectedCallback(): void;
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            [ELEMENT_NAME]: CTypography.Ref;
        }
    }
}
export {};
