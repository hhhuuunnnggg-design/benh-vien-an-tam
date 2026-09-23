import type AxiosMockAdapter from "axios-mock-adapter";

import { mockAccounts } from "@/data/mocks/accounts";
import { mockDoctorDepartments } from "@/data/mocks/doctor-departments";
import { featuredDoctors, mockDoctors } from "@/data/mocks/doctors";
import { mockDepartments } from "@/data/mocks/departments";
import { mockHospitals } from "@/data/mocks/hospitals";
import { mockReviewDoctors } from "@/data/mocks/review-doctors";
import {
  getPositiveIntegerParam,
  getStringParam,
  matchesKeyword,
  paginate,
} from "@/lib/mocks/query-utils";
import { BaseStatus } from "@/types/models";

export function registerDoctorRoutes(mock: AxiosMockAdapter) {
  mock.onGet("/doctors/featured").reply(200, {
    Data: featuredDoctors,
    Message: "Lấy danh sách bác sĩ nổi bật thành công.",
  });

  mock.onGet("/doctors").reply((config) => {
    const q = getStringParam(config.params, "q");
    const hospital = getStringParam(config.params, "hospital");
    const department = getStringParam(config.params, "department");
    const page = getPositiveIntegerParam(config.params, "page", 1);
    const pageSize = getPositiveIntegerParam(config.params, "pageSize", 6);
    const items = mockDoctors.filter((doctor) => {
      const account = mockAccounts.find(
        (candidate) => candidate.Uuid === doctor.AccountUuid,
      );
      const workplace = mockHospitals.find(
        (candidate) => candidate.Uuid === doctor.HospitalUuid,
      );

      return (
        account?.Status === BaseStatus.Active &&
        workplace?.Status === BaseStatus.Active &&
        matchesKeyword(q, doctor.Name, doctor.Specialty, doctor.Workplace) &&
        (!hospital || doctor.HospitalUuid === hospital) &&
        (!department ||
          mockDoctorDepartments.some(
            (relation) =>
              relation.DoctorUuid === doctor.Uuid &&
              relation.DepartmentUuid === department,
          ))
      );
    });

    return [
      200,
      {
        Data: paginate(items, page, pageSize),
        Message: "Lấy danh sách bác sĩ thành công.",
      },
    ];
  });

  mock.onGet(/^\/doctors\/(?!featured$)[^/]+$/).reply((config) => {
    const slug = decodeURIComponent(config.url?.split("/").pop() ?? "");
    const doctor = mockDoctors.find((item) => item.Slug === slug);
    const account = mockAccounts.find(
      (item) => item.Uuid === doctor?.AccountUuid,
    );
    const hospital = mockHospitals.find(
      (item) => item.Uuid === doctor?.HospitalUuid,
    );

    if (
      !doctor ||
      account?.Status !== BaseStatus.Active ||
      hospital?.Status !== BaseStatus.Active
    ) {
      return [404, { Data: null, Message: "Không tìm thấy bác sĩ." }];
    }

    const departmentUuids = new Set(
      mockDoctorDepartments
        .filter((relation) => relation.DoctorUuid === doctor.Uuid)
        .map((relation) => relation.DepartmentUuid),
    );

    return [
      200,
      {
        Data: {
          Doctor: doctor,
          Departments: mockDepartments.filter(
            (item) =>
              item.Status === BaseStatus.Active && departmentUuids.has(item.Uuid),
          ),
          Hospital: hospital,
          Reviews: mockReviewDoctors
            .filter(
              (review) =>
                review.DoctorUuid === doctor.Uuid &&
                review.Status === BaseStatus.Active,
            )
            .sort((a, b) => b.CreatedAt.getTime() - a.CreatedAt.getTime()),
        },
        Message: "Lấy chi tiết bác sĩ thành công.",
      },
    ];
  });
}
