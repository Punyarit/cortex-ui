export const getMediaRuleValue = (attrStyle1?: string, attrStyle2?: string) => {
  if (attrStyle1 && attrStyle1?.length > 14) {
    return attrStyle1;
  } else if (attrStyle2 && attrStyle2?.length > 14) {
    return attrStyle2;
  }
};
