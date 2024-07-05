const formulario = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itemArmazenado = JSON.parse(localStorage.getItem("armazenamentoDeItens")) || []

itemArmazenado.forEach((item) => {
    criaItem(item)
})

function criaItem (itemAdicionado) {

    const novoItemCadastrado = document.createElement('li')
    novoItemCadastrado.classList.add("item")

    const quantidadeItens = document.createElement('strong')
    quantidadeItens.innerHTML = itemAdicionado.quantidade
    quantidadeItens.dataset.id = itemAdicionado.id

    novoItemCadastrado.appendChild(quantidadeItens)
    novoItemCadastrado.innerHTML += itemAdicionado.nome

    novoItemCadastrado.appendChild(botaoDeleta(itemAdicionado.id))

    lista.appendChild(novoItemCadastrado)

}

function atualizaItem (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

formulario.addEventListener("submit", (capturou) => {
    capturou.preventDefault()

    const nome = capturou.target.elements['nome']
    const quantidade = capturou.target.elements['quantidade']

    const existe = itemArmazenado.find(item => item.nome === nome.value)

    const armazenamentoDeItens = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        armazenamentoDeItens.id = existe.id

        atualizaItem(armazenamentoDeItens)

        itemArmazenado[itemArmazenado.findIndex(item => item.id === existe.id)] = armazenamentoDeItens
    }

    else {
        armazenamentoDeItens.id = itemArmazenado[itemArmazenado.length -1] ? (itemArmazenado[itemArmazenado.length -1]).id + 1 : 0
        criaItem(armazenamentoDeItens)
        itemArmazenado.push(armazenamentoDeItens)

    }

    localStorage.setItem("armazenamentoDeItens", JSON.stringify(itemArmazenado))

    nome.value = ""
    quantidade.value = ""

})

function botaoDeleta (id) {
    const botaoDelete = document.createElement("button")
    botaoDelete.innerText = "x"
    botaoDelete.classList.add("botao-deleta");

    botaoDelete.addEventListener("click", function() {
        deletaItem(this.parentNode, id)
    })

    return botaoDelete
}

function deletaItem (tagHTML, id) {
    tagHTML.remove()

    itemArmazenado.splice(itemArmazenado.findIndex(item => item.id === id), 1)

    localStorage.setItem("armazenamentoDeItens", JSON.stringify(itemArmazenado))
}