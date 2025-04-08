document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = document.getElementById("login-id").value.trim();
    const password = document.getElementById("login-senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(
      (u) => u.id === userId && u.senha === password
    );

    const mensagemErro = document.getElementById("mensagem-erro");

    if (!usuarioValido) {
      mensagemErro.textContent = "❌ ID ou senha incorretos. Tente novamente.";
      mensagemErro.style.color = "red";
    } else {
      mensagemErro.style.color = "green";
      mensagemErro.textContent = "✅ Login bem-sucedido! Redirecionando...";

      setTimeout(() => {
        window.location.href = "boas-vindas.html";
      }, 1500);
    }
  });
});
