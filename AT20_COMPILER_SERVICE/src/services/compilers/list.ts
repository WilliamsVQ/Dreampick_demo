import JavaCompiler from './JavaCompiler';
import PythonCompiler from './python/PythonCompiler';
import CSharpCompiler from './CSharpCompiler';
import JavaScriptCompiler from './JavaScriptCompiler';

const COMPILERS: Record<string, any> = {
  'java': new JavaCompiler(),
  'python': new PythonCompiler(),
  'c_sharp': new CSharpCompiler(),
  'javascript': new JavaScriptCompiler(),
};

export default COMPILERS;
