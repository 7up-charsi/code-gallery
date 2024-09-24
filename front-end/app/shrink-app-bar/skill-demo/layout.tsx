import { AppBarContent } from '../_components/app-bar-content';
import { AppBar } from '../_components/app-bar';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <>
      <AppBar>
        <AppBarContent />
      </AppBar>

      <div className="mt-[120px]">{children}</div>
    </>
  );
}
