import Compiler from '../../Compiler';
//import VERSIONES from './python_versionMap';

class PythonCompiler extends Compiler {
    #interpreter_command='python3'; // Propiedad privada sin valor inicial

    constructor() {
        super('python', '.py');
    }

    interpret(file_path: string, version: string): { stdout: string; stderr: string } {
        // this.#interpreter_command = VERSIONES[version];
        // if (!this.#interpreter_command) {
        //     throw new Error('Version not found');
        // }
        const command = `${this.#interpreter_command} ${file_path}`;

        try {
            const result = this.executeCommand(command);
            return { stdout: result, stderr: '' };
        } catch (error) {
            if (error instanceof Error) {
                return { stdout: '', stderr: error.message };
            } else {
                return { stdout: '', stderr: 'An unknown error occurred.' };
            }
        }
    }

    run(file_path: string, version: string): { stdout: string; stderr: string } {
        return this.interpret(file_path, version);
    }
}

export default PythonCompiler;