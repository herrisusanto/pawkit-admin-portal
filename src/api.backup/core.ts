import { generateClient } from "aws-amplify/api";

export const graphqlClient = generateClient();

const BASE62_CHARSET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function hashToBase62(hash: Uint8Array, length: number): string {
  let bigint = BigInt(
    "0x" +
      Array.from(hash)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
  );

  let base62 = "";
  while (bigint > 0) {
    base62 = BASE62_CHARSET[Number(bigint % 62n)] + base62;
    bigint /= 62n;
  }

  // Ensure the base-62 string is the specified length
  return base62.padStart(length, "0").substring(0, length);
}

export async function generateCustomerSpecificShortId(
  customerId: string,
  uuid: string,
  length: number
): Promise<string> {
  const combinedString = customerId + uuid;
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedString);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = new Uint8Array(hashBuffer);
  return hashToBase62(hashArray, length);
}
