window.quillIndexedDBEventos = {
    dbName: "EventosDB",
    storeName: "EventosStore",
    instance: null,

    init: function () {
        let editorContainer = document.getElementById('editoreventos');

        if (!editorContainer) {
            console.error("❌ Elemento #editoreventos não encontrado. Aguardando renderização...");
            setTimeout(() => this.init(), 100); // Tenta inicializar novamente após 100ms
            return;
        }

        if (!editorContainer.__quill) { 
            editorContainer.innerHTML = ""; // Garante que o editor seja recriado
           
            let toolbarOptions = [
                [{ 'size': ['small', false, 'large', 'huge'] }], // Ativa os tamanhos
                ['bold', 'italic', 'underline'], // Formatação básica
                [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Listas
                [{ 'align': [] }], // Alinhamento
                ['clean'] // Remove formatação
            ];

            this.instance = new Quill('#editoreventos', { 
                theme: 'snow',
                modules: {
                    toolbar: toolbarOptions
                },
                formats: ['size', 'bold', 'italic', 'underline', 'list', 'align']
            });        
            editorContainer.__quill = this.instance; // Salva a instância no DOM
            this.loadContent();
        }
    },

    openDB: function () {
        return new Promise((resolve, reject) => {
            let request = indexedDB.open(this.dbName, 1);

            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                if (!db.objectStoreNames.contains("EventosStore")) {
                    db.createObjectStore("EventosStore", { keyPath: "id" });
                }
            };

            request.onsuccess = function (event) {
                resolve(event.target.result);
            };

            request.onerror = function (event) {
                reject("Erro ao abrir o IndexedDB: " + event.target.errorCode);
            };
        });
    },

    saveContent: async function () {
        let db = await this.openDB();
        let transaction = db.transaction(["EventosStore"], "readwrite");
        let store = transaction.objectStore("EventosStore");

        let evento = { id: 1, content: this.instance.root.innerHTML };
        store.put(evento);

        return new Promise((resolve, reject) => {
            transaction.oncomplete = () => resolve("Conteúdo salvo no IndexedDB!");
            transaction.onerror = () => reject("Erro ao salvar no IndexedDB.");
        });
    },

    loadContent: async function () {
        let db = await this.openDB();
        let transaction = db.transaction(["EventosStore"], "readonly");
        let store = transaction.objectStore("EventosStore");
        let request = store.get(1);

        request.onsuccess = () => {
            if (request.result) {
                this.instance.root.innerHTML = request.result.content;
            }
        };

        request.onerror = () => {
            console.error("Erro ao carregar conteúdo do IndexedDB.");
        };
    },

    getEventos: async function () {
        let db = await this.openDB();
        let transaction = db.transaction(["EventosStore"], "readonly");
        let store = transaction.objectStore("EventosStore");
        let request = store.get(1);
    
        return new Promise((resolve, reject) => {
            request.onsuccess = () => {
                if (request.result && request.result.content) {
                    resolve(request.result.content); // Retorna os avisos corretamente
                } else {
                    resolve(""); // Retorna string vazia para que Blazor use a mensagem padrão
                }
            };
    
            request.onerror = () => {
                resolve(""); // Retorna string vazia mesmo em erro
            };
        });
    }   
    
};