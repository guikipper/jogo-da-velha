const box = document.querySelectorAll('.box')
const current_player = document.getElementById('current_player')
const winner = document.getElementById('winner')
const restart_button = document.getElementById('restart_button')

let check_turno = true;
const PLAYER_X = "X";
const PLAYER_O = "O";

let position_X = []
let position_Y = []

const POSITIONS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['1', '5', '9'],
    ['3', '5', '7']
]

box.forEach((id)=> {
    id.addEventListener('mousedown',()=>{
        play(id)
    })
})

function play(id) {
    if (id.innerHTML == "") { //se o box estiver vazio
        let turno = check_turno ? PLAYER_X : PLAYER_O //será checado de quem é a vez -- a variável turno recebe X ou O
        id.innerHTML = `<p>${turno}<p/>` //adiciona a jogada no box
        check_turno = !check_turno //e o turno é invertido para a próxima jogada ser do outro jogador
        current_player.innerHTML = check_turno ? 'X' : 'O' //exibição da vez do jogador

        if (turno === PLAYER_X) { //se for a vez do X
            position_X.push(id.id); //a posição que ele jogou será armazeada
        } else {
            position_Y.push(id.id); //mesma coisa para o Y
        }

        /*
        if (position_X.length >= 3 || position_Y.length >= 3) {
            console.log('Agora sim chama')
            checkWinner()
        } */
        checkWinner() //chama a função que verifica vitória
    } else {
        console.log('Esse ID já foi utilizado.')
    }
}

function checkWinner () {

    for (let i = 0; i < POSITIONS.length; i++) { //percorre todas as possibilidades de vitória
        const [pos1, pos2, pos3] = POSITIONS[i]; //armazena as possibilidades atuais em variaveis separadas
        if (position_X.includes(pos1) && position_X.includes(pos2) && position_X.includes(pos3)) { //verifica se X possui três posições vencedoras
            console.log('Ganhou A')
            winner.innerHTML = "Jogador X venceu"
            reset()
        } else if (position_Y.includes(pos1) && position_Y.includes(pos2) && position_Y.includes(pos3)) { //verifica se O possui três posições vencedoras
            console.log('Ganhou B')
            winner.innerHTML = "Jogador O venceu"
            reset()
        } 
    }
}

restart_button.addEventListener('mousedown',()=>{
    clean()
    reset()
    free_box()
})

function reset() {
    position_X = [];
    position_Y = [];
    check_turno = true;
    current_player.innerHTML = check_turno ? 'X' : 'O'
    block_box()
}

function clean() {
    box.forEach((id)=>{
        id.innerHTML = ""
    })
}

function block_box() {
    box.forEach((id)=>{
        id.style.pointerEvents = "none"
    })
}

function free_box() {
    box.forEach((id)=>{
        id.style.pointerEvents = "auto"
    })
}