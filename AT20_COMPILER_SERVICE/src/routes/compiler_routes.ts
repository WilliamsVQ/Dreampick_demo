import express from 'express';
import CompilerController from '../controllers/compiler_controller';
import compiler_middleware from '../middlewares/compiler_middleware';

const router = express.Router();
const compiler = new CompilerController();

router.post('/', compiler_middleware, compiler.get);

export default router;