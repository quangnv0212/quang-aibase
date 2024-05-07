"use client";
import { convertFileToArrayBuffer } from "@/lib/convert-file-to-arraybuffer";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useState } from "react";
import UploadOutlined from "@ant-design/icons/UploadOutlined";
import { BlockBlobClient } from "@azure/storage-blob";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

export default function ModalModel() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as FileType);
    });
    setUploading(true);
    convertFileToArrayBuffer(fileList[0] as any)
      .then((fileArrayBuffer) => {
        if (!fileArrayBuffer) {
          return;
        }

        const blockBlobClient = new BlockBlobClient(
          `https://aibasedemo.blob.core.windows.net/images/${fileList[0]?.name}?sp=racwdli&st=2024-05-01T10:11:51Z&se=2024-06-06T18:11:51Z&spr=https&sv=2022-11-02&sr=c&sig=e3UVoLRl1Y6SdOkGPvM8%2BxzLpyrPS0ZwaksVNfdySvA%3D`
        );
        return blockBlobClient.uploadData(fileArrayBuffer, {
          blobHTTPHeaders: { blobContentType: "text/plain" },
        });
      })
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props: UploadProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file: any) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props} multiple={false}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? "Uploading" : "Start Upload"}
      </Button>
    </>
  );
}
