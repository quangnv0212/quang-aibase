import tenantApiRequest from "@/apiRequests/tenant";
import { TenantBodyType } from "@/schemaValidations/tenant.schema";

export const useCreateTenant = () => {
  async function request(
    params: TenantBodyType,
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await tenantApiRequest.createTenant({
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
