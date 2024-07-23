import { gql } from '@apollo/client';

export const GET_SITE_SETTINGS = gql`
query GetSiteSettings {
  generalSettings {
    title
    description
  }
}
`;
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