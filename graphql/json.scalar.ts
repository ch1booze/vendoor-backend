/* tslint:disable */
/* eslint-disable */

import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSON', () => Object)
export class JSONScalar implements CustomScalar<object, object> {
  parseValue(value: unknown): object {
    if (typeof value === 'string') {
      try {
        const parsedValue = JSON.parse(value);
        if (typeof parsedValue === 'object' && parsedValue !== null) {
          return parsedValue;
        }
        throw new Error('Parsed value is not an object');
      } catch (e) {
        throw new Error('Invalid JSON string');
      }
    }
    if (typeof value === 'object' && value !== null) {
      return value;
    }
    throw new Error('Value is not an object or a JSON string');
  }

  serialize(value: unknown): object {
    if (typeof value === 'object' && value !== null) {
      return value;
    }
    try {
      const parsedValue = JSON.parse(value as string);
      if (typeof parsedValue === 'object' && parsedValue !== null) {
        return parsedValue;
      }
      throw new Error('Parsed value is not an object');
    } catch (e) {
      throw new Error('Value is not an object or a JSON string');
    }
  }

  parseLiteral(ast: ValueNode): object {
    if (ast.kind === Kind.STRING) {
      try {
        const parsedValue = JSON.parse(ast.value);
        if (typeof parsedValue === 'object' && parsedValue !== null) {
          return parsedValue;
        }
        throw new Error('Parsed value is not an object');
      } catch (e) {
        throw new Error('Invalid JSON string');
      }
    }
    throw new Error('Value is not a valid JSON string');
  }
}
