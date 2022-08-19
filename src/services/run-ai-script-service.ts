import { PythonShell } from 'python-shell'

export class RunAiScriptService {
  async execute() {
    return new Promise(resolve => {
      PythonShell.run('src/IA/app.py', null, function (err, result) {
        if (err) throw err
        resolve(result[result.length - 1] == 'True' ? true : false)
      })
    })
  }
}
