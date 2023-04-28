import Compiler from '../Compiler';

class JavaCompiler extends Compiler {
  #compile_and_execute_command = 'java';

  constructor() {
    super('java', '.java');
  }

  public compileAndRead(file_path: string): { stdout: string; stderr: string } {
    const command = `${this.#compile_and_execute_command} ${file_path}`;

    const result = this.executeCommand(command, (stdout, stderr) => {
      // Do something with stdout and stderr here
      return stdout;
    });

    return { stdout: result, stderr: '' };
  }

  public run(file_path: string): { stdout: string; stderr: string } {
    return this.compileAndRead(file_path);
  }
}

export default JavaCompiler;