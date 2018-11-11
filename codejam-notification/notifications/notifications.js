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
