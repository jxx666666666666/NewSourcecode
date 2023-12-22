import { axios } from "../../api/base";
export default class ITSToken {
  static async getAccessToken(eloc_id, ip) {
    let res = await axios.get("./data/rsaKey/privateKey_esb.keystore");
    try {
      if (res && res.data) {
        var rsaKey = res.data;
        // Assuming privateKeyStr is your Base64-encoded private key
        const privateKeyStr = rsaKey;
        const plainText = eloc_id + "_" + ip;

        const privateKeyBytes = Uint8Array.from(atob(privateKeyStr), (c) =>
          c.charCodeAt(0)
        );
        const algorithm = {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        };
        const importAlgorithm = {
          name: "RSA-OAEP",
          hash: { name: "SHA-256" },
        };
        const privateKey = await crypto.subtle.importKey(
          "pkcs8",
          privateKeyBytes,
          algorithm,
          false,
          ["decrypt"]
        );
        const plainTextBytes = new TextEncoder().encode(plainText);
        const decrypted = await crypto.subtle.decrypt(
          importAlgorithm,
          privateKey,
          plainTextBytes
        );
        const token = btoa(
          String.fromCharCode.apply(null, new Uint8Array(decrypted))
        );
        token = encodeURIComponent(encryptedToken);
        return token;
      }
      return null;
    } catch (error) {
      console.error("ITSToken", error);
      return null;
    }
  }
}
