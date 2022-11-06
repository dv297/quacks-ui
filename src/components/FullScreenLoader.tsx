interface FullScreenLoaderProps {
  loading: boolean;
}

const FullScreenLoader = (props: FullScreenLoaderProps) => {
  if (!props.loading) {
    return null;
  }

  return <div className="absolute inset-0 bg-black opacity-50" />;
};

export default FullScreenLoader;
