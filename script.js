const button = document.querySelector('.button-add-task') 
const input = document.querySelector('.input-task')
const compleatList = document.querySelector('.list-tasks')
//Constante button no documento HTML, selecione a class

let myListTasks = [] 
//Array que vai preenchendo a lista

function addNewTask(){
    myListTasks.push({
        task: input.value,
        checkTask: false
    })
    //Adicionando valor do input dentro do array

    input.value = ''
    //Limpa o input

    showTasks()
}

function showTasks(){
    let newLi = ''

    //myListTasks['estudar', 'fazer cafe']
    myListTasks.forEach( (item, index) =>{
        newLi = newLi + `
                <li class="task ${item.checkTask && "done"}">
                    <img src="assets/checked.png" alt="check na tarefa" onclick="checkTask(${index})">
                    <p>${item.task}</p>
                    <img src="assets/trash.png" alt="remover tarefa" onclick="deleteItem(${index})">
                </li>`
    })
    //forEach - Pegando 1 por 1 da myListTasks e criando uma nova Li
    //index - posição no array
    //newLi = newLi + Pega o que já tem anteriormente a adiciona o outro

    compleatList.innerHTML = newLi
    //Permite adicionar no HTML

    localStorage.setItem('Lista', JSON.stringify(myListTasks))
    //transforma em string e guarda no localStorage
}

function checkTask(index){
    myListTasks[index].checkTask = !myListTasks[index].checkTask

    showTasks()
}

function deleteItem(index){
    myListTasks.splice(index, 1)
    //splice - deletar itens no array de acordo com a posição

    showTasks()
    //mostrar novamente as tarefas após a função delete
}

function reload(){
    const localStorageTasks = localStorage.getItem("Lista")
    //pegar os itens do localstorage e jogar na const

    if(localStorageTasks){
        myListTasks = JSON.parse(localStorageTasks)
        //a lista de tasks vai receber o valor puxado
        //json parse transforma de string novamente em objeto
    }

    showTasks()
}

reload()
//chamar a função sempre que recarregar a pagina

button.addEventListener('click', addNewTask) 
//addEventListener Verifica eventos que ocorrem no botão
//Capturar evento de click
//Executar função getInputValue