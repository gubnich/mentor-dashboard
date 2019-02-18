const fs = require('fs');
const xlsx = require('node-xlsx');

class Parser {
  constructor() {
    this.inputData = {
      scores: this.getExcelSheet('data/Mentor score.xlsx', 0),
      pairs: this.getExcelSheet('data/Mentor-students pairs.xlsx', 0),
      mentors: this.getExcelSheet('data/Mentor-students pairs.xlsx', 1),
      tasks: this.getExcelSheet('data/Tasks.xlsx', 0),
    };
    this.replacePatterns = [
      /.*rolling-scopes-school\/|.*github\.com\//,
      /-2018Q3/,
      '/'
    ];
    this.mistakes = {
      inPairs: {
        description: 'Отсутствует GitHub для менторов: ',
        cases: new Set()
      },
      inScores: {
        description: 'Не назначен ментор для студентов: ',
        cases: new Set()
      },
      inTasks: {
        description: 'Отсутствует описание для тасков: ',
        cases: new Set()
      }
    };
    this.outputData = {
      tasks: {
        names: [],
        links: [],
        statuses: []
      },
      mentors: {}
    };
  }

  getExcelSheet(excelFile, sheetIndex) {
    let sheet = xlsx.parse(`${__dirname}/${excelFile}`)[sheetIndex];
    sheet = sheet.data.slice(1).filter(item => item.length);
    return sheet;
  }

  getGitHubLogin(gitHubLink) {
    let link = gitHubLink;
    this.replacePatterns.forEach(item => link = link.replace(item, ''))
    return link.trim();
  }

  addLoginToPairs(name, login) {
    this.inputData.pairs.forEach(item => {
      if(item.length > 0 && item[0] === name) {
        item[2] = login;
        this.addLoginToScores(item[1].toString().toLowerCase(), login);
      }
    })
  }

  addLoginToScores(studentLogin, mentorLogin) {
    this.inputData.scores.forEach(item => {
      if(item.length > 0 && this.getGitHubLogin(item[2]).toLowerCase() === studentLogin) {
        item[8] = mentorLogin;
      } 
    })
  }

  parseTasks() {
    this.inputData.tasks.forEach(item => {
      const [taskName, taskLink, taskStatus] = item;
      this.outputData.tasks.names.push(taskName.trim());
      this.outputData.tasks.links.push(taskLink);
      this.outputData.tasks.statuses.push(taskStatus.trim());
    })
  }

  parseMentors() {
    this.inputData.mentors.forEach((item, i) => {
      const mentorLogin = this.getGitHubLogin(item[4]);
      const mentorLoginLow = mentorLogin.toLowerCase();
      if (mentorLogin == 'undefined') return;
      const mentor = {
        name: `${item[0]} ${item[1]}`,
        login: mentorLogin,
        city: item[2],
        students: {}
      }
      this.outputData.mentors[mentorLoginLow] = mentor;
      this.addLoginToPairs(mentor.name, mentorLoginLow);
    })
  }

  parsePairs() {
    const size = this.outputData.tasks.names.length;
    this.inputData.pairs.forEach(item => {
      if(this.outputData.mentors[item[2]]) {
        const studentLogin = `${item[1]}`.toLowerCase();
        this.outputData.mentors[item[2]].students[studentLogin] = {
          score: Array(size)
        };
      } else {
        console.log('!!!!!!!!!!!!!!!!!!!',item);
      }
    })
  }

  parseScores() {
    this.inputData.scores.forEach((item, i) => {
      const mentorLogin = item[8];
      const studentLogin = this.getGitHubLogin(item[2]).toLowerCase();
      let mentor;
      let task;
      let student;
      if (this.outputData.mentors[mentorLogin]) {
        mentor = this.outputData.mentors[mentorLogin];
      } else {
        this.mistakes.inScores.cases.add(item[2])
      }
      if (this.outputData.tasks.names.indexOf(item[3]) >= 0) {
        task = this.outputData.tasks.names.indexOf(item[3]);
      } else {
        this.mistakes.inTasks.cases.add(item[3]);
      }
      if (mentor) student = mentor.students[studentLogin];
      
      const score = {
        linkPR: item[4].toString(),
        mark: item[5],
        comment: item[6]
      }
      if (student && task >= 0) {
        student.gitHubLink = item[2];
        student.score[task] = score;
      }
    })
  }

  check() {
    this.inputData.pairs.forEach(item => {
      if(item.length < 3) this.mistakes.inPairs.cases.add(item[0]);
    })
    
    console.log(this.mistakes.inPairs.description, this.mistakes.inPairs.cases);
    console.log(this.mistakes.inScores.description, this.mistakes.inScores.cases);
    console.log(this.mistakes.inTasks.description, this.mistakes.inTasks.cases);
  }

  writeFile(name, isMin) {
    let dataJSON;
    if (isMin) dataJSON = JSON.stringify(this.outputData);
    else dataJSON = JSON.stringify(this.outputData, null, ' ');

    fs.writeFile(`public/${name}.json`, dataJSON, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });
  }
}

const parser = new Parser;
parser.parseTasks();
parser.parseMentors();
parser.parsePairs();
parser.parseScores();
parser.check();
parser.writeFile('schoo');
