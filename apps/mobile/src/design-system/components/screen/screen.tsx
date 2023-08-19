import Box from '../box/box';

type ScreenProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

export const Screen = (props: ScreenProps) => {
  return (
    <Box
      {...props}
      sx={{
        flex: 1,
        bgColor: 'background',
        ...props.sx,
      }}
    />
  );
};
