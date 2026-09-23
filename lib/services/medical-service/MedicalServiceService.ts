import { isAxiosError } from "axios";

import { httpClient } from "@/lib/http/client";
import type { ApiResponse, PaginatedData } from "@/lib/http/response";
import type { MedicalServiceDetail } from "@/types/details";
import type { MedicalServiceListQuery } from "@/types/discovery";
import type { MedicalService } from "@/types/models";

export class MedicalServiceService {
  async getBySlug(
    slug: string,
  ): Promise<ApiResponse<MedicalServiceDetail> | null> {
    try {
      const response = await httpClient.get<ApiResponse<MedicalServiceDetail>>(
        `/medical-services/${encodeURIComponent(slug)}`,
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }

  async getAll(
    query: MedicalServiceListQuery = {},
    signal?: AbortSignal,
  ): Promise<ApiResponse<PaginatedData<MedicalService>>> {
    const response = await httpClient.get<
      ApiResponse<PaginatedData<MedicalService>>
    >("/medical-services", { params: query, signal });

    return response.data;
  }

  async getFeatured(
    signal?: AbortSignal,
  ): Promise<ApiResponse<MedicalService[]>> {
    const response = await httpClient.get<ApiResponse<MedicalService[]>>(
      "/medical-services/featured",
      { signal },
    );

    return response.data;
  }
}

export const medicalServiceService = new MedicalServiceService();
