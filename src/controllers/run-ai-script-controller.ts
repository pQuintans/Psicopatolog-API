import { RunAiScriptService } from '@services/run-ai-script-service'
import { Request, Response } from 'express'

export class RunAiScriptController {
  async handle(req: Request, res: Response) {
    const runAiScriptService = new RunAiScriptService()

    const aiResponse = await runAiScriptService.execute()
    return res.status(200).json({ response: aiResponse })
  }
}
