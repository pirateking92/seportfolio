import { gql } from "@apollo/client";

// have combined both getting site title and description with the about information.
// will probably do the same for subsequent queries. Will this make loading slower?
// Query for site settings
export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
    }
  }
`;

// Query for the about page
export const GET_ABOUT_PAGE = gql`
  query GetAboutPage {
    page(id: "about", idType: URI) {
      title
      content
      featuredImage {
        node {
          sourceUrl
        }
      }
      profilePicture {
        profilePicture {
          node {
            sourceUrl
            altText
            id
          }
        }
      }
    }
  }
`;

// Query for the CV page
export const GET_CV_PAGE = gql`
  query GetCVPage {
    page(id: "cv", idType: URI) {
      cvUpload {
        cvUpload {
          node {
            sourceUrl
            mediaItemUrl
          }
        }
      }
    }
  }
`;

// Media items query
export const GET_MEDIA_ITEMS = gql`
  query GetMediaItems($first: Int, $after: String) {
    mediaItems(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        sourceUrl
        caption
      }
    }
  }
`;
