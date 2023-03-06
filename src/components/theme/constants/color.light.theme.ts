import { css } from 'lit';

export const light = css`
  :host(.light) {
    /* Base */
    --white: var(--base-white);
    --black: var(--base-black);

    /* Gray */
    --gray-25: var(--base-gray-25);
    --gray-50: var(--base-gray-50);
    --gray-100: var(--base-gray-100);
    --gray-200: var(--base-gray-200);
    --gray-300: var(--base-gray-300);
    --gray-400: var(--base-gray-400);
    --gray-500: var(--base-gray-500);
    --gray-600: var(--base-gray-600);
    --gray-700: var(--base-gray-700);
    --gray-800: var(--base-gray-800);
    --gray-900: var(--base-gray-900);

    /* Primary */
    --primary-25: var(--base-primary-25);
    --primary-50: var(--base-primary-50);
    --primary-100: var(--base-primary-100);
    --primary-200: var(--base-primary-200);
    --primary-300: var(--base-primary-300);
    --primary-400: var(--base-primary-400);
    --primary-500: var(--base-primary-500);
    --primary-600: var(--base-primary-600);
    --primary-700: var(--base-primary-700);
    --primary-800: var(--base-primary-800);
    --primary-900: var(--base-primary-900);

    /* Error */
    --error-25: var(--base-error-25);
    --error-50: var(--base-error-50);
    --error-100: var(--base-error-100);
    --error-200: var(--base-error-200);
    --error-300: var(--base-error-300);
    --error-400: var(--base-error-400);
    --error-500: var(--base-error-500);
    --error-600: var(--base-error-600);
    --error-700: var(--base-error-700);
    --error-800: var(--base-error-800);
    --error-900: var(--base-error-900);

    /* Warring */
    --warning-25: var(--base-warning-25);
    --warning-50: var(--base-warning-50);
    --warning-100: var(--base-warning-100);
    --warning-200: var(--base-warning-200);
    --warning-300: var(--base-warning-300);
    --warning-400: var(--base-warning-400);
    --warning-500: var(--base-warning-500);
    --warning-600: var(--base-warning-600);
    --warning-700: var(--base-warning-700);
    --warning-800: var(--base-warning-800);
    --warning-900: var(--base-warning-900);

    /* Success */
    --success-25: var(--base-success-25);
    --success-50: var(--base-success-50);
    --success-100: var(--base-success-100);
    --success-200: var(--base-success-200);
    --success-300: var(--base-success-300);
    --success-400: var(--base-success-400);
    --success-500: var(--base-success-500);
    --success-600: var(--base-success-600);
    --success-700: var(--base-success-700);
    --success-800: var(--base-success-800);
    --success-900: var(--base-success-900);

    /* Moderm Green */
    --modern-green-25: var(--base-modern-green-25);
    --modern-green-50: var(--base-modern-green-50);
    --modern-green-100: var(--base-modern-green-100);
    --modern-green-200: var(--base-modern-green-200);
    --modern-green-300: var(--base-modern-green-300);
    --modern-green-400: var(--base-modern-green-400);
    --modern-green-500: var(--base-modern-green-500);
    --modern-green-600: var(--base-modern-green-600);
    --modern-green-700: var(--base-modern-green-700);
    --modern-green-800: var(--base-modern-green-800);
    --modern-green-900: var(--base-modern-green-900);

    /* Surgeon Green */
    --surgeon-green-25: var(--base-surgeon-green-25);
    --surgeon-green-50: var(--base-surgeon-green-50);
    --surgeon-green-100: var(--base-surgeon-green-100);
    --surgeon-green-200: var(--base-surgeon-green-200);
    --surgeon-green-300: var(--base-surgeon-green-300);
    --surgeon-green-400: var(--base-surgeon-green-400);
    --surgeon-green-500: var(--base-surgeon-green-500);
    --surgeon-green-600: var(--base-surgeon-green-600);
    --surgeon-green-700: var(--base-surgeon-green-700);
    --surgeon-green-800: var(--base-surgeon-green-800);
    --surgeon-green-900: var(--base-surgeon-green-900);

    /* Wellness Green */
    --wellness-green-25: var(--base-wellness-green-25);
    --wellness-green-50: var(--base-wellness-green-50);
    --wellness-green-100: var(--base-wellness-green-100);
    --wellness-green-200: var(--base-wellness-green-200);
    --wellness-green-300: var(--base-wellness-green-300);
    --wellness-green-400: var(--base-wellness-green-400);
    --wellness-green-500: var(--base-wellness-green-500);
    --wellness-green-600: var(--base-wellness-green-600);
    --wellness-green-700: var(--base-wellness-green-700);
    --wellness-green-800: var(--base-wellness-green-800);
    --wellness-green-900: var(--base-wellness-green-900);

    /* Safe blue */
    --safe-blue-25: var(--base-safe-blue-25);
    --safe-blue-50: var(--base-safe-blue-50);
    --safe-blue-100: var(--base-safe-blue-100);
    --safe-blue-200: var(--base-safe-blue-200);
    --safe-blue-300: var(--base-safe-blue-300);
    --safe-blue-400: var(--base-safe-blue-400);
    --safe-blue-500: var(--base-safe-blue-500);
    --safe-blue-600: var(--base-safe-blue-600);
    --safe-blue-700: var(--base-safe-blue-700);
    --safe-blue-800: var(--base-safe-blue-800);
    --safe-blue-900: var(--base-safe-blue-900);

    /* Blueprint */
    --blueprint-25: var(--base-blueprint-25);
    --blueprint-50: var(--base-blueprint-50);
    --blueprint-100: var(--base-blueprint-100);
    --blueprint-200: var(--base-blueprint-200);
    --blueprint-300: var(--base-blueprint-300);
    --blueprint-400: var(--base-blueprint-400);
    --blueprint-500: var(--base-blueprint-500);
    --blueprint-600: var(--base-blueprint-600);
    --blueprint-700: var(--base-blueprint-700);
    --blueprint-800: var(--base-blueprint-800);
    --blueprint-900: var(--base-blueprint-900);

    /* Violet Alert */
    --violet-alert-25: var(--base-violet-alert-25);
    --violet-alert-50: var(--base-violet-alert-50);
    --violet-alert-100: var(--base-violet-alert-100);
    --violet-alert-200: var(--base-violet-alert-200);
    --violet-alert-300: var(--base-violet-alert-300);
    --violet-alert-400: var(--base-violet-alert-400);
    --violet-alert-500: var(--base-violet-alert-500);
    --violet-alert-600: var(--base-violet-alert-600);
    --violet-alert-700: var(--base-violet-alert-700);
    --violet-alert-800: var(--base-violet-alert-800);
    --violet-alert-900: var(--base-violet-alert-900);

    /* Purple */
    --purple-25: var(--base-purple-25);
    --purple-50: var(--base-purple-50);
    --purple-100: var(--base-purple-100);
    --purple-200: var(--base-purple-200);
    --purple-300: var(--base-purple-300);
    --purple-400: var(--base-purple-400);
    --purple-500: var(--base-purple-500);
    --purple-600: var(--base-purple-600);
    --purple-700: var(--base-purple-700);
    --purple-800: var(--base-purple-800);
    --purple-900: var(--base-purple-900);

    /* Pinky */
    --pinky-25: var(--base-pinky-25);
    --pinky-50: var(--base-pinky-50);
    --pinky-100: var(--base-pinky-100);
    --pinky-200: var(--base-pinky-200);
    --pinky-300: var(--base-pinky-300);
    --pinky-400: var(--base-pinky-400);
    --pinky-500: var(--base-pinky-500);
    --pinky-600: var(--base-pinky-600);
    --pinky-700: var(--base-pinky-700);
    --pinky-800: var(--base-pinky-800);
    --pinky-900: var(--base-pinky-900);

    /* Red Flag */
    --red-flag-25: var(--base-red-flag-25);
    --red-flag-50: var(--base-red-flag-50);
    --red-flag-100: var(--base-red-flag-100);
    --red-flag-200: var(--base-red-flag-200);
    --red-flag-300: var(--base-red-flag-300);
    --red-flag-400: var(--base-red-flag-400);
    --red-flag-500: var(--base-red-flag-500);
    --red-flag-600: var(--base-red-flag-600);
    --red-flag-700: var(--base-red-flag-700);
    --red-flag-800: var(--base-red-flag-800);
    --red-flag-900: var(--base-red-flag-900);

    /* Alarm Orange */
    --alarm-orange-25: var(--base-alarm-orange-25);
    --alarm-orange-50: var(--base-alarm-orange-50);
    --alarm-orange-100: var(--base-alarm-orange-100);
    --alarm-orange-200: var(--base-alarm-orange-200);
    --alarm-orange-300: var(--base-alarm-orange-300);
    --alarm-orange-400: var(--base-alarm-orange-400);
    --alarm-orange-500: var(--base-alarm-orange-500);
    --alarm-orange-600: var(--base-alarm-orange-600);
    --alarm-orange-700: var(--base-alarm-orange-700);
    --alarm-orange-800: var(--base-alarm-orange-800);
    --alarm-orange-900: var(--base-alarm-orange-900);

    /* Warning Yellow */
    --warning-yellow-25: var(--base-warning-yellow-25);
    --warning-yellow-50: var(--base-warning-yellow-50);
    --warning-yellow-100: var(--base-warning-yellow-100);
    --warning-yellow-200: var(--base-warning-yellow-200);
    --warning-yellow-300: var(--base-warning-yellow-300);
    --warning-yellow-400: var(--base-warning-yellow-400);
    --warning-yellow-500: var(--base-warning-yellow-500);
    --warning-yellow-600: var(--base-warning-yellow-600);
    --warning-yellow-700: var(--base-warning-yellow-700);
    --warning-yellow-800: var(--base-warning-yellow-800);
    --warning-yellow-900: var(--base-warning-yellow-900);

    /* bluestate */
    --bluestate-25: var(--base-bluestate-25);
    --bluestate-50: var(--base-bluestate-50);
    --bluestate-100: var(--base-bluestate-100);
    --bluestate-200: var(--base-bluestate-200);
    --bluestate-300: var(--base-bluestate-300);
    --bluestate-400: var(--base-bluestate-400);
    --bluestate-500: var(--base-bluestate-500);
    --bluestate-600: var(--base-bluestate-600);
    --bluestate-700: var(--base-bluestate-700);
    --bluestate-800: var(--base-bluestate-800);
    --bluestate-900: var(--base-bluestate-900);

    /* shadow */
    /* Css Variable work only hex code */
    --shadow-25: var(--base-shadow-25); /* 5% */
    --shadow-50: var(--base-shadow-50); /* 10% */
    --shadow-100: var(--base-shadow-100); /* 15% */
    --shadow-200: var(--base-shadow-200); /* 20% */
    --shadow-300: var(--base-shadow-300); /* 25% */
    --shadow-400: var(--base-shadow-400); /* 30% */
    --shadow-500: var(--base-shadow-500); /* 40% */
    --shadow-600: var(--base-shadow-600); /* 50% */
    --shadow-700: var(--base-shadow-700); /* 60% */
    --shadow-800: var(--base-shadow-800); /* 70% */
    --shadow-900: var(--base-shadow-900); /* 80% */
  }
`;
