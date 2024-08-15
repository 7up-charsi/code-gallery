'use client';

import { Button } from '@typeweave/react/button';
import { UploadIcon } from 'lucide-react';
import { v4 as uuid } from 'uuid';
import React from 'react';

interface DropZoneProps {}

const displayName = 'DropZone';

export const DropZone = (props: DropZoneProps) => {
  const {} = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [dragEnter, setDragEnter] = React.useState(false);
  const [files, setFiles] = React.useState<
    { id: string; file: File }[]
  >([]);

  React.useEffect(() => {
    const handleDragEnter = (event: DragEvent) => {
      setDragEnter(true);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setDragEnter(false);

      const data = event.dataTransfer;

      if (
        !data ||
        (data &&
          !Array.from(data.items).every(
            (item) => item.kind === 'file',
          ))
      )
        return;

      if (data) {
        setFiles((prev) => [
          ...prev,
          ...Array.from(data.files).map((file) => ({
            id: uuid(),
            file,
          })),
        ]);
      }
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

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
          />
        </div>
      )}

      {!dragEnter ? null : (
        <div className="absolute inset-0 z-50 bg-success-9/30 backdrop-blur-[2px]">
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 content-center whitespace-nowrap rounded border border-success-9 bg-background px-5 py-2 text-lg text-success-11 transition-colors">
            Drop here to start processing
          </div>
        </div>
      )}

      {files.map(({ id, file }) => (
        <span key={id}>{file.name}</span>
      ))}
    </>
  );
};

DropZone.displayName = displayName;
