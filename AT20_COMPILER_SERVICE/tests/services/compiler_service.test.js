const compilerService = require('../../src/services');


describe('compiler_service tests', () => {

    //inicializate the compiler service before each test
    let compiler;
    beforeEach(() => {
        compiler = new compilerService();
    });


    it('should return a right response from python compiler', async () => {
        path = 'C:\\users\\jhoel\\desktop\\jala\\proyect\\python\\hello.py';

        const resp = await compiler.run(path, 'python');

        const expectedResp = {
            "stdout": "Hello World from Python!",
            "stderr": "",
        };
        expect(resp).toEqual(expectedResp);
    });
});