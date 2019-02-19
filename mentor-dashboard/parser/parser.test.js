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
