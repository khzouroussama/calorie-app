import { Control, RegisterOptions, useController } from 'react-hook-form';

import React from 'react';
import { DateTimeFieldProps } from '../date-time-field';
import { ActivityIndicator, Image } from 'react-native';
import { Pressable } from '../pressable';
import * as ImagePicker from 'expo-image-picker';
import Box from '../box/box';
import { Icons } from '@/design-system';
import { colors } from '@/design-system/theme';

type FormPictureFieldProps = {
  name: string;
  control?: Control<any>;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  defaultIcon?: (
    props: React.ComponentProps<typeof Icons.Photo>,
  ) => React.ReactNode;
  value?: {
    uri: string;
    name: string;
    type: string;
  };
  imagePickerOptions?: ImagePicker.ImagePickerOptions;
} & Omit<DateTimeFieldProps, 'value'>;

const isBase64Uri = (uri: string) => {
  if (!uri) return false;
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return false;
  }
  return true;
};

export function FormPicturField(props: FormPictureFieldProps) {
  const [loading, setLoading] = React.useState(true);
  const { name, control, rules, onChange, imagePickerOptions, ...inputProps } =
    props;

  const { field } = useController({ control, name, rules });
  const Icon = props.defaultIcon || Icons.Photo;

  const handleChange = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      quality: 1,
      ...imagePickerOptions,
    });

    if (!result.canceled) {
      // showFailureAlert('Unable to pick an image!');
      const asset = result?.assets[0];

      const filename = asset.uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;

      field.onChange({
        uri: asset?.base64,
        name: filename,
        type,
      });
      return;
    }
  };

  return (
    <Pressable onPress={handleChange}>
      {field.value?.uri ? (
        <Box
          sx={{
            borderRadius: 100,
            overflow: 'hidden',
            bgColor: 'neutral300',
            alignItems: 'center',
          }}
        >
          <Image
            onLoadEnd={() => setLoading(false)}
            width={92}
            height={92}
            source={{
              uri: isBase64Uri(field?.value?.uri)
                ? 'data:image/jpeg;base64,' + field.value?.uri
                : field.value.uri,
            }}
            {...inputProps}
          />

          {loading && (
            <ActivityIndicator
              color={colors.secondary500}
              style={{ position: 'absolute', height: '100%', flex: 1 }}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            bgColor: 'secondary500',
            width: 92,
            height: 92,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 100,
          }}
        >
          <Icon size={52} color={colors.neutral100} />
        </Box>
      )}
    </Pressable>
  );
}
