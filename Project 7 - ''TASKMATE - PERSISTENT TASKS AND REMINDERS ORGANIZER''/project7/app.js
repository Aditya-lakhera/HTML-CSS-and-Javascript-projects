const LS_KEY = "taskmate.tasks.v1";
const form = document.getElementById("taskForm");
const titleIn = document.getElementById("title");
const notesIn = document.getElementById("notes");
const dueIn = document.getElementById("due");
const priorityIn = document.getElementById("priority");
const tasksNode = document.getElementById("tasks");
const search = document.getElementById("search");
const filterStatus = document.getElementById("filterStatus");
const sortBy = document.getElementById("sortBy");
const countNode = document.getElementById("count");
const editingId = document.getElementById("editingId");
const notifyPermBtn = document.getElementById("notifyPermBtn");//line 14
const clearAllBtn = document.getElementById("clearAllBtn");//line 17


let tasks= loadTask();


// ===== Storage helpers =====
function loadTask(){
    try{
        const row = localStorage.getItem(LS_KEY);
        return row ? JSON.parse(row) : [];
    }catch(e){
        console.error("Loading Error",e);
        return [];
    

    }
}

function saveTask(){
    try{
        localStorage.setItem(LS_KEY,JSON.stringify(tasks));
        render();
    }catch(e){
        console.error("Saving Error",e);
    }
}


//unique ID function --- // ===== Utilities =====
function uid(){
    return Date.now().toString(36) + Math.random().toString(36).slice(2,8);

}

function fmtDate(d){
    try{
        const dt = new Date(d);
        if(isNaN (dt)) return "";
        return dt.toLocaleDateString();

    }catch(e){
        console.error("Formatting Error",e);
        return "";
    }

}