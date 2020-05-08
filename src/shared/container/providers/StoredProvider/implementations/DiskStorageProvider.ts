import fs from "fs";
import path from "path";
import pathTemp from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";

export default class DiskStorageProvider implements IStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(pathTemp.tmpFolder, file),
            path.resolve(pathTemp.uploadsFolder, file),
        );

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(pathTemp.uploadsFolder, file);
        let pass = false;
        try {
            await fs.promises.stat(filePath);
            pass = true;
        } catch (err) {
            pass = false;
        }

        if (pass) {
            await fs.promises.unlink(filePath);
        }
    }
}
