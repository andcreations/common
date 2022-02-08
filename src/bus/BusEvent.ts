import { addBusEventHandler } from './handlers';

/** */
export const BusEvent = (topic: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    addBusEventHandler({
      clazz: target.constructor,
      methodName: propertyKey as string,
      topic,
    });
    return descriptor;
  }
}