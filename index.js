
let noteTitleInput = window.document.getElementById('noteTitleInput');
let textarea = window.document.querySelector('textarea');
let mainScreen = window.document.querySelector('.main');
let editScreen = window.document.querySelector('.edit_screen');
let bottomMenu = window.document.querySelector('.bottom_menu');
let notesCount = window.document.getElementById('notes_count');
let notesList = window.document.getElementById('notes_list');

//Переменные
let noteList = [];
let noteId = -1;

// Функции
const removeNoteFromList = (id) => {
  noteList.map((elem, index) => {
    if(elem.id === id) noteList.splice(index, 1);
  });
  window.localStorage.setItem('noteList', JSON.stringify(noteList));
  //window.location.reload();
  notesList.innerHTML = '';
  onLoad();
}
const goToEdit = () => {
  mainScreen.style.display = 'none';
  editScreen.style.display = 'flex';
  bottomMenu.style.display = 'none';
  noteList.map(elem => {
    if(elem.id === noteId){
      noteTitleInput.value = elem.title;
      textarea.value = elem.text;
    }
  });
  textarea.focus();
}
const createNewNoteBlock = (id, noteTitle, noteDate) => {
  let MainDiv = window.document.createElement('div');
  let  NoteH= window.document.createElement('span');
  let NoteDate = window.document.createElement('span');
  let delIcon = window.document.createElement('img');
  // Установка классов
  NoteH.className = 'note_h';
  MainDiv.className = 'note_template';
  NoteDate.className = 'note_date';
  delIcon.className = 'delete_icon';
  delIcon.src = 'delete.svg';
  // Установка содержимого
  NoteDate.innerText = noteDate;
  NoteH.innerText = noteTitle;
  // Обработчики событий
  NoteH.addEventListener('click', () => {
    noteId = id;
    goToEdit();
  });
  delIcon.addEventListener('click', () => removeNoteFromList(id));
  // Добавление элементов
  MainDiv.appendChild(NoteH);
  MainDiv.appendChild(delIcon);
  MainDiv.appendChild(NoteDate);
  notesList.appendChild(MainDiv);
  
}
const onLoad = () => {
  noteList = window.localStorage.getItem('noteList')
    ? JSON.parse(window.localStorage.getItem('noteList'))
    : [];
  notesCount.innerText = `${noteList.length} notes`;
  if(noteList) {
    noteList.map(elem => {
      createNewNoteBlock(elem.id, elem.title, elem.date);
    });
  }
}
onLoad();

// Утилиты для обработчиков
function updateNote(){
  // Обновление заметки по noteId
  noteList.map(function(elem) {
    if(elem.id === noteId){
      elem.title = noteTitleInput.value;
      elem.text = textarea.value;
    }
  })
}
function getTitleSlice(title) {
  return title.substr(0, 60);
}
function createNewNote(){
  let date = moment(new Date());
  let object = {
    id: noteList.length,
    title: noteTitleInput.value
      ? noteTitleInput.value
      : getTitleSlice(textarea.value)
    ,
    text: textarea.value,
    date: date.format('LL'),
  }
  noteId = noteList.length; 
  noteList.unshift(object);
  
}
// Обработчики событий
function backIconClick() {
  saveNote();
  editScreen.style.display = 'none';
  mainScreen.style.display = 'flex';
  bottomMenu.style.display = 'flex';
  noteId = -1;
  //window.location.reload();
  notesList.innerHTML = '';
  onLoad();
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
const addNoteIconClick = () => {
  mainScreen.style.display = 'none';
  editScreen.style.display = 'flex';
  bottomMenu.style.display = 'none';
  noteTitleInput.value = '';
  textarea.value = '';
}

//Bottom-menu
let bottomMenuNotes = document.getElementById('bottom_menu_notes');
let bottomMenuToDos = document.getElementById('bottom_menu_todos');
let bottomMenuNotesSvg = document.getElementById('bottom_menu_notes_svg');
let bottomMenuToDosSvg = document.getElementById('bottom_menu_todos_svg');
let h1 = document.querySelector('h1');
let addNoteBtn = document.getElementById('add_note_button');
let todosList = document.getElementById('to_dos_input_flex');
let listContainer = document.getElementById('list_container');
function ToDo() {
  bottomMenuNotes.classList = "bottom_menu_column_unactive";
  bottomMenuNotesSvg.classList = 'bottom_menu_img_unactive';
  bottomMenuToDos.classList = "bottom_menu_column_active";
  bottomMenuToDosSvg.classList = 'bottom_menu_img_active';
  h1.innerText = 'To-Dos';
  notesCount.style.display = 'none';
  addNoteBtn.style.display = 'none';
  notesList.style.display = 'none';
  todosList.style.display = 'flex';
  listContainer.style.display = 'flex';
}
function Notes() {
  bottomMenuNotes.classList = "bottom_menu_column_active";
  bottomMenuNotesSvg.classList = 'bottom_menu_img_active';
  bottomMenuToDos.classList = "bottom_menu_column_unactive";
  bottomMenuToDosSvg.classList = 'bottom_menu_img_unactive';
  h1.innerText = 'Notes';
  notesCount.style.display = 'block';
  addNoteBtn.style.display = 'flex'
  notesList.style.display = 'flex '
  todosList.style.display = 'none'
  listContainer.style.display = 'none';
}

//to-dos
const inputBox = document.getElementById('input_box');
const addTaskBtn = document.getElementById('add_task');
let haveChars = false;
function addTask() {
    if(haveChars === true) {
        let li = document.createElement('li')
        li.innerHTML = inputBox.value;
        listContainer.insertBefore(li,listContainer.children[0]);
        inputBox.value = "";
        addTaskBtn.style.background = "#22639c";
        addTaskBtn.style.color = "#c2e2ff";
        haveChars = false;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }     
}
listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false)
function saveData() {
    localStorage.setItem("to-dos", listContainer.innerHTML);
}
function showData() {
    listContainer.innerHTML = localStorage.getItem("to-dos");
}
showData();
inputBox.addEventListener('input', function() {
    if(inputBox.value.trim().length === 0) {
        addTaskBtn.style.background = "#22639c";
        addTaskBtn.style.color = "#c2e2ff";
        haveChars = false;
    }
    else {
        addTaskBtn.style.background = "#0088ff";
        addTaskBtn.style.color = "#ffffff";
        haveChars = true;
    }
})
inputBox.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        addTask()
    }
})
