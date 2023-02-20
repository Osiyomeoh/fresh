export type FileConstructorProps = {
  id: string;
  blobID: string;
  clientID: string;
  organizationID: string | null;
  wallet: string;
  name: string;
  description: string | null;
  rolesRequired: string[];
  createdAt: string;
  updatedAt: string;
};

export class SlashauthFile {
  id: string;
  blobID: string;
  clientID: string;
  organizationID: string | null;
  wallet: string;
  name: string;
  description: string | null;
  rolesRequired: string[];
  createdAt: number;
  updatedAt: number;

  constructor({
    id,
    blobID,
    clientID,
    organizationID,
    wallet,
    name,
    description,
    rolesRequired,
    createdAt,
    updatedAt,
  }: FileConstructorProps) {
    this.id = id;
    this.blobID = blobID;
    this.clientID = clientID;
    this.organizationID = organizationID;
    this.wallet = wallet;
    this.name = name;
    this.description = description;
    this.rolesRequired = rolesRequired;
    try {
      this.createdAt = Date.parse(createdAt);
      // eslint-disable-next-line no-empty
    } catch (err) {}
    try {
      this.updatedAt = Date.parse(updatedAt);
      // eslint-disable-next-line no-empty
    } catch (err) {}
  }
}
