import type AxiosMockAdapter from "axios-mock-adapter";

import { featuredDepartments, mockDepartments } from "@/data/mocks/departments";
import { BaseStatus } from "@/types/models";

export function registerDepartmentRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/departments/featured").reply(200, {
    Data: featuredDepartments,
    Message: "Lấy danh sách chuyên khoa nổi bật thành công.",
  });

  mock.onGet("/departments/options").reply(200, {
    Data: mockDepartments.filter(
      (department) => department.Status === BaseStatus.Active,
    ),
    Message: "Lấy lựa chọn chuyên khoa thành công.",
  });
}
