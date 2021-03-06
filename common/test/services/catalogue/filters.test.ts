import worksAggregations from '../../fixtures/catalogueApi/works-aggregations';
import imagesAggregations from '../../fixtures/catalogueApi/images-aggregations';
import {
  CheckboxFilter,
  imagesFilters,
  worksFilters,
} from '../../../services/catalogue/filters';
import { fromQuery as fromWorksQuery } from '../../../views/components/WorksLink/WorksLink';
import { fromQuery as fromImagesQuery } from '../../../views/components/ImagesLink/ImagesLink';

// These tests require some knowledge of the fixture data.
// A bit odd, but it works.
describe('filter options', () => {
  it('0 count values: includes selected, excludes non-selected', () => {
    const filters = worksFilters({
      works: worksAggregations,
      props: fromWorksQuery({
        languages: 'map,niu',
        workType: 'c',
      }),
    });

    const languageFilter = filters.find(
      f => f.id === 'languages'
    ) as CheckboxFilter;

    const workTypeFilter = filters.find(
      f => f.id === 'workType'
    ) as CheckboxFilter;

    expect(
      languageFilter.options
        .filter(option => option.count === 0)
        .map(option => option.value)
        .sort()
    ).toEqual(['map', 'niu']);

    expect(
      workTypeFilter.options.find(option => option.id === 'c')
    ).toBeTruthy();

    expect(
      workTypeFilter.options.find(option => option.id === 'u')
    ).toBeFalsy();
  });

  it('includes option to from query that is not in the API aggregation', () => {
    const filter = worksFilters({
      works: worksAggregations,
      props: fromWorksQuery({
        // An aggregation we know isn't in the fixture response
        'contributors.agent.label': '"Non existant"',
      }),
    }).find(f => f.id === 'contributors.agent.label') as CheckboxFilter;

    expect(
      filter.options.find(option => option.label === '"Non existant"')
    ).toBeTruthy();
  });

  it('includes empty buckets on images license filter', () => {
    const filter = imagesFilters({
      images: imagesAggregations,
      props: fromImagesQuery({
        'locations.license': '"Non existant"',
      }),
    }).find(f => f.id === 'locations.license') as CheckboxFilter;

    expect(filter.options.filter(option => option.count === 0).length).toBe(7);
  });
});
