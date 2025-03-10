window.abrirLocalExplorer = (caminho) => {
    if (!caminho) {
        console.error("Caminho inválido!");
        return;
    }
    let caminhoFormatado = caminho.trim().replace(/\\/g, "/"); // Converte barras invertidas    
    window.location.href = `localexplorer:${caminhoFormatado}`;
};
