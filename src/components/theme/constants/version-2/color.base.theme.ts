import { css } from 'lit';

export const colors = css`
  :host {
    /* Base */
    --base-white: #ffffff;
    --base-black: #000000;

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

    /* Moderm Green */
    --base-modern-green-25: #fcfcfd;
    --base-modern-green-50: #f9fafb;
    --base-modern-green-100: #f2f4f7;
    --base-modern-green-200: #eaecf0;
    --base-modern-green-300: #d0d5dd;
    --base-modern-green-400: #98a2b3;
    --base-modern-green-500: #667085;
    --base-modern-green-600: #475467;
    --base-modern-green-700: #344054;
    --base-modern-green-800: #1d2939;
    --base-modern-green-900: #101828;

    /* Surgeon Green */
    --base-surgeon-green-25: #fcfcfd;
    --base-surgeon-green-50: #f9fafb;
    --base-surgeon-green-100: #f2f4f7;
    --base-surgeon-green-200: #eaecf0;
    --base-surgeon-green-300: #d0d5dd;
    --base-surgeon-green-400: #98a2b3;
    --base-surgeon-green-500: #667085;
    --base-surgeon-green-600: #475467;
    --base-surgeon-green-700: #344054;
    --base-surgeon-green-800: #1d2939;
    --base-surgeon-green-900: #101828;

    /* Wellness Green */
    --base-wellness-green-25: #fcfcfd;
    --base-wellness-green-50: #f9fafb;
    --base-wellness-green-100: #f2f4f7;
    --base-wellness-green-200: #eaecf0;
    --base-wellness-green-300: #d0d5dd;
    --base-wellness-green-400: #98a2b3;
    --base-wellness-green-500: #667085;
    --base-wellness-green-600: #475467;
    --base-wellness-green-700: #344054;
    --base-wellness-green-800: #1d2939;
    --base-wellness-green-900: #101828;

    /* Safe blue */
    --base-safe-blue-25: #fcfcfd;
    --base-safe-blue-50: #f9fafb;
    --base-safe-blue-100: #f2f4f7;
    --base-safe-blue-200: #eaecf0;
    --base-safe-blue-300: #d0d5dd;
    --base-safe-blue-400: #98a2b3;
    --base-safe-blue-500: #667085;
    --base-safe-blue-600: #475467;
    --base-safe-blue-700: #344054;
    --base-safe-blue-800: #1d2939;
    --base-safe-blue-900: #101828;

    /* Blueprint */
    --base-blueprint-25: #fcfcfd;
    --base-blueprint-50: #f9fafb;
    --base-blueprint-100: #f2f4f7;
    --base-blueprint-200: #eaecf0;
    --base-blueprint-300: #d0d5dd;
    --base-blueprint-400: #98a2b3;
    --base-blueprint-500: #667085;
    --base-blueprint-600: #475467;
    --base-blueprint-700: #344054;
    --base-blueprint-800: #1d2939;
    --base-blueprint-900: #101828;

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
    --base-purple-25: #fcfcfd;
    --base-purple-50: #f9fafb;
    --base-purple-100: #f2f4f7;
    --base-purple-200: #eaecf0;
    --base-purple-300: #d0d5dd;
    --base-purple-400: #98a2b3;
    --base-purple-500: #667085;
    --base-purple-600: #475467;
    --base-purple-700: #344054;
    --base-purple-800: #1d2939;
    --base-purple-900: #101828;

    /* Pinky */
    --base-pinky-25: #fcfcfd;
    --base-pinky-50: #f9fafb;
    --base-pinky-100: #f2f4f7;
    --base-pinky-200: #eaecf0;
    --base-pinky-300: #d0d5dd;
    --base-pinky-400: #98a2b3;
    --base-pinky-500: #667085;
    --base-pinky-600: #475467;
    --base-pinky-700: #344054;
    --base-pinky-800: #1d2939;
    --base-pinky-900: #101828;

    /* Red Flag */
    --base-red-flag-25: #fcfcfd;
    --base-red-flag-50: #f9fafb;
    --base-red-flag-100: #f2f4f7;
    --base-red-flag-200: #eaecf0;
    --base-red-flag-300: #d0d5dd;
    --base-red-flag-400: #98a2b3;
    --base-red-flag-500: #667085;
    --base-red-flag-600: #475467;
    --base-red-flag-700: #344054;
    --base-red-flag-800: #1d2939;
    --base-red-flag-900: #101828;

    /* Alarm Orange */
    --base-alarm-orange-25: #fcfcfd;
    --base-alarm-orange-50: #f9fafb;
    --base-alarm-orange-100: #f2f4f7;
    --base-alarm-orange-200: #eaecf0;
    --base-alarm-orange-300: #d0d5dd;
    --base-alarm-orange-400: #98a2b3;
    --base-alarm-orange-500: #667085;
    --base-alarm-orange-600: #475467;
    --base-alarm-orange-700: #344054;
    --base-alarm-orange-800: #1d2939;
    --base-alarm-orange-900: #101828;

    /* Warning Yellow */
    --base-warning-yellow-25: #fcfcfd;
    --base-warning-yellow-50: #f9fafb;
    --base-warning-yellow-100: #f2f4f7;
    --base-warning-yellow-200: #eaecf0;
    --base-warning-yellow-300: #d0d5dd;
    --base-warning-yellow-400: #98a2b3;
    --base-warning-yellow-500: #667085;
    --base-warning-yellow-600: #475467;
    --base-warning-yellow-700: #344054;
    --base-warning-yellow-800: #1d2939;
    --base-warning-yellow-900: #101828;

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
