export const getAppliedFilterText = (
  values: string[],
  label: string,
  labelAll: string,
): string => {
  if (values.length > 0) {
    const quotedValues = values.map((value) => `"${value}"`);
    const allExceptLast = quotedValues.slice(0, values.length - 1).join(', ');
    const last = quotedValues.at(-1);
    const valuesText = allExceptLast.length > 0 ? `${allExceptLast} and ${last}` : last;
    return `${label} ${valuesText}`;
  }
  return labelAll;
};
