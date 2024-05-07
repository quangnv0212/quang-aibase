import { useGetListTenant } from "@/apiRequests/hooks/tenant/useGetListTenant.hook";
import { useCreateUser } from "@/apiRequests/hooks/user/useCreateUser.hook";
import { useDeleteUser } from "@/apiRequests/hooks/user/useDeleteUser.hook";
import { useUpdateUser } from "@/apiRequests/hooks/user/useUpdateUser.hook";
import {
  AccountBody,
  AccountBodyType,
} from "@/schemaValidations/account.schema";
import { TenantBodyType } from "@/schemaValidations/tenant.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Select } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ButtonCommon } from "./common/button-common";
import { InputTextCommon } from "./common/input-text";
import { ModalCommon } from "./common/modal-common";
import { ToogleCommon } from "./common/toogle-common";

export interface IModalCompanyProps {
  modalState: {
    isOpen: boolean;
    detailInfo: any;
    type: string;
  };
  setModalState: (value: any) => void;
  fetchListUser: () => void;
}

export function ModalUser(props: IModalCompanyProps) {
  const { modalState, setModalState, fetchListUser } = props;
  const [requestCreateUser] = useCreateUser();
  const [requestUpdateUser] = useUpdateUser();
  const [requestDeleteUser] = useDeleteUser();
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    setModalState({ ...modalState, isOpen: false });
  };
  const [requestGetListTenant] = useGetListTenant();
  const [listTenant, setTenantList] = useState<TenantBodyType[]>([]);
  useEffect(() => {
    requestGetListTenant(
      {
        MaxResultCount: 1000,
        SkipCount: 0,
      },
      () => {},
      (res: any) => {
        setTenantList(res?.result?.items);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }, []);
  const { control, handleSubmit } = useForm<AccountBodyType>({
    resolver: zodResolver(AccountBody),
    defaultValues: {
      emailAddress: modalState?.detailInfo?.emailAddress,
      name: modalState?.detailInfo?.name,
      isActive: modalState?.detailInfo?.isActive,
      surname: modalState?.detailInfo?.surname,
      password: modalState?.detailInfo?.password,
    },
  });
  const isConfirm = modalState.type === "delete";
  const [company, setSelectedCompany] = useState(0);
  useEffect(() => {
    setSelectedCompany(modalState?.detailInfo?.company);
  }, [modalState.detailInfo]);
  const handleChange = (value: number) => {
    setSelectedCompany(value);
  };
  const onSubmit = (values: AccountBodyType) => {
    if (modalState.type === "create") {
      requestCreateUser(
        {
          userName: values.userName,
          name: values.name,
          emailAddress: values.emailAddress,
          isActive: values.isActive,
          password: values.password,
          surname: values.surname,
          fullName: values.fullName,
          company: company,
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Create account successfully");
          fetchListUser();
        },
        () => {}
      );
    }
    if (modalState.type === "update") {
      requestUpdateUser(
        {
          id: modalState.detailInfo.id,
          userName: values.userName,
          name: values.name,
          emailAddress: values.emailAddress,
          isActive: values.isActive,
          password: values.password,
          surname: values.surname,
          fullName: values.fullName,
          company: company,
        },
        setLoading,
        () => {
          setModalState({ ...modalState, isOpen: false });
          toast.success("Update account successfully");
          fetchListUser();
        },
        () => {}
      );
    }
  };

  const handleDelete = () => {
    requestDeleteUser(
      {
        id: modalState.detailInfo.id,
      },
      setLoading,
      () => {
        setModalState({ ...modalState, isOpen: false });
        fetchListUser();
      },
      () => {}
    );
  };
  const createNewTenant = () => {};
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
              ? "Update account"
              : "Create a new account"}
          </p>
          <Form
            onFinish={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputTextCommon
              label="Email"
              name="emailAddress"
              placeholder="Enter your email"
              control={control}
            />
            <InputTextCommon
              label="Name"
              name="name"
              placeholder="Enter your name"
              control={control}
            />
            <InputTextCommon
              label="Surname"
              name="surname"
              placeholder="Enter your sur name"
              control={control}
            />
            <InputTextCommon
              label="Password"
              name="password"
              placeholder="Enter password"
              control={control}
            />
            <div className="flex flex-col gap-2 ">
              <p className="font-medium">Company</p>
              <Select
                className="w-full"
                showSearch
                value={company}
                onChange={handleChange}
                placeholder="Search to Select"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={listTenant.map((x) => {
                  return {
                    label: x.tenancyName,
                    value: x.id,
                  };
                })}
                notFoundContent={
                  <Button type="link" onClick={createNewTenant}>
                    Not found company. Create a new company
                  </Button>
                }
              />
            </div>

            <ToogleCommon label="Active" control={control} name="isActive" />
            <div className="flex flex-col gap-3 mt-3">
              <ButtonCommon
                loading={loading}
                type="submit"
                className="btn btn-sm w-full hover:bg-primary-hover bg-primary text-white border-none"
              >
                {modalState.type === "update"
                  ? "Update account"
                  : "Create account"}
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
