import { mockHospitals } from "@/data/mocks/hospitals";
import { mockTimeWorkings } from "@/data/mocks/time-workings";
import type { HospitalWorking } from "@/types/models";

export const mockHospitalWorkings: HospitalWorking[] = mockHospitals.flatMap((hospital, hospitalIndex) =>
  mockTimeWorkings.map((working, workingIndex) => ({
    Uuid: `32000000-${String(hospitalIndex + 1).padStart(4, "0")}-4000-8000-${String(workingIndex + 1).padStart(12, "0")}`,
    HospitalUuid: hospital.Uuid,
    WorkingUuid: working.Uuid,
  })),
);
