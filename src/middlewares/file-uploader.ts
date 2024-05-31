import multer, { FileFilterCallback } from "multer";
import mimeTypes from "mime-types";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    /**
     * Additional verification is possible with
     * "file-type" package, but for this we need to remake the project on ESM
     */
    const mimeType = mimeTypes.lookup(file.originalname);
    if (mimeType === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'));
    }
};

export const upload = multer({ storage, fileFilter });