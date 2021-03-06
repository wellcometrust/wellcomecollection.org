// @flow
const CuratedLists = {
  'Curated list': {
    uid: {
      type: 'UID',
      config: {
        label: 'uid'
      }
    },
    title: {
      type: 'StructuredText',
      config: {
        label: 'Title',
        single: 'paragraph',
        useAsTitle: true
      }
    },
    description: {
      type: 'StructuredText',
      config: {
        label: 'Description',
        multi: 'paragraph, em, strong, hyperlink'
      }
    },
    body: {
      type: 'Slices',
      fieldset: 'Section',
      config: {
        choices: {
          contentList: {
            type: 'Slice',
            fieldset: 'Content List',
            description: 'A list of content',
            icon: 'face',
            display: 'list',
            'non-repeat': {
              title: {
                type: 'StructuredText',
                config: {
                  single: 'heading1',
                  label: 'Title'
                }
              }
            },
            repeat: {
              content: {
                type: 'Link',
                config: {
                  select: 'document',
                  customtypes: ['articles', 'webcomics', 'series', 'webcomic-series'],
                  label: 'Content'
                }
              }
            }
          },
          stories: {
            type: 'Slice',
            fieldset: 'Stories',
            description: 'Stories - newest to oldest',
            icon: 'face',
            display: 'list',
            'non-repeat': {
              title: {
                type: 'StructuredText',
                config: {
                  single: 'heading1',
                  label: 'Title'
                }
              }
            },
            repeat: {
              text: {
                type: 'StructuredText',
                config: {
                  single: 'heading1',
                  label: 'text'
                }
              }
            }
          }
        }
      }
    }
  }
};

export default CuratedLists;
