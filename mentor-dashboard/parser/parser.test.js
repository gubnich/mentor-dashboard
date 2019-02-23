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
          if (parser.getGitHubLogin(row[2]) === item[1]) {
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
            expect(row[2]).toEqual(parser.getGitHubLogin(item[4]));
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
      if (typeof mentorLogin === 'undefined') return;
      const mentorIn = {
        name: `${item[0]} ${item[1]}`,
        city: item[2],
        students: {}
      }
      const mentorOut = parser.outputData.mentors[mentorLogin];
      expect([mentorOut.city, mentorOut.name])
      .toEqual([mentorIn.city, mentorIn.name]);
      expect(mentorOut.hasOwnProperty('students')).toBe(true);
    })
  });
});

describe('parsePairs', () => {
  it("assigns a student with initial property 'score' to each mentor of pairs", () => {
    parser.inputData.pairs.forEach(item => {
      if(parser.outputData.mentors[item[2]]) {
        const studentLogin = `${item[1]}`.toLowerCase();
        expect(parser.outputData.mentors[item[2]].students[studentLogin].hasOwnProperty('score')).toBe(true);
      }
    })
  });
});

describe('parseScores', () => {
  it("should add scores and a githubLink to the student", () => {
    parser.inputData.scores.forEach(item => {
      const mentorLogin = item[8];
      const studentLogin = parser.getGitHubLogin(item[2]);
      const student = parser.outputData.mentors[mentorLogin].students[studentLogin];
      const task = parser.outputData.tasks.names.indexOf(item[3]);
      if (student && task >= 0) {
        expect(student.hasOwnProperty('gitHubLink')).toBe(true);
        expect(student.score[task].hasOwnProperty('linkPR')).toBe(true);
        expect(student.score[task].hasOwnProperty('mark')).toBe(true);
        expect(student.score[task].hasOwnProperty('comment')).toBe(true);
      }
    })
  });
});
