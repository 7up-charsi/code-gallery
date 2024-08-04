interface Props {
  params: { slug: string };
}

export default async function SlugPage(props: Props) {
  const {
    params: { slug },
  } = props;

  await new Promise((resolve) => {
    setTimeout(resolve, Math.random() * (3 - 0 + 1) + 1);
  });

  return (
    <div className="p-5">
      <p className="text-lg">
        You are at Page
        <span className="ml-2 align-middle text-2xl">{slug}</span>
      </p>
    </div>
  );
}
