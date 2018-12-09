import rsschool from './scoreTable.js';
import chart from './chart.js';

rsschool('rsschool.json');

const control = document.getElementById('control');
control.addEventListener('mouseup', (event) => {
  if(event.target !== control){
      let session = event.target.value || event.target.querySelector('input').value;
      chart.data.datasets = [];
      chart.data.labels = [];
      rsschool(`${session}.json`);
  }
})

scoreTable.addEventListener('click', (event) => {
  if(event.target.type === 'checkbox'){
      
          if(event.target.checked){
              if(chart.data.datasets.length > 9){
                  alert('Please, do not choose more than 10 users for compare');
                  event.target.checked = false;
                  return;
              }
              const dataset = {
                  label: event.target.parentNode.parentNode.firstChild.innerText,
                  backgroundColor: 'transparent',
                  borderColor: `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`,
                  data: event.target.parentNode.data,
              }
              chart.data.datasets.push(dataset);
              chart.update();
          } else {
              
              chart.data.datasets.forEach((element, i) => {
                  if(element.label === event.target.parentNode.parentNode.firstChild.innerText){
                      chart.data.datasets.splice(i, 1);
                      chart.update();
                  }
              });
          }
      
  }
})
