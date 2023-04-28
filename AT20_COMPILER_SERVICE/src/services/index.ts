import COMPILERS from './compilers/list';
import Compiler from './Compiler';

class CompilationService {
  #compilers: Record<string, Compiler>;
  constructor() {
    this.#compilers = COMPILERS;
  }

  async run(file_path: string, language: string, version?: string): Promise<{ stdout: string, stderr: string }> {
    const compiler = this.#compilers[language];
    if (!compiler) {
      throw new Error('Compiler not found');
    }

    return await compiler.run(file_path, version);
  }
}

export default CompilationService;