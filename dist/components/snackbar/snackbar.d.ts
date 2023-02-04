import { TemplateResult } from 'lit';
import { ComponentBase } from '../../base/component-base/component.base';
import '../icon/icon';
import { IconSrcTypes } from '../icon/types/icon.types';
import '../transition/transition';
import { WhenTypes } from '../transition/types/transition.types';
export declare const tagName = "cx-snackbar";
export declare class Snackbar extends ComponentBase<CXSnackbar.Props> {
    config: CXSnackbar.Set;
    static styles: import("lit").CSSResult;
    constructor();
    private transitionRef;
    render(): TemplateResult | undefined;
    connectedCallback(): void;
    private createSharedCxSnackbarRef;
    private renderIcon;
    private setSlotName;
    setSnackbarAppear(): void;
    executeTransition(when: WhenTypes): void;
}
declare global {
    namespace CXSnackbar {
        type Ref = Snackbar;
        type Var = unknown;
        type Set = {
            text: string;
            iconSrc?: IconSrcTypes;
            duration?: number;
            color?: 'primary' | 'secondary';
            transition?: CXTransition.Set;
        };
        type Fix = Required<{
            [K in keyof Set]: (value: Set[K]) => Fix;
        }> & {
            exec: () => Ref;
        };
        type Props = {
            var: Pick<Var, never>;
            set: Set;
            fix: Fix;
        };
    }
    interface HTMLElementTagNameMap {
        [tagName]: CXSnackbar.Ref;
    }
}
