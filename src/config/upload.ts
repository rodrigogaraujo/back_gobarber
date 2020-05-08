import multer from "multer";
import path from "path";
import crypto from "crypto";

const pathTemp = path.resolve(__dirname, "..", "..", "tmp");
export default {
    tmpFolder: pathTemp,
    uploadsFolder: path.resolve(pathTemp, "uploads"),
    storage: multer.diskStorage({
        destination: pathTemp,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString("HEX");
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
