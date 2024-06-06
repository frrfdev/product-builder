import type {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
  Path,
  UseFormReturn,
} from 'react-hook-form';

const arrayRegex = new RegExp(/(.*)(\[[0-9]*])/gm);

export const FormUtils = {
  findNestedError: (
    errors: FieldErrors<FieldValues>,
    name: string
  ): FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined => {
    const split = name.split('.');
    const arrayResult = arrayRegex.exec(split[0]);
    const isArray = (arrayResult?.length || 0) > 0;
    const first = split[0] as string;
    const rest = split.slice(1).join('.');
    const error = isArray
      ? ((errors as any)[(arrayResult as any)[1]]?.[(arrayResult as any)[2].replaceAll(/\D/g, '')] as any)
      : errors[first];
    if (error && rest) {
      return FormUtils.findNestedError(error as FieldErrorsImpl<any>, rest);
    }
    return error;
  },
  resetFields: <ObjType extends object>(form: UseFormReturn<ObjType>) => {
    const fields = Object.keys(form.getValues());
    fields.forEach((field) => form.resetField(field as Path<ObjType>));
  },
};
