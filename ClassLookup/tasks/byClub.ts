import airplane from "airplane";
import { request } from "graphql-request";
import { ENDPOINT, QUERY, SIX_DAYS_LATER, TODAY, genMappedData } from "./shared";

export const classesByClub = airplane.task(
  {
    slug: "classes_by_club",
    name: "by club",
    parameters: {
      club: {
        name: "Club",
        type: "shorttext",
        options: [
          { label: "SoHo", value: "ZmFjaWxpdHk6MTE0" },
          { label: "Bond Street", value: "ZmFjaWxpdHk6MTM1" },
          { label: "Greenwich Ave", value: "ZmFjaWxpdHk6MTEy" },
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
        "facilities": [params.club],
        "skipStudioLayout":true
      }
    }
    const data = await request(ENDPOINT, QUERY, variables);

    // You can return data to show output to users.
    // Output documentation: https://docs.airplane.dev/tasks/output

    return genMappedData(data)
  }
);
