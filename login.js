// document.getElementById("login-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const id = document.getElementById("login-id").value;
//   const senha = document.getElementById("login-senha").value;
//   const dados = JSON.parse(localStorage.getItem("formulario"));
//   const erroMsg = document.getElementById("login-erro");

//   if (dados && dados["user-id"] === id && dados["senha"] === senha) {
//     alert("✅ Login realizado com sucesso!");
//     window.location.href = "index.html"; // ou redirecionar para uma página interna
//   } else {
//     erroMsg.textContent = "❌ ID ou senha incorretos.";
//     erroMsg.style.display = "block";
//   }
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("login-form");

//   if (loginForm) {
//     loginForm.addEventListener("submit", (e) => {
//       e.preventDefault();

//       const id = document.getElementById("login-id").value;
//       const senha = document.getElementById("login-senha").value;

//       const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

//       const usuarioValido = usuarios.find(
//         (user) => user.id === id && user.senha === senha
//       );

//       if (usuarioValido) {
//         alert("Login realizado com sucesso!");
//         // Redireciona para página principal ou dashboard
//         window.location.href = "index.html";
//       } else {
//         alert("ID de usuário ou senha inválidos.");
//       }
//     });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("login-id").value.trim();
    const password = document.getElementById("login-senha").value;

    const storedUser = JSON.parse(localStorage.getItem("usuario"));

    const mensagemErro = document.getElementById("mensagem-erro");

    if (
      !storedUser ||
      storedUser.id !== userId ||
      storedUser.senha !== password
    ) {
      mensagemErro.textContent = "ID ou senha incorretos. Tente novamente.";
      mensagemErro.style.color = "red";
    } else {
      mensagemErro.style.color = "green";
      mensagemErro.textContent = "Login bem-sucedido! Redirecionando...";

      setTimeout(() => {
        window.location.href = "boas-vindas.html"; // Crie esta tela para dar boas-vindas ao usuário
      }, 1500);
    }
  });
});
