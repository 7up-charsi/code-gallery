interface Props {
  params: { slug: string };
}

export default async function SlugPage(props: Props) {
  const {
    params: { slug },
  } = props;

  // await new Promise((resolve) => {
  //   setTimeout(resolve, 3000);
  // });

  return <div className="p-5">{slug}</div>;
}
