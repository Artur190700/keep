let noteDeskCount = 0;
let saveNotesArr = [];
let num = 1;
let noteID = 0;
let actualNoteID = -1;
let actualNoteIDForDelate;
let arrayForNoteIDApi = [];
function start() {
    let token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "logIn.html";
    } else {
        tokenCheck(token);
        getNoteAPI(token);
    }
}
function noteShow(obj) {
    document.getElementById('mainNoteContainer').style.visibility = 'visible';
    document.getElementById('titleNote').value = '';
    document.getElementById('note').value = '';
    if (obj) {
        document.getElementById('titleNote').value = obj.title;
        if (obj.note) {

            document.getElementById('note').value = obj.note;
        } else {
            document.getElementById('note').value = obj.content;

        }

    }

}
function hideNote() {
    document.getElementById('mainNoteContainer').style.visibility = 'hidden';
    actualNoteID = -1;
}

function onSaveButtonClick() {

    if (actualNoteID == -1) {
        createNote();
    } else {
        saveNote();
    }
}

function createNote() {
    let obj = {};
    let title = document.getElementById('titleNote');
    // title = title.value;
    // console.log(title.value);
    let note = document.getElementById('note');
    // console.log(note.value);

    obj = {
        title: title.value,
        note: note.value,
        id: num
    }
    // console.log(saveNotesArr);
    if (obj.title != "" && obj.note != "") {
        saveNotesArr.push(obj);
        num++;
        deskNoteCreator(obj);
        let token = localStorage.getItem('token');
        if (token) {
            createNoteAPI(token);
            hideNote();

        }
    } else {
        showMassage(true, 'Cannot create empty note!', 'main')
    }
    note.value = '';
    title.value = '';
}
function deskNoteCreator(obj) {
    let body = document.createElement('div');
    let bodyForSaveNotes = document.getElementById('bodyForSaveNotes');
    body.classList.add('savedNote');
    body.id = ++noteID;
    bodyForSaveNotes.appendChild(body);
    let bodyTitle = document.createElement('div');
    body.appendChild(bodyTitle);
    bodyTitle.innerHTML = obj.title;
    bodyTitle.classList.add('titleInsideNote');
    let bodyNote = document.createElement('div');
    body.appendChild(bodyNote);
    if (obj.note) {

        bodyNote.innerHTML = obj.note;
    } else {
        bodyNote.innerHTML = obj.content;

    }
    bodyNote.classList.add('textWrap');
    body.addEventListener('click', function () {
        actualNoteID = body.id
        showNote(body.id);
        noteShow(obj);
    });

}

function showNote(id) {
    if (id) {
        console.log(document.getElementById(id))
        actualNoteIDForDelate = document.getElementById(id);

    }

}
function saveNote() {
    let titleValue = document.getElementById('titleNote').value;
    let noteValue = document.getElementById('note').value;
    const actualNote = saveNotesArr.find((n) => n.id == actualNoteID);
    // console.log(actualNote);
    let actualNoteElement = document.getElementById(actualNoteID);
    let actualElementChildNote = actualNoteElement.childNodes;
    // console.log(actualNoteElement.childNodes);

    let token = localStorage.getItem('token');
    if (token) {
        if (titleValue && noteValue) {
            actualElementChildNote[0].innerHTML = titleValue;
            actualElementChildNote[1].innerHTML = noteValue;
            saveNoteApi(token, actualNoteIDForDelate.id);
            hideNote();

        } else {
            showMassage(true, 'Cannot save empty note!', 'main')

        }
    }

}
function remove(id) {
    if (id) {
        actualNoteIDForDelate.remove();
        let token = localStorage.getItem('token');
        deleteNoteAPI(token, actualNoteIDForDelate.id);
        hideNote();
    }
}
document.getElementById('inputSerach').addEventListener('keypress', search);
function search() {
    let input = document.getElementById('inputSerach').value;
    input = input.toLowerCase();
    console.log(input);
}
start();
function logOut() {
    localStorage.removeItem('token');
    window.location.href = 'logIn.html';
}
