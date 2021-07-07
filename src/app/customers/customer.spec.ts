import { Customer } from './customer';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new Customer()).toBeTruthy();
  });

  it('should deserialize', () => {
    const customer = new Customer();

    customer.deserialize({
      type: 'Customer',
      id: '1',
      attributes: {
        name: 'Customer 1',
        description: 'First customer',
        status: 'ACTIVE',
      }
    });

    expect(customer.id).toBe('1');
    expect(customer.name).toBe('Customer 1');
    expect(customer.description).toBe('First customer');
    expect(customer.status).toBe('ACTIVE');
  });

  it('should not deserialize', () => {
    const customer = new Customer();

    customer.deserialize({
      type: 'Customer',
      id: '1',
      attribute: {
        name: 'Customer 1',
        description: 'First customer',
        status: 'ACTIVE',
      }
    });

    expect(customer.id).toBeUndefined();
    expect(customer.name).toBeUndefined();
    expect(customer.description).toBeUndefined();
    expect(customer.status).toBeUndefined();
  });
});
