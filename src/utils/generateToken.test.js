import { generateToken, hashToken } from "./generateToken";
import crypto from 'crypto';

test('should generate Token', () => {
    expect(generateToken()).toHaveProperty("expiration");
    expect(generateToken()).toHaveProperty("hashedToken");
    expect(generateToken()).toHaveProperty("token");
});

test('should hash a token', () => {
    const token = '1234567890';
    const generated = crypto.createHash('sha256').update(token).digest('hex');
    expect(hashToken(token)).toMatch(generated);
});