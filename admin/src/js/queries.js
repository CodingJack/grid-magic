const Queries = {
  catTags: `
    {
      categories {
        nodes {
          slug
          name
        }
      }
      tags {
        nodes {
          slug
          name
        }
      }
    }
  `,
  pages: `
    {
      pages {
        nodes {
          pageId
          slug
          title(format: RENDERED)
          status
        }
      }
    }
  `,
};

export default Queries;