import { slashauthClient } from '../third-party/slashauth_client';

type User = {
  clientID: string;
  address: string;
  nickname?: string;
  roles: string[];
  metadata?: { [key: string]: any };
  dateTime: string;
};

export class UserController {
  /**
   * getMe gets the current user's data
   * @param clientID
   * @param userID
   * @returns
   */
  getMe = async (clientID: string, userID: string): Promise<User> => {
    const { data: userResp, error: getUserErr } =
      await slashauthClient.user.getUserByID({
        userID,
      });

    if (getUserErr) {
      console.error(getUserErr);
      throw getUserErr;
    }

    if (!userResp) {
      throw new Error(
        `getUserByID did not return a result for clientID ${clientID} and user ${userID}`
      );
    }

    return {
      clientID: userResp.clientID,
      address: userResp.wallet,
      nickname: userResp.nickname,
      roles: userResp.roles,
      metadata: userResp.metadata,
      dateTime: userResp.createdAt,
    };
  };

  /**
   * patchMe allows the current user to update their data
   * @param clientID
   * @param userID
   * @param nickname
   * @returns
   */
  patchMe = async (
    clientID: string,
    userID: string,
    nickname: string
  ): Promise<User> => {
    const { data: updateResp, error: updateUserErr } =
      await slashauthClient.user.updateUserMetadata({
        userID,
        nickname,
      });

    if (updateUserErr) {
      console.error(updateUserErr);
      throw updateUserErr;
    }

    if (!updateResp) {
      throw new Error(
        `updateUserMetadata did not return a result for clientID ${clientID} and user ${userID}`
      );
    }

    return {
      clientID: updateResp.clientID,
      address: updateResp.wallet,
      nickname: updateResp.nickname,
      roles: updateResp.roles,
      metadata: updateResp.metadata,
      dateTime: updateResp.createdAt,
    };
  };

  /**
   * getUsers fetches all the users for the clientID
   * @param clientID
   * @param address
   * @param cursor
   * @returns
   */
  getUsers = async (clientID: string, cursor?: string): Promise<User[]> => {
    let hasMore = true;
    const allUsers: User[] = [];

    while (hasMore) {
      const { paginatedResponse: users, error } =
        await slashauthClient.user.getUsers({
          cursor,
        });

      if (error) {
        console.error(error);
        throw error;
      }

      if (!users?.data) {
        throw new Error(
          `getUsers did not return a result for clientID ${clientID}`
        );
      }

      users.data.forEach((elem) => {
        allUsers.push({
          clientID: elem.clientID,
          address: elem.wallet,
          nickname: elem.nickname,
          roles: elem.roles,
          metadata: elem.metadata,
          dateTime: elem.createdAt,
        });
      });

      hasMore = users.pageInfo.hasMore;
      cursor = users.pageInfo.cursor;
    }

    return allUsers;
  };
}
