import { addBusRequestHandler } from './handlers';

/** */
export const BusRequest = (topic: string): MethodDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    addBusRequestHandler({
      clazz: target.constructor,
      methodName: propertyKey as string,
      topic,
    });
    return descriptor;
  }
}