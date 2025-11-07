const localKey = "entradas_sansanmark";

const createEntrada = (entrada) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lista = [...lista, entrada];
    localStorage.setItem(localKey, JSON.stringify(lista));
}

const getEntradas = () => {
    const data = localStorage.getItem(localKey);
    if(data != null){
        return JSON.parse(data);
    }
    return [];
}

const deleteAllEntradas = () => {
    localStorage.removeItem(localKey);
}

export { createEntrada, getEntradas, deleteAllEntradas };
