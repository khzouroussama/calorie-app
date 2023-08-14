export abstract class ItemKeys {
  static ENTITY_TYPE: string;
  abstract get pk(): string;
  abstract get sk(): string;

  fromItem() {
    return {
      PK: this.pk,
      SK: this.sk,
    };
  }

  toItem() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
    };
  }
}
