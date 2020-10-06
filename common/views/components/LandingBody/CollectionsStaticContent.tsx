import Layout12 from '@weco/common/views/components/Layout12/Layout12';
import SearchForm from '@weco/common/views/components/SearchForm/SearchForm';

const CollectionsStaticContent = () => {
  return (
    <Layout12>
      <h2 className="h2">Search the collections</h2>
      <p>
        Find thousands of books, images, artworks, unpublished archives and
        manuscripts in our collections, many of them with free online access.
      </p>
      <SearchForm
        ariaDescribedBy="search-form-description"
        shouldShowFilters={false}
        worksRouteProps={{
          query: '',
          page: 1,
          workType: [],
          itemsLocationsLocationType: [],
          sort: null,
          sortOrder: null,
          productionDatesFrom: null,
          productionDatesTo: null,
          search: null,
        }}
        workTypeAggregations={[]}
      />
    </Layout12>
  );
};

export default CollectionsStaticContent;