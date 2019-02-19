const parser = require('./parser');

describe('getGitHubLogin', () => {
  const mock = [
    'https://github.com/rolling-scopes-school/gubnich-2018Q3',
    'https://github.com/gubnich',
    'gubnich'
  ];
    
  it('returns a string without content, described in replacePatterns property', () => {
    mock.forEach(item => {
      const str = parser.getGitHubLogin(item);
      parser.replacePatterns.forEach(item => {
        expect(str).toEqual(expect.not.stringMatching(item));
      })
    })
  });
});

describe('addLoginToScores', () => {
  it("should add a mentorLogin to the scores list where the student's gitHub mathes the studentLogin", () => {
    parser.inputData.scores.forEach(row => {
      if(row[8].length) {
        parser.inputData.pairs.forEach(item => {
          if (parser.getGitHubLogin(row[2]).toLowerCase() === item[1]) {
            expect(row[8]).toEqual(item[2]);
          }
        })
      } 
    })
  });
});
