import { gql } from '@apollo/client';

export const STORIES_PAGE = gql`
  query articles($slug: String) {
  articles(filters: { slug: { eq: $slug } }) {
    documentId
    cover {
      alternativeText
      caption
      name
      url
      formats
      size
    }
    slug
    description
    name
    Taxonomy
    blocks {
      ... on ComponentSharedMedia {
        id
        file {
          alternativeText
          caption
          name
          url
          formats
          size
        }
      }
      ... on ComponentSharedQuote {
        id
        title
        body
      }
      ... on ComponentSharedRichText {
        id
        body
      }

      ... on ComponentSharedCustomMdxBlock {
        id
        customMDX
      }
      ... on ComponentSharedLineGraph {
        id
        dataPath {
          alternativeText
          caption
          name
          url
          formats
          size
        }
        dateFormat
        idKey
        xKey
        yKey
        Attribution {
          id
          attributeAuthor
          attrURL
          captionFig
        }
      }
      ... on ComponentSharedMap {
        id
        Zoom
        dateTime
        compareDateTime
        center
        layerId
        datasetId
        Caption {
          id
          attributeAuthor
          attrURL
          captionFig
        }
      }
    }
  }
}

`;
