import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import { getMetadataStorage } from 'class-validator';
import { Prisma } from '@prisma/client';

export function getClassProps<T extends new (...args: any[]) => any>(cls: T) {
  const metadatas: ValidationMetadata[] =
    getMetadataStorage().getTargetValidationMetadatas(cls, '', false, false);
  const result: Record<string, { type: string; isOptional: boolean }> = {};

  for (let i = 0; i < metadatas.length; i++) {
    const metadata = metadatas[i];
    const property = metadata.propertyName;
    if (metadata.name !== 'isOptional') {
      let isOptional = false;
      if (i !== 0) {
        isOptional = metadatas[i - 1].name === 'isOptional';
      }
      result[property] = { type: metadata.name!, isOptional };
    }
  }
  return result;
}

export function getPrismaModelFields(modelName: string) {
  const modelFields = Prisma.dmmf.datamodel.models.find(
    (model) => model.name === modelName,
  )?.fields;

  const result: Record<string, { type: string; isOptional: boolean }> = {};
  modelFields?.forEach((field) => {
    const { name, type } = field;
    result[name] = { type, isOptional: !field.isRequired };
  });

  return result;
}

console.log(getPrismaModelFields('Business'));
