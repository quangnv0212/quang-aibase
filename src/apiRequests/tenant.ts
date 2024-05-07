import http from "@/lib/http";
import { TenantBodyType } from "@/schemaValidations/tenant.schema";

const tenantApiRequest = {
  createTenant: async (body: TenantBodyType) => {
    try {
      return http.post(`/services/app/Tenant/Create`, {
        ...body,
        roleNames: [],
        isActive: body.isActive === true ? true : false,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getListTenant: async (params: {
    keyword?: string;
    isActive?: boolean;
    SkipCount: number;
    MaxResultCount: number;
  }) => {
    try {
      return http.get(`/services/app/Tenant/GetAll`, { params });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateTenant: async (body: TenantBodyType) => {
    try {
      return http.put(`/services/app/Tenant/Update`, body);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteTenant: async (id: string) => {
    try {
      return http.delete(`/services/app/Tenant/Delete`, { params: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default tenantApiRequest;
