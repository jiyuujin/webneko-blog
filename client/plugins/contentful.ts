const contentful = require('contentful')

export const createClient = ({ spaceId, cdaAccessToken }) => {
  const config = {
    space: spaceId,
    accessToken: cdaAccessToken,
  }
  return contentful.createClient(config)
}

// module.exports = {
//   createClient() {
//     return contentful.createClient(config)
//   }
// }
