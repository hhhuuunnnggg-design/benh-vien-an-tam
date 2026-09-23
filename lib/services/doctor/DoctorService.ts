import { isAxiosError } from "axios";

import { httpClient } from "@/lib/http/client";
import type { ApiResponse, PaginatedData } from "@/lib/http/response";
import type { DoctorDetail } from "@/types/details";
import type { DoctorListQuery } from "@/types/discovery";
import type { DoctorProfile } from "@/types/models";

export class DoctorService {
  async getBySlug(slug: string): Promise<ApiResponse<DoctorDetail> | null> {
    try {
      const response = await httpClient.get<ApiResponse<DoctorDetail>>(
        `/doctors/${encodeURIComponent(slug)}`,
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) return null;
      throw error;
    }
  }

  async getAll(
    query: DoctorListQuery = {},
    signal?: AbortSignal,
  ): Promise<ApiResponse<PaginatedData<DoctorProfile>>> {
    const response = await httpClient.get<
      ApiResponse<PaginatedData<DoctorProfile>>
    >("/doctors", { params: query, signal });

    return response.data;
  }

  async getFeatured(
    signal?: AbortSignal,
  ): Promise<ApiResponse<DoctorProfile[]>> {
    const response = await httpClient.get<ApiResponse<DoctorProfile[]>>(
      "/doctors/featured",
      { signal },
    );

    return response.data;
  }
}

export const doctorService = new DoctorService();
