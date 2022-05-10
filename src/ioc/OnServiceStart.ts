import { addStarter } from './starters';

/** */
export const OnServiceStart = (): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    addStarter({
      clazz: target.constructor,
      methodName: propertyKey as string,
    })
    return descriptor;
  }
}
