import { AppBarContent } from '../../_components/app-bar-content';
import { AppBar } from '../../_components/app-bar';

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props;

  return (
    <>
      <AppBar>
        <AppBarContent />
      </AppBar>

      {children}
    </>
  );
};

export default RootLayout;
