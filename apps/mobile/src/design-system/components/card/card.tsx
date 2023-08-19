import Box from '../box/box';

type CardProps = {
  children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

export const Card = ({ children, ...rest }: CardProps) => {
  return (
    <Box
      {...rest}
      sx={{
        gap: 'sm',
        border: 1,
        borderColor: 'neutral300',
        bgColor: 'neutral100',
        borderRadius: 8,
        p: 'sm',
        justifyContent: 'flex-end',
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};
