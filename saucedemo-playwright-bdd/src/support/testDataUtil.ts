import * as fs from "fs";
import * as path from "path";

export interface UserCredentials {
  username: string;
  password: string;
}

export function getUser(userKey: string): UserCredentials {
  const filePath = path.join(__dirname, "../../test-data/users.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = data[userKey];
  if (!user) {
    throw new Error(`No test data found for user key: ${userKey}`);
  }
  return user;
}
