const procurar_pokemon_input = document.getElementById("pokemon");
const botaoBuscar = document.getElementById("buscar");
const resultado = document.getElementById("resultado");

function procurar_pokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`;

    return fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao buscar o Pokemon");
            return res.json();
        });
}

botaoBuscar.addEventListener("click", () => {
    const nome = procurar_pokemon_input.value.trim();
    if (nome == "") {
        resultado.innerHTML = "Por favor, digite o nome do Pokemon";
        return; 
    }

    resultado.style.display = "block";

    procurar_pokemon(nome).then(data => {
        const tipos = data.types.map(tipo => tipo.type.name).join(", ");

        resultado.innerHTML = `
            <h2> ${data.name.toUpperCase()}</h2>
            <div id="informacoes">
            <img src="${data.sprites.front_default}" alt="${data.name}" />
                <div id="dados">
                    <p> Altura: ${data.height} Cm </p>
                    <p> Peso: ${data.weight} Kg </p>
                </div> 
            </div>
            <div id="elemento">
                <div id = escrita_elemento>
                    <p> Pokemon Type </p>
                </div>
                <p> ${tipos} </p>
            </div>
        `;
    })
    .catch(err => {
        resultado.innerHTML = "Pokemon não encontrado";
    });
});