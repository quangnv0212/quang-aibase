import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "antd";
import { useForm } from "react-hook-form";
import { ButtonCommon } from "./common/button-common";
import { InputTextCommon } from "./common/input-text";
import { ModalCommon } from "./common/modal-common";
import { ToogleCommon } from "./common/toogle-common";
import { useCreateTenant } from "@/apiRequests/hooks/tenant/useCreateTenant.hook";
import { useUpdateTenant } from "@/apiRequests/hooks/tenant/useUpdateTenant.hook";
import { TenantBody, TenantBodyType } from "@/schemaValidations/tenant.schema";
import { useState } from "react";
import { useDeleteTenant } from "@/apiRequests/hooks/tenant/useDeleteTenant.hook";
import { toast } from "react-toastify";

export interface IModalCompanyProps {
  modalState: {
    isOpen: boolean;
    detailInfo: any;
    type: string;
  };
  setModalState: (value: any) => void;
  fetchListTenant: () => void;
}

export function ModalTenant(props: IModalCompanyProps) {
  const { modalState, setModalState, fetchListTenant } = props;
  const [requestCreateTenant] = useCreateTenant();
  const [requestUpdateTenant] = useUpdateTenant();
  const [requestDeleteTenant] = useDeleteTenant();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  const { control, handleSubmit } = useForm<TenantBodyType>({
    resolver: zodResolver(TenantBody),
    defaultValues: {
      tenancyName: modalState.detailInfo?.tenancyName,
      isActive: modalState.detailInfo?.isActive,
      country: modalState.detailInfo?.country || "",
      state: modalState.detailInfo?.state || "",
    },
  });
  const isConfirm = modalState.type === "delete";

  const onSubmit = (values: TenantBodyType) => {
    if (modalState.type === "create") {
      requestCreateTenant(
        {
          tenancyName: values.tenancyName,
          isActive: values.isActive,
          country: values.country,
          state: values.state,
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Create company successfully");
          fetchListTenant();
        },
        () => {}
      );
    }
    if (modalState.type === "update") {
      requestUpdateTenant(
        {
          tenancyName: values.tenancyName,
          isActive: values.isActive,
          country: values.country,
          id: modalState.detailInfo.id,
          state: values.state,
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Update company successfully");
          fetchListTenant();
        },
        () => {}
      );
    }
  };

  const handleDelete = () => {
    requestDeleteTenant(
      {
        id: modalState.detailInfo.id,
      },
      setLoading,
      () => {
        setModalState({ ...modalState, isOpen: false });
        fetchListTenant();
      },
      () => {}
    );
  };

  return (
    <ModalCommon
      open={modalState.isOpen}
      centered
      padding={0}
      footer={null}
      onCancel={handleCancel}
      style={{ borderRadius: 8 }}
      width={450}
      closable={false}
    >
      {isConfirm ? (
        <div className="flex flex-col gap-2">
          <p className="font-bold text-16-18 capitalize font-visby">
            Are you sure you want to delete this user?
          </p>
          <p>
            This action cannot be undone. This will permanently delete the user
          </p>
          <div className="flex justify-end gap-2">
            <ButtonCommon onClick={handleCancel} className="btn btn-sm">
              No
            </ButtonCommon>
            <ButtonCommon
              loading={loading}
              onClick={handleDelete}
              className="btn btn-sm bg-primary text-white hover:bg-primary"
            >
              Yes
            </ButtonCommon>
          </div>
        </div>
      ) : (
        <div className="px-6 flex flex-col gap-4">
          <p className="font-bold text-24-28 capitalize text-center font-visby">
            {modalState.type === "update"
              ? "Update company"
              : "Create a new company"}
          </p>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputTextCommon
              label="Company name"
              name="tenancyName"
              placeholder="Enter your company name"
              control={control}
            />
            <InputTextCommon
              label="Country"
              name="country"
              placeholder="Enter your country"
              control={control}
            />
            <InputTextCommon
              label="State"
              name="state"
              placeholder="Enter your state"
              control={control}
            />
            <ToogleCommon label="Active" control={control} name="isActive" />
            <div className="flex flex-col gap-3 mt-3">
              <ButtonCommon
                loading={loading}
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                {modalState.type === "update"
                  ? "Update company"
                  : "Create company"}
              </ButtonCommon>
              <ButtonCommon
                onClick={handleCancel}
                className="btn py-2 w-full btn-sm bg-slate-400 text-white border-none hover:bg-slate-500"
              >
                Cancel
              </ButtonCommon>
            </div>
          </Form>
        </div>
      )}
    </ModalCommon>
  );
}
