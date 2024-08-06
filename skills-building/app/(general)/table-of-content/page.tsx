import { ContentSkeleton } from './__components/content-skeleton';
import { Toc } from './__components/toc';

export default function Home() {
  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_280px]">
      <main id="main-content" className="space-y-5 p-5">
        <h1 className="text-2xl font-medium capitalize">
          Content Skeletons
        </h1>

        <div className="">
          <h2
            data-depth={2}
            id="1"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 1
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="2"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 2
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="3"
            className="mb-2 ml-5 text-lg font-medium capitalize"
          >
            heading 3
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="4"
            className="mb-2 ml-5 text-lg font-medium capitalize"
          >
            heading 4
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="5"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 5
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="6"
            className="mb-2 ml-5 text-lg font-medium capitalize"
          >
            heading 6
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="7"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 7
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="8"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 8
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h3
            data-depth={3}
            id="9"
            className="mb-2 ml-5 text-lg font-medium capitalize"
          >
            heading 9
          </h3>
          <ContentSkeleton></ContentSkeleton>
        </div>

        <div className="">
          <h2
            data-depth={2}
            id="0"
            className="mb-2 text-xl font-medium capitalize"
          >
            heading 10
          </h2>
          <ContentSkeleton></ContentSkeleton>
        </div>
      </main>

      <Toc />
    </div>
  );
}
