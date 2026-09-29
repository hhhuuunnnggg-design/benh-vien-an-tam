import { BaseStatus, type TimeWorking } from "@/types/models";

const createdAt = new Date("2026-01-01T00:00:00.000Z");
const notDeleted = new Date(0);

export const mockTimeWorkings: TimeWorking[] = [
  [1, "07:00", "11:30"], [1, "13:00", "17:00"],
  [2, "07:00", "11:30"], [2, "13:00", "17:00"],
  [3, "07:00", "11:30"], [3, "13:00", "17:00"],
  [4, "07:00", "11:30"], [4, "13:00", "17:00"],
  [5, "07:00", "11:30"], [5, "13:00", "17:00"],
  [6, "07:30", "11:30"],
].map(([DayOfWeek, StartTime, EndTime], index) => ({
  Uuid: `30000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
  DayOfWeek: DayOfWeek as number,
  StartTime: StartTime as string,
  EndTime: EndTime as string,
  Status: BaseStatus.Active,
  CreatedAt: createdAt,
  UpdatedAt: createdAt,
  DeletedAt: notDeleted,
}));
