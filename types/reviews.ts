import type {
  ReviewDoctor,
  ReviewHospital,
  ReviewMedicalService,
} from "@/types/models";

export type ReviewTargetType = "hospital" | "doctor" | "medical-service";

export type PatientReview =
  | ReviewHospital
  | ReviewDoctor
  | ReviewMedicalService;

export type PublicReview = Pick<
  PatientReview,
  "Uuid" | "Content" | "NumberOfStar" | "CreatedAt"
>;

export type ReviewEligibilityTarget = {
  Type: ReviewTargetType;
  TargetUuid: string;
  TargetName: string;
  Review: PatientReview | null;
};

export type ReviewEligibility = {
  AppointmentUuid: string;
  Targets: ReviewEligibilityTarget[];
};

export type SaveReviewRequest = {
  NumberOfStar: number;
  Content: string;
};

export type ReviewErrorResponse = {
  Message?: string;
  Errors?: Partial<Record<keyof SaveReviewRequest, string>>;
};
