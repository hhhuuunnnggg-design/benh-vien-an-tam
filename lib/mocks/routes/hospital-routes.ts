import type AxiosMockAdapter from "axios-mock-adapter";

import { mockHospitalDepartments } from "@/data/mocks/hospital-departments";
import { mockHospitalMedicalServices } from "@/data/mocks/hospital-medical-services";
import { featuredHospitals, mockHospitals } from "@/data/mocks/hospitals";
import { mockDepartments } from "@/data/mocks/departments";
import { mockMedicalServices } from "@/data/mocks/medical-services";
import { mockReviewHospitals } from "@/data/mocks/review-hospitals";
import {
  getPositiveIntegerParam,
  getStringParam,
  matchesKeyword,
  paginate,
} from "@/lib/mocks/query-utils";
import { BaseStatus } from "@/types/models";

export function registerHospitalRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/hospitals/featured").reply(200, {
    Data: featuredHospitals,
    Message: "Lấy danh sách cơ sở nổi bật thành công.",
  });

  mock.onGet("/hospitals").reply((config) => {
    const q = getStringParam(config.params, "q");
    const name = getStringParam(config.params, "name");
    const department = getStringParam(config.params, "department");
    const page = getPositiveIntegerParam(config.params, "page", 1);
    const pageSize = getPositiveIntegerParam(config.params, "pageSize", 6);
    const items = mockHospitals.filter(
      (hospital) =>
        hospital.Status === BaseStatus.Active &&
        matchesKeyword(name, hospital.Name) &&
        matchesKeyword(q, hospital.Name, hospital.Address) &&
        (!department ||
          mockHospitalDepartments.some(
            (relation) =>
              relation.HospitalUuid === hospital.Uuid &&
              relation.DepartmentUuid === department,
          )),
    );

    return [
      200,
      {
        Data: paginate(items, page, pageSize),
        Message: "Lấy danh sách cơ sở y tế thành công.",
      },
    ];
  });

  mock.onGet("/hospitals/options").reply(200, {
    Data: mockHospitals.filter(
      (hospital) => hospital.Status === BaseStatus.Active,
    ),
    Message: "Lấy lựa chọn cơ sở y tế thành công.",
  });

  mock
    .onGet(/^\/hospitals\/(?!featured$|options$)[^/]+$/)
    .reply((config) => {
      const slug = decodeURIComponent(config.url?.split("/").pop() ?? "");
      const hospital = mockHospitals.find(
        (item) => item.Slug === slug && item.Status === BaseStatus.Active,
      );

      if (!hospital) {
        return [404, { Data: null, Message: "Không tìm thấy cơ sở y tế." }];
      }

      const departmentUuids = new Set(
        mockHospitalDepartments
          .filter((relation) => relation.HospitalUuid === hospital.Uuid)
          .map((relation) => relation.DepartmentUuid),
      );
      const serviceUuids = new Set(
        mockHospitalMedicalServices
          .filter((relation) => relation.HospitalUuid === hospital.Uuid)
          .map((relation) => relation.MedicalServiceUuid),
      );

      return [
        200,
        {
          Data: {
            Hospital: hospital,
            Departments: mockDepartments.filter(
              (item) =>
                item.Status === BaseStatus.Active && departmentUuids.has(item.Uuid),
            ),
            MedicalServices: mockMedicalServices.filter(
              (item) =>
                item.Status === BaseStatus.Active && serviceUuids.has(item.Uuid),
            ),
            Reviews: mockReviewHospitals
              .filter(
                (review) =>
                  review.HospitalUuid === hospital.Uuid &&
                  review.Status === BaseStatus.Active,
              )
              .sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime()),
          },
          Message: "Lấy chi tiết cơ sở y tế thành công.",
        },
      ];
    });
}
