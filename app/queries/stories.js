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
        dataPath {
          url
          alternativeText
          name
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
      ... on ComponentSharedSideBySide {
        id
        Orientation
        sectionDescription {
          id
          customMDX
        }
        map {
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
      ... on ComponentSharedGraphWithDesc {
        id
        sectionDesc {
          id
          descriptionBlock
        }
        descriptionPosition
        lineGraph {
          id
          dataPath {
            alternativeText
            name
            url
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
      }
    }
  }
}
`;

export const STORIES_PAGE_DRAFT = gql`query articles($slug: String) {
  articles(filters: { slug: { eq: $slug} }, status: DRAFT) {
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
        dataPath {
          url
          alternativeText
          name
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
      ... on ComponentSharedSideBySide {
        id
        Orientation
        sectionDescription {
          id
          customMDX
        }
        map {
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
      ... on ComponentSharedGraphWithDesc {
        id
        sectionDesc {
          id
          descriptionBlock
        }
        descriptionPosition
        lineGraph {
          id
          dataPath {
            alternativeText
            name
            url
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
      }
    }
  }
}
`;
