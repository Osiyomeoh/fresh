import { slashauthClient } from '../third-party/slashauth_client';
import { CONSTANTS } from '../utils/constants';

type Event = {
  name: string;
  description?: string;
  link: string;
  dateTime: string;
};

export class EventController {
  getEventsController = async (clientID: string): Promise<Event[]> => {
    const { data, error: getRoleErr } =
      await slashauthClient.app.getRoleRestrictedData({
        role: CONSTANTS.MEMBER_ROLE_LEVEL,
      });

    if (getRoleErr) {
      console.error(getRoleErr);
      throw getRoleErr;
    }

    if (!data) {
      throw new Error(
        `getAppRoleMetadata did not return a result for clientID ${clientID}`
      );
    }

    const events = data[CONSTANTS.EVENTS_KEY];

    return (events as Event[]) || [];
  };

  putEventController = async (
    clientID: string,
    input: Event
  ): Promise<Event> => {
    // Fetch roleMetadata
    const { data, error: getRoleErr } =
      await slashauthClient.app.getRoleRestrictedData({
        role: CONSTANTS.MEMBER_ROLE_LEVEL,
      });

    if (getRoleErr) {
      console.error(getRoleErr);
      throw getRoleErr;
    }

    if (!data) {
      throw new Error(
        `getAppRoleMetadata did not return a result for clientID ${clientID}`
      );
    }

    const metadata = data;

    // Check if events already exist. If they do, append. If not, create a new array
    if (metadata[CONSTANTS.EVENTS_KEY]) {
      metadata[CONSTANTS.EVENTS_KEY].push(input);
    } else {
      metadata[CONSTANTS.EVENTS_KEY] = [input];
    }

    // Update metadata
    await slashauthClient.app.updateRoleRestrictedData({
      role: CONSTANTS.MEMBER_ROLE_LEVEL,
      metadata,
    });

    return input;
  };
}
