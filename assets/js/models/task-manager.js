class TaskManager {
    constructor(containerId, createTaskFormId) {
        this.containerId = containerId;
        this.createTaskFormId = createTaskFormId;
        this.tasks = [];

        document.getElementById(this.createTaskFormId)
            .addEventListener("submit", (event) => this.onTaskFormSubmit(event));
    }

    onTaskFormSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const task = Object.fromEntries(new FormData(form).entries());
        if(task.name.trim() !== "") {
            this.add(task);
            form.reset();
            this.render();
        }
    }

    addButton() {
        const addText = document.getElementById("taskButton");
        addText.addEventListener("click", () => this.add());

    }

    add(task) {
            this.tasks.push({ 
                id: self.crypto.randomUUID(),
                name: task.name
            });        
    }

    delete(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    buildTaskHtml(task) {
        const taskNode = document.createElement("li");
        

        taskNode.setAttribute("id", task.id);
        taskNode.classList.add("list-group-item", "d-flex", "align-items-baseline");

        let taskNameNode = document.createElement("div");
        taskNameNode.setAttribute("id", "taskNameNode")
        taskNameNode.classList.add("me-auto");
        taskNameNode.textContent = task.name;
        taskNode.appendChild(taskNameNode);

        let clickedTimes = 0;
        const incrementClick = () => {
            clickedTimes++;
        };
        const reset = () => {
            clickedTimes = 0;
        };

        taskNode.addEventListener("click", () => {
            console.log("doble click detectado");
            incrementClick();
            setTimeout(() => {
              if (clickedTimes === 1) {
                taskNode.classList.toggle("bg-warning-subtle");
                taskNode.classList.toggle("text-warning-emphasi");
              } else if (clickedTimes >= 2) {
                taskNameNode.classList.toggle("text-decoration-line-through");
              }
              reset();
            }, 300);

           
        });



        //     taskNode.addEventListener("dblclick", () => {
        //         console.log("doble click hecho");
        //         // if (clickTimer) {
        //         //     clearTimeout(clickTimer);
        //         //     clickTimer = null;
        //         // }
        //         taskNameNode.classList.toggle("text-decoration-line-through");
        //     });


        const taskActionNode = document.createElement("div");
        taskActionNode.classList.add("d-flex", "gap-2");
        taskNode.appendChild(taskActionNode);

        const deleteTaskNode = document.createElement("i");
        deleteTaskNode.classList.add("fa", "fa-trash-o", "text-danger");
        deleteTaskNode.setAttribute("role", "button");
        taskActionNode.appendChild(deleteTaskNode);



        deleteTaskNode.addEventListener("click", () => {
            this.delete(task.id);
            this.render();
        });
        return taskNode;
    }

    render() {
        const container = document.getElementById(this.containerId);
        container.innerHTML = "";
        this.tasks.forEach(task => {
            container.appendChild(this.buildTaskHtml(task));
        });
    }




}




const words = ["a", "hola", "b", "a", "b"];

const wordsUnrepeat = words.reduce((wordsUnrepeat, word) => {
    wordsUnrepeat[word] = "";
    return wordsUnrepeat;
}, {})

const wordsUniques = Object.keys(wordsUnrepeat);
console.log(wordsUniques);