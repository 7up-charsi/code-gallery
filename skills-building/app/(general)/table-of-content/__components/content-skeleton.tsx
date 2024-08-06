import React from 'react';

interface ContentSkeletonProps {}

const displayName = 'ContentSkeleton';

export const ContentSkeleton = (props: ContentSkeletonProps) => {
  const {} = props;

  return (
    <div className="space-y-3">
      {Array.from({
        length: Math.floor(Math.random() * (15 - 4 + 1)) + 4,
      }).map((_, i, arr) => (
        <div
          key={i}
          style={{
            width:
              i + 1 === arr.length
                ? `${Math.floor(Math.random() * (70 - 10 + 1)) + 10}%`
                : '100%',
          }}
          className="h-3 rounded bg-gray-200"
        ></div>
      ))}
    </div>
  );
};

ContentSkeleton.displayName = displayName;
