import airplane from "airplane";
import { request } from "graphql-request";
import { ENDPOINT, QUERY, SIX_DAYS_LATER, TODAY, genMappedData } from "./shared";


export const classesByInstructor =  airplane.task(
  {
    slug: "classes_by_instructor",
    name: "by instructor",
    parameters: {
      instructor: {
        name: "Instructor",
        type: "shorttext",
        options: [
          { label: "Khaleah", value: "ZXF4X2luc3RydWN0b3I6OTM0Mw==" },
          { label: "Andrew", value: "ZXF4X2luc3RydWN0b3I6MTAxNDA" },
          { label: "Rika", value: "ZXF4X2luc3RydWN0b3I6Nzg1OQ==" },
        ],
      }
    }
  },
  // This is your task's entrypoint. When your task is executed, this
  // function will be called.
  async (params) => {

    const variables = {
      "startDate": TODAY.toISOString(),
      "sessionsListSessionResize":{
        "maxHeight":660,"maxWidth":660
      },
      "endDate": SIX_DAYS_LATER.toISOString(),
      "filterBy":{
        "onlyAvailable": false,
        "eqxInstructors": [params.instructor],
        "skipStudioLayout":true
      }
    }
    const data = await request(ENDPOINT, QUERY, variables);

    // You can return data to show output to users.
    // Output documentation: https://docs.airplane.dev/tasks/output

    return genMappedData(data)
  }
);
