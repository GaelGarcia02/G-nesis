import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Agregar typeUser al payload si existe
    const payloadWithUserType = {
      ...payload,
      typeUser: payload.typeUser, // Incluye typeUser en el payload si está presente
    };

    // Firmar el token con el payload actualizado
    jwt.sign(
      payloadWithUserType,
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
