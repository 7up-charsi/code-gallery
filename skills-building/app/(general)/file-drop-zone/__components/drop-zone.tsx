'use client';

import { PlusIcon, UploadIcon, XIcon } from 'lucide-react';
import { getFileExtension } from '../__utils/file';
import { Button } from '@typeweave/react/button';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import React from 'react';

interface DropZoneProps {}

const displayName = 'DropZone';

export const DropZone = (props: DropZoneProps) => {
  const {} = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [uploadLoading, setUploadLoading] = React.useState(false);
  const [dragEnter, setDragEnter] = React.useState(false);
  const [files, setFiles] = React.useState<
    { id: string; file: File }[]
  >([]);

  React.useEffect(() => {
    const handleDragEnter = () => {
      setDragEnter(true);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();
      setDragEnter(false);

      const data = event.dataTransfer;

      if (!data) return;

      const files: { id: string; file: File }[] = [];

      for (const item of Array.from(data.items)) {
        if (item.kind === 'file') {
          const file = item.getAsFile();

          if (!file) {
            toast.error(`Directory is not acceptable`, {
              autoClose: 2000,
            });

            return;
          }

          if (
            [
              'image/jpeg',
              'image/png',
              'image/gif',
              'application/pdf',
              'application/json',
            ].includes(file.type)
          ) {
            files.push({ id: uuid(), file });
          } else {
            toast.error(
              `${getFileExtension(file.name)} file type is not acceptable`,
              { autoClose: 2000 },
            );
          }
        }
      }

      setFiles((prev) => [...prev, ...files]);
    };

    const handleDragLeave = (event: DragEvent) => {
      if (!document.contains(event.relatedTarget as Node)) {
        setDragEnter(false);
      }
    };

    document.addEventListener('dragenter', handleDragEnter);
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragleave', handleDragLeave);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter);
      document.removeEventListener('dragover', handleDragOver);
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  return (
    <>
      {files.length ? null : (
        <div className="flex flex-col items-center gap-5">
          <UploadIcon size={200} className="text-muted-5" />

          <Button
            color="primary"
            variant="solid"
            onPress={() => {
              inputRef.current?.click();
            }}
          >
            Browse
          </Button>

          <span className="text-2xl text-muted-9">
            or drag a file here
          </span>
        </div>
      )}

      {!dragEnter ? null : (
        <div className="absolute inset-0 z-50 bg-success-9/30 backdrop-blur-[2px]">
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 content-center whitespace-nowrap rounded border border-success-9 bg-background px-5 py-2 text-lg text-success-11 transition-colors">
            Drop here to start processing
          </div>
        </div>
      )}

      {!files.length ? null : (
        <>
          <div className="flex h-12 items-center gap-1 px-5">
            <span className="text-lg font-medium capitalize">
              files
            </span>

            <div className="grow"></div>

            <Button
              color="primary"
              variant="text"
              startContent={<PlusIcon />}
              disabled={uploadLoading}
              onPress={() => {
                inputRef.current?.click();
              }}
            >
              Browse
            </Button>
          </div>

          <table className="w-full table-fixed outline-none">
            <caption className="sr-only">files</caption>

            <thead>
              <tr className="">
                <th
                  scope="col"
                  className="h-12 border-y border-muted-6 px-5 text-left font-medium capitalize"
                >
                  name
                </th>

                <th
                  scope="col"
                  className="h-12 w-28 border-y border-muted-6 px-5 font-medium capitalize"
                >
                  actions
                </th>
              </tr>
            </thead>

            <tbody>
              {files.map(({ id, file }) => (
                <tr key={id} className="group">
                  <td className="h-12 truncate border-b border-muted-6 px-5 group-last:border-0">
                    {file.name}
                  </td>

                  <td className="h-12 border-b border-muted-6 text-center group-last:border-0">
                    <Button
                      isIconOnly
                      aria-label="remove file"
                      color="danger"
                      variant="text"
                      size="sm"
                      className="text-xl"
                      disabled={uploadLoading}
                      onPress={() => {
                        setFiles((prev) =>
                          prev.filter((file) => file.id !== id),
                        );
                      }}
                    >
                      <XIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 flex items-center justify-center">
            <Button
              className=""
              disabled={uploadLoading}
              onPress={async () => {
                setUploadLoading(true);

                const toastId = toast('uploading...', {
                  autoClose: false,
                  type: 'info',
                });

                await new Promise((resolve) => {
                  setTimeout(resolve, 2000);
                });

                toast.update(toastId, {
                  render: 'uploaded',
                  type: 'success',
                  autoClose: 2000,
                });

                setUploadLoading(false);
                setFiles([]);
              }}
            >
              Upload to server
            </Button>
          </div>
        </>
      )}

      <label htmlFor="input-file" className="sr-only">
        browser files
      </label>
      <input
        id="input-file"
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        onChange={(e) => {
          const files = e.target.files;

          if (files?.length) {
            setFiles((prev) => [
              ...prev,
              ...Array.from(files).map((file) => ({
                id: uuid(),
                file,
              })),
            ]);
          }
        }}
      />
    </>
  );
};

DropZone.displayName = displayName;
