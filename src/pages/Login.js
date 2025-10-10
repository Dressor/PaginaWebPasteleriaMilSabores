export default function Login() {

  return (
    <div>
       <main class="container py-5" style="max-width:560px;">
      <h1 class="brand-font text-choco mb-4">Iniciar sesión</h1>
      <form id="loginForm" class="needs-validation" novalidate>
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input type="email" class="form-control" id="lemail" required/>
          <div class="invalid-feedback">Ingresa tu correo.</div>
        </div>
        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="lpass" required minlength="6" maxlength="32"/>
          <div class="invalid-feedback">Ingresa tu contraseña.</div>
        </div>
        <button class="btn btn-choco" type="submit">Entrar</button>
      </form>
    </main>
    </div>
  );
}
