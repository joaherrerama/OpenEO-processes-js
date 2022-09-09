import OEProcessGraph from './processgraph.module';
import OEProcessRegistry from '../registry/registry.module';

describe('Process Graph Registry', () => {
  var p;

  beforeAll(async () => {
    let registry = new OEProcessRegistry();
    registry.addFromFolder('../processes');
    const jsonProcess = {
      process_graph: {
        load_collection: {
          process_id: 'load_collection',
          arguments: {
            url: ['./sample_data/sentinel_muenster.tif']
          },
          description:
            'Loading the data; The order of the specified bands is important for the following reduce operation.'
        }
      }
    };
    const json = JSON.parse(JSON.stringify(jsonProcess));
    p = new OEProcessGraph(json, registry);
  });

  test('Processes', () => {
    let registry = p.getContext().server().processes();
    expect(registry.get('load_collection')).not.toBe(null);
  });

  test('Collections', () => {
    let catalog = p.getContext().server().collections();
    expect(catalog.getData('COPERNICUS/S2')).not.toBe(null);
  });

  test('Validate', async () => {
    var errors = await p.validate(false);
    if (errors.count() > 0) {
      console.log(errors.getMessage());
    }
    expect(errors.count()).toBe(0);
    expect(p.getStartNodes().map((node) => node.id)).toEqual([
      'load_collection'
    ]);
    expect(
      p
        .getNode('load_collection')
        .getNextNodes()
        .map((n) => n.id)
    ).toEqual(['reduce_bands']);
    expect(p.getResultNode().id).toBe('save');
  });
});
