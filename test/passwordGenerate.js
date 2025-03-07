const argon2 = require("argon2");

(async () => {
  const hashedPassword = await argon2.hash("123456");
  console.log(hashedPassword);
})();
