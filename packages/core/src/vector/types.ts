import type { VectorFilter } from './filter';

export interface QueryResult {
  id: string;
  score: number;
  metadata?: Record<string, any>;
  vector?: number[];
  /**
   * The document content, if available.
   * Note: Currently only supported by Chroma vector store.
   * For other vector stores, documents should be stored in metadata.
   */
  document?: string;
}

export interface IndexStats {
  dimension: number;
  count: number;
  metric?: 'cosine' | 'euclidean' | 'dotproduct';
}

export interface UpsertVectorParams {
  indexName: string;
  vectors: number[][];
  metadata?: Record<string, any>[];
  ids?: string[];
}

export type UpsertVectorArgs = [string, number[][], Record<string, any>[], string[]?];

export interface CreateIndexParams {
  indexName: string;
  dimension: number;
  metric?: 'cosine' | 'euclidean' | 'dotproduct';
}

export type CreateIndexArgs = [string, number, 'cosine' | 'euclidean' | 'dotproduct'];

export interface QueryVectorParams {
  indexName: string;
  queryVector: number[];
  topK?: number;
  filter?: VectorFilter;
  includeVector?: boolean;
}

export type QueryVectorArgs = [string, number[], number, VectorFilter?, boolean?];

export interface DescribeIndexParams {
  indexName: string;
}

export type DescribeIndexArgs = [string];

export interface DeleteIndexParams {
  indexName: string;
}

export type DeleteIndexArgs = [string];

export interface UpdateVectorParams {
  indexName: string;
  id: string;
  update: { vector?: number[]; metadata?: Record<string, any> };
}

export type UpdateVectorArgs = [string, string, { vector?: number[]; metadata?: Record<string, any> }];

export interface DeleteVectorParams {
  indexName: string;
  id: string;
}

export type DeleteVectorArgs = [string, string];

// Checks for object format, followed by specific arg types for query, upsert, create, describe, delete, update, and delete vector operations
export type ParamsToArgs<T> =
  | [T] // object format
  | (T extends QueryVectorParams ? QueryVectorArgs : never)
  | (T extends UpsertVectorParams ? UpsertVectorArgs : never)
  | (T extends CreateIndexParams ? CreateIndexArgs : never)
  | (T extends DescribeIndexParams ? DescribeIndexArgs : never)
  | (T extends DeleteIndexParams ? DeleteIndexArgs : never)
  | (T extends UpdateVectorParams ? UpdateVectorArgs : never)
  | (T extends DeleteVectorParams ? DeleteVectorArgs : never);
