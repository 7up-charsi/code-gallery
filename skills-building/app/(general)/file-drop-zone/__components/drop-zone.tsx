'use client';

import { PointerEvents } from '@typeweave/react/pointer-events';
import React from 'react';

interface DropZoneProps {}

const displayName = 'DropZone';

export const DropZone = (props: DropZoneProps) => {
  const {} = props;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [dragEnter, setDragEnter] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  React.useEffect(() => {
    const handleDragEnter = (event: DragEvent) => {
      if (event.dataTransfer && analyzeFiles(event.dataTransfer)) {
        setDragEnter(true);
      }
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      setDragEnter(false);

      const data = event.dataTransfer;

      if (data) {
        setFiles((prev) => [...prev, ...Array.from(data.files)]);
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
        <PointerEvents
          onPress={() => {
            inputRef.current?.click();
          }}
        >
          <div className="aspect-video w-full max-w-md cursor-pointer content-center rounded border-2 border-muted-6 bg-muted-3 text-center text-3xl leading-relaxed text-muted-8 shadow-md transition-colors hover:bg-muted-4 hover:text-muted-9">
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
            />

            <p className="">
              <span>Click to Upload</span>
              <br />
              or
              <br />
              <span>Drag & Drop</span>
            </p>
          </div>
        </PointerEvents>
      )}

      {!dragEnter ? null : (
        <div className="absolute inset-0 z-50 bg-success-9/30 backdrop-blur-[2px]">
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 content-center whitespace-nowrap rounded border border-success-9 bg-background px-5 py-2 text-lg text-success-11 transition-colors">
            Drop here to start processing
          </div>
        </div>
      )}
    </>
  );
};

DropZone.displayName = displayName;

const analyzeFiles = (dataTransfer: DragEvent['dataTransfer']) => {
  return (
    dataTransfer &&
    Array.from(dataTransfer.items).every(
      (item) => item.kind === 'file',
    )
  );
};
