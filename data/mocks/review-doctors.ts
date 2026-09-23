import { BaseStatus, type ReviewDoctor } from "@/types/models";

export const mockReviewDoctors: ReviewDoctor[] = [
  {
    Uuid: "35fd6de9-435b-4921-9714-37a220dc2201",
    Content: "Bác sĩ giải thích kỹ và đưa ra hướng theo dõi dễ hiểu.",
    NumberOfStar: 5,
    PatientUuid: "c8067404-5a51-4a83-a4e5-d6a7d7508a12",
    DoctorUuid: "57479ec8-29e0-44af-a8b0-15041655c5b8",
    Status: BaseStatus.Active,
    IsViewed: true,
    CreatedAt: new Date("2026-08-03T07:45:00.000Z"),
  },
  {
    Uuid: "35fd6de9-435b-4921-9714-37a220dc2202",
    Content: "Buổi khám đúng trọng tâm và tư vấn chu đáo.",
    NumberOfStar: 4,
    PatientUuid: "f7472b18-f178-4e9c-9d2d-cd87b4fca3c5",
    DoctorUuid: "335db5d1-1b77-4590-88f3-c784156167d6",
    Status: BaseStatus.Active,
    IsViewed: true,
    CreatedAt: new Date("2026-07-28T13:20:00.000Z"),
  },
  {
    Uuid: "35fd6de9-435b-4921-9714-37a220dc2203",
    Content: "Đánh giá không hiển thị công khai.",
    NumberOfStar: 2,
    PatientUuid: "f7472b18-f178-4e9c-9d2d-cd87b4fca3c5",
    DoctorUuid: "57479ec8-29e0-44af-a8b0-15041655c5b8",
    Status: BaseStatus.InActive,
    IsViewed: false,
    CreatedAt: new Date("2026-08-05T08:00:00.000Z"),
  },
];
