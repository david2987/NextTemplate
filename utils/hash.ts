const argon2 = require("argon2");

export async function generaHash(password: string) {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (err) {
        return err;
    }
}

export async function comparaPassword(
    passwordOrigen: string,
    passwordDestino: string
) {
    try {
        if (await argon2.verify(passwordOrigen, passwordDestino)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return err;
    }
}
