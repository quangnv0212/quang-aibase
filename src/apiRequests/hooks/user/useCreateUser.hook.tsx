import tenantApiRequest from "@/apiRequests/tenant";
import userApiRequest from "@/apiRequests/user";
import { AccountBodyType } from "@/schemaValidations/account.schema";

export const useCreateUser = () => {
  async function request(
    params: AccountBodyType,
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await userApiRequest.createUser({
        ...params,
        isActive: params.isActive === true ? true : false,
      });
      if (response.status === 200) {
        onSuccess(response.data);
        setLoading(false);
      } else {
      }
    } catch (error) {
      onError(error);
      setLoading(false);
    }
  }
  return [request];
};
