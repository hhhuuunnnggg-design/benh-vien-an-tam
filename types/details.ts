import type {
  Department,
  DoctorProfile,
  Hospital,
  MedicalService,
  ReviewDoctor,
  ReviewHospital,
  ReviewMedicalService,
} from "@/types/models";

export type HospitalDetail = {
  Hospital: Hospital;
  Departments: Department[];
  MedicalServices: MedicalService[];
  Reviews: ReviewHospital[];
};

export type DoctorDetail = {
  Doctor: DoctorProfile;
  Departments: Department[];
  Hospital: Hospital;
  Reviews: ReviewDoctor[];
};

export type MedicalServiceDetail = {
  MedicalService: MedicalService;
  Hospitals: Hospital[];
  Reviews: ReviewMedicalService[];
};
