
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OTPTable
 * 
 */
export type OTPTable = $Result.DefaultSelection<Prisma.$OTPTablePayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Relations
 * 
 */
export type Relations = $Result.DefaultSelection<Prisma.$RelationsPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>
/**
 * Model SeenPost
 * 
 */
export type SeenPost = $Result.DefaultSelection<Prisma.$SeenPostPayload>
/**
 * Model Chats
 * 
 */
export type Chats = $Result.DefaultSelection<Prisma.$ChatsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ChatType: {
  Message: 'Message',
  Call: 'Call',
  VideoCall: 'VideoCall'
};

export type ChatType = (typeof ChatType)[keyof typeof ChatType]


export const Viewers: {
  Public: 'Public',
  Followers: 'Followers'
};

export type Viewers = (typeof Viewers)[keyof typeof Viewers]


export const Relationship: {
  Follower: 'Follower',
  Blocked: 'Blocked'
};

export type Relationship = (typeof Relationship)[keyof typeof Relationship]


export const Provider: {
  Google: 'Google',
  Email: 'Email'
};

export type Provider = (typeof Provider)[keyof typeof Provider]

}

export type ChatType = $Enums.ChatType

export const ChatType: typeof $Enums.ChatType

export type Viewers = $Enums.Viewers

export const Viewers: typeof $Enums.Viewers

export type Relationship = $Enums.Relationship

export const Relationship: typeof $Enums.Relationship

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oTPTable`: Exposes CRUD operations for the **OTPTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OTPTables
    * const oTPTables = await prisma.oTPTable.findMany()
    * ```
    */
  get oTPTable(): Prisma.OTPTableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.relations`: Exposes CRUD operations for the **Relations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Relations
    * const relations = await prisma.relations.findMany()
    * ```
    */
  get relations(): Prisma.RelationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.seenPost`: Exposes CRUD operations for the **SeenPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SeenPosts
    * const seenPosts = await prisma.seenPost.findMany()
    * ```
    */
  get seenPost(): Prisma.SeenPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chats`: Exposes CRUD operations for the **Chats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chats.findMany()
    * ```
    */
  get chats(): Prisma.ChatsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OTPTable: 'OTPTable',
    Post: 'Post',
    Comment: 'Comment',
    Relations: 'Relations',
    Notification: 'Notification',
    SeenPost: 'SeenPost',
    Chats: 'Chats'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "oTPTable" | "post" | "comment" | "relations" | "notification" | "seenPost" | "chats"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OTPTable: {
        payload: Prisma.$OTPTablePayload<ExtArgs>
        fields: Prisma.OTPTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OTPTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OTPTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          findFirst: {
            args: Prisma.OTPTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OTPTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          findMany: {
            args: Prisma.OTPTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>[]
          }
          create: {
            args: Prisma.OTPTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          createMany: {
            args: Prisma.OTPTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OTPTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>[]
          }
          delete: {
            args: Prisma.OTPTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          update: {
            args: Prisma.OTPTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          deleteMany: {
            args: Prisma.OTPTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OTPTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OTPTableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>[]
          }
          upsert: {
            args: Prisma.OTPTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OTPTablePayload>
          }
          aggregate: {
            args: Prisma.OTPTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOTPTable>
          }
          groupBy: {
            args: Prisma.OTPTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<OTPTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.OTPTableCountArgs<ExtArgs>
            result: $Utils.Optional<OTPTableCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Relations: {
        payload: Prisma.$RelationsPayload<ExtArgs>
        fields: Prisma.RelationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RelationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RelationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          findFirst: {
            args: Prisma.RelationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RelationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          findMany: {
            args: Prisma.RelationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>[]
          }
          create: {
            args: Prisma.RelationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          createMany: {
            args: Prisma.RelationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RelationsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>[]
          }
          delete: {
            args: Prisma.RelationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          update: {
            args: Prisma.RelationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          deleteMany: {
            args: Prisma.RelationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RelationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RelationsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>[]
          }
          upsert: {
            args: Prisma.RelationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RelationsPayload>
          }
          aggregate: {
            args: Prisma.RelationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRelations>
          }
          groupBy: {
            args: Prisma.RelationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RelationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RelationsCountArgs<ExtArgs>
            result: $Utils.Optional<RelationsCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
      SeenPost: {
        payload: Prisma.$SeenPostPayload<ExtArgs>
        fields: Prisma.SeenPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeenPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeenPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          findFirst: {
            args: Prisma.SeenPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeenPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          findMany: {
            args: Prisma.SeenPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>[]
          }
          create: {
            args: Prisma.SeenPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          createMany: {
            args: Prisma.SeenPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeenPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>[]
          }
          delete: {
            args: Prisma.SeenPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          update: {
            args: Prisma.SeenPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          deleteMany: {
            args: Prisma.SeenPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeenPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeenPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>[]
          }
          upsert: {
            args: Prisma.SeenPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeenPostPayload>
          }
          aggregate: {
            args: Prisma.SeenPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeenPost>
          }
          groupBy: {
            args: Prisma.SeenPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeenPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeenPostCountArgs<ExtArgs>
            result: $Utils.Optional<SeenPostCountAggregateOutputType> | number
          }
        }
      }
      Chats: {
        payload: Prisma.$ChatsPayload<ExtArgs>
        fields: Prisma.ChatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          findFirst: {
            args: Prisma.ChatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          findMany: {
            args: Prisma.ChatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>[]
          }
          create: {
            args: Prisma.ChatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          createMany: {
            args: Prisma.ChatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>[]
          }
          delete: {
            args: Prisma.ChatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          update: {
            args: Prisma.ChatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          deleteMany: {
            args: Prisma.ChatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>[]
          }
          upsert: {
            args: Prisma.ChatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatsPayload>
          }
          aggregate: {
            args: Prisma.ChatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChats>
          }
          groupBy: {
            args: Prisma.ChatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatsCountArgs<ExtArgs>
            result: $Utils.Optional<ChatsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    oTPTable?: OTPTableOmit
    post?: PostOmit
    comment?: CommentOmit
    relations?: RelationsOmit
    notification?: NotificationOmit
    seenPost?: SeenPostOmit
    chats?: ChatsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    chatsSent: number
    chatsReceived: number
    comments: number
    notifications: number
    posts: number
    following: number
    followers: number
    seenPosts: number
    likedPosts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatsSent?: boolean | UserCountOutputTypeCountChatsSentArgs
    chatsReceived?: boolean | UserCountOutputTypeCountChatsReceivedArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    following?: boolean | UserCountOutputTypeCountFollowingArgs
    followers?: boolean | UserCountOutputTypeCountFollowersArgs
    seenPosts?: boolean | UserCountOutputTypeCountSeenPostsArgs
    likedPosts?: boolean | UserCountOutputTypeCountLikedPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSeenPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeenPostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLikedPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comments: number
    notifications: number
    seenBy: number
    likes: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
    notifications?: boolean | PostCountOutputTypeCountNotificationsArgs
    seenBy?: boolean | PostCountOutputTypeCountSeenByArgs
    likes?: boolean | PostCountOutputTypeCountLikesArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountSeenByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeenPostWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    phone: number | null
  }

  export type UserSumAggregateOutputType = {
    phone: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    firstname: string | null
    lastname: string | null
    username: string | null
    dob: Date | null
    bio: string | null
    phone: bigint | null
    pic: string | null
    lastSeenAt: Date | null
    provider: $Enums.Provider | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
    password: string | null
    firstname: string | null
    lastname: string | null
    username: string | null
    dob: Date | null
    bio: string | null
    phone: bigint | null
    pic: string | null
    lastSeenAt: Date | null
    provider: $Enums.Provider | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    emailVerified: number
    name: number
    image: number
    createdAt: number
    updatedAt: number
    password: number
    firstname: number
    lastname: number
    username: number
    dob: number
    bio: number
    phone: number
    pic: number
    lastSeenAt: number
    provider: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    phone?: true
  }

  export type UserSumAggregateInputType = {
    phone?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    firstname?: true
    lastname?: true
    username?: true
    dob?: true
    bio?: true
    phone?: true
    pic?: true
    lastSeenAt?: true
    provider?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    firstname?: true
    lastname?: true
    username?: true
    dob?: true
    bio?: true
    phone?: true
    pic?: true
    lastSeenAt?: true
    provider?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerified?: true
    name?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    password?: true
    firstname?: true
    lastname?: true
    username?: true
    dob?: true
    bio?: true
    phone?: true
    pic?: true
    lastSeenAt?: true
    provider?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    emailVerified: Date | null
    name: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
    password: string | null
    firstname: string | null
    lastname: string | null
    username: string | null
    dob: Date | null
    bio: string
    phone: bigint | null
    pic: string | null
    lastSeenAt: Date
    provider: $Enums.Provider
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    dob?: boolean
    bio?: boolean
    phone?: boolean
    pic?: boolean
    lastSeenAt?: boolean
    provider?: boolean
    chatsSent?: boolean | User$chatsSentArgs<ExtArgs>
    chatsReceived?: boolean | User$chatsReceivedArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    seenPosts?: boolean | User$seenPostsArgs<ExtArgs>
    likedPosts?: boolean | User$likedPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    dob?: boolean
    bio?: boolean
    phone?: boolean
    pic?: boolean
    lastSeenAt?: boolean
    provider?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    dob?: boolean
    bio?: boolean
    phone?: boolean
    pic?: boolean
    lastSeenAt?: boolean
    provider?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    emailVerified?: boolean
    name?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    dob?: boolean
    bio?: boolean
    phone?: boolean
    pic?: boolean
    lastSeenAt?: boolean
    provider?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "emailVerified" | "name" | "image" | "createdAt" | "updatedAt" | "password" | "firstname" | "lastname" | "username" | "dob" | "bio" | "phone" | "pic" | "lastSeenAt" | "provider", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatsSent?: boolean | User$chatsSentArgs<ExtArgs>
    chatsReceived?: boolean | User$chatsReceivedArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    posts?: boolean | User$postsArgs<ExtArgs>
    following?: boolean | User$followingArgs<ExtArgs>
    followers?: boolean | User$followersArgs<ExtArgs>
    seenPosts?: boolean | User$seenPostsArgs<ExtArgs>
    likedPosts?: boolean | User$likedPostsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      chatsSent: Prisma.$ChatsPayload<ExtArgs>[]
      chatsReceived: Prisma.$ChatsPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      posts: Prisma.$PostPayload<ExtArgs>[]
      following: Prisma.$RelationsPayload<ExtArgs>[]
      followers: Prisma.$RelationsPayload<ExtArgs>[]
      seenPosts: Prisma.$SeenPostPayload<ExtArgs>[]
      likedPosts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      emailVerified: Date | null
      name: string | null
      image: string | null
      createdAt: Date
      updatedAt: Date
      password: string | null
      firstname: string | null
      lastname: string | null
      username: string | null
      dob: Date | null
      bio: string
      phone: bigint | null
      pic: string | null
      lastSeenAt: Date
      provider: $Enums.Provider
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chatsSent<T extends User$chatsSentArgs<ExtArgs> = {}>(args?: Subset<T, User$chatsSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatsReceived<T extends User$chatsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, User$chatsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    following<T extends User$followingArgs<ExtArgs> = {}>(args?: Subset<T, User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followers<T extends User$followersArgs<ExtArgs> = {}>(args?: Subset<T, User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seenPosts<T extends User$seenPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$seenPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likedPosts<T extends User$likedPostsArgs<ExtArgs> = {}>(args?: Subset<T, User$likedPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly dob: FieldRef<"User", 'DateTime'>
    readonly bio: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'BigInt'>
    readonly pic: FieldRef<"User", 'String'>
    readonly lastSeenAt: FieldRef<"User", 'DateTime'>
    readonly provider: FieldRef<"User", 'Provider'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.chatsSent
   */
  export type User$chatsSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    where?: ChatsWhereInput
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    cursor?: ChatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * User.chatsReceived
   */
  export type User$chatsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    where?: ChatsWhereInput
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    cursor?: ChatsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.following
   */
  export type User$followingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    where?: RelationsWhereInput
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    cursor?: RelationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RelationsScalarFieldEnum | RelationsScalarFieldEnum[]
  }

  /**
   * User.followers
   */
  export type User$followersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    where?: RelationsWhereInput
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    cursor?: RelationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RelationsScalarFieldEnum | RelationsScalarFieldEnum[]
  }

  /**
   * User.seenPosts
   */
  export type User$seenPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    where?: SeenPostWhereInput
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    cursor?: SeenPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SeenPostScalarFieldEnum | SeenPostScalarFieldEnum[]
  }

  /**
   * User.likedPosts
   */
  export type User$likedPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OTPTable
   */

  export type AggregateOTPTable = {
    _count: OTPTableCountAggregateOutputType | null
    _avg: OTPTableAvgAggregateOutputType | null
    _sum: OTPTableSumAggregateOutputType | null
    _min: OTPTableMinAggregateOutputType | null
    _max: OTPTableMaxAggregateOutputType | null
  }

  export type OTPTableAvgAggregateOutputType = {
    id: number | null
  }

  export type OTPTableSumAggregateOutputType = {
    id: number | null
  }

  export type OTPTableMinAggregateOutputType = {
    id: number | null
    email: string | null
    otp: string | null
    expiry: Date | null
  }

  export type OTPTableMaxAggregateOutputType = {
    id: number | null
    email: string | null
    otp: string | null
    expiry: Date | null
  }

  export type OTPTableCountAggregateOutputType = {
    id: number
    email: number
    otp: number
    expiry: number
    _all: number
  }


  export type OTPTableAvgAggregateInputType = {
    id?: true
  }

  export type OTPTableSumAggregateInputType = {
    id?: true
  }

  export type OTPTableMinAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    expiry?: true
  }

  export type OTPTableMaxAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    expiry?: true
  }

  export type OTPTableCountAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    expiry?: true
    _all?: true
  }

  export type OTPTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTPTable to aggregate.
     */
    where?: OTPTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPTables to fetch.
     */
    orderBy?: OTPTableOrderByWithRelationInput | OTPTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OTPTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OTPTables
    **/
    _count?: true | OTPTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OTPTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OTPTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OTPTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OTPTableMaxAggregateInputType
  }

  export type GetOTPTableAggregateType<T extends OTPTableAggregateArgs> = {
        [P in keyof T & keyof AggregateOTPTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOTPTable[P]>
      : GetScalarType<T[P], AggregateOTPTable[P]>
  }




  export type OTPTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OTPTableWhereInput
    orderBy?: OTPTableOrderByWithAggregationInput | OTPTableOrderByWithAggregationInput[]
    by: OTPTableScalarFieldEnum[] | OTPTableScalarFieldEnum
    having?: OTPTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OTPTableCountAggregateInputType | true
    _avg?: OTPTableAvgAggregateInputType
    _sum?: OTPTableSumAggregateInputType
    _min?: OTPTableMinAggregateInputType
    _max?: OTPTableMaxAggregateInputType
  }

  export type OTPTableGroupByOutputType = {
    id: number
    email: string
    otp: string
    expiry: Date
    _count: OTPTableCountAggregateOutputType | null
    _avg: OTPTableAvgAggregateOutputType | null
    _sum: OTPTableSumAggregateOutputType | null
    _min: OTPTableMinAggregateOutputType | null
    _max: OTPTableMaxAggregateOutputType | null
  }

  type GetOTPTableGroupByPayload<T extends OTPTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OTPTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OTPTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OTPTableGroupByOutputType[P]>
            : GetScalarType<T[P], OTPTableGroupByOutputType[P]>
        }
      >
    >


  export type OTPTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    expiry?: boolean
  }, ExtArgs["result"]["oTPTable"]>

  export type OTPTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    expiry?: boolean
  }, ExtArgs["result"]["oTPTable"]>

  export type OTPTableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    expiry?: boolean
  }, ExtArgs["result"]["oTPTable"]>

  export type OTPTableSelectScalar = {
    id?: boolean
    email?: boolean
    otp?: boolean
    expiry?: boolean
  }

  export type OTPTableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "otp" | "expiry", ExtArgs["result"]["oTPTable"]>

  export type $OTPTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OTPTable"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      otp: string
      expiry: Date
    }, ExtArgs["result"]["oTPTable"]>
    composites: {}
  }

  type OTPTableGetPayload<S extends boolean | null | undefined | OTPTableDefaultArgs> = $Result.GetResult<Prisma.$OTPTablePayload, S>

  type OTPTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OTPTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OTPTableCountAggregateInputType | true
    }

  export interface OTPTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OTPTable'], meta: { name: 'OTPTable' } }
    /**
     * Find zero or one OTPTable that matches the filter.
     * @param {OTPTableFindUniqueArgs} args - Arguments to find a OTPTable
     * @example
     * // Get one OTPTable
     * const oTPTable = await prisma.oTPTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OTPTableFindUniqueArgs>(args: SelectSubset<T, OTPTableFindUniqueArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OTPTable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OTPTableFindUniqueOrThrowArgs} args - Arguments to find a OTPTable
     * @example
     * // Get one OTPTable
     * const oTPTable = await prisma.oTPTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OTPTableFindUniqueOrThrowArgs>(args: SelectSubset<T, OTPTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTPTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableFindFirstArgs} args - Arguments to find a OTPTable
     * @example
     * // Get one OTPTable
     * const oTPTable = await prisma.oTPTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OTPTableFindFirstArgs>(args?: SelectSubset<T, OTPTableFindFirstArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OTPTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableFindFirstOrThrowArgs} args - Arguments to find a OTPTable
     * @example
     * // Get one OTPTable
     * const oTPTable = await prisma.oTPTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OTPTableFindFirstOrThrowArgs>(args?: SelectSubset<T, OTPTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OTPTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OTPTables
     * const oTPTables = await prisma.oTPTable.findMany()
     * 
     * // Get first 10 OTPTables
     * const oTPTables = await prisma.oTPTable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oTPTableWithIdOnly = await prisma.oTPTable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OTPTableFindManyArgs>(args?: SelectSubset<T, OTPTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OTPTable.
     * @param {OTPTableCreateArgs} args - Arguments to create a OTPTable.
     * @example
     * // Create one OTPTable
     * const OTPTable = await prisma.oTPTable.create({
     *   data: {
     *     // ... data to create a OTPTable
     *   }
     * })
     * 
     */
    create<T extends OTPTableCreateArgs>(args: SelectSubset<T, OTPTableCreateArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OTPTables.
     * @param {OTPTableCreateManyArgs} args - Arguments to create many OTPTables.
     * @example
     * // Create many OTPTables
     * const oTPTable = await prisma.oTPTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OTPTableCreateManyArgs>(args?: SelectSubset<T, OTPTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OTPTables and returns the data saved in the database.
     * @param {OTPTableCreateManyAndReturnArgs} args - Arguments to create many OTPTables.
     * @example
     * // Create many OTPTables
     * const oTPTable = await prisma.oTPTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OTPTables and only return the `id`
     * const oTPTableWithIdOnly = await prisma.oTPTable.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OTPTableCreateManyAndReturnArgs>(args?: SelectSubset<T, OTPTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OTPTable.
     * @param {OTPTableDeleteArgs} args - Arguments to delete one OTPTable.
     * @example
     * // Delete one OTPTable
     * const OTPTable = await prisma.oTPTable.delete({
     *   where: {
     *     // ... filter to delete one OTPTable
     *   }
     * })
     * 
     */
    delete<T extends OTPTableDeleteArgs>(args: SelectSubset<T, OTPTableDeleteArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OTPTable.
     * @param {OTPTableUpdateArgs} args - Arguments to update one OTPTable.
     * @example
     * // Update one OTPTable
     * const oTPTable = await prisma.oTPTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OTPTableUpdateArgs>(args: SelectSubset<T, OTPTableUpdateArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OTPTables.
     * @param {OTPTableDeleteManyArgs} args - Arguments to filter OTPTables to delete.
     * @example
     * // Delete a few OTPTables
     * const { count } = await prisma.oTPTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OTPTableDeleteManyArgs>(args?: SelectSubset<T, OTPTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTPTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OTPTables
     * const oTPTable = await prisma.oTPTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OTPTableUpdateManyArgs>(args: SelectSubset<T, OTPTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OTPTables and returns the data updated in the database.
     * @param {OTPTableUpdateManyAndReturnArgs} args - Arguments to update many OTPTables.
     * @example
     * // Update many OTPTables
     * const oTPTable = await prisma.oTPTable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OTPTables and only return the `id`
     * const oTPTableWithIdOnly = await prisma.oTPTable.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OTPTableUpdateManyAndReturnArgs>(args: SelectSubset<T, OTPTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OTPTable.
     * @param {OTPTableUpsertArgs} args - Arguments to update or create a OTPTable.
     * @example
     * // Update or create a OTPTable
     * const oTPTable = await prisma.oTPTable.upsert({
     *   create: {
     *     // ... data to create a OTPTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OTPTable we want to update
     *   }
     * })
     */
    upsert<T extends OTPTableUpsertArgs>(args: SelectSubset<T, OTPTableUpsertArgs<ExtArgs>>): Prisma__OTPTableClient<$Result.GetResult<Prisma.$OTPTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OTPTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableCountArgs} args - Arguments to filter OTPTables to count.
     * @example
     * // Count the number of OTPTables
     * const count = await prisma.oTPTable.count({
     *   where: {
     *     // ... the filter for the OTPTables we want to count
     *   }
     * })
    **/
    count<T extends OTPTableCountArgs>(
      args?: Subset<T, OTPTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OTPTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OTPTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OTPTableAggregateArgs>(args: Subset<T, OTPTableAggregateArgs>): Prisma.PrismaPromise<GetOTPTableAggregateType<T>>

    /**
     * Group by OTPTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OTPTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OTPTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OTPTableGroupByArgs['orderBy'] }
        : { orderBy?: OTPTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OTPTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOTPTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OTPTable model
   */
  readonly fields: OTPTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OTPTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OTPTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OTPTable model
   */
  interface OTPTableFieldRefs {
    readonly id: FieldRef<"OTPTable", 'Int'>
    readonly email: FieldRef<"OTPTable", 'String'>
    readonly otp: FieldRef<"OTPTable", 'String'>
    readonly expiry: FieldRef<"OTPTable", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OTPTable findUnique
   */
  export type OTPTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter, which OTPTable to fetch.
     */
    where: OTPTableWhereUniqueInput
  }

  /**
   * OTPTable findUniqueOrThrow
   */
  export type OTPTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter, which OTPTable to fetch.
     */
    where: OTPTableWhereUniqueInput
  }

  /**
   * OTPTable findFirst
   */
  export type OTPTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter, which OTPTable to fetch.
     */
    where?: OTPTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPTables to fetch.
     */
    orderBy?: OTPTableOrderByWithRelationInput | OTPTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPTables.
     */
    cursor?: OTPTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPTables.
     */
    distinct?: OTPTableScalarFieldEnum | OTPTableScalarFieldEnum[]
  }

  /**
   * OTPTable findFirstOrThrow
   */
  export type OTPTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter, which OTPTable to fetch.
     */
    where?: OTPTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPTables to fetch.
     */
    orderBy?: OTPTableOrderByWithRelationInput | OTPTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OTPTables.
     */
    cursor?: OTPTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OTPTables.
     */
    distinct?: OTPTableScalarFieldEnum | OTPTableScalarFieldEnum[]
  }

  /**
   * OTPTable findMany
   */
  export type OTPTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter, which OTPTables to fetch.
     */
    where?: OTPTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OTPTables to fetch.
     */
    orderBy?: OTPTableOrderByWithRelationInput | OTPTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OTPTables.
     */
    cursor?: OTPTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OTPTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OTPTables.
     */
    skip?: number
    distinct?: OTPTableScalarFieldEnum | OTPTableScalarFieldEnum[]
  }

  /**
   * OTPTable create
   */
  export type OTPTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * The data needed to create a OTPTable.
     */
    data: XOR<OTPTableCreateInput, OTPTableUncheckedCreateInput>
  }

  /**
   * OTPTable createMany
   */
  export type OTPTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OTPTables.
     */
    data: OTPTableCreateManyInput | OTPTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OTPTable createManyAndReturn
   */
  export type OTPTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * The data used to create many OTPTables.
     */
    data: OTPTableCreateManyInput | OTPTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OTPTable update
   */
  export type OTPTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * The data needed to update a OTPTable.
     */
    data: XOR<OTPTableUpdateInput, OTPTableUncheckedUpdateInput>
    /**
     * Choose, which OTPTable to update.
     */
    where: OTPTableWhereUniqueInput
  }

  /**
   * OTPTable updateMany
   */
  export type OTPTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OTPTables.
     */
    data: XOR<OTPTableUpdateManyMutationInput, OTPTableUncheckedUpdateManyInput>
    /**
     * Filter which OTPTables to update
     */
    where?: OTPTableWhereInput
    /**
     * Limit how many OTPTables to update.
     */
    limit?: number
  }

  /**
   * OTPTable updateManyAndReturn
   */
  export type OTPTableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * The data used to update OTPTables.
     */
    data: XOR<OTPTableUpdateManyMutationInput, OTPTableUncheckedUpdateManyInput>
    /**
     * Filter which OTPTables to update
     */
    where?: OTPTableWhereInput
    /**
     * Limit how many OTPTables to update.
     */
    limit?: number
  }

  /**
   * OTPTable upsert
   */
  export type OTPTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * The filter to search for the OTPTable to update in case it exists.
     */
    where: OTPTableWhereUniqueInput
    /**
     * In case the OTPTable found by the `where` argument doesn't exist, create a new OTPTable with this data.
     */
    create: XOR<OTPTableCreateInput, OTPTableUncheckedCreateInput>
    /**
     * In case the OTPTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OTPTableUpdateInput, OTPTableUncheckedUpdateInput>
  }

  /**
   * OTPTable delete
   */
  export type OTPTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
    /**
     * Filter which OTPTable to delete.
     */
    where: OTPTableWhereUniqueInput
  }

  /**
   * OTPTable deleteMany
   */
  export type OTPTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OTPTables to delete
     */
    where?: OTPTableWhereInput
    /**
     * Limit how many OTPTables to delete.
     */
    limit?: number
  }

  /**
   * OTPTable without action
   */
  export type OTPTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OTPTable
     */
    select?: OTPTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OTPTable
     */
    omit?: OTPTableOmit<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    title: string | null
    visiblity: $Enums.Viewers | null
    authorId: string | null
    isMedia: boolean | null
    mediaurl: string | null
    createdAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    visiblity: $Enums.Viewers | null
    authorId: string | null
    isMedia: boolean | null
    mediaurl: string | null
    createdAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    visiblity: number
    authorId: number
    isMedia: number
    mediaurl: number
    createdAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    visiblity?: true
    authorId?: true
    isMedia?: true
    mediaurl?: true
    createdAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    visiblity?: true
    authorId?: true
    isMedia?: true
    mediaurl?: true
    createdAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    visiblity?: true
    authorId?: true
    isMedia?: true
    mediaurl?: true
    createdAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    title: string
    visiblity: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl: string | null
    createdAt: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    visiblity?: boolean
    authorId?: boolean
    isMedia?: boolean
    mediaurl?: boolean
    createdAt?: boolean
    comments?: boolean | Post$commentsArgs<ExtArgs>
    notifications?: boolean | Post$notificationsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    seenBy?: boolean | Post$seenByArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    visiblity?: boolean
    authorId?: boolean
    isMedia?: boolean
    mediaurl?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    visiblity?: boolean
    authorId?: boolean
    isMedia?: boolean
    mediaurl?: boolean
    createdAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    visiblity?: boolean
    authorId?: boolean
    isMedia?: boolean
    mediaurl?: boolean
    createdAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "visiblity" | "authorId" | "isMedia" | "mediaurl" | "createdAt", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | Post$commentsArgs<ExtArgs>
    notifications?: boolean | Post$notificationsArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    seenBy?: boolean | Post$seenByArgs<ExtArgs>
    likes?: boolean | Post$likesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      comments: Prisma.$CommentPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
      author: Prisma.$UserPayload<ExtArgs>
      seenBy: Prisma.$SeenPostPayload<ExtArgs>[]
      likes: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      visiblity: $Enums.Viewers
      authorId: string
      isMedia: boolean
      mediaurl: string | null
      createdAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends Post$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, Post$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    seenBy<T extends Post$seenByArgs<ExtArgs> = {}>(args?: Subset<T, Post$seenByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Post$likesArgs<ExtArgs> = {}>(args?: Subset<T, Post$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly title: FieldRef<"Post", 'String'>
    readonly visiblity: FieldRef<"Post", 'Viewers'>
    readonly authorId: FieldRef<"Post", 'String'>
    readonly isMedia: FieldRef<"Post", 'Boolean'>
    readonly mediaurl: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.comments
   */
  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Post.notifications
   */
  export type Post$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Post.seenBy
   */
  export type Post$seenByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    where?: SeenPostWhereInput
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    cursor?: SeenPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SeenPostScalarFieldEnum | SeenPostScalarFieldEnum[]
  }

  /**
   * Post.likes
   */
  export type Post$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    postId: number | null
  }

  export type CommentSumAggregateOutputType = {
    postId: number | null
  }

  export type CommentMinAggregateOutputType = {
    commentId: string | null
    userId: string | null
    postId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    commentId: string | null
    userId: string | null
    postId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    commentId: number
    userId: number
    postId: number
    content: number
    createdAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    postId?: true
  }

  export type CommentSumAggregateInputType = {
    postId?: true
  }

  export type CommentMinAggregateInputType = {
    commentId?: true
    userId?: true
    postId?: true
    content?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    commentId?: true
    userId?: true
    postId?: true
    content?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    commentId?: true
    userId?: true
    postId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    commentId: string
    userId: string
    postId: number
    content: string
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commentId?: boolean
    userId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commentId?: boolean
    userId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    commentId?: boolean
    userId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    commentId?: boolean
    userId?: boolean
    postId?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"commentId" | "userId" | "postId" | "content" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      commentId: string
      userId: string
      postId: number
      content: string
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `commentId`
     * const commentWithCommentIdOnly = await prisma.comment.findMany({ select: { commentId: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `commentId`
     * const commentWithCommentIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { commentId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `commentId`
     * const commentWithCommentIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { commentId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly commentId: FieldRef<"Comment", 'String'>
    readonly userId: FieldRef<"Comment", 'String'>
    readonly postId: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Relations
   */

  export type AggregateRelations = {
    _count: RelationsCountAggregateOutputType | null
    _avg: RelationsAvgAggregateOutputType | null
    _sum: RelationsSumAggregateOutputType | null
    _min: RelationsMinAggregateOutputType | null
    _max: RelationsMaxAggregateOutputType | null
  }

  export type RelationsAvgAggregateOutputType = {
    id: number | null
  }

  export type RelationsSumAggregateOutputType = {
    id: number | null
  }

  export type RelationsMinAggregateOutputType = {
    id: number | null
    srcid: string | null
    destid: string | null
    type: $Enums.Relationship | null
    createdAt: Date | null
  }

  export type RelationsMaxAggregateOutputType = {
    id: number | null
    srcid: string | null
    destid: string | null
    type: $Enums.Relationship | null
    createdAt: Date | null
  }

  export type RelationsCountAggregateOutputType = {
    id: number
    srcid: number
    destid: number
    type: number
    createdAt: number
    _all: number
  }


  export type RelationsAvgAggregateInputType = {
    id?: true
  }

  export type RelationsSumAggregateInputType = {
    id?: true
  }

  export type RelationsMinAggregateInputType = {
    id?: true
    srcid?: true
    destid?: true
    type?: true
    createdAt?: true
  }

  export type RelationsMaxAggregateInputType = {
    id?: true
    srcid?: true
    destid?: true
    type?: true
    createdAt?: true
  }

  export type RelationsCountAggregateInputType = {
    id?: true
    srcid?: true
    destid?: true
    type?: true
    createdAt?: true
    _all?: true
  }

  export type RelationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relations to aggregate.
     */
    where?: RelationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RelationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Relations
    **/
    _count?: true | RelationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RelationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RelationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RelationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RelationsMaxAggregateInputType
  }

  export type GetRelationsAggregateType<T extends RelationsAggregateArgs> = {
        [P in keyof T & keyof AggregateRelations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRelations[P]>
      : GetScalarType<T[P], AggregateRelations[P]>
  }




  export type RelationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RelationsWhereInput
    orderBy?: RelationsOrderByWithAggregationInput | RelationsOrderByWithAggregationInput[]
    by: RelationsScalarFieldEnum[] | RelationsScalarFieldEnum
    having?: RelationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RelationsCountAggregateInputType | true
    _avg?: RelationsAvgAggregateInputType
    _sum?: RelationsSumAggregateInputType
    _min?: RelationsMinAggregateInputType
    _max?: RelationsMaxAggregateInputType
  }

  export type RelationsGroupByOutputType = {
    id: number
    srcid: string
    destid: string
    type: $Enums.Relationship
    createdAt: Date
    _count: RelationsCountAggregateOutputType | null
    _avg: RelationsAvgAggregateOutputType | null
    _sum: RelationsSumAggregateOutputType | null
    _min: RelationsMinAggregateOutputType | null
    _max: RelationsMaxAggregateOutputType | null
  }

  type GetRelationsGroupByPayload<T extends RelationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RelationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RelationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RelationsGroupByOutputType[P]>
            : GetScalarType<T[P], RelationsGroupByOutputType[P]>
        }
      >
    >


  export type RelationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    srcid?: boolean
    destid?: boolean
    type?: boolean
    createdAt?: boolean
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relations"]>

  export type RelationsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    srcid?: boolean
    destid?: boolean
    type?: boolean
    createdAt?: boolean
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relations"]>

  export type RelationsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    srcid?: boolean
    destid?: boolean
    type?: boolean
    createdAt?: boolean
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["relations"]>

  export type RelationsSelectScalar = {
    id?: boolean
    srcid?: boolean
    destid?: boolean
    type?: boolean
    createdAt?: boolean
  }

  export type RelationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "srcid" | "destid" | "type" | "createdAt", ExtArgs["result"]["relations"]>
  export type RelationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RelationsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RelationsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dest?: boolean | UserDefaultArgs<ExtArgs>
    src?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RelationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Relations"
    objects: {
      dest: Prisma.$UserPayload<ExtArgs>
      src: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      srcid: string
      destid: string
      type: $Enums.Relationship
      createdAt: Date
    }, ExtArgs["result"]["relations"]>
    composites: {}
  }

  type RelationsGetPayload<S extends boolean | null | undefined | RelationsDefaultArgs> = $Result.GetResult<Prisma.$RelationsPayload, S>

  type RelationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RelationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RelationsCountAggregateInputType | true
    }

  export interface RelationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Relations'], meta: { name: 'Relations' } }
    /**
     * Find zero or one Relations that matches the filter.
     * @param {RelationsFindUniqueArgs} args - Arguments to find a Relations
     * @example
     * // Get one Relations
     * const relations = await prisma.relations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RelationsFindUniqueArgs>(args: SelectSubset<T, RelationsFindUniqueArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Relations that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RelationsFindUniqueOrThrowArgs} args - Arguments to find a Relations
     * @example
     * // Get one Relations
     * const relations = await prisma.relations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RelationsFindUniqueOrThrowArgs>(args: SelectSubset<T, RelationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsFindFirstArgs} args - Arguments to find a Relations
     * @example
     * // Get one Relations
     * const relations = await prisma.relations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RelationsFindFirstArgs>(args?: SelectSubset<T, RelationsFindFirstArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Relations that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsFindFirstOrThrowArgs} args - Arguments to find a Relations
     * @example
     * // Get one Relations
     * const relations = await prisma.relations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RelationsFindFirstOrThrowArgs>(args?: SelectSubset<T, RelationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Relations
     * const relations = await prisma.relations.findMany()
     * 
     * // Get first 10 Relations
     * const relations = await prisma.relations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const relationsWithIdOnly = await prisma.relations.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RelationsFindManyArgs>(args?: SelectSubset<T, RelationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Relations.
     * @param {RelationsCreateArgs} args - Arguments to create a Relations.
     * @example
     * // Create one Relations
     * const Relations = await prisma.relations.create({
     *   data: {
     *     // ... data to create a Relations
     *   }
     * })
     * 
     */
    create<T extends RelationsCreateArgs>(args: SelectSubset<T, RelationsCreateArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Relations.
     * @param {RelationsCreateManyArgs} args - Arguments to create many Relations.
     * @example
     * // Create many Relations
     * const relations = await prisma.relations.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RelationsCreateManyArgs>(args?: SelectSubset<T, RelationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Relations and returns the data saved in the database.
     * @param {RelationsCreateManyAndReturnArgs} args - Arguments to create many Relations.
     * @example
     * // Create many Relations
     * const relations = await prisma.relations.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Relations and only return the `id`
     * const relationsWithIdOnly = await prisma.relations.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RelationsCreateManyAndReturnArgs>(args?: SelectSubset<T, RelationsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Relations.
     * @param {RelationsDeleteArgs} args - Arguments to delete one Relations.
     * @example
     * // Delete one Relations
     * const Relations = await prisma.relations.delete({
     *   where: {
     *     // ... filter to delete one Relations
     *   }
     * })
     * 
     */
    delete<T extends RelationsDeleteArgs>(args: SelectSubset<T, RelationsDeleteArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Relations.
     * @param {RelationsUpdateArgs} args - Arguments to update one Relations.
     * @example
     * // Update one Relations
     * const relations = await prisma.relations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RelationsUpdateArgs>(args: SelectSubset<T, RelationsUpdateArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Relations.
     * @param {RelationsDeleteManyArgs} args - Arguments to filter Relations to delete.
     * @example
     * // Delete a few Relations
     * const { count } = await prisma.relations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RelationsDeleteManyArgs>(args?: SelectSubset<T, RelationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Relations
     * const relations = await prisma.relations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RelationsUpdateManyArgs>(args: SelectSubset<T, RelationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Relations and returns the data updated in the database.
     * @param {RelationsUpdateManyAndReturnArgs} args - Arguments to update many Relations.
     * @example
     * // Update many Relations
     * const relations = await prisma.relations.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Relations and only return the `id`
     * const relationsWithIdOnly = await prisma.relations.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RelationsUpdateManyAndReturnArgs>(args: SelectSubset<T, RelationsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Relations.
     * @param {RelationsUpsertArgs} args - Arguments to update or create a Relations.
     * @example
     * // Update or create a Relations
     * const relations = await prisma.relations.upsert({
     *   create: {
     *     // ... data to create a Relations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Relations we want to update
     *   }
     * })
     */
    upsert<T extends RelationsUpsertArgs>(args: SelectSubset<T, RelationsUpsertArgs<ExtArgs>>): Prisma__RelationsClient<$Result.GetResult<Prisma.$RelationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsCountArgs} args - Arguments to filter Relations to count.
     * @example
     * // Count the number of Relations
     * const count = await prisma.relations.count({
     *   where: {
     *     // ... the filter for the Relations we want to count
     *   }
     * })
    **/
    count<T extends RelationsCountArgs>(
      args?: Subset<T, RelationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RelationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RelationsAggregateArgs>(args: Subset<T, RelationsAggregateArgs>): Prisma.PrismaPromise<GetRelationsAggregateType<T>>

    /**
     * Group by Relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RelationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RelationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RelationsGroupByArgs['orderBy'] }
        : { orderBy?: RelationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RelationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRelationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Relations model
   */
  readonly fields: RelationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Relations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RelationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dest<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    src<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Relations model
   */
  interface RelationsFieldRefs {
    readonly id: FieldRef<"Relations", 'Int'>
    readonly srcid: FieldRef<"Relations", 'String'>
    readonly destid: FieldRef<"Relations", 'String'>
    readonly type: FieldRef<"Relations", 'Relationship'>
    readonly createdAt: FieldRef<"Relations", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Relations findUnique
   */
  export type RelationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where: RelationsWhereUniqueInput
  }

  /**
   * Relations findUniqueOrThrow
   */
  export type RelationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where: RelationsWhereUniqueInput
  }

  /**
   * Relations findFirst
   */
  export type RelationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where?: RelationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relations.
     */
    cursor?: RelationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relations.
     */
    distinct?: RelationsScalarFieldEnum | RelationsScalarFieldEnum[]
  }

  /**
   * Relations findFirstOrThrow
   */
  export type RelationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where?: RelationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Relations.
     */
    cursor?: RelationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Relations.
     */
    distinct?: RelationsScalarFieldEnum | RelationsScalarFieldEnum[]
  }

  /**
   * Relations findMany
   */
  export type RelationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter, which Relations to fetch.
     */
    where?: RelationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Relations to fetch.
     */
    orderBy?: RelationsOrderByWithRelationInput | RelationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Relations.
     */
    cursor?: RelationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Relations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Relations.
     */
    skip?: number
    distinct?: RelationsScalarFieldEnum | RelationsScalarFieldEnum[]
  }

  /**
   * Relations create
   */
  export type RelationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * The data needed to create a Relations.
     */
    data: XOR<RelationsCreateInput, RelationsUncheckedCreateInput>
  }

  /**
   * Relations createMany
   */
  export type RelationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Relations.
     */
    data: RelationsCreateManyInput | RelationsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Relations createManyAndReturn
   */
  export type RelationsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * The data used to create many Relations.
     */
    data: RelationsCreateManyInput | RelationsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Relations update
   */
  export type RelationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * The data needed to update a Relations.
     */
    data: XOR<RelationsUpdateInput, RelationsUncheckedUpdateInput>
    /**
     * Choose, which Relations to update.
     */
    where: RelationsWhereUniqueInput
  }

  /**
   * Relations updateMany
   */
  export type RelationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Relations.
     */
    data: XOR<RelationsUpdateManyMutationInput, RelationsUncheckedUpdateManyInput>
    /**
     * Filter which Relations to update
     */
    where?: RelationsWhereInput
    /**
     * Limit how many Relations to update.
     */
    limit?: number
  }

  /**
   * Relations updateManyAndReturn
   */
  export type RelationsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * The data used to update Relations.
     */
    data: XOR<RelationsUpdateManyMutationInput, RelationsUncheckedUpdateManyInput>
    /**
     * Filter which Relations to update
     */
    where?: RelationsWhereInput
    /**
     * Limit how many Relations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Relations upsert
   */
  export type RelationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * The filter to search for the Relations to update in case it exists.
     */
    where: RelationsWhereUniqueInput
    /**
     * In case the Relations found by the `where` argument doesn't exist, create a new Relations with this data.
     */
    create: XOR<RelationsCreateInput, RelationsUncheckedCreateInput>
    /**
     * In case the Relations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RelationsUpdateInput, RelationsUncheckedUpdateInput>
  }

  /**
   * Relations delete
   */
  export type RelationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
    /**
     * Filter which Relations to delete.
     */
    where: RelationsWhereUniqueInput
  }

  /**
   * Relations deleteMany
   */
  export type RelationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Relations to delete
     */
    where?: RelationsWhereInput
    /**
     * Limit how many Relations to delete.
     */
    limit?: number
  }

  /**
   * Relations without action
   */
  export type RelationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Relations
     */
    select?: RelationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Relations
     */
    omit?: RelationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RelationsInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationAvgAggregateOutputType = {
    id: number | null
    postid: number | null
  }

  export type NotificationSumAggregateOutputType = {
    id: number | null
    postid: number | null
  }

  export type NotificationMinAggregateOutputType = {
    id: number | null
    userId: string | null
    postid: number | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    postid: number | null
    isRead: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    postid: number
    isRead: number
    createdAt: number
    _all: number
  }


  export type NotificationAvgAggregateInputType = {
    id?: true
    postid?: true
  }

  export type NotificationSumAggregateInputType = {
    id?: true
    postid?: true
  }

  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    postid?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    postid?: true
    isRead?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    postid?: true
    isRead?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NotificationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NotificationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _avg?: NotificationAvgAggregateInputType
    _sum?: NotificationSumAggregateInputType
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: number
    userId: string
    postid: number
    isRead: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _avg: NotificationAvgAggregateOutputType | null
    _sum: NotificationSumAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postid?: boolean
    isRead?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postid?: boolean
    isRead?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postid?: boolean
    isRead?: boolean
    createdAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    postid?: boolean
    isRead?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "postid" | "isRead" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      postid: number
      isRead: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'Int'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly postid: FieldRef<"Notification", 'Int'>
    readonly isRead: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Model SeenPost
   */

  export type AggregateSeenPost = {
    _count: SeenPostCountAggregateOutputType | null
    _avg: SeenPostAvgAggregateOutputType | null
    _sum: SeenPostSumAggregateOutputType | null
    _min: SeenPostMinAggregateOutputType | null
    _max: SeenPostMaxAggregateOutputType | null
  }

  export type SeenPostAvgAggregateOutputType = {
    id: number | null
    postId: number | null
  }

  export type SeenPostSumAggregateOutputType = {
    id: number | null
    postId: number | null
  }

  export type SeenPostMinAggregateOutputType = {
    id: number | null
    userId: string | null
    postId: number | null
    seenAt: Date | null
  }

  export type SeenPostMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    postId: number | null
    seenAt: Date | null
  }

  export type SeenPostCountAggregateOutputType = {
    id: number
    userId: number
    postId: number
    seenAt: number
    _all: number
  }


  export type SeenPostAvgAggregateInputType = {
    id?: true
    postId?: true
  }

  export type SeenPostSumAggregateInputType = {
    id?: true
    postId?: true
  }

  export type SeenPostMinAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    seenAt?: true
  }

  export type SeenPostMaxAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    seenAt?: true
  }

  export type SeenPostCountAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    seenAt?: true
    _all?: true
  }

  export type SeenPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeenPost to aggregate.
     */
    where?: SeenPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeenPosts to fetch.
     */
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeenPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeenPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeenPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SeenPosts
    **/
    _count?: true | SeenPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SeenPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SeenPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeenPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeenPostMaxAggregateInputType
  }

  export type GetSeenPostAggregateType<T extends SeenPostAggregateArgs> = {
        [P in keyof T & keyof AggregateSeenPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeenPost[P]>
      : GetScalarType<T[P], AggregateSeenPost[P]>
  }




  export type SeenPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeenPostWhereInput
    orderBy?: SeenPostOrderByWithAggregationInput | SeenPostOrderByWithAggregationInput[]
    by: SeenPostScalarFieldEnum[] | SeenPostScalarFieldEnum
    having?: SeenPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeenPostCountAggregateInputType | true
    _avg?: SeenPostAvgAggregateInputType
    _sum?: SeenPostSumAggregateInputType
    _min?: SeenPostMinAggregateInputType
    _max?: SeenPostMaxAggregateInputType
  }

  export type SeenPostGroupByOutputType = {
    id: number
    userId: string
    postId: number
    seenAt: Date
    _count: SeenPostCountAggregateOutputType | null
    _avg: SeenPostAvgAggregateOutputType | null
    _sum: SeenPostSumAggregateOutputType | null
    _min: SeenPostMinAggregateOutputType | null
    _max: SeenPostMaxAggregateOutputType | null
  }

  type GetSeenPostGroupByPayload<T extends SeenPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeenPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeenPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeenPostGroupByOutputType[P]>
            : GetScalarType<T[P], SeenPostGroupByOutputType[P]>
        }
      >
    >


  export type SeenPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    seenAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seenPost"]>

  export type SeenPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    seenAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seenPost"]>

  export type SeenPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    seenAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["seenPost"]>

  export type SeenPostSelectScalar = {
    id?: boolean
    userId?: boolean
    postId?: boolean
    seenAt?: boolean
  }

  export type SeenPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "postId" | "seenAt", ExtArgs["result"]["seenPost"]>
  export type SeenPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SeenPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SeenPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SeenPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SeenPost"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      postId: number
      seenAt: Date
    }, ExtArgs["result"]["seenPost"]>
    composites: {}
  }

  type SeenPostGetPayload<S extends boolean | null | undefined | SeenPostDefaultArgs> = $Result.GetResult<Prisma.$SeenPostPayload, S>

  type SeenPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeenPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeenPostCountAggregateInputType | true
    }

  export interface SeenPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SeenPost'], meta: { name: 'SeenPost' } }
    /**
     * Find zero or one SeenPost that matches the filter.
     * @param {SeenPostFindUniqueArgs} args - Arguments to find a SeenPost
     * @example
     * // Get one SeenPost
     * const seenPost = await prisma.seenPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeenPostFindUniqueArgs>(args: SelectSubset<T, SeenPostFindUniqueArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SeenPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeenPostFindUniqueOrThrowArgs} args - Arguments to find a SeenPost
     * @example
     * // Get one SeenPost
     * const seenPost = await prisma.seenPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeenPostFindUniqueOrThrowArgs>(args: SelectSubset<T, SeenPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeenPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostFindFirstArgs} args - Arguments to find a SeenPost
     * @example
     * // Get one SeenPost
     * const seenPost = await prisma.seenPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeenPostFindFirstArgs>(args?: SelectSubset<T, SeenPostFindFirstArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SeenPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostFindFirstOrThrowArgs} args - Arguments to find a SeenPost
     * @example
     * // Get one SeenPost
     * const seenPost = await prisma.seenPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeenPostFindFirstOrThrowArgs>(args?: SelectSubset<T, SeenPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SeenPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SeenPosts
     * const seenPosts = await prisma.seenPost.findMany()
     * 
     * // Get first 10 SeenPosts
     * const seenPosts = await prisma.seenPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const seenPostWithIdOnly = await prisma.seenPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SeenPostFindManyArgs>(args?: SelectSubset<T, SeenPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SeenPost.
     * @param {SeenPostCreateArgs} args - Arguments to create a SeenPost.
     * @example
     * // Create one SeenPost
     * const SeenPost = await prisma.seenPost.create({
     *   data: {
     *     // ... data to create a SeenPost
     *   }
     * })
     * 
     */
    create<T extends SeenPostCreateArgs>(args: SelectSubset<T, SeenPostCreateArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SeenPosts.
     * @param {SeenPostCreateManyArgs} args - Arguments to create many SeenPosts.
     * @example
     * // Create many SeenPosts
     * const seenPost = await prisma.seenPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeenPostCreateManyArgs>(args?: SelectSubset<T, SeenPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SeenPosts and returns the data saved in the database.
     * @param {SeenPostCreateManyAndReturnArgs} args - Arguments to create many SeenPosts.
     * @example
     * // Create many SeenPosts
     * const seenPost = await prisma.seenPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SeenPosts and only return the `id`
     * const seenPostWithIdOnly = await prisma.seenPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeenPostCreateManyAndReturnArgs>(args?: SelectSubset<T, SeenPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SeenPost.
     * @param {SeenPostDeleteArgs} args - Arguments to delete one SeenPost.
     * @example
     * // Delete one SeenPost
     * const SeenPost = await prisma.seenPost.delete({
     *   where: {
     *     // ... filter to delete one SeenPost
     *   }
     * })
     * 
     */
    delete<T extends SeenPostDeleteArgs>(args: SelectSubset<T, SeenPostDeleteArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SeenPost.
     * @param {SeenPostUpdateArgs} args - Arguments to update one SeenPost.
     * @example
     * // Update one SeenPost
     * const seenPost = await prisma.seenPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeenPostUpdateArgs>(args: SelectSubset<T, SeenPostUpdateArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SeenPosts.
     * @param {SeenPostDeleteManyArgs} args - Arguments to filter SeenPosts to delete.
     * @example
     * // Delete a few SeenPosts
     * const { count } = await prisma.seenPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeenPostDeleteManyArgs>(args?: SelectSubset<T, SeenPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeenPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SeenPosts
     * const seenPost = await prisma.seenPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeenPostUpdateManyArgs>(args: SelectSubset<T, SeenPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SeenPosts and returns the data updated in the database.
     * @param {SeenPostUpdateManyAndReturnArgs} args - Arguments to update many SeenPosts.
     * @example
     * // Update many SeenPosts
     * const seenPost = await prisma.seenPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SeenPosts and only return the `id`
     * const seenPostWithIdOnly = await prisma.seenPost.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SeenPostUpdateManyAndReturnArgs>(args: SelectSubset<T, SeenPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SeenPost.
     * @param {SeenPostUpsertArgs} args - Arguments to update or create a SeenPost.
     * @example
     * // Update or create a SeenPost
     * const seenPost = await prisma.seenPost.upsert({
     *   create: {
     *     // ... data to create a SeenPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SeenPost we want to update
     *   }
     * })
     */
    upsert<T extends SeenPostUpsertArgs>(args: SelectSubset<T, SeenPostUpsertArgs<ExtArgs>>): Prisma__SeenPostClient<$Result.GetResult<Prisma.$SeenPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SeenPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostCountArgs} args - Arguments to filter SeenPosts to count.
     * @example
     * // Count the number of SeenPosts
     * const count = await prisma.seenPost.count({
     *   where: {
     *     // ... the filter for the SeenPosts we want to count
     *   }
     * })
    **/
    count<T extends SeenPostCountArgs>(
      args?: Subset<T, SeenPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeenPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SeenPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SeenPostAggregateArgs>(args: Subset<T, SeenPostAggregateArgs>): Prisma.PrismaPromise<GetSeenPostAggregateType<T>>

    /**
     * Group by SeenPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeenPostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SeenPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeenPostGroupByArgs['orderBy'] }
        : { orderBy?: SeenPostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SeenPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeenPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SeenPost model
   */
  readonly fields: SeenPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SeenPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeenPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SeenPost model
   */
  interface SeenPostFieldRefs {
    readonly id: FieldRef<"SeenPost", 'Int'>
    readonly userId: FieldRef<"SeenPost", 'String'>
    readonly postId: FieldRef<"SeenPost", 'Int'>
    readonly seenAt: FieldRef<"SeenPost", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SeenPost findUnique
   */
  export type SeenPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter, which SeenPost to fetch.
     */
    where: SeenPostWhereUniqueInput
  }

  /**
   * SeenPost findUniqueOrThrow
   */
  export type SeenPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter, which SeenPost to fetch.
     */
    where: SeenPostWhereUniqueInput
  }

  /**
   * SeenPost findFirst
   */
  export type SeenPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter, which SeenPost to fetch.
     */
    where?: SeenPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeenPosts to fetch.
     */
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeenPosts.
     */
    cursor?: SeenPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeenPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeenPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeenPosts.
     */
    distinct?: SeenPostScalarFieldEnum | SeenPostScalarFieldEnum[]
  }

  /**
   * SeenPost findFirstOrThrow
   */
  export type SeenPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter, which SeenPost to fetch.
     */
    where?: SeenPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeenPosts to fetch.
     */
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SeenPosts.
     */
    cursor?: SeenPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeenPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeenPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SeenPosts.
     */
    distinct?: SeenPostScalarFieldEnum | SeenPostScalarFieldEnum[]
  }

  /**
   * SeenPost findMany
   */
  export type SeenPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter, which SeenPosts to fetch.
     */
    where?: SeenPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SeenPosts to fetch.
     */
    orderBy?: SeenPostOrderByWithRelationInput | SeenPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SeenPosts.
     */
    cursor?: SeenPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SeenPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SeenPosts.
     */
    skip?: number
    distinct?: SeenPostScalarFieldEnum | SeenPostScalarFieldEnum[]
  }

  /**
   * SeenPost create
   */
  export type SeenPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * The data needed to create a SeenPost.
     */
    data: XOR<SeenPostCreateInput, SeenPostUncheckedCreateInput>
  }

  /**
   * SeenPost createMany
   */
  export type SeenPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SeenPosts.
     */
    data: SeenPostCreateManyInput | SeenPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SeenPost createManyAndReturn
   */
  export type SeenPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * The data used to create many SeenPosts.
     */
    data: SeenPostCreateManyInput | SeenPostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SeenPost update
   */
  export type SeenPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * The data needed to update a SeenPost.
     */
    data: XOR<SeenPostUpdateInput, SeenPostUncheckedUpdateInput>
    /**
     * Choose, which SeenPost to update.
     */
    where: SeenPostWhereUniqueInput
  }

  /**
   * SeenPost updateMany
   */
  export type SeenPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SeenPosts.
     */
    data: XOR<SeenPostUpdateManyMutationInput, SeenPostUncheckedUpdateManyInput>
    /**
     * Filter which SeenPosts to update
     */
    where?: SeenPostWhereInput
    /**
     * Limit how many SeenPosts to update.
     */
    limit?: number
  }

  /**
   * SeenPost updateManyAndReturn
   */
  export type SeenPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * The data used to update SeenPosts.
     */
    data: XOR<SeenPostUpdateManyMutationInput, SeenPostUncheckedUpdateManyInput>
    /**
     * Filter which SeenPosts to update
     */
    where?: SeenPostWhereInput
    /**
     * Limit how many SeenPosts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SeenPost upsert
   */
  export type SeenPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * The filter to search for the SeenPost to update in case it exists.
     */
    where: SeenPostWhereUniqueInput
    /**
     * In case the SeenPost found by the `where` argument doesn't exist, create a new SeenPost with this data.
     */
    create: XOR<SeenPostCreateInput, SeenPostUncheckedCreateInput>
    /**
     * In case the SeenPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeenPostUpdateInput, SeenPostUncheckedUpdateInput>
  }

  /**
   * SeenPost delete
   */
  export type SeenPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
    /**
     * Filter which SeenPost to delete.
     */
    where: SeenPostWhereUniqueInput
  }

  /**
   * SeenPost deleteMany
   */
  export type SeenPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SeenPosts to delete
     */
    where?: SeenPostWhereInput
    /**
     * Limit how many SeenPosts to delete.
     */
    limit?: number
  }

  /**
   * SeenPost without action
   */
  export type SeenPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeenPost
     */
    select?: SeenPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SeenPost
     */
    omit?: SeenPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SeenPostInclude<ExtArgs> | null
  }


  /**
   * Model Chats
   */

  export type AggregateChats = {
    _count: ChatsCountAggregateOutputType | null
    _avg: ChatsAvgAggregateOutputType | null
    _sum: ChatsSumAggregateOutputType | null
    _min: ChatsMinAggregateOutputType | null
    _max: ChatsMaxAggregateOutputType | null
  }

  export type ChatsAvgAggregateOutputType = {
    id: number | null
  }

  export type ChatsSumAggregateOutputType = {
    id: number | null
  }

  export type ChatsMinAggregateOutputType = {
    id: number | null
    fromId: string | null
    toId: string | null
    type: $Enums.ChatType | null
    mediaUrl: string | null
    message: string | null
    isSeen: boolean | null
    isDeletedByFrom: boolean | null
    isDeletedByTo: boolean | null
    createdAt: Date | null
  }

  export type ChatsMaxAggregateOutputType = {
    id: number | null
    fromId: string | null
    toId: string | null
    type: $Enums.ChatType | null
    mediaUrl: string | null
    message: string | null
    isSeen: boolean | null
    isDeletedByFrom: boolean | null
    isDeletedByTo: boolean | null
    createdAt: Date | null
  }

  export type ChatsCountAggregateOutputType = {
    id: number
    fromId: number
    toId: number
    type: number
    mediaUrl: number
    message: number
    isSeen: number
    isDeletedByFrom: number
    isDeletedByTo: number
    createdAt: number
    _all: number
  }


  export type ChatsAvgAggregateInputType = {
    id?: true
  }

  export type ChatsSumAggregateInputType = {
    id?: true
  }

  export type ChatsMinAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    type?: true
    mediaUrl?: true
    message?: true
    isSeen?: true
    isDeletedByFrom?: true
    isDeletedByTo?: true
    createdAt?: true
  }

  export type ChatsMaxAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    type?: true
    mediaUrl?: true
    message?: true
    isSeen?: true
    isDeletedByFrom?: true
    isDeletedByTo?: true
    createdAt?: true
  }

  export type ChatsCountAggregateInputType = {
    id?: true
    fromId?: true
    toId?: true
    type?: true
    mediaUrl?: true
    message?: true
    isSeen?: true
    isDeletedByFrom?: true
    isDeletedByTo?: true
    createdAt?: true
    _all?: true
  }

  export type ChatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chats to aggregate.
     */
    where?: ChatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chats
    **/
    _count?: true | ChatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatsMaxAggregateInputType
  }

  export type GetChatsAggregateType<T extends ChatsAggregateArgs> = {
        [P in keyof T & keyof AggregateChats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChats[P]>
      : GetScalarType<T[P], AggregateChats[P]>
  }




  export type ChatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatsWhereInput
    orderBy?: ChatsOrderByWithAggregationInput | ChatsOrderByWithAggregationInput[]
    by: ChatsScalarFieldEnum[] | ChatsScalarFieldEnum
    having?: ChatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatsCountAggregateInputType | true
    _avg?: ChatsAvgAggregateInputType
    _sum?: ChatsSumAggregateInputType
    _min?: ChatsMinAggregateInputType
    _max?: ChatsMaxAggregateInputType
  }

  export type ChatsGroupByOutputType = {
    id: number
    fromId: string
    toId: string
    type: $Enums.ChatType
    mediaUrl: string | null
    message: string | null
    isSeen: boolean | null
    isDeletedByFrom: boolean
    isDeletedByTo: boolean
    createdAt: Date
    _count: ChatsCountAggregateOutputType | null
    _avg: ChatsAvgAggregateOutputType | null
    _sum: ChatsSumAggregateOutputType | null
    _min: ChatsMinAggregateOutputType | null
    _max: ChatsMaxAggregateOutputType | null
  }

  type GetChatsGroupByPayload<T extends ChatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatsGroupByOutputType[P]>
            : GetScalarType<T[P], ChatsGroupByOutputType[P]>
        }
      >
    >


  export type ChatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    type?: boolean
    mediaUrl?: boolean
    message?: boolean
    isSeen?: boolean
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chats"]>

  export type ChatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    type?: boolean
    mediaUrl?: boolean
    message?: boolean
    isSeen?: boolean
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chats"]>

  export type ChatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fromId?: boolean
    toId?: boolean
    type?: boolean
    mediaUrl?: boolean
    message?: boolean
    isSeen?: boolean
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: boolean
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chats"]>

  export type ChatsSelectScalar = {
    id?: boolean
    fromId?: boolean
    toId?: boolean
    type?: boolean
    mediaUrl?: boolean
    message?: boolean
    isSeen?: boolean
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: boolean
  }

  export type ChatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fromId" | "toId" | "type" | "mediaUrl" | "message" | "isSeen" | "isDeletedByFrom" | "isDeletedByTo" | "createdAt", ExtArgs["result"]["chats"]>
  export type ChatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ChatsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    from?: boolean | UserDefaultArgs<ExtArgs>
    to?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ChatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chats"
    objects: {
      from: Prisma.$UserPayload<ExtArgs>
      to: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fromId: string
      toId: string
      type: $Enums.ChatType
      mediaUrl: string | null
      message: string | null
      isSeen: boolean | null
      isDeletedByFrom: boolean
      isDeletedByTo: boolean
      createdAt: Date
    }, ExtArgs["result"]["chats"]>
    composites: {}
  }

  type ChatsGetPayload<S extends boolean | null | undefined | ChatsDefaultArgs> = $Result.GetResult<Prisma.$ChatsPayload, S>

  type ChatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatsCountAggregateInputType | true
    }

  export interface ChatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chats'], meta: { name: 'Chats' } }
    /**
     * Find zero or one Chats that matches the filter.
     * @param {ChatsFindUniqueArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatsFindUniqueArgs>(args: SelectSubset<T, ChatsFindUniqueArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatsFindUniqueOrThrowArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatsFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsFindFirstArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatsFindFirstArgs>(args?: SelectSubset<T, ChatsFindFirstArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsFindFirstOrThrowArgs} args - Arguments to find a Chats
     * @example
     * // Get one Chats
     * const chats = await prisma.chats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatsFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chats.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatsWithIdOnly = await prisma.chats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatsFindManyArgs>(args?: SelectSubset<T, ChatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chats.
     * @param {ChatsCreateArgs} args - Arguments to create a Chats.
     * @example
     * // Create one Chats
     * const Chats = await prisma.chats.create({
     *   data: {
     *     // ... data to create a Chats
     *   }
     * })
     * 
     */
    create<T extends ChatsCreateArgs>(args: SelectSubset<T, ChatsCreateArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {ChatsCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chats = await prisma.chats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatsCreateManyArgs>(args?: SelectSubset<T, ChatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {ChatsCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chats = await prisma.chats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatsWithIdOnly = await prisma.chats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatsCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chats.
     * @param {ChatsDeleteArgs} args - Arguments to delete one Chats.
     * @example
     * // Delete one Chats
     * const Chats = await prisma.chats.delete({
     *   where: {
     *     // ... filter to delete one Chats
     *   }
     * })
     * 
     */
    delete<T extends ChatsDeleteArgs>(args: SelectSubset<T, ChatsDeleteArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chats.
     * @param {ChatsUpdateArgs} args - Arguments to update one Chats.
     * @example
     * // Update one Chats
     * const chats = await prisma.chats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatsUpdateArgs>(args: SelectSubset<T, ChatsUpdateArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {ChatsDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatsDeleteManyArgs>(args?: SelectSubset<T, ChatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chats = await prisma.chats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatsUpdateManyArgs>(args: SelectSubset<T, ChatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {ChatsUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chats = await prisma.chats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatsWithIdOnly = await prisma.chats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatsUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chats.
     * @param {ChatsUpsertArgs} args - Arguments to update or create a Chats.
     * @example
     * // Update or create a Chats
     * const chats = await prisma.chats.upsert({
     *   create: {
     *     // ... data to create a Chats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chats we want to update
     *   }
     * })
     */
    upsert<T extends ChatsUpsertArgs>(args: SelectSubset<T, ChatsUpsertArgs<ExtArgs>>): Prisma__ChatsClient<$Result.GetResult<Prisma.$ChatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chats.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends ChatsCountArgs>(
      args?: Subset<T, ChatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatsAggregateArgs>(args: Subset<T, ChatsAggregateArgs>): Prisma.PrismaPromise<GetChatsAggregateType<T>>

    /**
     * Group by Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatsGroupByArgs['orderBy'] }
        : { orderBy?: ChatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chats model
   */
  readonly fields: ChatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    from<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chats model
   */
  interface ChatsFieldRefs {
    readonly id: FieldRef<"Chats", 'Int'>
    readonly fromId: FieldRef<"Chats", 'String'>
    readonly toId: FieldRef<"Chats", 'String'>
    readonly type: FieldRef<"Chats", 'ChatType'>
    readonly mediaUrl: FieldRef<"Chats", 'String'>
    readonly message: FieldRef<"Chats", 'String'>
    readonly isSeen: FieldRef<"Chats", 'Boolean'>
    readonly isDeletedByFrom: FieldRef<"Chats", 'Boolean'>
    readonly isDeletedByTo: FieldRef<"Chats", 'Boolean'>
    readonly createdAt: FieldRef<"Chats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chats findUnique
   */
  export type ChatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where: ChatsWhereUniqueInput
  }

  /**
   * Chats findUniqueOrThrow
   */
  export type ChatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where: ChatsWhereUniqueInput
  }

  /**
   * Chats findFirst
   */
  export type ChatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * Chats findFirstOrThrow
   */
  export type ChatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * Chats findMany
   */
  export type ChatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatsOrderByWithRelationInput | ChatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chats.
     */
    cursor?: ChatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    distinct?: ChatsScalarFieldEnum | ChatsScalarFieldEnum[]
  }

  /**
   * Chats create
   */
  export type ChatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * The data needed to create a Chats.
     */
    data: XOR<ChatsCreateInput, ChatsUncheckedCreateInput>
  }

  /**
   * Chats createMany
   */
  export type ChatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chats.
     */
    data: ChatsCreateManyInput | ChatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Chats createManyAndReturn
   */
  export type ChatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * The data used to create many Chats.
     */
    data: ChatsCreateManyInput | ChatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chats update
   */
  export type ChatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * The data needed to update a Chats.
     */
    data: XOR<ChatsUpdateInput, ChatsUncheckedUpdateInput>
    /**
     * Choose, which Chats to update.
     */
    where: ChatsWhereUniqueInput
  }

  /**
   * Chats updateMany
   */
  export type ChatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatsUpdateManyMutationInput, ChatsUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatsWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chats updateManyAndReturn
   */
  export type ChatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatsUpdateManyMutationInput, ChatsUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatsWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Chats upsert
   */
  export type ChatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * The filter to search for the Chats to update in case it exists.
     */
    where: ChatsWhereUniqueInput
    /**
     * In case the Chats found by the `where` argument doesn't exist, create a new Chats with this data.
     */
    create: XOR<ChatsCreateInput, ChatsUncheckedCreateInput>
    /**
     * In case the Chats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatsUpdateInput, ChatsUncheckedUpdateInput>
  }

  /**
   * Chats delete
   */
  export type ChatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
    /**
     * Filter which Chats to delete.
     */
    where: ChatsWhereUniqueInput
  }

  /**
   * Chats deleteMany
   */
  export type ChatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chats to delete
     */
    where?: ChatsWhereInput
    /**
     * Limit how many Chats to delete.
     */
    limit?: number
  }

  /**
   * Chats without action
   */
  export type ChatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chats
     */
    select?: ChatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chats
     */
    omit?: ChatsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerified: 'emailVerified',
    name: 'name',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    password: 'password',
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username',
    dob: 'dob',
    bio: 'bio',
    phone: 'phone',
    pic: 'pic',
    lastSeenAt: 'lastSeenAt',
    provider: 'provider'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OTPTableScalarFieldEnum: {
    id: 'id',
    email: 'email',
    otp: 'otp',
    expiry: 'expiry'
  };

  export type OTPTableScalarFieldEnum = (typeof OTPTableScalarFieldEnum)[keyof typeof OTPTableScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    visiblity: 'visiblity',
    authorId: 'authorId',
    isMedia: 'isMedia',
    mediaurl: 'mediaurl',
    createdAt: 'createdAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    commentId: 'commentId',
    userId: 'userId',
    postId: 'postId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const RelationsScalarFieldEnum: {
    id: 'id',
    srcid: 'srcid',
    destid: 'destid',
    type: 'type',
    createdAt: 'createdAt'
  };

  export type RelationsScalarFieldEnum = (typeof RelationsScalarFieldEnum)[keyof typeof RelationsScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    postid: 'postid',
    isRead: 'isRead',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SeenPostScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    postId: 'postId',
    seenAt: 'seenAt'
  };

  export type SeenPostScalarFieldEnum = (typeof SeenPostScalarFieldEnum)[keyof typeof SeenPostScalarFieldEnum]


  export const ChatsScalarFieldEnum: {
    id: 'id',
    fromId: 'fromId',
    toId: 'toId',
    type: 'type',
    mediaUrl: 'mediaUrl',
    message: 'message',
    isSeen: 'isSeen',
    isDeletedByFrom: 'isDeletedByFrom',
    isDeletedByTo: 'isDeletedByTo',
    createdAt: 'createdAt'
  };

  export type ChatsScalarFieldEnum = (typeof ChatsScalarFieldEnum)[keyof typeof ChatsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Viewers'
   */
  export type EnumViewersFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Viewers'>
    


  /**
   * Reference to a field of type 'Viewers[]'
   */
  export type ListEnumViewersFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Viewers[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Relationship'
   */
  export type EnumRelationshipFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Relationship'>
    


  /**
   * Reference to a field of type 'Relationship[]'
   */
  export type ListEnumRelationshipFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Relationship[]'>
    


  /**
   * Reference to a field of type 'ChatType'
   */
  export type EnumChatTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatType'>
    


  /**
   * Reference to a field of type 'ChatType[]'
   */
  export type ListEnumChatTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    lastname?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    bio?: StringFilter<"User"> | string
    phone?: BigIntNullableFilter<"User"> | bigint | number | null
    pic?: StringNullableFilter<"User"> | string | null
    lastSeenAt?: DateTimeFilter<"User"> | Date | string
    provider?: EnumProviderFilter<"User"> | $Enums.Provider
    chatsSent?: ChatsListRelationFilter
    chatsReceived?: ChatsListRelationFilter
    comments?: CommentListRelationFilter
    notifications?: NotificationListRelationFilter
    posts?: PostListRelationFilter
    following?: RelationsListRelationFilter
    followers?: RelationsListRelationFilter
    seenPosts?: SeenPostListRelationFilter
    likedPosts?: PostListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    bio?: SortOrder
    phone?: SortOrderInput | SortOrder
    pic?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrder
    provider?: SortOrder
    chatsSent?: ChatsOrderByRelationAggregateInput
    chatsReceived?: ChatsOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    posts?: PostOrderByRelationAggregateInput
    following?: RelationsOrderByRelationAggregateInput
    followers?: RelationsOrderByRelationAggregateInput
    seenPosts?: SeenPostOrderByRelationAggregateInput
    likedPosts?: PostOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    phone?: bigint | number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    lastname?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    bio?: StringFilter<"User"> | string
    pic?: StringNullableFilter<"User"> | string | null
    lastSeenAt?: DateTimeFilter<"User"> | Date | string
    provider?: EnumProviderFilter<"User"> | $Enums.Provider
    chatsSent?: ChatsListRelationFilter
    chatsReceived?: ChatsListRelationFilter
    comments?: CommentListRelationFilter
    notifications?: NotificationListRelationFilter
    posts?: PostListRelationFilter
    following?: RelationsListRelationFilter
    followers?: RelationsListRelationFilter
    seenPosts?: SeenPostListRelationFilter
    likedPosts?: PostListRelationFilter
  }, "id" | "email" | "username" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrderInput | SortOrder
    firstname?: SortOrderInput | SortOrder
    lastname?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    bio?: SortOrder
    phone?: SortOrderInput | SortOrder
    pic?: SortOrderInput | SortOrder
    lastSeenAt?: SortOrder
    provider?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstname?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastname?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    bio?: StringWithAggregatesFilter<"User"> | string
    phone?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    pic?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastSeenAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    provider?: EnumProviderWithAggregatesFilter<"User"> | $Enums.Provider
  }

  export type OTPTableWhereInput = {
    AND?: OTPTableWhereInput | OTPTableWhereInput[]
    OR?: OTPTableWhereInput[]
    NOT?: OTPTableWhereInput | OTPTableWhereInput[]
    id?: IntFilter<"OTPTable"> | number
    email?: StringFilter<"OTPTable"> | string
    otp?: StringFilter<"OTPTable"> | string
    expiry?: DateTimeFilter<"OTPTable"> | Date | string
  }

  export type OTPTableOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    expiry?: SortOrder
  }

  export type OTPTableWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: OTPTableWhereInput | OTPTableWhereInput[]
    OR?: OTPTableWhereInput[]
    NOT?: OTPTableWhereInput | OTPTableWhereInput[]
    otp?: StringFilter<"OTPTable"> | string
    expiry?: DateTimeFilter<"OTPTable"> | Date | string
  }, "id" | "email">

  export type OTPTableOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    expiry?: SortOrder
    _count?: OTPTableCountOrderByAggregateInput
    _avg?: OTPTableAvgOrderByAggregateInput
    _max?: OTPTableMaxOrderByAggregateInput
    _min?: OTPTableMinOrderByAggregateInput
    _sum?: OTPTableSumOrderByAggregateInput
  }

  export type OTPTableScalarWhereWithAggregatesInput = {
    AND?: OTPTableScalarWhereWithAggregatesInput | OTPTableScalarWhereWithAggregatesInput[]
    OR?: OTPTableScalarWhereWithAggregatesInput[]
    NOT?: OTPTableScalarWhereWithAggregatesInput | OTPTableScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OTPTable"> | number
    email?: StringWithAggregatesFilter<"OTPTable"> | string
    otp?: StringWithAggregatesFilter<"OTPTable"> | string
    expiry?: DateTimeWithAggregatesFilter<"OTPTable"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    visiblity?: EnumViewersFilter<"Post"> | $Enums.Viewers
    authorId?: StringFilter<"Post"> | string
    isMedia?: BoolFilter<"Post"> | boolean
    mediaurl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    comments?: CommentListRelationFilter
    notifications?: NotificationListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    seenBy?: SeenPostListRelationFilter
    likes?: UserListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    visiblity?: SortOrder
    authorId?: SortOrder
    isMedia?: SortOrder
    mediaurl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    comments?: CommentOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
    author?: UserOrderByWithRelationInput
    seenBy?: SeenPostOrderByRelationAggregateInput
    likes?: UserOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    visiblity?: EnumViewersFilter<"Post"> | $Enums.Viewers
    authorId?: StringFilter<"Post"> | string
    isMedia?: BoolFilter<"Post"> | boolean
    mediaurl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
    comments?: CommentListRelationFilter
    notifications?: NotificationListRelationFilter
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    seenBy?: SeenPostListRelationFilter
    likes?: UserListRelationFilter
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    visiblity?: SortOrder
    authorId?: SortOrder
    isMedia?: SortOrder
    mediaurl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    title?: StringWithAggregatesFilter<"Post"> | string
    visiblity?: EnumViewersWithAggregatesFilter<"Post"> | $Enums.Viewers
    authorId?: StringWithAggregatesFilter<"Post"> | string
    isMedia?: BoolWithAggregatesFilter<"Post"> | boolean
    mediaurl?: StringNullableWithAggregatesFilter<"Post"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    commentId?: StringFilter<"Comment"> | string
    userId?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    commentId?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    commentId?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    userId?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "commentId">

  export type CommentOrderByWithAggregationInput = {
    commentId?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    commentId?: StringWithAggregatesFilter<"Comment"> | string
    userId?: StringWithAggregatesFilter<"Comment"> | string
    postId?: IntWithAggregatesFilter<"Comment"> | number
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type RelationsWhereInput = {
    AND?: RelationsWhereInput | RelationsWhereInput[]
    OR?: RelationsWhereInput[]
    NOT?: RelationsWhereInput | RelationsWhereInput[]
    id?: IntFilter<"Relations"> | number
    srcid?: StringFilter<"Relations"> | string
    destid?: StringFilter<"Relations"> | string
    type?: EnumRelationshipFilter<"Relations"> | $Enums.Relationship
    createdAt?: DateTimeFilter<"Relations"> | Date | string
    dest?: XOR<UserScalarRelationFilter, UserWhereInput>
    src?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RelationsOrderByWithRelationInput = {
    id?: SortOrder
    srcid?: SortOrder
    destid?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    dest?: UserOrderByWithRelationInput
    src?: UserOrderByWithRelationInput
  }

  export type RelationsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    srcid_destid?: RelationsSrcidDestidCompoundUniqueInput
    AND?: RelationsWhereInput | RelationsWhereInput[]
    OR?: RelationsWhereInput[]
    NOT?: RelationsWhereInput | RelationsWhereInput[]
    srcid?: StringFilter<"Relations"> | string
    destid?: StringFilter<"Relations"> | string
    type?: EnumRelationshipFilter<"Relations"> | $Enums.Relationship
    createdAt?: DateTimeFilter<"Relations"> | Date | string
    dest?: XOR<UserScalarRelationFilter, UserWhereInput>
    src?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "srcid_destid">

  export type RelationsOrderByWithAggregationInput = {
    id?: SortOrder
    srcid?: SortOrder
    destid?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    _count?: RelationsCountOrderByAggregateInput
    _avg?: RelationsAvgOrderByAggregateInput
    _max?: RelationsMaxOrderByAggregateInput
    _min?: RelationsMinOrderByAggregateInput
    _sum?: RelationsSumOrderByAggregateInput
  }

  export type RelationsScalarWhereWithAggregatesInput = {
    AND?: RelationsScalarWhereWithAggregatesInput | RelationsScalarWhereWithAggregatesInput[]
    OR?: RelationsScalarWhereWithAggregatesInput[]
    NOT?: RelationsScalarWhereWithAggregatesInput | RelationsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Relations"> | number
    srcid?: StringWithAggregatesFilter<"Relations"> | string
    destid?: StringWithAggregatesFilter<"Relations"> | string
    type?: EnumRelationshipWithAggregatesFilter<"Relations"> | $Enums.Relationship
    createdAt?: DateTimeWithAggregatesFilter<"Relations"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    postid?: IntFilter<"Notification"> | number
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    postid?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    postid?: IntFilter<"Notification"> | number
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    postid?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _avg?: NotificationAvgOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
    _sum?: NotificationSumOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Notification"> | number
    userId?: StringWithAggregatesFilter<"Notification"> | string
    postid?: IntWithAggregatesFilter<"Notification"> | number
    isRead?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type SeenPostWhereInput = {
    AND?: SeenPostWhereInput | SeenPostWhereInput[]
    OR?: SeenPostWhereInput[]
    NOT?: SeenPostWhereInput | SeenPostWhereInput[]
    id?: IntFilter<"SeenPost"> | number
    userId?: StringFilter<"SeenPost"> | string
    postId?: IntFilter<"SeenPost"> | number
    seenAt?: DateTimeFilter<"SeenPost"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SeenPostOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    seenAt?: SortOrder
    post?: PostOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type SeenPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_postId?: SeenPostUserIdPostIdCompoundUniqueInput
    AND?: SeenPostWhereInput | SeenPostWhereInput[]
    OR?: SeenPostWhereInput[]
    NOT?: SeenPostWhereInput | SeenPostWhereInput[]
    userId?: StringFilter<"SeenPost"> | string
    postId?: IntFilter<"SeenPost"> | number
    seenAt?: DateTimeFilter<"SeenPost"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_postId">

  export type SeenPostOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    seenAt?: SortOrder
    _count?: SeenPostCountOrderByAggregateInput
    _avg?: SeenPostAvgOrderByAggregateInput
    _max?: SeenPostMaxOrderByAggregateInput
    _min?: SeenPostMinOrderByAggregateInput
    _sum?: SeenPostSumOrderByAggregateInput
  }

  export type SeenPostScalarWhereWithAggregatesInput = {
    AND?: SeenPostScalarWhereWithAggregatesInput | SeenPostScalarWhereWithAggregatesInput[]
    OR?: SeenPostScalarWhereWithAggregatesInput[]
    NOT?: SeenPostScalarWhereWithAggregatesInput | SeenPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SeenPost"> | number
    userId?: StringWithAggregatesFilter<"SeenPost"> | string
    postId?: IntWithAggregatesFilter<"SeenPost"> | number
    seenAt?: DateTimeWithAggregatesFilter<"SeenPost"> | Date | string
  }

  export type ChatsWhereInput = {
    AND?: ChatsWhereInput | ChatsWhereInput[]
    OR?: ChatsWhereInput[]
    NOT?: ChatsWhereInput | ChatsWhereInput[]
    id?: IntFilter<"Chats"> | number
    fromId?: StringFilter<"Chats"> | string
    toId?: StringFilter<"Chats"> | string
    type?: EnumChatTypeFilter<"Chats"> | $Enums.ChatType
    mediaUrl?: StringNullableFilter<"Chats"> | string | null
    message?: StringNullableFilter<"Chats"> | string | null
    isSeen?: BoolNullableFilter<"Chats"> | boolean | null
    isDeletedByFrom?: BoolFilter<"Chats"> | boolean
    isDeletedByTo?: BoolFilter<"Chats"> | boolean
    createdAt?: DateTimeFilter<"Chats"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ChatsOrderByWithRelationInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    type?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    isSeen?: SortOrderInput | SortOrder
    isDeletedByFrom?: SortOrder
    isDeletedByTo?: SortOrder
    createdAt?: SortOrder
    from?: UserOrderByWithRelationInput
    to?: UserOrderByWithRelationInput
  }

  export type ChatsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ChatsWhereInput | ChatsWhereInput[]
    OR?: ChatsWhereInput[]
    NOT?: ChatsWhereInput | ChatsWhereInput[]
    fromId?: StringFilter<"Chats"> | string
    toId?: StringFilter<"Chats"> | string
    type?: EnumChatTypeFilter<"Chats"> | $Enums.ChatType
    mediaUrl?: StringNullableFilter<"Chats"> | string | null
    message?: StringNullableFilter<"Chats"> | string | null
    isSeen?: BoolNullableFilter<"Chats"> | boolean | null
    isDeletedByFrom?: BoolFilter<"Chats"> | boolean
    isDeletedByTo?: BoolFilter<"Chats"> | boolean
    createdAt?: DateTimeFilter<"Chats"> | Date | string
    from?: XOR<UserScalarRelationFilter, UserWhereInput>
    to?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ChatsOrderByWithAggregationInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    type?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    message?: SortOrderInput | SortOrder
    isSeen?: SortOrderInput | SortOrder
    isDeletedByFrom?: SortOrder
    isDeletedByTo?: SortOrder
    createdAt?: SortOrder
    _count?: ChatsCountOrderByAggregateInput
    _avg?: ChatsAvgOrderByAggregateInput
    _max?: ChatsMaxOrderByAggregateInput
    _min?: ChatsMinOrderByAggregateInput
    _sum?: ChatsSumOrderByAggregateInput
  }

  export type ChatsScalarWhereWithAggregatesInput = {
    AND?: ChatsScalarWhereWithAggregatesInput | ChatsScalarWhereWithAggregatesInput[]
    OR?: ChatsScalarWhereWithAggregatesInput[]
    NOT?: ChatsScalarWhereWithAggregatesInput | ChatsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Chats"> | number
    fromId?: StringWithAggregatesFilter<"Chats"> | string
    toId?: StringWithAggregatesFilter<"Chats"> | string
    type?: EnumChatTypeWithAggregatesFilter<"Chats"> | $Enums.ChatType
    mediaUrl?: StringNullableWithAggregatesFilter<"Chats"> | string | null
    message?: StringNullableWithAggregatesFilter<"Chats"> | string | null
    isSeen?: BoolNullableWithAggregatesFilter<"Chats"> | boolean | null
    isDeletedByFrom?: BoolWithAggregatesFilter<"Chats"> | boolean
    isDeletedByTo?: BoolWithAggregatesFilter<"Chats"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Chats"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }

  export type OTPTableCreateInput = {
    email: string
    otp: string
    expiry?: Date | string
  }

  export type OTPTableUncheckedCreateInput = {
    id?: number
    email: string
    otp: string
    expiry?: Date | string
  }

  export type OTPTableUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPTableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPTableCreateManyInput = {
    id?: number
    email: string
    otp: string
    expiry?: Date | string
  }

  export type OTPTableUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OTPTableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    expiry?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    notifications?: NotificationCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutPostsInput
    seenBy?: SeenPostCreateNestedManyWithoutPostInput
    likes?: UserCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPostInput
    seenBy?: SeenPostUncheckedCreateNestedManyWithoutPostInput
    likes?: UserUncheckedCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    notifications?: NotificationUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    seenBy?: SeenPostUpdateManyWithoutPostNestedInput
    likes?: UserUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUncheckedUpdateManyWithoutPostNestedInput
    likes?: UserUncheckedUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    commentId?: string
    content: string
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    commentId?: string
    userId: string
    postId: number
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    commentId?: string
    userId: string
    postId: number
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsCreateInput = {
    type: $Enums.Relationship
    createdAt?: Date | string
    dest: UserCreateNestedOneWithoutFollowingInput
    src: UserCreateNestedOneWithoutFollowersInput
  }

  export type RelationsUncheckedCreateInput = {
    id?: number
    srcid: string
    destid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type RelationsUpdateInput = {
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dest?: UserUpdateOneRequiredWithoutFollowingNestedInput
    src?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type RelationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    srcid?: StringFieldUpdateOperationsInput | string
    destid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsCreateManyInput = {
    id?: number
    srcid: string
    destid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type RelationsUpdateManyMutationInput = {
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    srcid?: StringFieldUpdateOperationsInput | string
    destid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    isRead?: boolean
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutNotificationsInput
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: number
    userId: string
    postid: number
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutNotificationsNestedInput
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    postid?: IntFieldUpdateOperationsInput | number
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: number
    userId: string
    postid: number
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    postid?: IntFieldUpdateOperationsInput | number
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostCreateInput = {
    seenAt?: Date | string
    post: PostCreateNestedOneWithoutSeenByInput
    user: UserCreateNestedOneWithoutSeenPostsInput
  }

  export type SeenPostUncheckedCreateInput = {
    id?: number
    userId: string
    postId: number
    seenAt?: Date | string
  }

  export type SeenPostUpdateInput = {
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutSeenByNestedInput
    user?: UserUpdateOneRequiredWithoutSeenPostsNestedInput
  }

  export type SeenPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostCreateManyInput = {
    id?: number
    userId: string
    postId: number
    seenAt?: Date | string
  }

  export type SeenPostUpdateManyMutationInput = {
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsCreateInput = {
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
    from: UserCreateNestedOneWithoutChatsSentInput
    to: UserCreateNestedOneWithoutChatsReceivedInput
  }

  export type ChatsUncheckedCreateInput = {
    id?: number
    fromId: string
    toId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type ChatsUpdateInput = {
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutChatsSentNestedInput
    to?: UserUpdateOneRequiredWithoutChatsReceivedNestedInput
  }

  export type ChatsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsCreateManyInput = {
    id?: number
    fromId: string
    toId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type ChatsUpdateManyMutationInput = {
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromId?: StringFieldUpdateOperationsInput | string
    toId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type ChatsListRelationFilter = {
    every?: ChatsWhereInput
    some?: ChatsWhereInput
    none?: ChatsWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type RelationsListRelationFilter = {
    every?: RelationsWhereInput
    some?: RelationsWhereInput
    none?: RelationsWhereInput
  }

  export type SeenPostListRelationFilter = {
    every?: SeenPostWhereInput
    some?: SeenPostWhereInput
    none?: SeenPostWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ChatsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RelationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SeenPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    pic?: SortOrder
    lastSeenAt?: SortOrder
    provider?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    phone?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    pic?: SortOrder
    lastSeenAt?: SortOrder
    provider?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    name?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    dob?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    pic?: SortOrder
    lastSeenAt?: SortOrder
    provider?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    phone?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type OTPTableCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    expiry?: SortOrder
  }

  export type OTPTableAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OTPTableMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    expiry?: SortOrder
  }

  export type OTPTableMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    expiry?: SortOrder
  }

  export type OTPTableSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumViewersFilter<$PrismaModel = never> = {
    equals?: $Enums.Viewers | EnumViewersFieldRefInput<$PrismaModel>
    in?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    notIn?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    not?: NestedEnumViewersFilter<$PrismaModel> | $Enums.Viewers
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    visiblity?: SortOrder
    authorId?: SortOrder
    isMedia?: SortOrder
    mediaurl?: SortOrder
    createdAt?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    visiblity?: SortOrder
    authorId?: SortOrder
    isMedia?: SortOrder
    mediaurl?: SortOrder
    createdAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    visiblity?: SortOrder
    authorId?: SortOrder
    isMedia?: SortOrder
    mediaurl?: SortOrder
    createdAt?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumViewersWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Viewers | EnumViewersFieldRefInput<$PrismaModel>
    in?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    notIn?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    not?: NestedEnumViewersWithAggregatesFilter<$PrismaModel> | $Enums.Viewers
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumViewersFilter<$PrismaModel>
    _max?: NestedEnumViewersFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type CommentCountOrderByAggregateInput = {
    commentId?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    postId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    commentId?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    commentId?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    postId?: SortOrder
  }

  export type EnumRelationshipFilter<$PrismaModel = never> = {
    equals?: $Enums.Relationship | EnumRelationshipFieldRefInput<$PrismaModel>
    in?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    notIn?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    not?: NestedEnumRelationshipFilter<$PrismaModel> | $Enums.Relationship
  }

  export type RelationsSrcidDestidCompoundUniqueInput = {
    srcid: string
    destid: string
  }

  export type RelationsCountOrderByAggregateInput = {
    id?: SortOrder
    srcid?: SortOrder
    destid?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type RelationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RelationsMaxOrderByAggregateInput = {
    id?: SortOrder
    srcid?: SortOrder
    destid?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type RelationsMinOrderByAggregateInput = {
    id?: SortOrder
    srcid?: SortOrder
    destid?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
  }

  export type RelationsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumRelationshipWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Relationship | EnumRelationshipFieldRefInput<$PrismaModel>
    in?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    notIn?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    not?: NestedEnumRelationshipWithAggregatesFilter<$PrismaModel> | $Enums.Relationship
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRelationshipFilter<$PrismaModel>
    _max?: NestedEnumRelationshipFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postid?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationAvgOrderByAggregateInput = {
    id?: SortOrder
    postid?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postid?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postid?: SortOrder
    isRead?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationSumOrderByAggregateInput = {
    id?: SortOrder
    postid?: SortOrder
  }

  export type SeenPostUserIdPostIdCompoundUniqueInput = {
    userId: string
    postId: number
  }

  export type SeenPostCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    seenAt?: SortOrder
  }

  export type SeenPostAvgOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
  }

  export type SeenPostMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    seenAt?: SortOrder
  }

  export type SeenPostMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    seenAt?: SortOrder
  }

  export type SeenPostSumOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
  }

  export type EnumChatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeFilter<$PrismaModel> | $Enums.ChatType
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type ChatsCountOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    type?: SortOrder
    mediaUrl?: SortOrder
    message?: SortOrder
    isSeen?: SortOrder
    isDeletedByFrom?: SortOrder
    isDeletedByTo?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ChatsMaxOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    type?: SortOrder
    mediaUrl?: SortOrder
    message?: SortOrder
    isSeen?: SortOrder
    isDeletedByFrom?: SortOrder
    isDeletedByTo?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatsMinOrderByAggregateInput = {
    id?: SortOrder
    fromId?: SortOrder
    toId?: SortOrder
    type?: SortOrder
    mediaUrl?: SortOrder
    message?: SortOrder
    isSeen?: SortOrder
    isDeletedByFrom?: SortOrder
    isDeletedByTo?: SortOrder
    createdAt?: SortOrder
  }

  export type ChatsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumChatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChatType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatTypeFilter<$PrismaModel>
    _max?: NestedEnumChatTypeFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ChatsCreateNestedManyWithoutFromInput = {
    create?: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput> | ChatsCreateWithoutFromInput[] | ChatsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutFromInput | ChatsCreateOrConnectWithoutFromInput[]
    createMany?: ChatsCreateManyFromInputEnvelope
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
  }

  export type ChatsCreateNestedManyWithoutToInput = {
    create?: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput> | ChatsCreateWithoutToInput[] | ChatsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutToInput | ChatsCreateOrConnectWithoutToInput[]
    createMany?: ChatsCreateManyToInputEnvelope
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type RelationsCreateNestedManyWithoutDestInput = {
    create?: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput> | RelationsCreateWithoutDestInput[] | RelationsUncheckedCreateWithoutDestInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutDestInput | RelationsCreateOrConnectWithoutDestInput[]
    createMany?: RelationsCreateManyDestInputEnvelope
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
  }

  export type RelationsCreateNestedManyWithoutSrcInput = {
    create?: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput> | RelationsCreateWithoutSrcInput[] | RelationsUncheckedCreateWithoutSrcInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutSrcInput | RelationsCreateOrConnectWithoutSrcInput[]
    createMany?: RelationsCreateManySrcInputEnvelope
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
  }

  export type SeenPostCreateNestedManyWithoutUserInput = {
    create?: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput> | SeenPostCreateWithoutUserInput[] | SeenPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutUserInput | SeenPostCreateOrConnectWithoutUserInput[]
    createMany?: SeenPostCreateManyUserInputEnvelope
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
  }

  export type PostCreateNestedManyWithoutLikesInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput> | PostCreateWithoutLikesInput[] | PostUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput | PostCreateOrConnectWithoutLikesInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type ChatsUncheckedCreateNestedManyWithoutFromInput = {
    create?: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput> | ChatsCreateWithoutFromInput[] | ChatsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutFromInput | ChatsCreateOrConnectWithoutFromInput[]
    createMany?: ChatsCreateManyFromInputEnvelope
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
  }

  export type ChatsUncheckedCreateNestedManyWithoutToInput = {
    create?: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput> | ChatsCreateWithoutToInput[] | ChatsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutToInput | ChatsCreateOrConnectWithoutToInput[]
    createMany?: ChatsCreateManyToInputEnvelope
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type RelationsUncheckedCreateNestedManyWithoutDestInput = {
    create?: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput> | RelationsCreateWithoutDestInput[] | RelationsUncheckedCreateWithoutDestInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutDestInput | RelationsCreateOrConnectWithoutDestInput[]
    createMany?: RelationsCreateManyDestInputEnvelope
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
  }

  export type RelationsUncheckedCreateNestedManyWithoutSrcInput = {
    create?: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput> | RelationsCreateWithoutSrcInput[] | RelationsUncheckedCreateWithoutSrcInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutSrcInput | RelationsCreateOrConnectWithoutSrcInput[]
    createMany?: RelationsCreateManySrcInputEnvelope
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
  }

  export type SeenPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput> | SeenPostCreateWithoutUserInput[] | SeenPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutUserInput | SeenPostCreateOrConnectWithoutUserInput[]
    createMany?: SeenPostCreateManyUserInputEnvelope
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutLikesInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput> | PostCreateWithoutLikesInput[] | PostUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput | PostCreateOrConnectWithoutLikesInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type ChatsUpdateManyWithoutFromNestedInput = {
    create?: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput> | ChatsCreateWithoutFromInput[] | ChatsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutFromInput | ChatsCreateOrConnectWithoutFromInput[]
    upsert?: ChatsUpsertWithWhereUniqueWithoutFromInput | ChatsUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: ChatsCreateManyFromInputEnvelope
    set?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    disconnect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    delete?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    update?: ChatsUpdateWithWhereUniqueWithoutFromInput | ChatsUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: ChatsUpdateManyWithWhereWithoutFromInput | ChatsUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
  }

  export type ChatsUpdateManyWithoutToNestedInput = {
    create?: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput> | ChatsCreateWithoutToInput[] | ChatsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutToInput | ChatsCreateOrConnectWithoutToInput[]
    upsert?: ChatsUpsertWithWhereUniqueWithoutToInput | ChatsUpsertWithWhereUniqueWithoutToInput[]
    createMany?: ChatsCreateManyToInputEnvelope
    set?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    disconnect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    delete?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    update?: ChatsUpdateWithWhereUniqueWithoutToInput | ChatsUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: ChatsUpdateManyWithWhereWithoutToInput | ChatsUpdateManyWithWhereWithoutToInput[]
    deleteMany?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type RelationsUpdateManyWithoutDestNestedInput = {
    create?: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput> | RelationsCreateWithoutDestInput[] | RelationsUncheckedCreateWithoutDestInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutDestInput | RelationsCreateOrConnectWithoutDestInput[]
    upsert?: RelationsUpsertWithWhereUniqueWithoutDestInput | RelationsUpsertWithWhereUniqueWithoutDestInput[]
    createMany?: RelationsCreateManyDestInputEnvelope
    set?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    disconnect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    delete?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    update?: RelationsUpdateWithWhereUniqueWithoutDestInput | RelationsUpdateWithWhereUniqueWithoutDestInput[]
    updateMany?: RelationsUpdateManyWithWhereWithoutDestInput | RelationsUpdateManyWithWhereWithoutDestInput[]
    deleteMany?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
  }

  export type RelationsUpdateManyWithoutSrcNestedInput = {
    create?: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput> | RelationsCreateWithoutSrcInput[] | RelationsUncheckedCreateWithoutSrcInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutSrcInput | RelationsCreateOrConnectWithoutSrcInput[]
    upsert?: RelationsUpsertWithWhereUniqueWithoutSrcInput | RelationsUpsertWithWhereUniqueWithoutSrcInput[]
    createMany?: RelationsCreateManySrcInputEnvelope
    set?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    disconnect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    delete?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    update?: RelationsUpdateWithWhereUniqueWithoutSrcInput | RelationsUpdateWithWhereUniqueWithoutSrcInput[]
    updateMany?: RelationsUpdateManyWithWhereWithoutSrcInput | RelationsUpdateManyWithWhereWithoutSrcInput[]
    deleteMany?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
  }

  export type SeenPostUpdateManyWithoutUserNestedInput = {
    create?: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput> | SeenPostCreateWithoutUserInput[] | SeenPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutUserInput | SeenPostCreateOrConnectWithoutUserInput[]
    upsert?: SeenPostUpsertWithWhereUniqueWithoutUserInput | SeenPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SeenPostCreateManyUserInputEnvelope
    set?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    disconnect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    delete?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    update?: SeenPostUpdateWithWhereUniqueWithoutUserInput | SeenPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SeenPostUpdateManyWithWhereWithoutUserInput | SeenPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
  }

  export type PostUpdateManyWithoutLikesNestedInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput> | PostCreateWithoutLikesInput[] | PostUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput | PostCreateOrConnectWithoutLikesInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutLikesInput | PostUpsertWithWhereUniqueWithoutLikesInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutLikesInput | PostUpdateWithWhereUniqueWithoutLikesInput[]
    updateMany?: PostUpdateManyWithWhereWithoutLikesInput | PostUpdateManyWithWhereWithoutLikesInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type ChatsUncheckedUpdateManyWithoutFromNestedInput = {
    create?: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput> | ChatsCreateWithoutFromInput[] | ChatsUncheckedCreateWithoutFromInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutFromInput | ChatsCreateOrConnectWithoutFromInput[]
    upsert?: ChatsUpsertWithWhereUniqueWithoutFromInput | ChatsUpsertWithWhereUniqueWithoutFromInput[]
    createMany?: ChatsCreateManyFromInputEnvelope
    set?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    disconnect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    delete?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    update?: ChatsUpdateWithWhereUniqueWithoutFromInput | ChatsUpdateWithWhereUniqueWithoutFromInput[]
    updateMany?: ChatsUpdateManyWithWhereWithoutFromInput | ChatsUpdateManyWithWhereWithoutFromInput[]
    deleteMany?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
  }

  export type ChatsUncheckedUpdateManyWithoutToNestedInput = {
    create?: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput> | ChatsCreateWithoutToInput[] | ChatsUncheckedCreateWithoutToInput[]
    connectOrCreate?: ChatsCreateOrConnectWithoutToInput | ChatsCreateOrConnectWithoutToInput[]
    upsert?: ChatsUpsertWithWhereUniqueWithoutToInput | ChatsUpsertWithWhereUniqueWithoutToInput[]
    createMany?: ChatsCreateManyToInputEnvelope
    set?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    disconnect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    delete?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    connect?: ChatsWhereUniqueInput | ChatsWhereUniqueInput[]
    update?: ChatsUpdateWithWhereUniqueWithoutToInput | ChatsUpdateWithWhereUniqueWithoutToInput[]
    updateMany?: ChatsUpdateManyWithWhereWithoutToInput | ChatsUpdateManyWithWhereWithoutToInput[]
    deleteMany?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput> | CommentCreateWithoutUserInput[] | CommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutUserInput | CommentCreateOrConnectWithoutUserInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutUserInput | CommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CommentCreateManyUserInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutUserInput | CommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutUserInput | CommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type RelationsUncheckedUpdateManyWithoutDestNestedInput = {
    create?: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput> | RelationsCreateWithoutDestInput[] | RelationsUncheckedCreateWithoutDestInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutDestInput | RelationsCreateOrConnectWithoutDestInput[]
    upsert?: RelationsUpsertWithWhereUniqueWithoutDestInput | RelationsUpsertWithWhereUniqueWithoutDestInput[]
    createMany?: RelationsCreateManyDestInputEnvelope
    set?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    disconnect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    delete?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    update?: RelationsUpdateWithWhereUniqueWithoutDestInput | RelationsUpdateWithWhereUniqueWithoutDestInput[]
    updateMany?: RelationsUpdateManyWithWhereWithoutDestInput | RelationsUpdateManyWithWhereWithoutDestInput[]
    deleteMany?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
  }

  export type RelationsUncheckedUpdateManyWithoutSrcNestedInput = {
    create?: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput> | RelationsCreateWithoutSrcInput[] | RelationsUncheckedCreateWithoutSrcInput[]
    connectOrCreate?: RelationsCreateOrConnectWithoutSrcInput | RelationsCreateOrConnectWithoutSrcInput[]
    upsert?: RelationsUpsertWithWhereUniqueWithoutSrcInput | RelationsUpsertWithWhereUniqueWithoutSrcInput[]
    createMany?: RelationsCreateManySrcInputEnvelope
    set?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    disconnect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    delete?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    connect?: RelationsWhereUniqueInput | RelationsWhereUniqueInput[]
    update?: RelationsUpdateWithWhereUniqueWithoutSrcInput | RelationsUpdateWithWhereUniqueWithoutSrcInput[]
    updateMany?: RelationsUpdateManyWithWhereWithoutSrcInput | RelationsUpdateManyWithWhereWithoutSrcInput[]
    deleteMany?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
  }

  export type SeenPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput> | SeenPostCreateWithoutUserInput[] | SeenPostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutUserInput | SeenPostCreateOrConnectWithoutUserInput[]
    upsert?: SeenPostUpsertWithWhereUniqueWithoutUserInput | SeenPostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SeenPostCreateManyUserInputEnvelope
    set?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    disconnect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    delete?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    update?: SeenPostUpdateWithWhereUniqueWithoutUserInput | SeenPostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SeenPostUpdateManyWithWhereWithoutUserInput | SeenPostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutLikesNestedInput = {
    create?: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput> | PostCreateWithoutLikesInput[] | PostUncheckedCreateWithoutLikesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutLikesInput | PostCreateOrConnectWithoutLikesInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutLikesInput | PostUpsertWithWhereUniqueWithoutLikesInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutLikesInput | PostUpdateWithWhereUniqueWithoutLikesInput[]
    updateMany?: PostUpdateManyWithWhereWithoutLikesInput | PostUpdateManyWithWhereWithoutLikesInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutPostInput = {
    create?: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput> | NotificationCreateWithoutPostInput[] | NotificationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPostInput | NotificationCreateOrConnectWithoutPostInput[]
    createMany?: NotificationCreateManyPostInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type SeenPostCreateNestedManyWithoutPostInput = {
    create?: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput> | SeenPostCreateWithoutPostInput[] | SeenPostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutPostInput | SeenPostCreateOrConnectWithoutPostInput[]
    createMany?: SeenPostCreateManyPostInputEnvelope
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutLikedPostsInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput> | UserCreateWithoutLikedPostsInput[] | UserUncheckedCreateWithoutLikedPostsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput | UserCreateOrConnectWithoutLikedPostsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput> | NotificationCreateWithoutPostInput[] | NotificationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPostInput | NotificationCreateOrConnectWithoutPostInput[]
    createMany?: NotificationCreateManyPostInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type SeenPostUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput> | SeenPostCreateWithoutPostInput[] | SeenPostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutPostInput | SeenPostCreateOrConnectWithoutPostInput[]
    createMany?: SeenPostCreateManyPostInputEnvelope
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutLikedPostsInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput> | UserCreateWithoutLikedPostsInput[] | UserUncheckedCreateWithoutLikedPostsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput | UserCreateOrConnectWithoutLikedPostsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type EnumViewersFieldUpdateOperationsInput = {
    set?: $Enums.Viewers
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutPostNestedInput = {
    create?: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput> | NotificationCreateWithoutPostInput[] | NotificationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPostInput | NotificationCreateOrConnectWithoutPostInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutPostInput | NotificationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NotificationCreateManyPostInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutPostInput | NotificationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutPostInput | NotificationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type SeenPostUpdateManyWithoutPostNestedInput = {
    create?: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput> | SeenPostCreateWithoutPostInput[] | SeenPostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutPostInput | SeenPostCreateOrConnectWithoutPostInput[]
    upsert?: SeenPostUpsertWithWhereUniqueWithoutPostInput | SeenPostUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: SeenPostCreateManyPostInputEnvelope
    set?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    disconnect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    delete?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    update?: SeenPostUpdateWithWhereUniqueWithoutPostInput | SeenPostUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: SeenPostUpdateManyWithWhereWithoutPostInput | SeenPostUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
  }

  export type UserUpdateManyWithoutLikedPostsNestedInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput> | UserCreateWithoutLikedPostsInput[] | UserUncheckedCreateWithoutLikedPostsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput | UserCreateOrConnectWithoutLikedPostsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLikedPostsInput | UserUpsertWithWhereUniqueWithoutLikedPostsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLikedPostsInput | UserUpdateWithWhereUniqueWithoutLikedPostsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLikedPostsInput | UserUpdateManyWithWhereWithoutLikedPostsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput> | NotificationCreateWithoutPostInput[] | NotificationUncheckedCreateWithoutPostInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutPostInput | NotificationCreateOrConnectWithoutPostInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutPostInput | NotificationUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: NotificationCreateManyPostInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutPostInput | NotificationUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutPostInput | NotificationUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type SeenPostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput> | SeenPostCreateWithoutPostInput[] | SeenPostUncheckedCreateWithoutPostInput[]
    connectOrCreate?: SeenPostCreateOrConnectWithoutPostInput | SeenPostCreateOrConnectWithoutPostInput[]
    upsert?: SeenPostUpsertWithWhereUniqueWithoutPostInput | SeenPostUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: SeenPostCreateManyPostInputEnvelope
    set?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    disconnect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    delete?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    connect?: SeenPostWhereUniqueInput | SeenPostWhereUniqueInput[]
    update?: SeenPostUpdateWithWhereUniqueWithoutPostInput | SeenPostUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: SeenPostUpdateManyWithWhereWithoutPostInput | SeenPostUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutLikedPostsNestedInput = {
    create?: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput> | UserCreateWithoutLikedPostsInput[] | UserUncheckedCreateWithoutLikedPostsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutLikedPostsInput | UserCreateOrConnectWithoutLikedPostsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutLikedPostsInput | UserUpsertWithWhereUniqueWithoutLikedPostsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutLikedPostsInput | UserUpdateWithWhereUniqueWithoutLikedPostsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutLikedPostsInput | UserUpdateManyWithWhereWithoutLikedPostsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutFollowingInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowersInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRelationshipFieldUpdateOperationsInput = {
    set?: $Enums.Relationship
  }

  export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowingInput
    upsert?: UserUpsertWithoutFollowingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowingInput, UserUpdateWithoutFollowingInput>, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowersInput
    upsert?: UserUpsertWithoutFollowersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowersInput, UserUpdateWithoutFollowersInput>, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type PostCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<PostCreateWithoutNotificationsInput, PostUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: PostCreateOrConnectWithoutNotificationsInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<PostCreateWithoutNotificationsInput, PostUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: PostCreateOrConnectWithoutNotificationsInput
    upsert?: PostUpsertWithoutNotificationsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutNotificationsInput, PostUpdateWithoutNotificationsInput>, PostUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type PostCreateNestedOneWithoutSeenByInput = {
    create?: XOR<PostCreateWithoutSeenByInput, PostUncheckedCreateWithoutSeenByInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeenByInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSeenPostsInput = {
    create?: XOR<UserCreateWithoutSeenPostsInput, UserUncheckedCreateWithoutSeenPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSeenPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutSeenByNestedInput = {
    create?: XOR<PostCreateWithoutSeenByInput, PostUncheckedCreateWithoutSeenByInput>
    connectOrCreate?: PostCreateOrConnectWithoutSeenByInput
    upsert?: PostUpsertWithoutSeenByInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutSeenByInput, PostUpdateWithoutSeenByInput>, PostUncheckedUpdateWithoutSeenByInput>
  }

  export type UserUpdateOneRequiredWithoutSeenPostsNestedInput = {
    create?: XOR<UserCreateWithoutSeenPostsInput, UserUncheckedCreateWithoutSeenPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSeenPostsInput
    upsert?: UserUpsertWithoutSeenPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSeenPostsInput, UserUpdateWithoutSeenPostsInput>, UserUncheckedUpdateWithoutSeenPostsInput>
  }

  export type UserCreateNestedOneWithoutChatsSentInput = {
    create?: XOR<UserCreateWithoutChatsSentInput, UserUncheckedCreateWithoutChatsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsSentInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutChatsReceivedInput = {
    create?: XOR<UserCreateWithoutChatsReceivedInput, UserUncheckedCreateWithoutChatsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsReceivedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumChatTypeFieldUpdateOperationsInput = {
    set?: $Enums.ChatType
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutChatsSentNestedInput = {
    create?: XOR<UserCreateWithoutChatsSentInput, UserUncheckedCreateWithoutChatsSentInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsSentInput
    upsert?: UserUpsertWithoutChatsSentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatsSentInput, UserUpdateWithoutChatsSentInput>, UserUncheckedUpdateWithoutChatsSentInput>
  }

  export type UserUpdateOneRequiredWithoutChatsReceivedNestedInput = {
    create?: XOR<UserCreateWithoutChatsReceivedInput, UserUncheckedCreateWithoutChatsReceivedInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsReceivedInput
    upsert?: UserUpsertWithoutChatsReceivedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatsReceivedInput, UserUpdateWithoutChatsReceivedInput>, UserUncheckedUpdateWithoutChatsReceivedInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumViewersFilter<$PrismaModel = never> = {
    equals?: $Enums.Viewers | EnumViewersFieldRefInput<$PrismaModel>
    in?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    notIn?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    not?: NestedEnumViewersFilter<$PrismaModel> | $Enums.Viewers
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumViewersWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Viewers | EnumViewersFieldRefInput<$PrismaModel>
    in?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    notIn?: $Enums.Viewers[] | ListEnumViewersFieldRefInput<$PrismaModel>
    not?: NestedEnumViewersWithAggregatesFilter<$PrismaModel> | $Enums.Viewers
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumViewersFilter<$PrismaModel>
    _max?: NestedEnumViewersFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumRelationshipFilter<$PrismaModel = never> = {
    equals?: $Enums.Relationship | EnumRelationshipFieldRefInput<$PrismaModel>
    in?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    notIn?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    not?: NestedEnumRelationshipFilter<$PrismaModel> | $Enums.Relationship
  }

  export type NestedEnumRelationshipWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Relationship | EnumRelationshipFieldRefInput<$PrismaModel>
    in?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    notIn?: $Enums.Relationship[] | ListEnumRelationshipFieldRefInput<$PrismaModel>
    not?: NestedEnumRelationshipWithAggregatesFilter<$PrismaModel> | $Enums.Relationship
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRelationshipFilter<$PrismaModel>
    _max?: NestedEnumRelationshipFilter<$PrismaModel>
  }

  export type NestedEnumChatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeFilter<$PrismaModel> | $Enums.ChatType
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedEnumChatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatType | EnumChatTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatType[] | ListEnumChatTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumChatTypeWithAggregatesFilter<$PrismaModel> | $Enums.ChatType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatTypeFilter<$PrismaModel>
    _max?: NestedEnumChatTypeFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ChatsCreateWithoutFromInput = {
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
    to: UserCreateNestedOneWithoutChatsReceivedInput
  }

  export type ChatsUncheckedCreateWithoutFromInput = {
    id?: number
    toId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type ChatsCreateOrConnectWithoutFromInput = {
    where: ChatsWhereUniqueInput
    create: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput>
  }

  export type ChatsCreateManyFromInputEnvelope = {
    data: ChatsCreateManyFromInput | ChatsCreateManyFromInput[]
    skipDuplicates?: boolean
  }

  export type ChatsCreateWithoutToInput = {
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
    from: UserCreateNestedOneWithoutChatsSentInput
  }

  export type ChatsUncheckedCreateWithoutToInput = {
    id?: number
    fromId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type ChatsCreateOrConnectWithoutToInput = {
    where: ChatsWhereUniqueInput
    create: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput>
  }

  export type ChatsCreateManyToInputEnvelope = {
    data: ChatsCreateManyToInput | ChatsCreateManyToInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutUserInput = {
    commentId?: string
    content: string
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutUserInput = {
    commentId?: string
    postId: number
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutUserInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentCreateManyUserInputEnvelope = {
    data: CommentCreateManyUserInput | CommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutUserInput = {
    isRead?: boolean
    createdAt?: Date | string
    post: PostCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: number
    postid: number
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutAuthorInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    notifications?: NotificationCreateNestedManyWithoutPostInput
    seenBy?: SeenPostCreateNestedManyWithoutPostInput
    likes?: UserCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPostInput
    seenBy?: SeenPostUncheckedCreateNestedManyWithoutPostInput
    likes?: UserUncheckedCreateNestedManyWithoutLikedPostsInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RelationsCreateWithoutDestInput = {
    type: $Enums.Relationship
    createdAt?: Date | string
    src: UserCreateNestedOneWithoutFollowersInput
  }

  export type RelationsUncheckedCreateWithoutDestInput = {
    id?: number
    srcid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type RelationsCreateOrConnectWithoutDestInput = {
    where: RelationsWhereUniqueInput
    create: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput>
  }

  export type RelationsCreateManyDestInputEnvelope = {
    data: RelationsCreateManyDestInput | RelationsCreateManyDestInput[]
    skipDuplicates?: boolean
  }

  export type RelationsCreateWithoutSrcInput = {
    type: $Enums.Relationship
    createdAt?: Date | string
    dest: UserCreateNestedOneWithoutFollowingInput
  }

  export type RelationsUncheckedCreateWithoutSrcInput = {
    id?: number
    destid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type RelationsCreateOrConnectWithoutSrcInput = {
    where: RelationsWhereUniqueInput
    create: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput>
  }

  export type RelationsCreateManySrcInputEnvelope = {
    data: RelationsCreateManySrcInput | RelationsCreateManySrcInput[]
    skipDuplicates?: boolean
  }

  export type SeenPostCreateWithoutUserInput = {
    seenAt?: Date | string
    post: PostCreateNestedOneWithoutSeenByInput
  }

  export type SeenPostUncheckedCreateWithoutUserInput = {
    id?: number
    postId: number
    seenAt?: Date | string
  }

  export type SeenPostCreateOrConnectWithoutUserInput = {
    where: SeenPostWhereUniqueInput
    create: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput>
  }

  export type SeenPostCreateManyUserInputEnvelope = {
    data: SeenPostCreateManyUserInput | SeenPostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostCreateWithoutLikesInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    notifications?: NotificationCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutPostsInput
    seenBy?: SeenPostCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutLikesInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPostInput
    seenBy?: SeenPostUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutLikesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
  }

  export type ChatsUpsertWithWhereUniqueWithoutFromInput = {
    where: ChatsWhereUniqueInput
    update: XOR<ChatsUpdateWithoutFromInput, ChatsUncheckedUpdateWithoutFromInput>
    create: XOR<ChatsCreateWithoutFromInput, ChatsUncheckedCreateWithoutFromInput>
  }

  export type ChatsUpdateWithWhereUniqueWithoutFromInput = {
    where: ChatsWhereUniqueInput
    data: XOR<ChatsUpdateWithoutFromInput, ChatsUncheckedUpdateWithoutFromInput>
  }

  export type ChatsUpdateManyWithWhereWithoutFromInput = {
    where: ChatsScalarWhereInput
    data: XOR<ChatsUpdateManyMutationInput, ChatsUncheckedUpdateManyWithoutFromInput>
  }

  export type ChatsScalarWhereInput = {
    AND?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
    OR?: ChatsScalarWhereInput[]
    NOT?: ChatsScalarWhereInput | ChatsScalarWhereInput[]
    id?: IntFilter<"Chats"> | number
    fromId?: StringFilter<"Chats"> | string
    toId?: StringFilter<"Chats"> | string
    type?: EnumChatTypeFilter<"Chats"> | $Enums.ChatType
    mediaUrl?: StringNullableFilter<"Chats"> | string | null
    message?: StringNullableFilter<"Chats"> | string | null
    isSeen?: BoolNullableFilter<"Chats"> | boolean | null
    isDeletedByFrom?: BoolFilter<"Chats"> | boolean
    isDeletedByTo?: BoolFilter<"Chats"> | boolean
    createdAt?: DateTimeFilter<"Chats"> | Date | string
  }

  export type ChatsUpsertWithWhereUniqueWithoutToInput = {
    where: ChatsWhereUniqueInput
    update: XOR<ChatsUpdateWithoutToInput, ChatsUncheckedUpdateWithoutToInput>
    create: XOR<ChatsCreateWithoutToInput, ChatsUncheckedCreateWithoutToInput>
  }

  export type ChatsUpdateWithWhereUniqueWithoutToInput = {
    where: ChatsWhereUniqueInput
    data: XOR<ChatsUpdateWithoutToInput, ChatsUncheckedUpdateWithoutToInput>
  }

  export type ChatsUpdateManyWithWhereWithoutToInput = {
    where: ChatsScalarWhereInput
    data: XOR<ChatsUpdateManyMutationInput, ChatsUncheckedUpdateManyWithoutToInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
    create: XOR<CommentCreateWithoutUserInput, CommentUncheckedCreateWithoutUserInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutUserInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutUserInput, CommentUncheckedUpdateWithoutUserInput>
  }

  export type CommentUpdateManyWithWhereWithoutUserInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutUserInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    commentId?: StringFilter<"Comment"> | string
    userId?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: IntFilter<"Notification"> | number
    userId?: StringFilter<"Notification"> | string
    postid?: IntFilter<"Notification"> | number
    isRead?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    visiblity?: EnumViewersFilter<"Post"> | $Enums.Viewers
    authorId?: StringFilter<"Post"> | string
    isMedia?: BoolFilter<"Post"> | boolean
    mediaurl?: StringNullableFilter<"Post"> | string | null
    createdAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type RelationsUpsertWithWhereUniqueWithoutDestInput = {
    where: RelationsWhereUniqueInput
    update: XOR<RelationsUpdateWithoutDestInput, RelationsUncheckedUpdateWithoutDestInput>
    create: XOR<RelationsCreateWithoutDestInput, RelationsUncheckedCreateWithoutDestInput>
  }

  export type RelationsUpdateWithWhereUniqueWithoutDestInput = {
    where: RelationsWhereUniqueInput
    data: XOR<RelationsUpdateWithoutDestInput, RelationsUncheckedUpdateWithoutDestInput>
  }

  export type RelationsUpdateManyWithWhereWithoutDestInput = {
    where: RelationsScalarWhereInput
    data: XOR<RelationsUpdateManyMutationInput, RelationsUncheckedUpdateManyWithoutDestInput>
  }

  export type RelationsScalarWhereInput = {
    AND?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
    OR?: RelationsScalarWhereInput[]
    NOT?: RelationsScalarWhereInput | RelationsScalarWhereInput[]
    id?: IntFilter<"Relations"> | number
    srcid?: StringFilter<"Relations"> | string
    destid?: StringFilter<"Relations"> | string
    type?: EnumRelationshipFilter<"Relations"> | $Enums.Relationship
    createdAt?: DateTimeFilter<"Relations"> | Date | string
  }

  export type RelationsUpsertWithWhereUniqueWithoutSrcInput = {
    where: RelationsWhereUniqueInput
    update: XOR<RelationsUpdateWithoutSrcInput, RelationsUncheckedUpdateWithoutSrcInput>
    create: XOR<RelationsCreateWithoutSrcInput, RelationsUncheckedCreateWithoutSrcInput>
  }

  export type RelationsUpdateWithWhereUniqueWithoutSrcInput = {
    where: RelationsWhereUniqueInput
    data: XOR<RelationsUpdateWithoutSrcInput, RelationsUncheckedUpdateWithoutSrcInput>
  }

  export type RelationsUpdateManyWithWhereWithoutSrcInput = {
    where: RelationsScalarWhereInput
    data: XOR<RelationsUpdateManyMutationInput, RelationsUncheckedUpdateManyWithoutSrcInput>
  }

  export type SeenPostUpsertWithWhereUniqueWithoutUserInput = {
    where: SeenPostWhereUniqueInput
    update: XOR<SeenPostUpdateWithoutUserInput, SeenPostUncheckedUpdateWithoutUserInput>
    create: XOR<SeenPostCreateWithoutUserInput, SeenPostUncheckedCreateWithoutUserInput>
  }

  export type SeenPostUpdateWithWhereUniqueWithoutUserInput = {
    where: SeenPostWhereUniqueInput
    data: XOR<SeenPostUpdateWithoutUserInput, SeenPostUncheckedUpdateWithoutUserInput>
  }

  export type SeenPostUpdateManyWithWhereWithoutUserInput = {
    where: SeenPostScalarWhereInput
    data: XOR<SeenPostUpdateManyMutationInput, SeenPostUncheckedUpdateManyWithoutUserInput>
  }

  export type SeenPostScalarWhereInput = {
    AND?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
    OR?: SeenPostScalarWhereInput[]
    NOT?: SeenPostScalarWhereInput | SeenPostScalarWhereInput[]
    id?: IntFilter<"SeenPost"> | number
    userId?: StringFilter<"SeenPost"> | string
    postId?: IntFilter<"SeenPost"> | number
    seenAt?: DateTimeFilter<"SeenPost"> | Date | string
  }

  export type PostUpsertWithWhereUniqueWithoutLikesInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
    create: XOR<PostCreateWithoutLikesInput, PostUncheckedCreateWithoutLikesInput>
  }

  export type PostUpdateWithWhereUniqueWithoutLikesInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutLikesInput, PostUncheckedUpdateWithoutLikesInput>
  }

  export type PostUpdateManyWithWhereWithoutLikesInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutLikesInput>
  }

  export type CommentCreateWithoutPostInput = {
    commentId?: string
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    commentId?: string
    userId: string
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type NotificationCreateWithoutPostInput = {
    isRead?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateWithoutPostInput = {
    id?: number
    userId: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutPostInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput>
  }

  export type NotificationCreateManyPostInputEnvelope = {
    data: NotificationCreateManyPostInput | NotificationCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type SeenPostCreateWithoutPostInput = {
    seenAt?: Date | string
    user: UserCreateNestedOneWithoutSeenPostsInput
  }

  export type SeenPostUncheckedCreateWithoutPostInput = {
    id?: number
    userId: string
    seenAt?: Date | string
  }

  export type SeenPostCreateOrConnectWithoutPostInput = {
    where: SeenPostWhereUniqueInput
    create: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput>
  }

  export type SeenPostCreateManyPostInputEnvelope = {
    data: SeenPostCreateManyPostInput | SeenPostCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutLikedPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLikedPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLikedPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutPostInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutPostInput, NotificationUncheckedUpdateWithoutPostInput>
    create: XOR<NotificationCreateWithoutPostInput, NotificationUncheckedCreateWithoutPostInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutPostInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutPostInput, NotificationUncheckedUpdateWithoutPostInput>
  }

  export type NotificationUpdateManyWithWhereWithoutPostInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutPostInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type SeenPostUpsertWithWhereUniqueWithoutPostInput = {
    where: SeenPostWhereUniqueInput
    update: XOR<SeenPostUpdateWithoutPostInput, SeenPostUncheckedUpdateWithoutPostInput>
    create: XOR<SeenPostCreateWithoutPostInput, SeenPostUncheckedCreateWithoutPostInput>
  }

  export type SeenPostUpdateWithWhereUniqueWithoutPostInput = {
    where: SeenPostWhereUniqueInput
    data: XOR<SeenPostUpdateWithoutPostInput, SeenPostUncheckedUpdateWithoutPostInput>
  }

  export type SeenPostUpdateManyWithWhereWithoutPostInput = {
    where: SeenPostScalarWhereInput
    data: XOR<SeenPostUpdateManyMutationInput, SeenPostUncheckedUpdateManyWithoutPostInput>
  }

  export type UserUpsertWithWhereUniqueWithoutLikedPostsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
    create: XOR<UserCreateWithoutLikedPostsInput, UserUncheckedCreateWithoutLikedPostsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutLikedPostsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutLikedPostsInput, UserUncheckedUpdateWithoutLikedPostsInput>
  }

  export type UserUpdateManyWithWhereWithoutLikedPostsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutLikedPostsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    name?: StringNullableFilter<"User"> | string | null
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    password?: StringNullableFilter<"User"> | string | null
    firstname?: StringNullableFilter<"User"> | string | null
    lastname?: StringNullableFilter<"User"> | string | null
    username?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    bio?: StringFilter<"User"> | string
    phone?: BigIntNullableFilter<"User"> | bigint | number | null
    pic?: StringNullableFilter<"User"> | string | null
    lastSeenAt?: DateTimeFilter<"User"> | Date | string
    provider?: EnumProviderFilter<"User"> | $Enums.Provider
  }

  export type PostCreateWithoutCommentsInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    notifications?: NotificationCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutPostsInput
    seenBy?: SeenPostCreateNestedManyWithoutPostInput
    likes?: UserCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    notifications?: NotificationUncheckedCreateNestedManyWithoutPostInput
    seenBy?: SeenPostUncheckedCreateNestedManyWithoutPostInput
    likes?: UserUncheckedCreateNestedManyWithoutLikedPostsInput
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    seenBy?: SeenPostUpdateManyWithoutPostNestedInput
    likes?: UserUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notifications?: NotificationUncheckedUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUncheckedUpdateManyWithoutPostNestedInput
    likes?: UserUncheckedUpdateManyWithoutLikedPostsNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type UserCreateWithoutFollowingInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutFollowingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
  }

  export type UserCreateWithoutFollowersInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutFollowersInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutFollowersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
  }

  export type UserUpsertWithoutFollowingInput = {
    update: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
    create: XOR<UserCreateWithoutFollowingInput, UserUncheckedCreateWithoutFollowingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowingInput, UserUncheckedUpdateWithoutFollowingInput>
  }

  export type UserUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type UserUpsertWithoutFollowersInput = {
    update: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
    create: XOR<UserCreateWithoutFollowersInput, UserUncheckedCreateWithoutFollowersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowersInput, UserUncheckedUpdateWithoutFollowersInput>
  }

  export type UserUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type PostCreateWithoutNotificationsInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutPostsInput
    seenBy?: SeenPostCreateNestedManyWithoutPostInput
    likes?: UserCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUncheckedCreateWithoutNotificationsInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    seenBy?: SeenPostUncheckedCreateNestedManyWithoutPostInput
    likes?: UserUncheckedCreateNestedManyWithoutLikedPostsInput
  }

  export type PostCreateOrConnectWithoutNotificationsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutNotificationsInput, PostUncheckedCreateWithoutNotificationsInput>
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type PostUpsertWithoutNotificationsInput = {
    update: XOR<PostUpdateWithoutNotificationsInput, PostUncheckedUpdateWithoutNotificationsInput>
    create: XOR<PostCreateWithoutNotificationsInput, PostUncheckedCreateWithoutNotificationsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutNotificationsInput, PostUncheckedUpdateWithoutNotificationsInput>
  }

  export type PostUpdateWithoutNotificationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    seenBy?: SeenPostUpdateManyWithoutPostNestedInput
    likes?: UserUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutNotificationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUncheckedUpdateManyWithoutPostNestedInput
    likes?: UserUncheckedUpdateManyWithoutLikedPostsNestedInput
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type PostCreateWithoutSeenByInput = {
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    notifications?: NotificationCreateNestedManyWithoutPostInput
    author: UserCreateNestedOneWithoutPostsInput
    likes?: UserCreateNestedManyWithoutLikedPostsInput
  }

  export type PostUncheckedCreateWithoutSeenByInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    authorId: string
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutPostInput
    likes?: UserUncheckedCreateNestedManyWithoutLikedPostsInput
  }

  export type PostCreateOrConnectWithoutSeenByInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutSeenByInput, PostUncheckedCreateWithoutSeenByInput>
  }

  export type UserCreateWithoutSeenPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutSeenPostsInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutSeenPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSeenPostsInput, UserUncheckedCreateWithoutSeenPostsInput>
  }

  export type PostUpsertWithoutSeenByInput = {
    update: XOR<PostUpdateWithoutSeenByInput, PostUncheckedUpdateWithoutSeenByInput>
    create: XOR<PostCreateWithoutSeenByInput, PostUncheckedCreateWithoutSeenByInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutSeenByInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutSeenByInput, PostUncheckedUpdateWithoutSeenByInput>
  }

  export type PostUpdateWithoutSeenByInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    notifications?: NotificationUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    likes?: UserUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutSeenByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPostNestedInput
    likes?: UserUncheckedUpdateManyWithoutLikedPostsNestedInput
  }

  export type UserUpsertWithoutSeenPostsInput = {
    update: XOR<UserUpdateWithoutSeenPostsInput, UserUncheckedUpdateWithoutSeenPostsInput>
    create: XOR<UserCreateWithoutSeenPostsInput, UserUncheckedCreateWithoutSeenPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSeenPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSeenPostsInput, UserUncheckedUpdateWithoutSeenPostsInput>
  }

  export type UserUpdateWithoutSeenPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutSeenPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type UserCreateWithoutChatsSentInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsReceived?: ChatsCreateNestedManyWithoutToInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutChatsSentInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsReceived?: ChatsUncheckedCreateNestedManyWithoutToInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutChatsSentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatsSentInput, UserUncheckedCreateWithoutChatsSentInput>
  }

  export type UserCreateWithoutChatsReceivedInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsCreateNestedManyWithoutFromInput
    comments?: CommentCreateNestedManyWithoutUserInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
    posts?: PostCreateNestedManyWithoutAuthorInput
    following?: RelationsCreateNestedManyWithoutDestInput
    followers?: RelationsCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostCreateNestedManyWithoutUserInput
    likedPosts?: PostCreateNestedManyWithoutLikesInput
  }

  export type UserUncheckedCreateWithoutChatsReceivedInput = {
    id?: string
    email: string
    emailVerified?: Date | string | null
    name?: string | null
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: string | null
    firstname?: string | null
    lastname?: string | null
    username?: string | null
    dob?: Date | string | null
    bio?: string
    phone?: bigint | number | null
    pic?: string | null
    lastSeenAt?: Date | string
    provider: $Enums.Provider
    chatsSent?: ChatsUncheckedCreateNestedManyWithoutFromInput
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    following?: RelationsUncheckedCreateNestedManyWithoutDestInput
    followers?: RelationsUncheckedCreateNestedManyWithoutSrcInput
    seenPosts?: SeenPostUncheckedCreateNestedManyWithoutUserInput
    likedPosts?: PostUncheckedCreateNestedManyWithoutLikesInput
  }

  export type UserCreateOrConnectWithoutChatsReceivedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatsReceivedInput, UserUncheckedCreateWithoutChatsReceivedInput>
  }

  export type UserUpsertWithoutChatsSentInput = {
    update: XOR<UserUpdateWithoutChatsSentInput, UserUncheckedUpdateWithoutChatsSentInput>
    create: XOR<UserCreateWithoutChatsSentInput, UserUncheckedCreateWithoutChatsSentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatsSentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatsSentInput, UserUncheckedUpdateWithoutChatsSentInput>
  }

  export type UserUpdateWithoutChatsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutChatsSentInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type UserUpsertWithoutChatsReceivedInput = {
    update: XOR<UserUpdateWithoutChatsReceivedInput, UserUncheckedUpdateWithoutChatsReceivedInput>
    create: XOR<UserCreateWithoutChatsReceivedInput, UserUncheckedCreateWithoutChatsReceivedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatsReceivedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatsReceivedInput, UserUncheckedUpdateWithoutChatsReceivedInput>
  }

  export type UserUpdateWithoutChatsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
    likedPosts?: PostUpdateManyWithoutLikesNestedInput
  }

  export type UserUncheckedUpdateWithoutChatsReceivedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
    likedPosts?: PostUncheckedUpdateManyWithoutLikesNestedInput
  }

  export type ChatsCreateManyFromInput = {
    id?: number
    toId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type ChatsCreateManyToInput = {
    id?: number
    fromId: string
    type: $Enums.ChatType
    mediaUrl?: string | null
    message?: string | null
    isSeen?: boolean | null
    isDeletedByFrom?: boolean
    isDeletedByTo?: boolean
    createdAt?: Date | string
  }

  export type CommentCreateManyUserInput = {
    commentId?: string
    postId: number
    content: string
    createdAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: number
    postid: number
    isRead?: boolean
    createdAt?: Date | string
  }

  export type PostCreateManyAuthorInput = {
    id?: number
    title: string
    visiblity?: $Enums.Viewers
    isMedia: boolean
    mediaurl?: string | null
    createdAt?: Date | string
  }

  export type RelationsCreateManyDestInput = {
    id?: number
    srcid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type RelationsCreateManySrcInput = {
    id?: number
    destid: string
    type: $Enums.Relationship
    createdAt?: Date | string
  }

  export type SeenPostCreateManyUserInput = {
    id?: number
    postId: number
    seenAt?: Date | string
  }

  export type ChatsUpdateWithoutFromInput = {
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    to?: UserUpdateOneRequiredWithoutChatsReceivedNestedInput
  }

  export type ChatsUncheckedUpdateWithoutFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    toId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsUncheckedUpdateManyWithoutFromInput = {
    id?: IntFieldUpdateOperationsInput | number
    toId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsUpdateWithoutToInput = {
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    from?: UserUpdateOneRequiredWithoutChatsSentNestedInput
  }

  export type ChatsUncheckedUpdateWithoutToInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatsUncheckedUpdateManyWithoutToInput = {
    id?: IntFieldUpdateOperationsInput | number
    fromId?: StringFieldUpdateOperationsInput | string
    type?: EnumChatTypeFieldUpdateOperationsInput | $Enums.ChatType
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    message?: NullableStringFieldUpdateOperationsInput | string | null
    isSeen?: NullableBoolFieldUpdateOperationsInput | boolean | null
    isDeletedByFrom?: BoolFieldUpdateOperationsInput | boolean
    isDeletedByTo?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutUserInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutUserInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutUserInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postid?: IntFieldUpdateOperationsInput | number
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postid?: IntFieldUpdateOperationsInput | number
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    notifications?: NotificationUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUpdateManyWithoutPostNestedInput
    likes?: UserUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUncheckedUpdateManyWithoutPostNestedInput
    likes?: UserUncheckedUpdateManyWithoutLikedPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsUpdateWithoutDestInput = {
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    src?: UserUpdateOneRequiredWithoutFollowersNestedInput
  }

  export type RelationsUncheckedUpdateWithoutDestInput = {
    id?: IntFieldUpdateOperationsInput | number
    srcid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsUncheckedUpdateManyWithoutDestInput = {
    id?: IntFieldUpdateOperationsInput | number
    srcid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsUpdateWithoutSrcInput = {
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dest?: UserUpdateOneRequiredWithoutFollowingNestedInput
  }

  export type RelationsUncheckedUpdateWithoutSrcInput = {
    id?: IntFieldUpdateOperationsInput | number
    destid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RelationsUncheckedUpdateManyWithoutSrcInput = {
    id?: IntFieldUpdateOperationsInput | number
    destid?: StringFieldUpdateOperationsInput | string
    type?: EnumRelationshipFieldUpdateOperationsInput | $Enums.Relationship
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostUpdateWithoutUserInput = {
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutSeenByNestedInput
  }

  export type SeenPostUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUpdateWithoutLikesInput = {
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    notifications?: NotificationUpdateManyWithoutPostNestedInput
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    seenBy?: SeenPostUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutPostNestedInput
    seenBy?: SeenPostUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    visiblity?: EnumViewersFieldUpdateOperationsInput | $Enums.Viewers
    authorId?: StringFieldUpdateOperationsInput | string
    isMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaurl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyPostInput = {
    commentId?: string
    userId: string
    content: string
    createdAt?: Date | string
  }

  export type NotificationCreateManyPostInput = {
    id?: number
    userId: string
    isRead?: boolean
    createdAt?: Date | string
  }

  export type SeenPostCreateManyPostInput = {
    id?: number
    userId: string
    seenAt?: Date | string
  }

  export type CommentUpdateWithoutPostInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    commentId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutPostInput = {
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    isRead?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostUpdateWithoutPostInput = {
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSeenPostsNestedInput
  }

  export type SeenPostUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SeenPostUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    seenAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutLikedPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUpdateManyWithoutToNestedInput
    comments?: CommentUpdateManyWithoutUserNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
    posts?: PostUpdateManyWithoutAuthorNestedInput
    following?: RelationsUpdateManyWithoutDestNestedInput
    followers?: RelationsUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLikedPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    chatsSent?: ChatsUncheckedUpdateManyWithoutFromNestedInput
    chatsReceived?: ChatsUncheckedUpdateManyWithoutToNestedInput
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    following?: RelationsUncheckedUpdateManyWithoutDestNestedInput
    followers?: RelationsUncheckedUpdateManyWithoutSrcNestedInput
    seenPosts?: SeenPostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutLikedPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    firstname?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bio?: StringFieldUpdateOperationsInput | string
    phone?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    pic?: NullableStringFieldUpdateOperationsInput | string | null
    lastSeenAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}