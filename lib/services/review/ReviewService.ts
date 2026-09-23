import axios from "axios";

import { httpClient } from "@/lib/http/client";
import type { ApiResponse } from "@/lib/http/response";
import type {
  PatientReview,
  PublicReview,
  ReviewEligibility,
  ReviewErrorResponse,
  ReviewTargetType,
  SaveReviewRequest,
} from "@/types/reviews";

export class ReviewServiceError extends Error {
  constructor(
    message: string,
    public readonly fieldErrors: ReviewErrorResponse["Errors"] = {},
    public readonly status?: number,
  ) {
    super(message);
    this.name = "ReviewServiceError";
  }
}

function toReviewError(error: unknown) {
  if (axios.isAxiosError<ReviewErrorResponse>(error)) {
    return new ReviewServiceError(
      error.response?.data?.Message ??
        "Không thể kết nối đến hệ thống. Vui lòng thử lại.",
      error.response?.data?.Errors,
      error.response?.status,
    );
  }
  return new ReviewServiceError("Đã xảy ra lỗi. Vui lòng thử lại.");
}

export class ReviewService {
  async getEligibility(appointmentUuid: string, signal?: AbortSignal) {
    try {
      const response = await httpClient.get<ApiResponse<ReviewEligibility>>(
        "/reviews/eligibility",
        { params: { appointmentUuid }, signal },
      );
      return {
        ...response.data,
        Data: {
          ...response.data.Data,
          Targets: response.data.Data.Targets.map((target) => ({
            ...target,
            Review: target.Review ? hydrateReview(target.Review) : null,
          })),
        },
      };
    } catch (error) {
      throw toReviewError(error);
    }
  }

  async save(
    type: ReviewTargetType,
    targetUuid: string,
    request: SaveReviewRequest,
  ) {
    try {
      const response = await httpClient.put<ApiResponse<PatientReview>>(
        `/reviews/${type}/${encodeURIComponent(targetUuid)}`,
        request,
      );
      return { ...response.data, Data: hydrateReview(response.data.Data) };
    } catch (error) {
      throw toReviewError(error);
    }
  }

  async getPublic(
    type: ReviewTargetType,
    targetUuid: string,
    signal?: AbortSignal,
  ) {
    try {
      const response = await httpClient.get<ApiResponse<PublicReview[]>>(
        "/reviews/public",
        { params: { type, targetUuid }, signal },
      );
      return {
        ...response.data,
        Data: response.data.Data.map((review) => ({
          ...review,
          CreatedAt: new Date(review.CreatedAt),
        })),
      };
    } catch (error) {
      throw toReviewError(error);
    }
  }
}

function hydrateReview<T extends PatientReview>(review: T): T {
  return { ...review, CreatedAt: new Date(review.CreatedAt) };
}

export const reviewService = new ReviewService();
