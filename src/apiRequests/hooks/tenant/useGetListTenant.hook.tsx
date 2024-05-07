import tenantApiRequest from "@/apiRequests/tenant";

export const useGetListTenant = () => {
  async function request(
    params: {
      keyword?: string;
      isActive?: boolean;
      SkipCount: number;
      MaxResultCount: number;
    },
    setLoading: Function,
    onSuccess: Function,
    onError: Function
  ) {
    setLoading(true);
    const response = await tenantApiRequest.getListTenant(params);
    if (response?.status === 200) {
      onSuccess(response.data);
      setLoading(false);
    } else {
      onError(response);
      setLoading(false);
    }
  }

  return [request];
};
