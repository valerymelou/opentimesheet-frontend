export class BaseModel {
  readonly type?: string;
  public id?: string;

  public serialize(): string {
    const resource: any = {
      data: {
        attributes: {}
      }
    };

    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        if (key === 'type') {
          if (this.type) {
            resource.data.type = this.type;
          }

          continue;
        }

        if (key === 'id') {
          if (this.id) {
            resource.data.id = this.id;
          }

          continue;
        }

        resource.data.attributes[key] = this[key];
      }
    }

    return JSON.stringify(resource);
  }
}
