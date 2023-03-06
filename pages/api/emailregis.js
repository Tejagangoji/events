const path = require('path');
const fs = require('fs');

function buildpath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

function extractdata(filename) {
    const jsondata = fs.readFileSync(filename);
    const data = JSON.parse(jsondata);
    return data;
}

export default function handler(req, res) {
    const { method } = req;
    const filepath = buildpath();
    const { events_categories, allEvents } = extractdata(filepath);
    if (!allEvents) {
        return res.status(404).json({
            status: 404,
            message: 'Events data not found'
        });
    }
    if (method === "POST") {
        const { email, eventid } = req.body;
        const newdata = allEvents.map((ev) => {
            if (ev.id === eventid) {
                if (ev.emails_registered.includes(email)) {
                    res.status(409).json({ message: 'This email has already been registered' });
                    return ev
                }
                return { ...ev, emails_registered: [...ev.emails_registered, email], }
            }
            else {
                return ev;
            }
        });
        fs.writeFileSync(filepath, JSON.stringify({ events_categories, allEvents: newdata }));
        res.status(200).json({ message: `You had been registered succesfully to ${eventid} by ${email}` })
    }
}