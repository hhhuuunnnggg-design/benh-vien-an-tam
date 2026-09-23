import { httpClient } from "@/lib/http/client";
import type { ApiResponse } from "@/lib/http/response";
import type { Department } from "@/types/models";

export class DepartmentService {
  async getOptions(signal?: AbortSignal): Promise<ApiResponse<Department[]>> {
    const response = await httpClient.get<ApiResponse<Department[]>>(
      "/departments/options",
      { signal },
    );

    return response.data;
  }

  async getFeatured(signal?: AbortSignal): Promise<ApiResponse<Department[]>> {
    const response = await httpClient.get<ApiResponse<Department[]>>(
      "/departments/featured",
      { signal },
    );

    return response.data;
  }
}

export const departmentService = new DepartmentService();
