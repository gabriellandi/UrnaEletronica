let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-1-2 span');
let descricao = document.querySelector('.d-1-1-4');
let aviso = document.querySelector('.d-2');
let fotos = document.querySelector('.d-1-2');
let numeros = document.querySelector('.d-1-1-3');
let nulo = document.querySelector('.voto_nulo');
let descBranco = document.querySelector('.voto_branco');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false

    for(let i=0;i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
        numeroHtml += '<div class="numero"></div>';
        };
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    fotos.innerHTML = '';
    numeros.innerHTML = numeroHtml;
    nulo.style.display = 'none';
    descBranco.style.display = 'none';
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotosHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small === true) {
                fotosHTML+= `<div class="d-1-image vice"><img src="Assets/images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML+= `<div class="d-1-image"><img src="Assets/images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`
            }
        }

        fotos.innerHTML = fotosHTML
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block'
        nulo.style.display = 'block'
    }
};

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface()
        };
    }
};
function branco() {
    if(numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descBranco.style.display = 'block'
    } else {
        alert("Para votar em BRANCO, pressiona o botão CORRIGE pois você já digitou algum numero")
    }
};
function corrige() {
    comecarEtapa();
};
function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true || numero.length === etapa.numeros) {
        votoConfirmado = true
    }
    
    if(votoConfirmado = true) {
        etapaAtual += 1;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            console.log('FIM!')
        }
    }
};


comecarEtapa();