import { Typography } from './typography';
declare const ELEMENT_NAME = "body-sm";
export declare class BodySm extends Typography {
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
