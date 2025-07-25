const { main } = require('../AiServices/ai-service')
const { buildPromptText } = require('../AiServices/ai-prompt')
const generateItineraryPDF = require('../Pdf-Builder/itinery-builder');

module.exports.getresponse = async (req, res) => {
    const prompt = req.body
    if (!prompt) {
        return res.status(500).send("must have a prompt")
    }

    const buildprompt = buildPromptText(prompt)

    const response = await main(buildprompt)

    const cleanedData = response
        .replace(/```json/g, '')   // remove opening ```json
        .replace(/```/g, '')       // remove closing ```
        .trim();
    const jsonData = JSON.parse(cleanedData);

    // Send the parsed JSON back to the frontend
    res.json(jsonData);
    //  generateItineraryPDF(jsonData,res);

    // res.set({
    //     'Content-Type': 'application/pdf',
    //     'Content-Disposition': 'inline; filename="manali-itinerary.pdf"',
    //     'Content-Length': pdfBytes.length,
    // });

    // res.send(pdfBytes);

}