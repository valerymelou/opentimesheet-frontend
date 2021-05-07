import { Project } from './project';

describe('Project', () => {
  it('should create an instance', () => {
    expect(new Project()).toBeTruthy();
  });

  it('should deserialize', () => {
    const project = new Project();

    project.deserialize({
      type: 'Project',
      id: '1',
      attributes: {
        name: 'Project 1',
        description: 'First project',
        status: 'ACTIVE',
      }
    });

    expect(project.id).toBe('1');
    expect(project.name).toBe('Project 1');
    expect(project.description).toBe('First project');
    expect(project.status).toBe('ACTIVE');
  });

  it('should not deserialize', () => {
    const project = new Project();

    project.deserialize({
      type: 'Project',
      id: '1',
      attribute: {
        name: 'Project 1',
        description: 'First project',
        status: 'ACTIVE',
      }
    });

    expect(project.id).toBeUndefined();
    expect(project.name).toBeUndefined();
    expect(project.description).toBeUndefined();
    expect(project.status).toBeUndefined();
  });
});
