import Box from '../box/box';

export const Card = ({ children, ...rest }) => {
  return (
    <Box
      {...rest}
      sx={{
        my: 'sm',
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
