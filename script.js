function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function validarTelefone(telefone) {
  const regex = /^\(?[1-9]{2}\)? ?9[0-9]{4}-?[0-9]{4}$/;
  return regex.test(telefone);
}

function validarCEP(cep) {
  return /^\d{8}$/.test(cep);
}

function validarEstado(estado) {
  const estados = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];
  return estados.includes(estado.toUpperCase());
}

function mostrarErro(input, mensagem) {
  let container =
    input.type === "checkbox" || input.type === "radio"
      ? input.closest("fieldset") || input.parentElement
      : input.parentElement;

  let erro = container.querySelector(".erro");
  if (!erro) {
    erro = document.createElement("p");
    erro.classList.add("erro");
    container.appendChild(erro);
  }

  erro.textContent = mensagem;
  erro.style.display = "block";
  input.classList.add("input-erro");
}

function limparErros() {
  document.querySelectorAll(".erro").forEach((erro) => erro.remove());
  document
    .querySelectorAll(".input-erro")
    .forEach((campo) => campo.classList.remove("input-erro"));
}

function validarFormulario(event) {
  event.preventDefault();
  let valido = true;

  const nome = document.getElementById("nome");
  const dataNascimento = document.getElementById("data-nascimento");
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const estado = document.getElementById("estado");
  const trilhas = document.querySelectorAll("input[name='trilha']");
  const termos = document.getElementById("termos");
  const numero = document.getElementById("numero");

  document
    .querySelectorAll("input[required], select[required]")
    .forEach((campo) => {
      if (!campo.value.trim()) {
        mostrarErro(campo, "⚠ Este campo é obrigatório");
        valido = false;
      } else if (campo.type === "email" && !validarEmail(campo.value)) {
        mostrarErro(campo, "⚠ Insira um e-mail válido");
        valido = false;
      }
    });

  if (dataNascimento && dataNascimento.value) {
    const nascimento = new Date(dataNascimento.value);
    if (isNaN(nascimento.getTime())) {
      mostrarErro(dataNascimento, "⚠ Data de nascimento inválida");
      valido = false;
    } else {
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      const dia = hoje.getDate() - nascimento.getDate();
      const idadeReal = mes < 0 || (mes === 0 && dia < 0) ? idade - 1 : idade;

      if (idadeReal < 16) {
        mostrarErro(dataNascimento, "⚠ Você precisa ter pelo menos 16 anos");
        valido = false;
      }
    }
  }

  if (cpf && !validarCPF(cpf.value)) {
    mostrarErro(cpf, "⚠ CPF inválido");
    valido = false;
  }

  if (telefone && !validarTelefone(telefone.value.replace(/\D/g, ""))) {
    mostrarErro(telefone, "⚠ Telefone inválido. Ex: (11) 91234-5678");
    valido = false;
  }

  if (cep && !validarCEP(cep.value.replace(/\D/g, ""))) {
    mostrarErro(cep, "⚠ CEP inválido. Deve conter 8 números");
    valido = false;
  }

  if (estado && !validarEstado(estado.value)) {
    mostrarErro(estado, "⚠ Estado inválido. Ex: SP, RJ, MG");
    valido = false;
  }

  if (numero && !/^\d+$/.test(numero.value.trim())) {
    mostrarErro(numero, "⚠ O número deve conter apenas dígitos");
    valido = false;
  }

  if (nome && nome.value.trim().length < 8) {
    mostrarErro(nome, "⚠ O nome deve ter no mínimo 8 caracteres");
    valido = false;
  }

  if (termos && !termos.checked) {
    mostrarErro(termos, "⚠ Você precisa aceitar os termos");
    valido = false;
  }

  const selecionadas = Array.from(trilhas).filter((t) => t.checked);
  const trilhaContainer =
    trilhas[0].closest("fieldset") || trilhas[0].parentElement;

  if (selecionadas.length === 0) {
    mostrarErro(trilhaContainer, "⚠ Escolha uma trilha");
    valido = false;
  } else if (selecionadas.length > 1) {
    mostrarErro(trilhaContainer, "⚠ Escolha apenas uma trilha");
    valido = false;
  }

  return valido;
}

function salvarDados() {
  const dados = {};
  document.querySelectorAll("input, select").forEach((campo) => {
    if (campo.type !== "file") {
      dados[campo.id] = campo.type === "checkbox" ? campo.checked : campo.value;
    }
  });
  localStorage.setItem("formulario", JSON.stringify(dados));
}

function preencherFormulario() {
  const dados = JSON.parse(localStorage.getItem("formulario"));
  if (dados) {
    for (let campo in dados) {
      const elemento = document.getElementById(campo);
      if (elemento) {
        elemento.value = dados[campo];
        if (elemento.type === "checkbox") {
          elemento.checked = dados[campo];
        }
      }
    }
  }
}

function obterTrilhaSelecionada() {
  const checkboxes = document.querySelectorAll('input[name="trilha"]');
  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      const card = checkbox.closest(".card");
      return card.querySelector(".linguagem").innerText;
    }
  }
  return "";
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("modo-escuro", document.body.classList.contains("dark"));
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  preencherFormulario();

  const darkModeBtn = document.getElementById("toggle-dark-mode");
  if (darkModeBtn) darkModeBtn.addEventListener("click", toggleDarkMode);

  if (localStorage.getItem("modo-escuro") === "true") {
    document.body.classList.add("dark");
  }

  const trilhas = document.querySelectorAll("input[name='trilha']");
  trilhas.forEach((trilha) => {
    trilha.addEventListener("change", () => {
      trilhas.forEach((t) => {
        if (t !== trilha) t.checked = false;
      });
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    limparErros();
    const valido = validarFormulario(e);

    if (!valido) return;

    salvarDados();

    const idUsuario = document.getElementById("id-usuario").value;
    const senha = document.getElementById("senha").value;

    const usuariosExistentes =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    const idJaCadastrado = usuariosExistentes.some((u) => u.id === idUsuario);

    if (idJaCadastrado) {
      alert("⚠ Este ID de usuário já está cadastrado. Tente outro.");
      return;
    }

    const novoUsuario = {
      id: idUsuario,
      senha: senha,
      nome: document.getElementById("nome").value.trim(),
      dataNascimento: document.getElementById("data-nascimento").value,
      sexo: document.getElementById("sexo").value,
      email: document.getElementById("email").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      cpf: document.getElementById("cpf").value.trim(),
      cep: document.getElementById("cep").value.trim(),
      rua: document.getElementById("rua").value.trim(),
      numero: document.getElementById("numero").value.trim(),
      cidade: document.getElementById("cidade").value.trim(),
      estado: document.getElementById("estado").value.trim(),
      trilha: obterTrilhaSelecionada(),
      dataCadastro: new Date().toISOString(),
    };

    usuariosExistentes.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosExistentes));

    alert("✅ Inscrição realizada com sucesso!");
    localStorage.removeItem("formulario");
    limparErros();

    form.reset();
    window.location.href = "login.html";
  });
});
