/**
 * As input can be both array or single object and either uploaded or converted meta,
 * require extra function to separate out to handle preview of previously uploaded
 */
import type { IMultipleInputValue, IValue } from './types';
type Value = IValue | undefined;
export declare const getPresentFiles: (value: Value) => IMultipleInputValue;
export {};
