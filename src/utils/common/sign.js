import { createHash } from "crypto";
export default class SignMIddlePlatform {
  /**
   * Generate sign,the key is unique to each method
   */
  static getSign(username, method, timestamp, key) {
    let input =
      "username=" +
      username +
      "&method=" +
      method +
      "&timestamp=" +
      timestamp +
      key;
    const hash = createHash("sha512");
    hash.update(input);
    return hash.digest("hex");
  }
}
