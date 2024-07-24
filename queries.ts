import { gql } from '@apollo/client';

// have combined both getting site title and description with the about information. 
// will probably do the same for subsequent queries. Will this make loading slower?
export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
    }
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