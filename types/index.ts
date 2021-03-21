// eslint-disable-next-line import/no-cycle
import {CategoryType} from './category';
import {ProductType} from './product';
import {ResponseType} from './response';

export type ResponseErrorType = {error: number; message: string; field: string};

export type {CategoryType, ProductType, ResponseType};

export type Await<T> = T extends Promise<infer U> ? U : T;

export type Maybe<T> = T | null;
