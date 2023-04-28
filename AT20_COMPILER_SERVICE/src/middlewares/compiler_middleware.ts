import multer, { diskStorage, StorageEngine } from 'multer';
import path from 'path';

interface MulterFile {
    originalname: string;
}

const storage: StorageEngine = diskStorage({
    destination: function (_: any, __: any, cb: (error: Error | null, destination: string) => void) {
        cb(null, process.env.UPLOADS_PATH || '');
    },
    filename: function (_: any, file: MulterFile, cb: (error: Error | null, filename: string) => void) {
        const unique_suffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        const ext = path.extname(file.originalname);
        const file_name = path.basename(file.originalname, ext);

        cb(null, file_name + '-' + unique_suffix + ext)
    }
})

const compiler_middleware = multer({
    storage
}).single('file');

export default compiler_middleware;