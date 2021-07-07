import { Serializable } from '../core/api/serializable';
import { BaseModel } from '../core/base-model';

export class Project extends BaseModel implements Serializable<Project> {
  type = 'Project';
  name?: string;
  description?: string;
  status?: string;
  created?: Date;
  modified?: Date;

  deserialize(data: any): Project {
    if (data && data.attributes) {
      const attributes = data.attributes;
      this.id = data.id;
      this.name = attributes.name;
      this.description = attributes.description;
      this.status = attributes.status;
      this.created = attributes.created;
      this.modified = attributes.modified;
    }

    return this;
  }
}
