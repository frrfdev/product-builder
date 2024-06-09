import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { useToast } from './use-toast';
import { cn } from '@/lib/utils';

export type ImagePickerProps = {
  placeholder?: React.ReactNode;
  classNames?: {
    container?: string;
    root?: string;
  };
  onChange?: ({ target: { name, value } }: { target: { name: string; value: File } }) => void;
  value?: File | string;
  name?: string;
  onError?: (error: string) => void;
};

const ImagePicker = ({ placeholder, classNames, value, onChange, name, onError }: ImagePickerProps) => {
  const { toast } = useToast();

  const [dragging, setDragging] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    setHasError(false);
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (handleValidateFile(file)) {
        if (file.type.includes('image')) {
          if (onChange && name) {
            onChange({ target: { name, value: file } });
          }
        }
        e.dataTransfer.clearData();
      }
    }
  };

  const handleValidateFile = (file: File) => {
    if (file.size / 1024 > 200) {
      setHasError(true);
      onError && onError('Arquivo muito grande!');
      onChange && onChange({ target: { name: name || '', value: file } });
      toast({
        title: '❌ Arquivo muito grande!',
        description: 'O arquivo selecionado é muito grande, por favor selecione um arquivo menor.',
      });
      return false;
    }
    return true;
  };

  return (
    <div
      className={cn('w-full flex justify-center cursor-pointer', classNames?.root)}
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
    >
      <label htmlFor="fileInput" className="custom-file-input">
        <div
          className={cn(
            'w-[100px] relative h-[100px] border-2 rounded-md overflow-hidden flex justify-center items-center dark:border-frx-blue-800 border-frx-blue-100 dark:bg-frx-blue-900 bg-white',
            classNames?.container
          )}
        >
          {value ? (
            <Image
              src={
                typeof value === 'string'
                  ? process.env.NEXT_PUBLIC_CLOUDFRONT_S3_URL + value
                  : URL.createObjectURL(value)
              }
              alt="Profile Picture"
              objectFit="cover"
              fill
            />
          ) : (
            placeholder || <ImageIcon className="w-12 h-12 dark:text-frx-blue-800 text-frx-blue-100" />
          )}
        </div>
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          setHasError(false);

          const file = e.target.files?.[0];
          if (file) {
            if (handleValidateFile(file) && onChange && name) onChange({ target: { name, value: file } });
          }
        }}
      />
    </div>
  );
};

export default ImagePicker;
