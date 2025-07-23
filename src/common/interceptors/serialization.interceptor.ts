import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
// import { SerializationResponse } from './serialization.response';

@Injectable()
export class SerializationInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        try {
          let serialized: T | T[] | null = null;
          
          if (data) {
            if (Array.isArray(data)) {
              serialized = data.map((item, index) => {
                try {
                  return plainToInstance(this.dtoClass, item, {
                    excludeExtraneousValues: true,
                  });
                } catch (itemError) {
                  console.error(
                    `[SerializationInterceptor] Error transforming array item at index ${index}:`,
                    itemError,
                    'Item data:',
                    item
                  );
                  throw itemError;
                }
              });
            } else {
              serialized = plainToInstance(this.dtoClass, data, {
                excludeExtraneousValues: true,
              });
            }
          }

          const response: SerializationResponse<T> = {
            success: true,
            data: serialized,
          };
          
          return response;
        } catch (error) {
          console.error(
            `[SerializationInterceptor] Error transforming response:`,
            error,
            'Raw data:',
            data
          );
          throw error;
        }
      }),
      catchError((err) => {
        console.error('[SerializationInterceptor] Caught error in stream:', err);
        throw err; // Re-throw to maintain error handling flow
      })
    );
  }
}

export interface SerializationResponse<T> {
  success: boolean;
  data: T | T[] | null;
}