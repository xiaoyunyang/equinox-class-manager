import airplane from "airplane";
import { request, gql } from "graphql-request";


const endpoint = "https://api.core.equinoxplus.com/gqlgateway"

const query = gql`
  fragment EqxInstructorBaseFragment on EqxInstructor {
      name
      alias: name(format: ALIAS)
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

const DEFAULT_VARIABLES = {
  "startDate":"2023-08-01T00:00:00-04:00",
  "sessionsListSessionResize":{
    "maxHeight":660,"maxWidth":660
  },
  "endDate":"2023-08-07T23:59:59-04:00",
  "filterBy":{
      "onlyAvailable":false,
      "eqxInstructors": ["ZXF4X2luc3RydWN0b3I6OTM0Mw=="],
      "skipStudioLayout":true
  }
}

export default airplane.task(
  {
    slug: "class_lookup",
    name: "class lookup",
    parameters: {
      instructor: {
        name: "Instructor",
        type: "shorttext",
        options: [
          { label: "Khaleah", value: "ZXF4X2luc3RydWN0b3I6OTM0Mw==" },
          { label: "Andrew", value: "ZXF4X2luc3RydWN0b3I6MTAxNDA" },
        ],
      }
    }
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async (params) => {

    const variables = {
      "startDate":"2023-08-01T00:00:00-04:00",
      "sessionsListSessionResize":{
        "maxHeight":660,"maxWidth":660
      },
      "endDate":"2023-08-07T23:59:59-04:00",
      "filterBy":{
          "onlyAvailable":false,
          "eqxInstructors": [params.instructor],
          "skipStudioLayout":true
      }
    }
    const data = await request(endpoint, query, variables);

    // You can return data to show output to users.
    // Output documentation: https://docs.airplane.dev/tasks/output

    const mappedData = data.inClubSchedule.map((session) => {
      const { day, sessions } = session
      const mappedSessions = sessions.map((session) => {
        const { name, facility, instructors } = session
        return { day, name, location: facility.name, instructor: instructors[0].name }
      })
      return mappedSessions
    })
    return mappedData.flatMap(session => session);
  }
);
