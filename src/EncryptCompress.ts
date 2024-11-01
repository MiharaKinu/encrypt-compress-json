import CryptoJS from 'crypto-js';
import LZString from 'lz-string';

// 定义接口
interface EncryptCompressInterface {
    encrypt(data: any): string;
    decrypt(encryptedText: string): any;
    compress(data: string): string;
    decompress(compressedData: string): string | null;
    urlEncode(data: string): string;
    urlDecode(encodedData: string): string;
    encode(data: any): string;
    decode(encodedData: string): any;
}

export class EncryptCompress implements EncryptCompressInterface {
    private secretKey: string;

    constructor(secretKey: string) {
        if (!secretKey || secretKey.trim() === '') {
            throw new Error('Secret key cannot be empty');
        }
        this.secretKey = secretKey;
    }

    encrypt(data: any): string {
        const jsonString = JSON.stringify(data);
        const encrypted = CryptoJS.AES.encrypt(jsonString, this.secretKey).toString();
        return encrypted;
    }

    decrypt(encryptedText: string): any {
        const bytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    }

    compress(data: string): string {
        const compressed = LZString.compressToBase64(data);
        return compressed;
    }

    decompress(compressedData: string): string | null {
        const decompressed = LZString.decompressFromBase64(compressedData);
        return decompressed;
    }

    urlEncode(data: string): string {
        return encodeURIComponent(data);
    }

    urlDecode(encodedData: string): string {
        return decodeURIComponent(encodedData);
    }

    encode(data: any): string {
        const encrypted = this.encrypt(data);
        const compressed = this.compress(encrypted);
        const encoded = this.urlEncode(compressed);
        return encoded;
    }

    decode(encodedData: string): any {
        const decoded = this.urlDecode(encodedData);
        const decompressed = this.decompress(decoded);
        if (decompressed === null) {
            throw new Error('Decompression failed');
        }
        const decrypted = this.decrypt(decompressed);
        return decrypted;
    }
}
