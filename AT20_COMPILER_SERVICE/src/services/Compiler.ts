import { execSync } from 'child_process';

class Compiler {
    
  constructor(...args: any[]) {}

  executeCommand(command: string, callback = (stdout: string, stderr: string) => stdout): string {
    try {
      const stdout = execSync(command, { encoding: 'utf8' });
      return callback(stdout, '');
    } catch (error) {
      if (error instanceof Error && 'stderr' in error) {
        const stderr = typeof error.stderr === 'string' ? error.stderr : 'An unknown error occurred.';
        return callback('', stderr);
      } else {
        return callback('', 'An unknown error occurred.');
      }
    }
  }

  run(...args: any[]): { stdout: string; stderr: string } {
    throw new Error('Abstract class you must implement this method');
  }
}

export default Compiler;