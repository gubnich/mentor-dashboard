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

describe('addLoginToPairs', () => {
  it("should add mentor's login to mentor-student pairs", () => {
    parser.inputData.pairs.forEach(row => {
      if (row[2].length) {
        parser.inputData.mentors.forEach(item => {
          if (`${item[0]} ${item[1]}` === row[0]) {
            expect(row[2]).toEqual(parser.getGitHubLogin(item[4]).toLowerCase());
          }
        })
      }
    })
  });
});

describe('parseTasks', () => {
  it("should fill outputData.tasks with data from inputData.tasks", () => {
    const numberOfTasks = parser.inputData.tasks.length;
    for(let i = 0; i < numberOfTasks; i++) {
      const taskNameOut = parser.outputData.tasks.names[i];
      const taskLinkOut = parser.outputData.tasks.links[i];
      const taskStatusOut = parser.outputData.tasks.statuses[i];
      const [taskNameIn, taskLinkIn, taskStatusIn] = parser.inputData.tasks[i];
      expect([taskNameOut, taskLinkOut, taskStatusOut])
      .toEqual([taskNameIn.trim(), taskLinkIn, taskStatusIn.trim()]);
    }
  });
});

describe('parseMentors', () => {
  it("should fill outputData.mentors with data from inputData.mentors", () => {
    parser.inputData.mentors.forEach(item => {
      const mentorLogin = parser.getGitHubLogin(item[4]);
      const mentorLoginLow = mentorLogin.toLowerCase();
      if (mentorLogin == 'undefined') return;
      const mentorIn = {
        name: `${item[0]} ${item[1]}`,
        login: mentorLogin,
        city: item[2],
        students: {}
      }
      const mentorOut = parser.outputData.mentors[mentorLoginLow];
      expect([mentorOut.city, mentorOut.login, mentorOut.name])
      .toEqual([mentorIn.city, mentorIn.login, mentorIn.name]);
      expect(mentorOut.hasOwnProperty('students')).toBe(true);
    })
  });
});
