const noteTitleInput = window.document.getElementById('noteTitleInput');
const textarea = window.document.querySelector('.note_text');
let NoteId;
let editingNote;
let noteList = JSON.parse(window.localStorage.getItem('noteList'));
if(window.localStorage.getItem('editingNote') == '') {
    noteTitleInput.value = '';
    textarea.value = '';
    noteId = -1;
}
else {
    editingNote = JSON.parse(window.localStorage.getItem('editingNote'));
    noteTitleInput.value = editingNote.title;
    textarea.value = editingNote.text;
    noteId = editingNote.id;
}


function backIconClick() {
    window.localStorage.removeItem('editingNote');
    window.location.href = 'index.html'  
  }
function saveNote() { 
if(textarea.value){
    if(noteId < 0) {
    createNewNote();
    }
    else {
    updateNote();
    }
    window.localStorage.setItem('noteList', JSON.stringify(noteList));
}
}
function updateNote(){
// Обновление заметки по noteId
noteList.map(function(elem) {
    if(elem.id === noteId){
    if(noteTitleInput.value.trim().length !=0 && noteTitleInput.value != 'No title') {
        elem.title = noteTitleInput.value;
    }
    elem.text = textarea.value;
    }
})
}
function createNewNote(){
let date = moment(new Date());
let object = {
    id: noteList.length,
    title: noteTitleInput.value.trim().length !=0
    ? noteTitleInput.value
    : 'No title'
    ,
    text: textarea.value,
    date: date.format('MMM D, LT'),
}
noteId = noteList.length; 
noteList.unshift(object);
}