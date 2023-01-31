export type ButtonFactoryColors = Required<
  Pick<
    CXButton.Var,
    | 'activeColor'
    | 'backgroundColor'
    | 'textColor'
    | 'hoverColor'
    | 'outlineColor'
    | 'disabledColor'
    | 'borderColor'
    | 'borderDisabledColor'
    | 'borderWidth'
    | 'textDisabledColor'
    | 'boxShadow'
    | 'textHoverColor'
    | 'textActiveColor'
  >
>;

export type ButtonFactoryHeight = Required<Pick<CXButton.Var, 'height' | 'width'>>;
