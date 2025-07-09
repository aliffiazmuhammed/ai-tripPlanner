const { main } = require('../AiServices/ai-service')
const { buildPromptText } = require('../AiServices/ai-prompt')

module.exports.getresponse = async (req, res) => {
    const prompt = req.body
    if (!prompt) {
        return res.status(500).send("must have a prompt")
    }

    const buildprompt = buildPromptText(prompt)

    const response = await main(buildprompt)

    res.send(response)
}