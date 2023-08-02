import { gql } from "graphql-request";

export const ENDPOINT = "https://api.core.equinoxplus.com/gqlgateway"

export const QUERY = gql`
  fragment EqxInstructorBaseFragment on EqxInstructor {
      name
      alias: name(format: ALIAS)
      substituteInstructor {
        name
    }
  }
  fragment InClubClassFragment on InClubClass {
      name
      description
      duration
      facility {
          id
          name
      }
      instructors {
          ...EqxInstructorBaseFragment
      }
  }

  query InClubSessionQuery(
      $startDate: DateTime!, $endDate: DateTime!, $filterBy: InClubSessionFiltersInput!
  ) {
      inClubSchedule(startDate: $startDate, endDate: $endDate, filterBy: $filterBy) {
          id
        day
          sessions {
              ...InClubClassFragment
          }
      }
  }
`

export const TODAY = new Date();
export const SIX_DAYS_LATER = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 6);


export const genMappedData = (data) => {
    const mappedData = data.inClubSchedule.map((session) => {
        const { day, sessions } = session
        const mappedSessions = sessions.map((session) => {
        const { name, facility, instructors } = session
        return { day, name, location: facility.name, instructor: instructors[0].name}
        })
        return mappedSessions
    })
    return mappedData.flatMap(session => session);
}


export const CLUBS = {
    FLATIRON: "ZmFjaWxpdHk6MTAy", // flatiron
    SOHO: "ZmFjaWxpdHk6MTE0", // soho
    PARK_AVE: "ZmFjaWxpdHk6MTE1", // park ave
    HIGH_LINE: "ZmFjaWxpdHk6MTE2", // high line
    GREENWICH_AVE: "ZmFjaWxpdHk6MTEy", // greenwich ave
    PRINTING_HOUSE: "ZmFjaWxpdHk6MTI0", // printing house
    BOND_ST: "ZmFjaWxpdHk6MTM1", // bond street
    GRAMERCY: "ZmFjaWxpdHk6MTM2", // gramercy
    HUDSON_YARDS: "ZmFjaWxpdHk6MTM4", // hudson yards
    SPORTS_CLUB: "ZmFjaWxpdHk6MTMx", // sports club
}