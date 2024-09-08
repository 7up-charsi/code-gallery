interface AuthLayoutProps {
  children?: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-muted-2">
      {children}
    </div>
  );
}
