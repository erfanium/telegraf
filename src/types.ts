/** @format */

import Context from './context'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Middleware {
  /*
    next's parameter is in a contravariant position, and thus, trying to type it
    prevents assigning `MiddlewareFn<ContextMessageUpdate>`
    to `MiddlewareFn<CustomContext>`.
    Middleware passing the parameter should be a separate type instead.
  */
  export type Fn<TContext extends Context> = (
    ctx: TContext,
    next: () => Promise<void>
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ) => Promise<unknown> | void
  export interface Obj<TContext extends Context> {
    middleware: () => Fn<TContext>
  }
  export type ExtFn<BaseContext extends Context, Extension extends object> = <
    TContext extends BaseContext
  >(
    ctx: TContext,
    next: (ctx: Extension & TContext) => Promise<void>
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  ) => Promise<unknown> | void
  export type Ext<
    BaseContext extends Context,
    Extension extends object
  > = ExtFn<BaseContext, Extension>
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Middleware<TContext extends Context> =
  | Middleware.Fn<TContext>
  | Middleware.Obj<TContext>

export type NonemptyReadonlyArray<T> = readonly [T, ...T[]]

export type Tail<T> = T extends [unknown, ...infer U] ? U : never
