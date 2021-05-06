import { BaseModel } from './base-model';

class TestModel extends BaseModel {
  public name?: string;
}

class TestTypedModel extends BaseModel {
  public readonly type = 'TestType';
  public name?: string;
}

class TestUnTypedModel extends BaseModel {
  public readonly type = '';
  public name?: string;
}

describe('BaseModel', () => {
  it('should create an instance', () => {
    expect(new BaseModel()).toBeTruthy();
  });

  it('should serialize without id and type', () => {
    const model = new TestModel();
    model.name = 'Test';

    expect(model.serialize()).toEqual('{"data":{"attributes":{"name":"Test"}}}');
  });

  it('should serialize with falsy values of id and type', () => {
    const model = new TestUnTypedModel();
    model.name = 'Test';
    model.id = undefined;

    expect(model.serialize()).toEqual('{"data":{"attributes":{"name":"Test"}}}');
  });

  it('should serialize with id and type', () => {
    const model = new TestTypedModel();
    model.name = 'Test';
    model.id = '1234';

    expect(model.serialize()).toEqual('{"data":{"attributes":{"name":"Test"},"type":"TestType","id":"1234"}}');
  });
});
