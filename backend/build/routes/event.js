"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEvent = exports.getEvents = void 0;
const controllers_1 = require("../controllers");
const strings_1 = require("../utils/strings");
const getEvents = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        if (typeof clientID === 'string' && !(0, strings_1.isEmpty)(clientID)) {
            const events = await controllers_1.controllers.event.getEventsController(clientID);
            return response.status(200).json(events);
        }
        return response.sendStatus(400);
    }
    catch (err) {
        if (err instanceof Error && err.message === 'unauthenticated') {
            return response.sendStatus(403);
        }
        return response.sendStatus(400);
    }
};
exports.getEvents = getEvents;
const addEvent = async (request, response) => {
    try {
        // Make sure the user is authed
        if (!request.slashauth.isAuthed) {
            return response.sendStatus(401);
        }
        const clientID = request.slashauth.clientID;
        const { name, description, link, dateTime } = request.body;
        if (typeof clientID === 'string' &&
            !(0, strings_1.isEmpty)(clientID) &&
            typeof name === 'string' &&
            !(0, strings_1.isEmpty)(name) &&
            typeof dateTime === 'string' &&
            !(0, strings_1.isEmpty)(dateTime)) {
            const event = await controllers_1.controllers.event.putEventController(clientID, {
                name,
                dateTime,
                description,
                link,
            });
            return response.status(200).json(event);
        }
        return response.sendStatus(400);
    }
    catch (err) {
        if (err instanceof Error && err.message === 'unauthenticated') {
            return response.sendStatus(403);
        }
        return response.sendStatus(400);
    }
};
exports.addEvent = addEvent;
//# sourceMappingURL=event.js.map