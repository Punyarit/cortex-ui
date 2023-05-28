import { css } from 'lit';

export const colors = css`
  :host {
    /* Gray */
    --base-gray-25: #fcfcfd;
    --base-gray-50: #f9fafb;
    --base-gray-100: #f2f4f7;
    --base-gray-200: #eaecf0;
    --base-gray-300: #d0d5dd;
    --base-gray-400: #98a2b3;
    --base-gray-500: #667085;
    --base-gray-600: #475467;
    --base-gray-700: #344054;
    --base-gray-800: #1d2939;
    --base-gray-900: #101828;

    /* Primary */
    --base-primary-25: #f5f8ff;
    --base-primary-50: #eff4ff;
    --base-primary-100: #d1e0ff;
    --base-primary-200: #b2ccff;
    --base-primary-300: #84adff;
    --base-primary-400: #528bff;
    --base-primary-500: #2970ff;
    --base-primary-600: #155eef;
    --base-primary-700: #004eeb;
    --base-primary-800: #0040c1;
    --base-primary-900: #00359e;

    /* Error */
    --base-error-25: #fffbfa;
    --base-error-50: #fef3f2;
    --base-error-100: #fee4e2;
    --base-error-200: #fecdca;
    --base-error-300: #fda29b;
    --base-error-400: #f97066;
    --base-error-500: #f04438;
    --base-error-600: #d92d20;
    --base-error-700: #b42318;
    --base-error-800: #912018;
    --base-error-900: #7a271a;

    /* Warring */
    --base-warning-25: #fffcf5;
    --base-warning-50: #fffaeb;
    --base-warning-100: #fef0c7;
    --base-warning-200: #fedf89;
    --base-warning-300: #fec84b;
    --base-warning-400: #fdb022;
    --base-warning-500: #f79009;
    --base-warning-600: #dc6803;
    --base-warning-700: #b54708;
    --base-warning-800: #93370d;
    --base-warning-900: #7a2e0e;

    /* Success */
    --base-success-25: #f6fef9;
    --base-success-50: #ecfdf3;
    --base-success-100: #d1fadf;
    --base-success-200: #a6f4c5;
    --base-success-300: #6ce9a6;
    --base-success-400: #32d583;
    --base-success-500: #12b76a;
    --base-success-600: #039855;
    --base-success-700: #027a48;
    --base-success-800: #05603a;
    --base-success-900: #054f31;

    /* Modern Green */
    --base-modern-green-25: #effffc;
    --base-modern-green-50: #e0fffa;
    --base-modern-green-100: #c7fff5;
    --base-modern-green-200: #92feeb;
    --base-modern-green-300: #5cf7da;
    --base-modern-green-400: #24e6c2;
    --base-modern-green-500: #05cba7;
    --base-modern-green-600: #04a286;
    --base-modern-green-700: #037a64;
    --base-modern-green-800: #025143;
    --base-modern-green-900: #00392f;

    /* Surgeon Green */
    --base-surgeon-green-25: #edfdfd;
    --base-surgeon-green-50: #dffefe;
    --base-surgeon-green-100: #c8ffff;
    --base-surgeon-green-200: #92f8fa;
    --base-surgeon-green-300: #4ef1f4;
    --base-surgeon-green-400: #22d9dd;
    --base-surgeon-green-500: #03baba;
    --base-surgeon-green-600: #019797;
    --base-surgeon-green-700: #056d72;
    --base-surgeon-green-800: #02484c;
    --base-surgeon-green-900: #012426;

    /* Wellness Green */
    --base-wellness-green-25: #ecfcfc;
    --base-wellness-green-50: #dcfbfc;
    --base-wellness-green-100: #c2ffff;
    --base-wellness-green-200: #92f8f8;
    --base-wellness-green-300: #5df1e8;
    --base-wellness-green-400: #53e2e5;
    --base-wellness-green-500: #09c5c9;
    --base-wellness-green-600: #21d5d9;
    --base-wellness-green-700: #19a0a3;
    --base-wellness-green-800: #106b6c;
    --base-wellness-green-900: #083536;

    /* Safe blue */
    --base-safe-blue-25: #eefaff;
    --base-safe-blue-50: #e0f6ff;
    --base-safe-blue-100: #c7eeff;
    --base-safe-blue-200: #8cd9ff;
    --base-safe-blue-300: #54cbff;
    --base-safe-blue-400: #20b9fb;
    --base-safe-blue-500: #0090ce;
    --base-safe-blue-600: #0074a6;
    --base-safe-blue-700: #025b82;
    --base-safe-blue-800: #005174;
    --base-safe-blue-900: #00293a;

    /* Blueprint */
    --base-blueprint-25: #eff2ff;
    --base-blueprint-50: #dee3ff;
    --base-blueprint-100: #c7d0ff;
    --base-blueprint-200: #92a3ff;
    --base-blueprint-300: #5c76ff;
    --base-blueprint-400: #2b49e9;
    --base-blueprint-500: #1c33ac;
    --base-blueprint-600: #051a89;
    --base-blueprint-700: #051465;
    --base-blueprint-800: #0b1445;
    --base-blueprint-900: #060a22;

    /* Violet Alert */
    --base-violet-alert-25: #fcfcfd;
    --base-violet-alert-50: #f9fafb;
    --base-violet-alert-100: #f2f4f7;
    --base-violet-alert-200: #eaecf0;
    --base-violet-alert-300: #d0d5dd;
    --base-violet-alert-400: #98a2b3;
    --base-violet-alert-500: #667085;
    --base-violet-alert-600: #475467;
    --base-violet-alert-700: #344054;
    --base-violet-alert-800: #1d2939;
    --base-violet-alert-900: #101828;

    /* Purple */
    --base-purple-25: #fbefff;
    --base-purple-50: #f7e2ff;
    --base-purple-100: #ebc2fa;
    --base-purple-200: #db90f4;
    --base-purple-300: #d162f7;
    --base-purple-400: #ba46e3;
    --base-purple-500: #8a06b8;
    --base-purple-600: #6a068e;
    --base-purple-700: #4c0565;
    --base-purple-800: #501067;
    --base-purple-900: #280834;

    /* Pinky */
    --base-pinky-25: #ffeef8;
    --base-pinky-50: #ffe0f1;
    --base-pinky-100: #fac0e0;
    --base-pinky-200: #f491c9;
    --base-pinky-300: #f551ae;
    --base-pinky-400: #e33396;
    --base-pinky-500: #ca1079;
    --base-pinky-600: #a4085f;
    --base-pinky-700: #760544;
    --base-pinky-800: #620d3d;
    --base-pinky-900: #31071e;

    /* Red Flag */
    --base-red-flag-25: #fff1f2;
    --base-red-flag-50: #ffe1e3;
    --base-red-flag-100: #fcc1c6;
    --base-red-flag-200: #fc949d;
    --base-red-flag-300: #ff626f;
    --base-red-flag-400: #f33c4b;
    --base-red-flag-500: #d71525;
    --base-red-flag-600: #b10b18;
    --base-red-flag-700: #8a0812;
    --base-red-flag-800: #7c030d;
    --base-red-flag-900: #3e0207;

    /* Alarm Orange */
    --base-alarm-orange-25: #fff4ef;
    --base-alarm-orange-50: #ffeae1;
    --base-alarm-orange-100: #fecfba;
    --base-alarm-orange-200: #ffb594;
    --base-alarm-orange-300: #fd8752;
    --base-alarm-orange-400: #f7773e;
    --base-alarm-orange-500: #ed500a;
    --base-alarm-orange-600: #bc3f07;
    --base-alarm-orange-700: #8e3006;
    --base-alarm-orange-800: #772805;
    --base-alarm-orange-900: #3b1402;

    /* Warning Yellow */
    --base-warning-yellow-25: #fffbef;
    --base-warning-yellow-50: #fff6df;
    --base-warning-yellow-100: #ffebb9;
    --base-warning-yellow-200: #fcdd8a;
    --base-warning-yellow-300: #ffce4e;
    --base-warning-yellow-400: #feba0c;
    --base-warning-yellow-500: #e8a702;
    --base-warning-yellow-600: #c58f05;
    --base-warning-yellow-700: #9d7204;
    --base-warning-yellow-800: #6a4c00;
    --base-warning-yellow-900: #352600;

    /* bluestate */
    --base-bluestate-25: #fdfeff;
    --base-bluestate-50: #f8fafc;
    --base-bluestate-100: #f1f5f9;
    --base-bluestate-200: #e2e8f0;
    --base-bluestate-300: #cbd5e1;
    --base-bluestate-400: #94a3b8;
    --base-bluestate-500: #64748b;
    --base-bluestate-600: #475569;
    --base-bluestate-700: #334155;
    --base-bluestate-800: #1e293b;
    --base-bluestate-900: #0f172a;

    /* shadow */
    /* Css Variable work only hex code */
    --base-shadow-25: #0000000d; /* 5% */
    --base-shadow-50: #0000001a; /* 10% */
    --base-shadow-100: #00000026; /* 15% */
    --base-shadow-200: #00000033; /* 20% */
    --base-shadow-300: #00000040; /* 25% */
    --base-shadow-400: #0000004d; /* 30% */
    --base-shadow-500: #00000066; /* 40% */
    --base-shadow-600: #00000080; /* 50% */
    --base-shadow-700: #00000099; /* 60% */
    --base-shadow-800: #000000b3; /* 70% */
    --base-shadow-900: #000000cc; /* 80% */
  }
`;
