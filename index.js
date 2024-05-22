const noteTitleInput = window.document.getElementById('noteTitleInput');
const textarea = window.document.querySelector('textarea');
const mainScreen = window.document.querySelector('.main');
const editScreen = window.document.querySelector('.edit_screen');
const bottomMenu = window.document.querySelector('.bottom_menu');
const notesCount = window.document.getElementById('notes_count');
const notesList = window.document.getElementById('notes_list');

//Переменные
let noteList = [];
let noteId = -1;

// Функции
const removeNoteFromList = (id) => {
  noteList.map((elem, index) => {
    if(elem.id === id) noteList.splice(index, 1);
  });
  window.localStorage.setItem('noteList', JSON.stringify(noteList));
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
  delIcon.src = 'images/delete.svg';
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
function createNewNote(){
  let date = moment(new Date());
  let object = {
    id: noteList.length,
    title: noteTitleInput.value 
      ? noteTitleInput.value
      : titleSlice(textarea.value)
    ,
    text: textarea.value,
    date: date.format('LL'),
  }
  noteId = noteList.length; 
  noteList.unshift(object);
}
// Обработчики событий
function titleSlice(title) {
  let a = title.slice(0,60);
  a = a.split('\n');
  return a[0];
}
function backIconClick() {
  editScreen.style.display = 'none';
  mainScreen.style.display = 'flex';
  bottomMenu.style.display = 'flex';
  noteId = -1;
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
const bottomMenuNotes = document.getElementById('bottom_menu_notes');
const bottomMenuToDos = document.getElementById('bottom_menu_todos');
const bottomMenuNotesSvg = document.getElementById('bottom_menu_notes_svg');
const bottomMenuToDosSvg = document.getElementById('bottom_menu_todos_svg');
const h1 = document.querySelector('h1');
const addNoteBtn = document.getElementById('add_note_button');
const listContainer = document.getElementById('list_container');
const notesCountBlock = document.querySelector('.notescount_block');
const inputBox = document.getElementById('input_box');
function ToDo() {
  bottomMenuNotes.classList = "bottom_menu_column_unactive";
  bottomMenuNotesSvg.classList = 'bottom_menu_img_unactive';
  bottomMenuToDos.classList = "bottom_menu_column_active";
  bottomMenuToDosSvg.classList = 'bottom_menu_img_active';
  h1.innerText = 'To-Dos';
  notesCountBlock.style.display = 'none';
  addNoteBtn.style.display = 'none';
  notesList.style.display = 'none';
  inputBox.style.display = 'block';
  listContainer.style.display = 'flex';
}
function Notes() {
  bottomMenuNotes.classList = "bottom_menu_column_active";
  bottomMenuNotesSvg.classList = 'bottom_menu_img_active';
  bottomMenuToDos.classList = "bottom_menu_column_unactive";
  bottomMenuToDosSvg.classList = 'bottom_menu_img_unactive';
  h1.innerText = 'Notes';
  notesCountBlock.style.display = 'flex';
  addNoteBtn.style.display = 'flex'
  notesList.style.display = 'flex '
  inputBox.style.display = 'none'
  listContainer.style.display = 'none';
}

//to-dos
inputBox.value = "";
function addTask() {
  if(inputBox.value.trim().length != 0) {
    let object = {
      id: taskList.length,
      text: inputBox.value,
      checked: false,
    }
    taskList.push(object);
    inputBox.value = "";
    haveChars = false;
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    addTaskBlock(object.id, object.text, object.checked);
}}
function addTaskBlock(id,text,checked) {
      let li = document.createElement('li')
      li.innerHTML = text;
      if(checked) {
        li.classList.toggle("checked");
      }
      listContainer.insertBefore(li,listContainer.children[0]);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      
      li.addEventListener("click", function(e) {
          taskList.map(function(elem) {
            if(elem.id === id){
                e.target.classList.toggle("checked");
                elem.checked = !elem.checked;
                window.localStorage.setItem('taskList', JSON.stringify(taskList)); 
                }})});
      span.addEventListener("click", function(e) {
          taskList.map(function(elem, index) {
            if(elem.id === id) {
              e.target.parentElement.remove();
              taskList.splice(index, 1);
              window.localStorage.setItem('taskList', JSON.stringify(taskList));
              }})});
}
function showTaskList() {
  listContainer.innerHTML = '';
  taskList = window.localStorage.getItem('taskList')
  ? JSON.parse(window.localStorage.getItem('taskList'))
  : [];
  if(taskList) {
    taskList.map(elem => {
      addTaskBlock(elem.id,elem.text,elem.checked);
  });
}}
showTaskList();
inputBox.addEventListener('keypress', function(e) {
  if(e.keyCode === 13) {
    addTask();
  }
})

//about pop-up
function info() {
    document.querySelector('.modal_box_bg').style.display = 'flex';
}
function infoBack() {
  document.querySelector('.modal_box_bg').style.display = 'none';
}