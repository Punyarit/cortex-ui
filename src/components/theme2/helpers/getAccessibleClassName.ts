import { HashedClass } from "../types/theme.types"

export function getAccessibleClassName(hashedClasses: HashedClass) {
  const accessibleClassName: { [className: string]: string } = {};
  for (const hashedClassName in hashedClasses) {
    const hashedClass = hashedClasses[hashedClassName];
    accessibleClassName[hashedClassName] = hashedClass.mergedClass;
  }
  return accessibleClassName;
}