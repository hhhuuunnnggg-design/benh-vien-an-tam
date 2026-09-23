import axios from "axios";

import { attachMockApi } from "@/lib/http/mock-api";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

if (process.env.NEXT_PUBLIC_USE_MOCK_API !== "false") {
  attachMockApi(httpClient);
}
