import tenantApiRequest from "@/apiRequests/tenant";
import { TenantBodyType } from "@/schemaValidations/tenant.schema";

export const useDeleteTenant = () => {
  async function request(
    params: {
      id: string;
    },
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    try {
      setLoading(true);
      const response = await tenantApiRequest.deleteTenant(params.id);
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
