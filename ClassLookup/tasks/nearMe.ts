import airplane from "airplane";
import { request } from "graphql-request";
import { CLUBS, ENDPOINT, QUERY, SIX_DAYS_LATER, TODAY, genMappedData } from "./shared";

export const classesNearMe = airplane.task(
  {
    slug: "class_near_me",
    name: "near me",
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
        "facilities": [CLUBS.SOHO, CLUBS.BOND_ST, CLUBS.GREENWICH_AVE, CLUBS.PRINTING_HOUSE],
        "skipStudioLayout":true
      }
    }
    const data = await request(ENDPOINT, QUERY, variables);

    // You can return data to show output to users.
    // Output documentation: https://docs.airplane.dev/tasks/output

    return genMappedData(data)
  }
);
