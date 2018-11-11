if(Number(localStorage.getItem('flag'))){
    const notifications = document.createElement('aside');
    const notice = document.createElement('div');
    const controls = document.createElement('div');
    const exit = document.createElement('div');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    const slider = document.createElement('div');
    const rightControl = document.createElement('span');
    const leftControl = document.createElement('span');
    const list = document.createElement('ul');

    document.body.appendChild(notifications);
        notifications.appendChild(exit);
        notifications.appendChild(notice);
        notifications.appendChild(controls);
            controls.appendChild(label).appendChild(checkbox).after('Disable Tips');
            controls.appendChild(slider);
                slider.appendChild(rightControl);
                slider.appendChild(list);
                slider.appendChild(leftControl);

    notifications.setAttribute('class','notifications');
    notifications.setAttribute('tabIndex', -1);
    notice.setAttribute('class','notifications-notice');
    controls.setAttribute('class','notifications-controls');
    exit.setAttribute('class','notifications-exit');
    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('name','checkbox');
    checkbox.setAttribute('value','checkbox');

    rightControl.innerHTML = '&#xbb;';
    leftControl.innerHTML = '&#xab;';
    exit.innerHTML = '&#x2718;'

    const messages = [
        {
            header: 'Lorem ipsum',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel ultricies urna, sed ornare augue. Integer sed mattis libero.'
        },
        {
            header: 'Lorem ipsum ipsum',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel ultricies urna, sed ornare augue. Integer sed mattis libero. Suspendisse varius tellus in sollicitudin feugiat. Mauris pharetra turpis sit amet semper lobortis.'
        },
        {
            header: 'Lorem ipsum ipsum ipsum',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel ultricies urna, sed ornare augue. Integer sed mattis libero. Suspendisse varius tellus in sollicitudin feugiat. Mauris pharetra turpis sit amet semper lobortis. Cras vulputate mattis nisl ut dictum. Suspendisse ut nisi gravida, faucibus sem non, varius risus. Nulla facilisi. In eu mi et ligula porta tempor'
        },
        {
            header: 'Lorem ipsum ipsum ipsum ipsum',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel ultricies urna, sed ornare augue. Integer sed mattis libero.'
        },
        {
            header: 'Lorem ipsum ipsum ipsum ipsum ipsum',
            text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel ultricies urna, sed ornare augue. Integer sed mattis libero. Suspendisse varius tellus in sollicitudin feugiat. Mauris pharetra turpis sit amet semper lobortis.'
        },
    ];

    let current = 0;

    const insert = function(number){//alert('insert');
        notice.innerHTML = (`<h6>${messages[number].header}</h6><p>${messages[number].text}</p>`);
    }
    insert(current);

    messages.forEach((message, i) => {
        let li = document.createElement('li');
        li.addEventListener('click', event => {
            list.querySelector('.active').removeAttribute('class');
            insert(i);
            current = i;
            li.setAttribute('class','active');
        });
        list.appendChild(li);
    })

    list.firstChild.setAttribute('class', 'active');
    let active;

    function toleft(event) {
        active =  list.querySelector('.active');
        if(current) {
            insert(current - 1);
            current -= 1;
            active.previousSibling.setAttribute('class', 'active');
            active.removeAttribute('class');    
            return;
        }
        insert(messages.length - 1);
        current = messages.length - 1;
        list.lastChild.setAttribute('class', 'active');
        active.removeAttribute('class'); 
    }

    function toright(event) {
        active =  list.querySelector('.active');
        if(current === messages.length - 1) {
            insert(0);
            current = 0;
            list.firstChild.setAttribute('class', 'active');
            active.removeAttribute('class');  
            return;
        }
        insert(current + 1);
        current += 1;
        active.nextSibling.setAttribute('class', 'active');
        active.removeAttribute('class');  
    }

    function quit(event) {
        notifications.setAttribute('class', 'hide');
    }

    leftControl.addEventListener( 'click', toleft);

    rightControl.addEventListener( 'click', toright);

    exit.addEventListener('click', quit);

    checkbox.addEventListener('change', event => {
        if(checkbox.checked) {
            localStorage.setItem('flag', '0');
            return;
        };
        localStorage.setItem('flag', 1);
    })
    
    notifications.addEventListener('keydown', event => {
        if(event.keyCode == 37){
            toleft();
        };
        if(event.keyCode == 39){
            toright();
        };
        if(event.keyCode == 27){
            quit();
        };
    })
}
