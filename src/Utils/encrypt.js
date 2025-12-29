import CryptoJS from 'crypto-js';

export const encryptData = (data) => {
    const secretKey = process.env.REACT_APP_ENCRYPT_KEY;

    if (!secretKey) {
        console.error("Encryption key is not defined. Please set REACT_APP_ENCRYPT_KEY in your .env file.");
        return null;
    }

    try {
        // Ensure the data is a string before encrypting
        const dataString = typeof data === "string" ? data : JSON.stringify(data);
        const encryptedData = CryptoJS.AES.encrypt(dataString, secretKey).toString();

        // Convert to hex for compatibility
        const hexString = CryptoJS.enc.Base64.parse(encryptedData).toString(CryptoJS.enc.Hex);

        return hexString;
    } catch (error) {
        console.error("Encryption failed:", error);
        return null;
    }
};

export const decryptData = (hexString) => {
    const secretKey = process.env.REACT_APP_ENCRYPT_KEY;

    if (!secretKey) {
        console.error("Decryption key is not defined. Please set REACT_APP_ENCRYPT_KEY in your .env file.");
        return null;
    } 
    try { 
        const base64String = CryptoJS.enc.Hex.parse(hexString).toString(CryptoJS.enc.Base64); 
        const bytes = CryptoJS.AES.decrypt(base64String, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
 
        try {
            return JSON.parse(decryptedData);
        } catch {
            return decryptedData; 
        }
    } catch (error) {
        console.error("Decryption failed:", error);
        return null;
    }
};
