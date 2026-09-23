import axios from "axios";

import { httpClient } from "@/lib/http/client";
import type { ApiResponse } from "@/lib/http/response";
import type {
  PrescriptionErrorResponse,
  PrescriptionList,
  PrescriptionListQuery,
  PrescriptionSummary,
  PrescriptionView,
} from "@/types/prescriptions";

export class PrescriptionServiceError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = "PrescriptionServiceError";
  }
}

function toPrescriptionError(error: unknown) {
  if (axios.isAxiosError<PrescriptionErrorResponse>(error)) {
    return new PrescriptionServiceError(
      error.response?.data?.Message ??
        "Không thể kết nối đến hệ thống. Vui lòng thử lại.",
      error.response?.status,
    );
  }
  return new PrescriptionServiceError("Đã xảy ra lỗi. Vui lòng thử lại.");
}

export class PrescriptionService {
  async getAll(query: PrescriptionListQuery, signal?: AbortSignal) {
    try {
      const response = await httpClient.get<ApiResponse<PrescriptionList>>(
        "/prescriptions",
        { params: query, signal },
      );
      return {
        ...response.data,
        Data: {
          ...response.data.Data,
          Items: response.data.Data.Items.map(hydrateSummary),
        },
      };
    } catch (error) {
      throw toPrescriptionError(error);
    }
  }

  async getByUuid(uuid: string, signal?: AbortSignal) {
    try {
      const response = await httpClient.get<ApiResponse<PrescriptionView>>(
        `/prescriptions/${encodeURIComponent(uuid)}`,
        { signal },
      );
      return {
        ...response.data,
        Data: {
          ...hydrateSummary(response.data.Data),
          Details: response.data.Data.Details.map((item) => ({
            ...item,
            Medicine: {
              ...item.Medicine,
              CreatedAt: new Date(item.Medicine.CreatedAt),
              UpdatedAt: new Date(item.Medicine.UpdatedAt),
              DeletedAt: new Date(item.Medicine.DeletedAt),
            },
          })),
        },
      };
    } catch (error) {
      throw toPrescriptionError(error);
    }
  }
}

function hydrateSummary<T extends PrescriptionSummary>(item: T): T {
  return {
    ...item,
    Prescription: {
      ...item.Prescription,
      CreatedAt: new Date(item.Prescription.CreatedAt),
      UpdatedAt: new Date(item.Prescription.UpdatedAt),
      DeletedAt: new Date(item.Prescription.DeletedAt),
    },
  };
}

export const prescriptionService = new PrescriptionService();
