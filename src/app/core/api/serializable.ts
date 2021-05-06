export interface Serializable<T> {
  deserialize(data: object): T;

  serialize(): string;
}
