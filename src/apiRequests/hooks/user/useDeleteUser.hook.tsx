import userApiRequest from "@/apiRequests/user";

export const useDeleteUser = () => {
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
      const response = await userApiRequest.deleteUser(params.id);
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
