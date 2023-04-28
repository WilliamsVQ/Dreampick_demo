/**
@javascript_compiler.js Copyright(c) 2023 Jalasoft
2643 Av Melchor Perez de Olguin, Colquiri Sud, Cochabamba, Bolivia.
Av.General Inofuentes esquina Calle 20, Edificio Union No1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft,ConfidentialInformation"). You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/
import Compiler from '../Compiler';
import { execSync } from 'child_process';

class JavaCompiler extends Compiler {
  #compile_and_execute_command = 'node';

  constructor() {
    super('javascript', '.js');
  }

  public compileAndRead(file_path: string): { stdout: string; stderr: string } {
    const command = `${process.env.COMPILE_AND_EXECUTE_COMMAND_JS} ${file_path}`;

    try {
      const result = execSync(command, { encoding: 'utf8' });
      return { stdout: result, stderr: '' };
    } catch (error) {
      if (error instanceof Error && 'stderr' in error) {
        const stderr = typeof error.stderr === 'string' ? error.stderr : 'An unknown error occurred.';
        return { stdout: '', stderr };
      } else {
        return { stdout: '', stderr: 'An unknown error occurred.' };
      }
    }
  }

  public run(file_path: string): { stdout: string; stderr: string } {
    return this.compileAndRead(file_path);
  }
}

export default JavaCompiler;