import { parse } from 'papaparse';
import { parseCsv } from './csv';

jest.mock('papaparse');

describe('parseCsv', () => {
  const parseMock = parse as jest.Mock;

  beforeEach(() => {
    parseMock.mockReset();
  });

  it('should return data if there are no parsing errors', () => {
    // given
    const expectedResult = [{
      Foo: 'Bar',
      Test: 'Value',
    }];
    parseMock.mockReturnValueOnce({ data: expectedResult, errors: [] });

    // when
    const result = parseCsv('Foo,Test\nBar,Value');

    // then
    expect(result).toBe(expectedResult);
  });

  it('should throw error if there are parsing errors', () => {
    // given
    parseMock.mockReturnValueOnce({ data: [], errors: [{ message: 'Test error message' }] });

    // when & then
    expect(() => {
      parseCsv('Invalid Csv')
    }).toThrow();
  });
});
