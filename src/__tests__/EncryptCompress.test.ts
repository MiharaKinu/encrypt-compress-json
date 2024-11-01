import { EncryptCompress } from '../EncryptCompress';

describe('EncryptCompress', () => {
    const secretKey = 'test-secret-key';
    let encryptCompress: EncryptCompress;

    beforeEach(() => {
        encryptCompress = new EncryptCompress(secretKey);
    });

    describe('加密和解密', () => {
        test('应该能够正确加密和解密对象数据', () => {
            const testData = { name: '张三', age: 25 };
            const encrypted = encryptCompress.encrypt(testData);
            const decrypted = encryptCompress.decrypt(encrypted);
            expect(decrypted).toEqual(testData);
        });

        test('应该能够处理不同类型的数据', () => {
            const testCases = [
                123,
                'Hello 世界',
                [1, 2, 3],
                { a: 1, b: '2' },
                true,
                null
            ];

            testCases.forEach(testCase => {
                const encrypted = encryptCompress.encrypt(testCase);
                const decrypted = encryptCompress.decrypt(encrypted);
                expect(decrypted).toEqual(testCase);
            });
        });
    });

    describe('压缩和解压缩', () => {
        test('应该能够正确压缩和解压缩字符串', () => {
            const testString = '这是一个测试字符串'.repeat(100);
            const compressed = encryptCompress.compress(testString);
            const decompressed = encryptCompress.decompress(compressed);
            expect(decompressed).toBe(testString);
        });

        test('压缩后的字符串应该比原始字符串短', () => {
            const testString = '测试数据'.repeat(100);
            const compressed = encryptCompress.compress(testString);
            expect(compressed.length).toBeLessThan(testString.length);
        });
    });

    describe('URL编码和解码', () => {
        test('应该能够正确编码和解码包含特殊字符的字符串', () => {
            const testString = 'Hello 世界!@#$%^&*()';
            const encoded = encryptCompress.urlEncode(testString);
            const decoded = encryptCompress.urlDecode(encoded);
            expect(decoded).toBe(testString);
        });
    });

    describe('构造函数测试', () => {
    it('should throw error when secret key is empty', () => {
        expect(() => new EncryptCompress('')).toThrow('Secret key cannot be empty');
    });

    it('should throw error when secret key contains only spaces', () => {
        expect(() => new EncryptCompress('   ')).toThrow('Secret key cannot be empty');
        });
    });

    describe('综合处理', () => {
        test('encode 和 decode 应该能够正确处理复杂对象', () => {
            const testData = {
                name: '张三',
                age: 25,
                hobbies: ['读书', '游戏'],
                address: {
                    city: '北京',
                    street: '长安街'
                }
            };
            const processed = encryptCompress.encode(testData);
            const result = encryptCompress.decode(processed);

            expect(result).toEqual(testData);
        });

        test('处理无效数据时应该抛出错误', () => {
            expect(() => {
                encryptCompress.decode('invalid-data');
            }).toThrow();
        });
    });
});
