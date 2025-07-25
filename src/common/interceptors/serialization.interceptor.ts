import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SerializationInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        try {
          let serialized: T | T[] | null = null;

          if (data) {
            const transformOptions = {
              excludeExtraneousValues: true,
              enableImplicitConversion: true,
            };

            if (Array.isArray(data)) {
              serialized = plainToInstance(this.dtoClass, data, transformOptions) as T[];
            } else {
              serialized = plainToInstance(this.dtoClass, data, transformOptions);
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
        throw err;
      })
    );
  }
}

export interface SerializationResponse<T> {
  success: boolean;
  data: T | T[] | null;
}
