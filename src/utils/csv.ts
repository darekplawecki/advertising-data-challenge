import { parse } from 'papaparse';

export const parseCsv = <T = any>(csv: string): T[] => {
  const { data, errors } = parse<T>(csv, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    const readableErrors = errors.map((error) => error.message).join(', ');
    throw Error(`Errors occurred while parsing csv: ${readableErrors}`);
  }

  return data;
};
