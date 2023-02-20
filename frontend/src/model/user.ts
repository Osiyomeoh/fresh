export class User {
  address: string;
  nickname: string;
  roles: string[];
  dateTime: number;

  constructor(
    address: string,
    nickname: string,
    roles: string[],
    dateTime: string
  ) {
    this.address = address;
    this.nickname = nickname || '';
    this.roles = roles;
    try {
      this.dateTime = Date.parse(dateTime);
    } catch (err) {
      console.error('No vaild date time');
    }
  }
}
