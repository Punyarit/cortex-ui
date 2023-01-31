import { css } from 'lit';

export const dark = css`
  :host(.dark) {
    /* Base */
    --white: var(--base-black);
    --black: var(--base-white);

    /* Gray */
    --gray-25: var(--base-bluestate-900);
    --gray-50: var(--base-bluestate-800);
    --gray-100: var(--base-bluestate-700);
    --gray-200: var(--base-bluestate-600);
    --gray-300: var(--base-bluestate-500);
    --gray-400: var(--base-bluestate-400);
    --gray-500: var(--base-bluestate-300);
    --gray-600: var(--base-bluestate-200);
    --gray-700: var(--base-bluestate-100);
    --gray-800: var(--base-bluestate-50);
    --gray-900: var(--base-bluestate-25);

    /* Primary */
    --primary-25: var(--base-bluestate-900);
    --primary-50: var(--base-bluestate-800);
    --primary-100: var(--base-bluestate-700);
    --primary-200: var(--base-bluestate-600);
    --primary-300: var(--base-bluestate-500);
    --primary-400: var(--base-bluestate-400);
    --primary-500: var(--base-bluestate-300);
    --primary-600: var(--base-bluestate-200);
    --primary-700: var(--base-bluestate-100);
    --primary-800: var(--base-bluestate-50);
    --primary-900: var(--base-bluestate-25);

    /* Error */
    --error-25: var(--base-bluestate-900);
    --error-50: var(--base-bluestate-800);
    --error-100: var(--base-bluestate-700);
    --error-200: var(--base-bluestate-600);
    --error-300: var(--base-bluestate-500);
    --error-400: var(--base-bluestate-400);
    --error-500: var(--base-bluestate-300);
    --error-600: var(--base-bluestate-200);
    --error-700: var(--base-bluestate-100);
    --error-800: var(--base-bluestate-50);
    --error-900: var(--base-bluestate-25);

    /* Warring */
    --warning-25: var(--base-bluestate-900);
    --warning-50: var(--base-bluestate-800);
    --warning-100: var(--base-bluestate-700);
    --warning-200: var(--base-bluestate-600);
    --warning-300: var(--base-bluestate-500);
    --warning-400: var(--base-bluestate-400);
    --warning-500: var(--base-bluestate-300);
    --warning-600: var(--base-bluestate-200);
    --warning-700: var(--base-bluestate-100);
    --warning-800: var(--base-bluestate-50);
    --warning-900: var(--base-bluestate-25);

    /* Success */
    --success-25: var(--base-bluestate-900);
    --success-50: var(--base-bluestate-800);
    --success-100: var(--base-bluestate-700);
    --success-200: var(--base-bluestate-600);
    --success-300: var(--base-bluestate-500);
    --success-400: var(--base-bluestate-400);
    --success-500: var(--base-bluestate-300);
    --success-600: var(--base-bluestate-200);
    --success-700: var(--base-bluestate-100);
    --success-800: var(--base-bluestate-50);
    --success-900: var(--base-bluestate-25);

    /* Moderm Green */
    --modern-green-25: var(--base-bluestate-900);
    --modern-green-50: var(--base-bluestate-800);
    --modern-green-100: var(--base-bluestate-700);
    --modern-green-200: var(--base-bluestate-600);
    --modern-green-300: var(--base-bluestate-500);
    --modern-green-400: var(--base-bluestate-400);
    --modern-green-500: var(--base-bluestate-300);
    --modern-green-600: var(--base-bluestate-200);
    --modern-green-700: var(--base-bluestate-100);
    --modern-green-800: var(--base-bluestate-50);
    --modern-green-900: var(--base-bluestate-25);

    /* Surgeon Green */
    --surgeon-green-25: var(--base-bluestate-900);
    --surgeon-green-50: var(--base-bluestate-800);
    --surgeon-green-100: var(--base-bluestate-700);
    --surgeon-green-200: var(--base-bluestate-600);
    --surgeon-green-300: var(--base-bluestate-500);
    --surgeon-green-400: var(--base-bluestate-400);
    --surgeon-green-500: var(--base-bluestate-300);
    --surgeon-green-600: var(--base-bluestate-200);
    --surgeon-green-700: var(--base-bluestate-100);
    --surgeon-green-800: var(--base-bluestate-50);
    --surgeon-green-900: var(--base-bluestate-25);

    /* Wellness Green */
    --wellness-green-25: var(--base-bluestate-900);
    --wellness-green-50: var(--base-bluestate-800);
    --wellness-green-100: var(--base-bluestate-700);
    --wellness-green-200: var(--base-bluestate-600);
    --wellness-green-300: var(--base-bluestate-500);
    --wellness-green-400: var(--base-bluestate-400);
    --wellness-green-500: var(--base-bluestate-300);
    --wellness-green-600: var(--base-bluestate-200);
    --wellness-green-700: var(--base-bluestate-100);
    --wellness-green-800: var(--base-bluestate-50);
    --wellness-green-900: var(--base-bluestate-25);

    /* Safe blue */
    --safe-blue-25: var(--base-bluestate-900);
    --safe-blue-50: var(--base-bluestate-800);
    --safe-blue-100: var(--base-bluestate-700);
    --safe-blue-200: var(--base-bluestate-600);
    --safe-blue-300: var(--base-bluestate-500);
    --safe-blue-400: var(--base-bluestate-400);
    --safe-blue-500: var(--base-bluestate-300);
    --safe-blue-600: var(--base-bluestate-200);
    --safe-blue-700: var(--base-bluestate-100);
    --safe-blue-800: var(--base-bluestate-50);
    --safe-blue-900: var(--base-bluestate-25);

    /* Blueprint */
    --blueprint-25: var(--base-bluestate-900);
    --blueprint-50: var(--base-bluestate-800);
    --blueprint-100: var(--base-bluestate-700);
    --blueprint-200: var(--base-bluestate-600);
    --blueprint-300: var(--base-bluestate-500);
    --blueprint-400: var(--base-bluestate-400);
    --blueprint-500: var(--base-bluestate-300);
    --blueprint-600: var(--base-bluestate-200);
    --blueprint-700: var(--base-bluestate-100);
    --blueprint-800: var(--base-bluestate-50);
    --blueprint-900: var(--base-bluestate-25);

    /* Violet Alert */
    --violet-alert-25: var(--base-bluestate-900);
    --violet-alert-50: var(--base-bluestate-800);
    --violet-alert-100: var(--base-bluestate-700);
    --violet-alert-200: var(--base-bluestate-600);
    --violet-alert-300: var(--base-bluestate-500);
    --violet-alert-400: var(--base-bluestate-400);
    --violet-alert-500: var(--base-bluestate-300);
    --violet-alert-600: var(--base-bluestate-200);
    --violet-alert-700: var(--base-bluestate-100);
    --violet-alert-800: var(--base-bluestate-50);
    --violet-alert-900: var(--base-bluestate-25);

    /* Purple */
    --purple-25: var(--base-bluestate-900);
    --purple-50: var(--base-bluestate-800);
    --purple-100: var(--base-bluestate-700);
    --purple-200: var(--base-bluestate-600);
    --purple-300: var(--base-bluestate-500);
    --purple-400: var(--base-bluestate-400);
    --purple-500: var(--base-bluestate-300);
    --purple-600: var(--base-bluestate-200);
    --purple-700: var(--base-bluestate-100);
    --purple-800: var(--base-bluestate-50);
    --purple-900: var(--base-bluestate-25);

    /* Pinky */
    --pinky-25: var(--base-bluestate-900);
    --pinky-50: var(--base-bluestate-800);
    --pinky-100: var(--base-bluestate-700);
    --pinky-200: var(--base-bluestate-600);
    --pinky-300: var(--base-bluestate-500);
    --pinky-400: var(--base-bluestate-400);
    --pinky-500: var(--base-bluestate-300);
    --pinky-600: var(--base-bluestate-200);
    --pinky-700: var(--base-bluestate-100);
    --pinky-800: var(--base-bluestate-50);
    --pinky-900: var(--base-bluestate-25);

    /* Red Flag */
    --red-flag-25: var(--base-bluestate-900);
    --red-flag-50: var(--base-bluestate-800);
    --red-flag-100: var(--base-bluestate-700);
    --red-flag-200: var(--base-bluestate-600);
    --red-flag-300: var(--base-bluestate-500);
    --red-flag-400: var(--base-bluestate-400);
    --red-flag-500: var(--base-bluestate-300);
    --red-flag-600: var(--base-bluestate-200);
    --red-flag-700: var(--base-bluestate-100);
    --red-flag-800: var(--base-bluestate-50);
    --red-flag-900: var(--base-bluestate-25);

    /* Alarm Orange */
    --alarm-orange-25: var(--base-bluestate-900);
    --alarm-orange-50: var(--base-bluestate-800);
    --alarm-orange-100: var(--base-bluestate-700);
    --alarm-orange-200: var(--base-bluestate-600);
    --alarm-orange-300: var(--base-bluestate-500);
    --alarm-orange-400: var(--base-bluestate-400);
    --alarm-orange-500: var(--base-bluestate-300);
    --alarm-orange-600: var(--base-bluestate-200);
    --alarm-orange-700: var(--base-bluestate-100);
    --alarm-orange-800: var(--base-bluestate-50);
    --alarm-orange-900: var(--base-bluestate-25);

    /* Warning Yellow */
    --warning-yellow-25: var(--base-bluestate-900);
    --warning-yellow-50: var(--base-bluestate-800);
    --warning-yellow-100: var(--base-bluestate-700);
    --warning-yellow-200: var(--base-bluestate-600);
    --warning-yellow-300: var(--base-bluestate-500);
    --warning-yellow-400: var(--base-bluestate-400);
    --warning-yellow-500: var(--base-bluestate-300);
    --warning-yellow-600: var(--base-bluestate-200);
    --warning-yellow-700: var(--base-bluestate-100);
    --warning-yellow-800: var(--base-bluestate-50);
    --warning-yellow-900: var(--base-bluestate-25);

    /* bluestate */
    --bluestate-25: var(--base-bluestate-900);
    --bluestate-50: var(--base-bluestate-800);
    --bluestate-100: var(--base-bluestate-700);
    --bluestate-200: var(--base-bluestate-600);
    --bluestate-300: var(--base-bluestate-500);
    --bluestate-400: var(--base-bluestate-400);
    --bluestate-500: var(--base-bluestate-300);
    --bluestate-600: var(--base-bluestate-200);
    --bluestate-700: var(--base-bluestate-100);
    --bluestate-800: var(--base-bluestate-50);
    --bluestate-900: var(--base-bluestate-25);

    /* shadow */
    /* Css Variable work only hex code */
    --shadow-25: var(--base-shadow-900);
    --shadow-50: var(--base-shadow-800);
    --shadow-100: var(--base-shadow-700);
    --shadow-200: var(--base-shadow-600);
    --shadow-300: var(--base-shadow-500);
    --shadow-400: var(--base-shadow-400);
    --shadow-500: var(--base-shadow-300);
    --shadow-600: var(--base-shadow-200);
    --shadow-700: var(--base-shadow-100);
    --shadow-800: var(--base-shadow-50);
    --shadow-900: var(--base-shadow-25);
  }
`;
