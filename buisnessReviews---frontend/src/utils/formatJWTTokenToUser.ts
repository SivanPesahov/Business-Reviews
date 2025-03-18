export function formatJWTTokenToUser(token: string): string | null {
  try {
    const decodedJwt = _parseJwt(token);
    if (!decodedJwt) return null;

    const {
      payload: { id },
    } = decodedJwt;

    return id;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
}

function _parseJwt(
  token: string
): { header: object; payload: { id: string }; signature: string } | null {
  try {
    const [header, payload, signature] = token.split(".");

    if (!header || !payload || !signature) {
      throw new Error("Invalid JWT token format.");
    }

    const fixedHeader = header.replace(/-/g, "+").replace(/_/g, "/");
    const fixedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");

    const decodedHeader = atob(fixedHeader);
    const decodedPayload = atob(fixedPayload);

    const headerObj = JSON.parse(decodedHeader);
    const payloadObj = JSON.parse(decodedPayload);

    return {
      header: headerObj,
      payload: payloadObj,
      signature,
    };
  } catch (error) {
    console.error("Failed to parse JWT token:", error);
    return null;
  }
}
