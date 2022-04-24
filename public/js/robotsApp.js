const urlService = 'http://localhost:8080/api/movements';

document.getElementById('sendBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const positionInput = document.getElementById('positionTXT').value.toUpperCase();
    const orientationInput = document.getElementById('orientationTxt').value.toUpperCase();

    const body = {
        coordinates: positionInput,
        orientation: orientationInput
    };

    fetch(urlService, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
        .then(resp => {

            if (resp.msg == undefined) {
                const errorDiv = document.getElementById('msgResult');
                errorDiv.classList.remove("container__success");
                errorDiv.classList.add("container__error");
                errorDiv.innerHTML = resp.errors[0].msg;

            } else {
                const successDiv = document.getElementById('msgResult');
                successDiv.classList.remove("container__error");
                successDiv.classList.add("container__success");
                successDiv.innerHTML = resp.msg;
                listItem(resp.robots)
            }
        })
        .catch(console.warn)
});

document.getElementById('positionTXT').addEventListener('change', (e) => {
    e.preventDefault();

    const positionInput = document.getElementById('positionTXT').value;
    const orientationInput = document.getElementById('orientationTxt').value;

    if (positionInput !== '' && orientationInput !== '') {
        document.getElementById('sendBtn').disabled = false;
        return;
    }

    document.getElementById('sendBtn').disabled = true;

})

document.getElementById('orientationTxt').addEventListener('keyup', (e) => {
    e.preventDefault();

    const positionInput = document.getElementById('positionTXT').value;
    const orientationInput = document.getElementById('orientationTxt').value;

    if (positionInput !== '' && orientationInput !== '') {
        document.getElementById('sendBtn').disabled = false;
        return;
    }

    document.getElementById('sendBtn').disabled = true;

})

function listItem(item) {

    document.getElementById('listLostRobots').innerHTML = '';
    for (var i = 0; i < item.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = item[i].coordinate;
        li.classList.add('list_form')
        document.getElementById('listLostRobots').appendChild(li);
    }
}