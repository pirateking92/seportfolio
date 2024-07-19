import { gql } from '@apollo/client';

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
    }
  }
`;