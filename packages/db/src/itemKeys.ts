export abstract class ItemKeys {
  static ENTITY_TYPE: string;
  abstract get pk(): string;
  abstract get sk(): string;
  abstract get gsi1pk(): string | undefined;
  abstract get gsi1sk(): string | undefined;

  fromItem() {
    return {
      PK: this.pk,
      SK: this.sk,
      ...(this.gsi1pk ? { GSI1PK: this.gsi1pk } : {}),
      ...(this.gsi1sk ? { GSI1SK: this.gsi1sk } : {}),
    };
  }

  toItem() {
    return {
      PK: { S: this.pk },
      SK: { S: this.sk },
      ...(this.gsi1pk ? { GSI1PK: { S: this.gsi1pk } } : {}),
      ...(this.gsi1sk ? { GSI1SK: { S: this.gsi1sk } } : {}),
    };
  }
}
