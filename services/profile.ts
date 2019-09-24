import gql from 'graphql-tag'
import { setAuth } from './auth'

export const fetchProfile = async () => {
    return await setAuth().query({
        query: gql`
            query {
                allWorks(orderBy: startAt_DESC) {
                    id
                    startAt
                    endAt
                    title
                    description
                }
                allActivities(orderBy: time_DESC) {
                    id
                    title
                    url
                    event
                    time
                    enabled
                }
                allSkills(orderBy: name_DESC) {
                    id
                    color
                    name
                    ratio
                }
            }
        `
    })
}
