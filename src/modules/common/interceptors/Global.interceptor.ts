//TODO Global Interseptor for some Reason

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  private cnt:ExecutionContext

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.cnt=context;
    const nw= Date.now()
    console.log('Before...'+nw.toLocaleString());
    
    return next.handle().pipe(tap(() => console.log(`After...${Date.now().toLocaleString()}  ${Date.now() -nw}ms`)));
  }

  coger(){
    return this.cnt;
  }
}
