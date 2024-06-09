import { User } from 'lucide-react';
import React from 'react';
import ImagePicker, { ImagePickerProps } from './image-picker';

type ProfilePickerProps = Omit<ImagePickerProps, 'placeholder'>;

const ProfilePicker = (props: ProfilePickerProps) => {
  return (
    <ImagePicker
      {...props}
      placeholder={
        <User className="w-12 h-12 dark:text-frx-blue-800 text-frx-blue-100" />
      }
      classNames={{
        container: 'rounded-full'
      }}></ImagePicker>
  );
};

export default ProfilePicker;
