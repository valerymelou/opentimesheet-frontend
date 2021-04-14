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

  it('should stringify without id and type', () => {
    const model = new TestModel();
    model.name = 'Test';

    expect(model.stringify()).toEqual('{"data":{"attributes":{"name":"Test"}}}');
  });

  it('should stringify with falsy values of id and type', () => {
    const model = new TestUnTypedModel();
    model.name = 'Test';
    model.id = undefined;

    expect(model.stringify()).toEqual('{"data":{"attributes":{"name":"Test"}}}');
  });

  it('should stringify with id and type', () => {
    const model = new TestTypedModel();
    model.name = 'Test';
    model.id = '1234';

    expect(model.stringify()).toEqual('{"data":{"attributes":{"name":"Test"},"type":"TestType","id":"1234"}}');
  });
});
