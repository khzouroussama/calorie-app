export abstract class ItemKeys {
  static ENTITY_TYPE: string;
  abstract get pk(): string;
  abstract get sk(): string;

  abstract get gsi1pk(): string;
  abstract get gsi1sk(): string;

  fromItem() {
    return {
      PK: this.pk,
      SK: this.sk,

      GSI1PK: this.gsi1pk,
      GSI1SK: this.gsi1sk,
    };
  }

  toItem() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },

      GSI1PK: { S: this.gsi1pk },
      GSI1SK: { S: this.gsi1sk },
    };
  }
}
