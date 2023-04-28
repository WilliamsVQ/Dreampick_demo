import Compiler from '../Compiler';

class CSharpCompiler extends Compiler {
    #compiler_command = 'csc';
    #execute_and_read_command = 'mono';
    
    constructor() {
        super('c_sharp','.cs');
    }
    
    compile(file_path: string): string {
        const out_file_path = './src/services/compilers/compiled_files/prueba.exe';
        const command_to_compile = `${this.#compiler_command} -out:${out_file_path} ${file_path}`;
        this.executeCommand(command_to_compile);
        return out_file_path;
    }
    
    executeAndRead(file_path: string): {stdout: string, stderr: string} {
        const command_to_run = `${this.#execute_and_read_command} ${file_path}`;
    
        try {
            const result = this.executeCommand(command_to_run);
            return { stdout: result, stderr: '' };
        } catch (error) {
            if (error instanceof Error) {
                return { stdout: '', stderr: error.message };
            } else {
                return { stdout: '', stderr: 'An unknown error occurred.' };
            }
        }
    }
    run(file_path: string): {stdout: string, stderr: string} {
        const new_file_path = this.compile(file_path);
        return this.executeAndRead(new_file_path);
    }
}

export default CSharpCompiler;