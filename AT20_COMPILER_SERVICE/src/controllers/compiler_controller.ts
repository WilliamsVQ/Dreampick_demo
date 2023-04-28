import { Request, Response } from 'express';
import CompilationService from '../services'; 
import multer, { Multer } from 'multer';

interface MulterFile {
    destination: string;
    filename: string;
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the destination directory for uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // use the original file name for the uploaded file
    }
});

const upload: Multer = multer({ storage });

class CompilerController {
    async get(req: Request, res: Response): Promise<void> {
        const service = new CompilationService();

        const { language, version } = req.body;
        const file = req.file as MulterFile | undefined;

        if (!file) {
            res.status(400).send({ error: 'File not found in the request' });
            return;
        }

        const saved_file_path = `${file.destination}/${file.filename}`;

        try {
            const response = await service.run(saved_file_path, language, version);
            res.status(200).send(response);
        } catch (err) {
            res.status(404).send({ error: (err as Error).message });
        }
    }
}

export default CompilerController;