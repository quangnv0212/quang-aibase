import tenantApiRequest from "@/apiRequests/tenant";
import userApiRequest from "@/apiRequests/user";
import { AccountBodyType } from "@/schemaValidations/account.schema";

export const useUpdateUser = () => {
  async function request(
    params: AccountBodyType,
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await userApiRequest.updateUser({
        ...params,
        isActive: params.isActive === true ? true : false,
        fullName: params.name,
        userName: params.name,
        roleNames: [],
      });
      if (response.status === 200) {
        onSuccess(response.data);
        setLoading(false);
      }
    } catch (error) {
      onError(error);
      setLoading(false);
    }
  }
  return [request];
};
