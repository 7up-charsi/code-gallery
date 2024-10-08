import { MobileDrawer } from '../_components/mobile-drawer';

export default function Home() {
  return (
    <>
      <MobileDrawer />

      <main
        id="main-content"
        className="space-y-5 p-5 max-md:pt-0 md:px-8"
      >
        {[
          {
            label: 'Introduction',
            depth: 2,
          },
          {
            label: 'Background',
            depth: 3,
          },
          {
            label: 'Purpose',
            depth: 3,
          },
          {
            label: 'Overview',
            depth: 2,
          },
          {
            label: 'Product Description',
            depth: 3,
          },
          {
            label: 'Key Highlights',
            depth: 3,
          },
          {
            label: 'Features',
            depth: 2,
          },
          {
            label: 'Core Features',
            depth: 3,
          },
          {
            label: 'Advanced Features',
            depth: 3,
          },
          {
            label: 'Benefits',
            depth: 2,
          },
          {
            label: 'User Benefits',
            depth: 3,
          },
          {
            label: 'Business Benefits',
            depth: 3,
          },
          {
            label: 'Technical Details',
            depth: 2,
          },
          {
            label: 'System Requirements',
            depth: 3,
          },
          {
            label: 'Technical Specifications',
            depth: 3,
          },
          {
            label: 'FAQs',
            depth: 2,
          },
          {
            label: 'General Questions',
            depth: 3,
          },
          {
            label: 'Technical Questions',
            depth: 3,
          },
          {
            label: 'Testimonials',
            depth: 2,
          },
          {
            label: 'Customer Reviews',
            depth: 3,
          },
          {
            label: 'Expert Endorsements',
            depth: 3,
          },
          {
            label: 'Pricing Plans',
            depth: 2,
          },
          {
            label: 'Basic Plan',
            depth: 3,
          },
          {
            label: 'Premium Plan',
            depth: 3,
          },
          {
            label: 'Conclusion',
            depth: 2,
          },
          {
            label: 'Summary',
            depth: 3,
          },
          {
            label: 'Final Thoughts',
            depth: 3,
          },
          {
            label: 'Call to Action',
            depth: 2,
          },
          {
            label: 'Sign Up Now',
            depth: 3,
          },
          {
            label: 'Contact Us',
            depth: 3,
          },
        ].map(({ depth, label }, i) => {
          const Comp = `h${depth}`;

          return (
            <section
              data-depth={depth}
              key={i}
              className="data-[depth=3]:pl-5"
            >
              {/* @ts-expect-error Property 'children' does not exist on type 'IntrinsicAttributes' */}
              <Comp
                data-depth={depth}
                id={`${i + 1}`}
                className="scroll-mt-40 text-2xl font-medium capitalize data-[depth=3]:text-lg"
              >
                {label}
              </Comp>

              <div
                key={i}
                className="my-5 space-y-3 first:mt-0 last:mb-0"
              >
                {Array.from({
                  length:
                    Math.floor(Math.random() * (15 - 7 + 1)) + 7,
                }).map((_, i, arr) => (
                  <div
                    key={i}
                    style={{
                      width:
                        i + 1 === arr.length
                          ? `${Math.floor(Math.random() * (70 - 10 + 1)) + 10}%`
                          : '100%',
                    }}
                    className="bg-muted-5 h-3 rounded"
                  ></div>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
