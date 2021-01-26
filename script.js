//Seletores
const form  = document.getElementById("tarefa-form");
const inputTarefa = document.getElementById("tarefaInput");
const listaTarefas = document.querySelector(".Lista");
const limparBtn = document.getElementById("limparBtn");


//Event Listeners
//_______________
loadEventListeners(); 
function loadEventListeners(){
    //Evento para adicionar Tarefas
form.addEventListener("submit", adicionarTarefa);
//Carretar Lista ao carregar o DOM.
document.addEventListener("DOMContentLoaded", carrergarTarefas  );
// Evento de limpar Lista de Tarefas
limparBtn.addEventListener("click", limparLista);
//Evento de Riscar ou retirar risco de tarefa; 
listaTarefas.addEventListener("click", funcaoRiscarTarefas)
}

//AdicionarTarefa

function adicionarTarefa(e){
    if(inputTarefa.value === ""){
        alert("Adicione uma Tarefa");
    }
    //Ativa Botão para Limpar Tarefas
    if(limparBtn.hasAttribute("disabled")){
        limparBtn.removeAttribute("disabled");
    }
    //Criação de um Elemento li
    const li = document.createElement("li");
    li.className ="tarefa";
    //Criação do nó do texto e adição ao elemento "li"
    li.appendChild(document.createTextNode(inputTarefa.value));
    //Criação do elemento link(tag a) para o icone
    const link = document.createElement("a");
    link.className ="check-tarefa";
    //Adição do html do ícone
    link.innerHTML =  "<i class='fa fa-check' aria-hidden='true'></i>"
    //Adicão do link ao elemento li
    li.appendChild(link);
    //Adição do li ao elemento ul
    listaTarefas.appendChild(li);
    //Armazenar no LocalStorage
    armazenaTarefa({tarefa: inputTarefa.value, feito:false});
    //Limpa a caixa de input da entrada
    inputTarefa.value = "";
    e.preventDefault();

}

//Armazenar Tarefa

function armazenaTarefa(tarefa){

   let tarefas; 

   if(localStorage.getItem("tarefas") === null) {
       tarefas = [];
   }else{
       tarefas = JSON.parse(localStorage.getItem("tarefas"));
   }
   tarefas.push(tarefa);
   localStorage.setItem("tarefas", JSON.stringify(tarefas));

}

//Carregar Tarefas do Local Storage
//_________________________________

function carrergarTarefas(){
    let tarefas; 
    if(localStorage.getItem("tarefas")=== null){
        tarefas = [];
    }else{
        tarefas = JSON.parse(localStorage.getItem("tarefas"));
    }

    tarefas.forEach(function(tarefa){
        //Criação do Elemento
        const li = document.createElement("li");
        li.className = "tarefa";

    //Criação do nó do texto e adição ao elemento "li"
    li.appendChild(document.createTextNode(tarefa.tarefa));
    if(tarefa.feito){
        li.classList.add("done");
    }
    //Criação do elemento link(tag a) para o icone
    const link = document.createElement("a");
    link.className ="check-tarefa";
    //Adição do html do ícone
    link.innerHTML =  "<i class='fa fa-check' aria-hidden='true'></i>";
    //Adicão do link ao elemento li
    li.appendChild(link);
    //Adição do li ao elemento ul
    listaTarefas.appendChild(li);
    });

    //Ativa botão para limpar lista
    if(limparBtn.hasAttribute("disabled")){
        limparBtn.removeAttribute("disabled");
    }
}

//Limpar Lista de tarefas

function limparLista(){
 while(listaTarefas.firstChild){
     listaTarefas.removeChild(listaTarefas.firstChild);
}
let atributo = document.createAttribute("disabled");
limparBtn.setAttributeNode(atributo);
localStorage.clear();
}


//Riscar Tarefa; 

function funcaoRiscarTarefas(e){
  if(e.target.parentElement.classList.contains("check-tarefa")){
      e.target.parentElement.parentElement.classList.toggle("done");
  }
  atualizaLocalStorage(e.target.parentElement.parentElement);
}

//Atualiza o LocalStorage

function atualizaLocalStorage(item){
   let tarefas;
   if(localStorage.getItem("tarefas") === null){
       tarefas = [];
   }else{
       tarefas = JSON.parse(localStorage.getItem("tarefas"));
   }

   tarefas.forEach(function(tarefa){
    if(item.textContent === tarefa.tarefa){
     item.classList.contains("done") ? (tarefa.feito = true) : (tarefa.feito = false);
    }
   });localStorage.setItem("tarefas", JSON.stringify(tarefas));
}