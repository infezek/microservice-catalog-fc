import { of } from 'rxjs';
import { WrapperDataInterceptor } from './wrapper-data.interceptor';

describe('WrapperDataInterceptor Unit Tests', () => {
  let interceptor: WrapperDataInterceptor;
  beforeEach(() => {
    interceptor = new WrapperDataInterceptor();
  });

  it('should be defined', (done) => {
    expect(interceptor).toBeDefined();
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({ name: 'test' }),
    });
    obs$
      .subscribe({
        next: (value) => {
          expect(value).toStrictEqual({ data: { name: 'test' } });
        },
      })
      .add(() => {
        done();
      });
  });

  it('should not wrapper when meta key is not preset', (done) => {
    expect(interceptor).toBeDefined();
    const result = { data: [{ name: 'test' }], meta: { total: 1 } };
    const obs$ = interceptor.intercept({} as any, {
      handle: () => of(result),
    });
    obs$
      .subscribe({
        next: (value) => {
          expect(value).toStrictEqual(result);
        },
      })
      .add(() => {
        done();
      });
  });
});
