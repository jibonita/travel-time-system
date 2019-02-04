import { SentenceCasePipe } from './sentence-case.pipe';

describe('SentenceCasePipe', () => {
  it('should make first symbol of a string UPPER case', () => {
    // assign
    const pipe = new SentenceCasePipe();
    // act
    const value = pipe.transform('pesho');
    // assert
    expect(value).toEqual('Pesho');
  });

  it('should add : if second param is "true"', () => {
    // assign
    const pipe = new SentenceCasePipe();
    // act
    const value = pipe.transform('pesho', true);
    // assert
    expect(value).toEqual('Pesho:');
  });

  it('should Not add : if second param is "false"', () => {
    const pipe = new SentenceCasePipe();
    const value = pipe.transform('pesho', false);
    // assert
    expect(value).toEqual('Pesho');
  });

});