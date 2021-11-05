var tabelaUsuarios = document.getElementById('tabela_usuarios')
var dataBaseRef = firebase.database().ref('usuarios/')
var rowIndex = 1

dataBaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key
        var childData = childSnapshot.val()

        var row = tabelaUsuarios.insertRow(rowIndex)
        var cellId = row.insertCell(0)
        var cellName = row.insertCell(1)
        cellId.appendChild(document.createTextNode(childKey))
        cellName.appendChild(document.createTextNode(childData.usuario_nome))

        rowIndex = rowIndex + 1
    })
})

function salvar_usuario() {
    var usuario_nome = document.getElementById('usuario_nome').value
    var uid = firebase.database().ref().child('usuarios').push().key

    var data = {
        usuario_id: uid,
        usuario_nome: usuario_nome
    }

    var updates = {}
    updates['/usuarios/' + uid] = data
    firebase.database().ref().update(updates)

    alert('O Usuário foi adicionado com sucesso..!')
    recarregar_pagina()
}

function atualizar_usuario() {
    var usuario_id = document.getElementById('usuario_id').value
    var usuario_nome = document.getElementById('usuario_nome').value

    var dado = {
        usuario_id: usuario_id,
        usuario_nome: usuario_nome
    }

    var atualizar = {}
    atualizar['/usuarios/' + usuario_id] = dado
    firebase.database().ref().update(atualizar)

    alert('O Usuário foi atualizado com sucesso..!')
    recarregar_pagina()
}

function deletar_usuario() {
    var usuario_id = document.getElementById('usuario_id').value
    firebase.database().ref().child('/usuarios/' + usuario_id).remove()
    alert('O Usuário foi deletado com sucesso..!')
    recarregar_pagina()
}

function recarregar_pagina() {
    window.location.reload()
}