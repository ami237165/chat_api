import * as bcrypt from 'bcrypt';
const SALT_ROUNDS = 10;

export class hashUtil {
  static async hashPassword(password: string): Promise<string> {
    console.log("pass ,",password);
    
    return await bcrypt.hash(password, SALT_ROUNDS);
  }

  static async comparePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
