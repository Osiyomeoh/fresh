export class SlashauthEvent {
  name: string;
  description: string;
  link: string | null;
  dateTime: number;

  constructor(
    name: string,
    description: string,
    link: string | null,
    dateTime: string
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    try {
      this.dateTime = Date.parse(dateTime);
    } catch (err) {
      console.error('No vaild date time');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public toJSONBlob(): Record<string, any> {
    return {
      name: this.name,
      description: this.description,
      link: this.link,
      dateTime: new Date(this.dateTime).toISOString(),
    };
  }
}
