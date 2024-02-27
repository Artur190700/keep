let baseUrl = 'http://localhost:3000';
function logIn() {
    let login = document.getElementById('logInInput').value;
    let password = document.getElementById('loginPassWord').value;
    let token = localStorage.getItem('token');
    fetch(baseUrl + '/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*' // This line should be removed
        },
        body: JSON.stringify({
            "username": login,
            "password": password
        }),

    }).then(async (res) => {
        if (res.status.toString()[0] == '2') {
            let result = await res.json();
            // console.log(result.token);
            // console.log(await res.json());
            localStorage.setItem('token', result.token);
            window.location.href = 'index.html';

        } else if (token) {
            window.location.href = 'index.html';

        } else {
            let errText = await res.text();
            document.getElementById('logInInput').classList.add('logInErr');
            document.getElementById('loginPassWord').classList.add('logInErr');
            showMassage(true, errText, "logIn")
        }
    })

}
function signUp() {
    let login = document.getElementById('signUpEmail').value;
    let password = document.getElementById('createPassWord').value;
    let password2 = document.getElementById('confirmPassWord').value;
    if (password == password2) {
        fetch(baseUrl + '/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*' // This line should be removed
            },
            body: JSON.stringify({
                "username": login,
                "password": password
            }),

        }).then(async (res) => {
            if (res.status.toString()[0] == '2') {
                let result = await res.json();
                window.location.href = 'index.html';
                localStorage.setItem('token', result.token);
                // console.log(result.token);

            } else {
                let errText = await res.json();
                let error;
                document.getElementById('signUpEmail').classList.add('logInErr');
                if (errText.keyPattern.username) {
                    error = 'User Name already created!';
                    showMassage(true, error)

                }
            }
        })

    } else {
        document.getElementById('createPassWord').classList.add('logInErr');
        document.getElementById('confirmPassWord').classList.add('logInErr');
        showMassage(true, 'Passwords not fortunately', "signUp");
    }

}
function tokenCheck(token) {
    fetch(baseUrl + '/me', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async (result) => {
        let res = await result.json();
        if (!res) {
            window.location.href = "logIn.html";

        } else if (res.username != undefined) {
            document.getElementById('userName').innerHTML = res.username;
            // console.log(res);
        } else {
            window.location.href = "logIn.html";

        }
    })
}
function getNoteAPI(token) {
    fetch(baseUrl + '/notes', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(async (notes) => {
        let result = await notes.json();
        // console.log(result);
        if (result) {
            for (let i = 0; i < result.length; i++) {
                deskNoteCreator(result[i])
                // console.log(result[i]._id);
                arrayForNoteIDApi.push(result[i]._id);

            }

        }
    })
    // console.log(arrayForNoteIDApi)
}
function createNoteAPI(token) {
    let title = document.getElementById('titleNote').value;
    let content = document.getElementById('note').value;
    if (!title) {
        console.log('Title is empty');

    } else if (!content) {
        console.log('Content is empty');
    } else {

        fetch(baseUrl + '/notes', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*' // This line should be removed
                'Authorization': `Bearer ${token}`

            },
            body: JSON.stringify({
                "title": title,
                "content": content
            }),
        }).then(async (res) => {
            let result = await res.json();
            console.log(result);
        })
    }
}
function saveNoteApi(token, noteID) {
    noteID = arrayForNoteIDApi[noteID - 1];
    fetch(baseUrl + '/notes/' + noteID, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*' // This line should be removed
            'Authorization': `Bearer ${token}`

        },
        body: JSON.stringify({
            "title": document.getElementById('titleNote').value,
            "content": document.getElementById('note').value
        }),
    }).then(async (res) => {
        let result = await res.json();
        console.log(result);
    })
}
function deleteNoteAPI(token, noteID) {
    noteID = arrayForNoteIDApi[noteID - 1];
    fetch(baseUrl + '/notes/' + noteID, {
        method: 'delete',
        headers: { "Authorization": `Bearer ${token}` },
    }).then(async (res) => {
        let result = await res.json();
        console.log(result);

    })
}
function showMassage(isErr, massage, type) {
    if (isErr && type == "logIn") {
        document.getElementById('massageBottom').style.bottom = '15px';
        document.getElementById('massageBottom').innerHTML = massage;

        setTimeout(() => { clean('massageBottom') }, 8000)
    } else if (isErr && type == 'main') {
        document.getElementById('mainBottomMassage').style.bottom = '15px';
        document.getElementById('mainBottomMassage').innerHTML = massage;
        setTimeout(() => { clean('mainBottomMassage') }, 8000)

    } else {
        document.getElementById('signUpMassage').style.bottom = '15px';
        document.getElementById('signUpMassage').innerHTML = massage;

        setTimeout(() => { clean('signUpMassage') }, 8000)

    }

}
function clean(id) {
    if (id) {
        document.getElementById(id).style.bottom = "-70px";
    }
    // try {

    //     document.getElementById('massageBottom').style.bottom = '-70px';
    // } catch {
    //     document.getElementById('signUpMassage').style.bottom = '-70px';

    // }
}