document.addEventListener("DOMContentLoaded", function() {

    // --- Lógica da Tela de Boas-Vindas e Música ---
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const startButton = document.getElementById('start-button');
    const backgroundMusic = document.getElementById('background-music');
    const storyContainer = document.getElementById('story-container');

    startButton.addEventListener('click', function() {
        // Tenta tocar a música
        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // A música começou a tocar com sucesso
                console.log("Música iniciada!");
            }).catch(error => {
                // O autoplay foi bloqueado, mas a ação do usuário permite
                console.log("A reprodução automática foi impedida, mas o clique do usuário deve resolver.");
                // Mesmo com erro, a UI continua
            });
        }

        // Esconde a tela de boas-vindas
        welcomeOverlay.classList.add('hidden');
        
        // Mostra o conteúdo principal
        storyContainer.classList.add('visible');
    });

    // --- Lógica da Animação de Scroll ---
    const chapterContents = document.querySelectorAll('.chapter-content');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: para a animação acontecer só uma vez
                // observer.unobserve(entry.target);
            } else {
                 // Opcional: para a animação acontecer toda vez que rolar
                 entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.3 // A animação começa quando 30% do item estiver visível
    });

    chapterContents.forEach(content => {
        observer.observe(content);
    });

});