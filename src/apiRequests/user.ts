import http from "@/lib/http";
import { AccountBodyType } from "@/schemaValidations/account.schema";

const userApiRequest = {
  createUser: async (body: AccountBodyType) => {
    try {
      return http.post(`/services/app/User/Create`, {
        ...body,
        roleNames: [],
        isActive: body.isActive === true ? true : false,
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getListUser: async (params: {
    keyword?: string;
    isActive?: boolean;
    SkipCount: number;
    MaxResultCount: number;
  }) => {
    try {
      return http.get(`/services/app/User/GetUsers`, { params });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  updateUser: async (body: AccountBodyType) => {
    try {
      return http.put(`/services/app/User/Update`, body);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  deleteUser: async (id: string) => {
    try {
      return http.delete(`/services/app/User/Delete`, { params: { id } });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default userApiRequest;
