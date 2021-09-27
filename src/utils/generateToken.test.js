import { generateToken } from "./generateToken";

test('should generate Token', () => {
    expect(generateToken()).toHaveProperty("expiration");
    expect(generateToken()).toHaveProperty("hashedToken");
    expect(generateToken()).toHaveProperty("token");
})