// Funçao para recolher grupos
function toggleDropdown(group) {
    const icon = document.getElementById('icon-chevron');
    const submenu = document.getElementById(group);
    submenu.classList.toggle('hidden');
    icon.classList.toggle('rotate-90');
}

function toggleSubmenu(submenuId) {
    const submenu = document.getElementById(submenuId);
    const icon = submenu.previousElementSibling.querySelector('i.fas.fa-chevron-right');
    submenu.classList.toggle('hidden');
    icon.classList.toggle('rotate-90');
}


// script menu gooogle//
document.addEventListener('DOMContentLoaded', function () {
    const menus = document.querySelectorAll('.relative');

    menus.forEach(menu => {
        const button = menu.querySelector('button');
        const dropdown = menu.querySelector('.dropdown-menu');

        // Alterna a visibilidade do menu ao clicar no botão
        button.addEventListener('click', function (e) {
            e.stopPropagation(); // Impede que o evento se propague e feche imediatamente o dropdown
            dropdown.classList.toggle('hidden');
        });

        // Fecha o menu ao clicar fora do dropdown
        document.addEventListener('click', function (event) {
            if (!menu.contains(event.target)) {
                dropdown.classList.add('hidden');
            }
        });
    });
});

// SCRIPT CARROUSEL NOTICIAS ASCOM//
window.carousel = {
    currentIndex: 0,
    totalItems: 3,
    interval: null,

    init: () => {
        const items = document.querySelectorAll("#carousel .noticia");
        if (items.length === 0) return; // Evita erro caso não haja itens

        window.carousel.totalItems = items.length;
        window.carousel.updateCarousel();
    },

    updateCarousel: () => {
        const carouselElement = document.getElementById("carousel");
        if (!carouselElement || window.carousel.totalItems === 0) return;

        const offset = -window.carousel.currentIndex * 100;
        carouselElement.style.transform = `translateX(${offset}%)`;
    },

    showNextItem: () => {
        if (window.carousel.totalItems === 0) return;

        window.carousel.currentIndex = (window.carousel.currentIndex + 1) % window.carousel.totalItems;
        window.carousel.updateCarousel();
    },

    showPrevItem: () => {
        if (window.carousel.totalItems === 0) return;

        window.carousel.currentIndex = (window.carousel.currentIndex - 1 + window.carousel.totalItems) % window.carousel.totalItems;
        window.carousel.updateCarousel();
    },

    startAutoScroll: () => {
        if (window.carousel.interval) clearInterval(window.carousel.interval); // Impede múltiplas execuções

        window.carousel.interval = setInterval(() => {
            window.carousel.showNextItem();
        }, 5000);
    }
};

// script aniversariantes do dia//
// Função para formatar a data atual como "DD/MM"
function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Garante dois dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses começam de 0, então somamos 1
    return `${day}/${month}`;
}

// Função para o mês atual
function mostrarMesAtual() {
    const dataAtual = new Date();
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const mesAtual = meses[dataAtual.getMonth()];
    document.getElementById("mes-atual").textContent = mesAtual;
}

// Função para exibir somente os aniversariantes do dia
function showBirthdayOfTheDay() {
    const currentDate = getCurrentDate();
    const listItems = document.querySelectorAll('#birthday-list li');
    let hasBirthdayToday = false;

    listItems.forEach(item => {
        const birthday = item.getAttribute('data-date');
        if (birthday !== currentDate) {
            item.style.display = 'none'; // Esconde aniversariantes que não são do dia
        } else {
            item.style.display = 'list-item'; // Mostra aniversariante do dia
            hasBirthdayToday = true;
        }
    });

    const noBirthdayMessage = document.getElementById('no-birthday-message');
    if (!hasBirthdayToday) {
        noBirthdayMessage.style.display = 'block';
    } else {
        noBirthdayMessage.style.display = 'none';
    }
}

// Função para mostrar toda a lista de aniversariantes
function showFullList() {
    const listItems = document.querySelectorAll('#birthday-list li');
    listItems.forEach(item => {
        item.style.display = 'list-item'; // Exibe todos os aniversariantes
    });

    const noBirthdayMessage = document.getElementById('no-birthday-message');
    noBirthdayMessage.style.display = 'none';
}

// Função para alternar entre os aniversariantes do dia e a lista completa
let isFullListVisible = false;
document.getElementById('MostrarListaCompleta').addEventListener('click', () => {
    const button = document.getElementById('MostrarListaCompleta');
    if (isFullListVisible) {
        showBirthdayOfTheDay();
        button.innerHTML = '<i class="fas fa-list mr-2"></i> Lista Completa'; // Adiciona o ícone
    } else {
        showFullList();
        button.innerHTML = '<i class="fas fa-list mr-2"></i> Voltar'; // Adiciona o ícone
    }
    isFullListVisible = !isFullListVisible;
});

// Função para disparar a chuva de confetes
function iniciarChuvaDeConfetes() {
    confetti({
        particleCount: 900, // Número de partículas
        angle: 90, // Ângulo da direção
        spread: 100, // Abertura do disparo
        origin: { y: 0.5 } // Posição de origem dos confetes
    });
}

// Adiciona o evento de clique para cada item de aniversário
function addClickEventToBirthdays() {
    setTimeout(() => {
        const aniversariantes = document.querySelectorAll("#birthday-list li");
        if (aniversariantes.length > 0) {
            aniversariantes.forEach(item => {
                item.addEventListener("click", function () {
                    iniciarChuvaDeConfetes(); // Dispara a chuva de confetes
                    exibirPalmas(); // Exibe emojis de palmas
                });
            });
        }
    }, 500); // Aguarde um pouco para garantir que os elementos estão na DOM
}
// EXIBIR PALMAS//
function exibirPalmas() {
    console.log("Exibindo palmas animadas! 👏👏👏");

    const palmas = document.createElement("div");
    palmas.innerText = "👏👏👏";
    palmas.className = "fixed top-1/2 left-1/2 text-4xl animate-bounce"; 
    palmas.style.transform = "translate(-50%, -50%)";
    palmas.style.opacity = "1";
    palmas.style.transition = "opacity 1s ease-out, transform 1s ease-out";

    document.body.appendChild(palmas);

    setTimeout(() => {
        palmas.style.opacity = "0";
        palmas.style.transform = "translate(-50%, -70%) scale(1.5)"; 
        setTimeout(() => palmas.remove(), 1000);
    }, 500);
}
// Função para executar assim que o DOM estiver carregado
window.addEventListener('DOMContentLoaded', () => {
    mostrarMesAtual(); // Exibe o mês atual
    showBirthdayOfTheDay(); // Exibe os aniversariantes do dia
});


// Executa a função filtrar RAMAIS
function filtrarTabela() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("ramaisTable");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}

// Função para o bem-vindo digitado
// Definir as variáveis ANTES de chamar a função
function typeText(text, callback) {
    const textElement = document.getElementById('text');
    if (!textElement) {
        console.error("Elemento #text não encontrado!");
        return;
    }

    textElement.textContent = ''; // Limpar o texto antes de iniciar
    let i = 0;

    function typingEffect() {
        if (i < text.length) {
            textElement.textContent += text.charAt(i);
            i++;
            setTimeout(typingEffect, 80);
        } else {
            setTimeout(() => {
                let j = text.length;
                function reverseTypingEffect() {
                    if (j >= 0) {
                        textElement.textContent = text.substring(0, j);
                        j--;
                        setTimeout(reverseTypingEffect, 30);
                    } else {
                        setTimeout(callback, 800);
                    }
                }
                reverseTypingEffect();
            }, 500);
        }
    }
    typingEffect();
}

function startAnimation() {
    const textElement = document.getElementById('text');

    if (!textElement) {
        console.error("Erro: O elemento #text não foi encontrado!");
        return;
    }

    typeText("Olá, bem-vindo(a)!", () => {
        setTimeout(() => {
            typeText("Intranet - SMTT Aracaju", () => {
                setTimeout(startAnimation, 100);
            });
        }, 1000);
    });
}


