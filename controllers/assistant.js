const OpenAI = require('openai')

const autocompleteTaskRecurrence = async (req, res) => {
    try {
        const { plantName, taskName } = req.body
        const content = `Wyobraź sobie, że jesteś doświadczonym ogrodnikiem. Klient prosi Cię o poradę jak często powinien wykonywać ${taskName} swojej rośliny - ${plantName}. Udziel zwięzłej odpowiedzi (max. 20 znaków), która jest prawdziwa dla podanego gatunku rośliny.`
        const openai = new OpenAI()
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content }],
            model: "gpt-3.5-turbo",
            temperature: 0,
            seed: 1,
            max_tokens: 20
        })
        res.status(200).send(completion.choices[0])
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = {
    autocompleteTaskRecurrence
}