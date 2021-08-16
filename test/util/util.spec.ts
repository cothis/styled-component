import { dateToString } from '../../src/util';

describe('util이 가진 메소드들을 테스트합니다', () => {
  describe('dateToString 함수를 테스트합니다', () => {
    it('Date(2021, 11, 30)을 넣으면 2021-12-30이 리턴되야 합니다.', () => {
      //given
      const inputDate = new Date(2021, 11, 30);

      //when
      const date = dateToString(inputDate);

      //then
      expect(date).toEqual('2021-12-30');
    });
  });
});
