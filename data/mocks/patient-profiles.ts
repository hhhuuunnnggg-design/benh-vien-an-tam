import { Gender, type PatientProfile } from "@/types/models";

export const mockPatientProfiles: PatientProfile[] = [
  {
    Uuid: "c8067404-5a51-4a83-a4e5-d6a7d7508a12",
    Avatar: "",
    Name: "Nguyễn An",
    Gender: Gender.Male,
    Birthdate: new Date("1992-06-18T00:00:00.000Z"),
    MedicalCode: "BN10001234",
    Email: "nguyen.an@example.com",
    AccountUuid: "dfbd3aa5-ab7a-4ad7-a0a1-e870f38129b8",
  },
  {
    Uuid: "f7472b18-f178-4e9c-9d2d-cd87b4fca3c5",
    Avatar: "",
    Name: "Trần Bình",
    Gender: Gender.Other,
    Birthdate: new Date("1988-03-24T00:00:00.000Z"),
    MedicalCode: "BN10005678",
    Email: "tran.binh@example.com",
    AccountUuid: "0ad1f4f4-15fc-4b6a-a89d-67917d4278bf",
  },
];
