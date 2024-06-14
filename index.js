const mainScreen = window.document.querySelector('.main');
const bottomMenu = window.document.querySelector('.bottom_menu');
const notesCount = window.document.getElementById('notes_count');
const notesList = window.document.getElementById('notes_list');
window.localStorage.setItem('editingNote', '');
let noteList = [];
let noteId = -1;

const removeNoteFromList = (id) => {
  noteList.map((elem, index) => {
    if(elem.id === id) noteList.splice(index, 1);
  });
  window.localStorage.setItem('noteList', JSON.stringify(noteList));
  notesList.innerHTML = '';
  onLoad();
}
const goToEdit = () => {
  noteList.map(elem => {
    if(elem.id === noteId){
      editingNote = {
        title: elem.title,
        text: elem.text,
        noteList: noteList,
        id: elem.id,
      }
      window.localStorage.setItem('editingNote', JSON.stringify(editingNote));
      window.location.href = 'notes.html';
    }
  });
  
}
const createNewNoteBlock = (id, noteTitle, noteDate) => {
  let MainDiv = window.document.createElement('div');
  let  NoteH= window.document.createElement('span');
  let NoteDate = window.document.createElement('span');
  let delIcon = window.document.createElement('img');
  NoteH.className = 'note_h';
  MainDiv.className = 'note_template';
  NoteDate.className = 'note_date';
  delIcon.className = 'delete_icon';
  delIcon.src = 'images/delete.svg';
  NoteDate.innerText = noteDate;
  NoteH.innerText = noteTitle;
  NoteH.addEventListener('click', () => {
    noteId = id;
    goToEdit();
  });
  delIcon.addEventListener('click', function() {  
    removeNoteFromList(id);
  });
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

const addNoteIconClick = () => {
  window.location.href = 'notes.html';
}

//Bottom-menu
const bottomMenuNotes = document.getElementById('bottom_menu_notes');
const bottomMenuToDos = document.getElementById('bottom_menu_todos');
const bottomMenuNotesSvg = document.getElementById('bottom_menu_notes_svg');
const bottomMenuToDosSvg = document.getElementById('bottom_menu_todos_svg');
const h1 = document.querySelector('h1');
const addNoteBtn = document.getElementById('add_note_button');
const listContainer = document.getElementById('list_container');
const inputBox = document.getElementById('input_box');
function ToDo() {
  bottomMenuNotes.classList = "bottom_menu_column_unactive";
  bottomMenuNotesSvg.classList = 'bottom_menu_img_unactive';
  bottomMenuToDos.classList = "bottom_menu_column_active";
  bottomMenuToDosSvg.classList = 'bottom_menu_img_active';
  h1.innerText = 'To-Dos';
  notesCount.style.display = 'none';
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
  notesCount.style.display = 'flex';
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
    addTaskBlock(object.id, object.text, false);
}}
function addTaskBlock(id,text,checked) {
      //creating Task DOM element
      let li = document.createElement('li')
      li.innerText = text;
      if(checked) {
        li.classList = "checked";
      }
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
      listContainer.insertBefore(li,listContainer.children[0]);
      

      //Checking task as done - event listener
      li.addEventListener("click", function(e) {
        taskList.map(function(elem) {
          if(elem.id === id){
              e.target.classList.toggle("checked");
              elem.checked = !elem.checked;
              window.localStorage.setItem('taskList', JSON.stringify(taskList)); 
              }})});

      //Deleting task - event listener
      span.addEventListener("click", function(e) {
          taskList.map(function(elem, index) {
            if(elem.id === id) {
              e.target.parentElement.remove();
              taskList.splice(index, 1);
              window.localStorage.setItem('taskList', JSON.stringify(taskList));
              }})});
}

//rendering content at startup
function showTaskList() {
  taskList = window.localStorage.getItem('taskList')
  ? JSON.parse(window.localStorage.getItem('taskList'))
  : [];
  if(taskList) {
    taskList.map(elem => {
      addTaskBlock(elem.id,elem.text,elem.checked);
  });
}}
showTaskList();

//InputBox event listener - on clicking Enter
inputBox.addEventListener('keypress', function(e) {
  if(e.keyCode === 13) {
    addTask();
  }
})

//about pop-up
function info() {
    document.querySelector('.modal_box_bg').style.display = 'flex';
    setTimeout(function() {
      document.querySelector('.modal_box_bg').style.opacity = '1';
    }, 0);
}
function infoBack() {
  document.querySelector('.modal_box_bg').style.opacity = '0';
  setTimeout(function() {
    document.querySelector('.modal_box_bg').style.display = 'none';
  }, 300);
  
}
document.querySelector('.modal_box_bg').addEventListener( 'click', (e) => {
	const withinBoundaries = e.composedPath().includes(document.querySelector(".modal_box_focus"));
	if ( ! withinBoundaries ) {
		infoBack()
	}
})
