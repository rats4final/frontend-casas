"use client";

import {
  ActionEventArgs,
  Day,
  Inject,
  Month,
  PopupOpenEventArgs,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
} from "@syncfusion/ej2-react-schedule";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense("Ngo9BigBOggjHTQxAR8/V1NAaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31fcHVURmVYV0Z1WQ==")
const data = [
  {
    Id: 1,
    Subject: "Ice Cream Celebration",
    StartTime: new Date(2024, 1, 22, 10, 29),
    EndTime: new Date(2024, 1, 22, 12, 30),
    isAllDay: false,
    ProjectId: 2,
    TaskId: 2,
  },
  {
    Id: 2,
    Subject: "Ice Cream Day",
    StartTime: new Date(2024,1,11, 10,29),
    EndTime: new Date(2024,1,11, 10,29),
    isAllDay: true,
  },
];
export default function Page() {
  function handleActionBegin(args: ActionEventArgs) {
    console.log(args.requestType)
    if (args.requestType === "eventCreate") {
      //args.cancel = true;
      if (args.data) {
        const eventData = args?.data;
        console.log(eventData);
      }
    }
    if (args.requestType === "eventChange") {
      if (args.data) {
        const eventData = args?.data;
        console.log(eventData);
      }
    }
    if (args.requestType === "eventRemove") {
      if (args.data) {
        const eventData = args?.data;
        console.log(eventData);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <ScheduleComponent
        width={800}
        height={500}
        currentView="Month"
        eventSettings={{ dataSource: data }}
        actionBegin={handleActionBegin}
      >
        <ViewsDirective>
          <ViewDirective option="Month" />
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Month, Day, Week]} />
      </ScheduleComponent>
    </div>
  );
}
