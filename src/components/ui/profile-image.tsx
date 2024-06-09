import { cn } from '@/lib/utils';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  image: File | string | null;
  placeholder?: React.ReactNode;
  className?: string;
};

export const ProfileImage = ({ image, placeholder, className }: Props) => {
  console.log(image);
  return (
    <div
      className={cn(
        'w-[100px] relative h-[100px] border-2 rounded-md overflow-hidden flex justify-center items-center dark:border-frx-blue-800 border-frx-blue-100 dark:bg-frx-blue-900 bg-white',
        className
      )}
    >
      {image ? (
        <Image
          src={
            typeof image === 'string' ? process.env.NEXT_PUBLIC_CLOUDFRONT_S3_URL + image : URL.createObjectURL(image)
          }
          alt="Profile Picture"
          objectFit="cover"
          fill
        />
      ) : (
        placeholder || <ImageIcon className="w-12 h-12 dark:text-frx-blue-800 text-frx-blue-100" />
      )}
    </div>
  );
};
