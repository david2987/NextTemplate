import argon2 from "argon2";

async function verificarContraseña(pass) {
  const password = pass;
  const hashedPassword = await argon2.hash(pass);

  const isValid = await argon2.verify(hashedPassword, password);

  if (isValid) {
    console.log("✅ La contraseña es válida.");
  } else {
    console.log("❌ La contraseña es incorrecta.");
  }
}

verificarContraseña("123456");
