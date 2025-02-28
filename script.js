
document.addEventListener('DOMContentLoaded', function() {
    // 1. Cria elemento de áudio
    const clickSound = new Audio('https://firebasestorage.googleapis.com/v0/b/audiodosite.appspot.com/o/explainer-video-app-click-davies-aguirre-2-2-00-01.mp3?alt=media&token=68e54ec8-830f-4806-8e06-dcf2c2be1690');
    
    // 2. Seleciona todos elementos clicáveis
    const clickableElements = document.querySelectorAll(
        'a, button, [onclick], input[type="button"], input[type="submit"], [role="button"], [data-clickable]'
    );

    // 3. Função para tocar o som
    function playClickSound(event) {
        // Reinicia o áudio para permitir repetições rápidas
        clickSound.currentTime = 0;
        
        // Tenta reproduzir e trata possíveis erros
        clickSound.play().catch(error => {
            console.log('Reprodução de áudio preventivamente bloqueada:', error);
        });
    }

    // 4. Adiciona o event listener a todos elementos clicáveis
    clickableElements.forEach(element => {
        element.addEventListener('click', playClickSound);
    });

    // 5. Trata elementos dinâmicos (MutationObserver para elementos carregados após o DOM)
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Verifica se é elemento
                    const newClickables = node.querySelectorAll(
                        'a, button, [onclick], input[type="button"], input[type="submit"], [role="button"], [data-clickable]'
                    );
                    newClickables.forEach(newElement => {
                        newElement.addEventListener('click', playClickSound);
                    });
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
